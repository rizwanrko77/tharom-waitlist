interface Env {
  GOOGLE_SHEET_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
}

export const onRequestPost = async (context: any) => {
  try {
    const request = context.request;
    const body = await request.json() as { name?: string; email?: string; usecase?: string };

    if (!body.name || !body.email || !body.usecase) {
      return new Response(JSON.stringify({ error: "Name, email, and use case are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email, usecase } = body;

    const webhookUrl = context.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing GOOGLE_SHEET_WEBHOOK_URL environment variable");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Step 1: Always save to Google Sheet (marks new vs duplicate internally)
    const sheetResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, usecase }),
    });

    if (!sheetResponse.ok) {
      console.error("Google Sheet webhook failed:", sheetResponse.status);
      return new Response(JSON.stringify({ error: "Failed to save your details. Please try again." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sheetData = await sheetResponse.json() as { success: boolean; duplicate?: boolean };

    if (!sheetData.success) {
      return new Response(JSON.stringify({ error: "Failed to save your details. Please try again." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Step 2: Send welcome email only for new signups (plain text only)
    if (!sheetData.duplicate) {
      const resendApiKey = context.env.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Tharom AI <waitlist@tharom.com>",
              reply_to: "rizwan@tharom.com",
              to: [email],
              subject: "You're on the Tharom AI waitlist",
              text: `Hi ${name},\n\nThanks for joining the Tharom AI waitlist.\n\nI'm Rizwan, and I'm building Tharom AI - a platform where you can train, brand, and monetize your own AI. It works for almost every business use case, and I'll personally look into how it can be implemented for yours:\n\n"${usecase}"\n\nBased on your use case, we'll bring you in for early access - and I'll personally make sure you get in as soon as possible.\n\nThis email went out automatically, but I read every email myself. Reply to this email or write to rizwan@tharom.com anytime.\n\n— Rizwan\nFounder, Tharom AI`,
            }),
          });
        } catch (emailError) {
          // Email is best-effort — don't fail the request if email fails
          // User data is already saved in Google Sheet
          console.error("Resend email failed (non-critical):", emailError);
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      duplicate: sheetData.duplicate || false,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Waitlist Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
