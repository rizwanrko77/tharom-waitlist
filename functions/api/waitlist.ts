interface Env {
  GOOGLE_SHEET_WEBHOOK_URL?: string;
}

const AI_STATUS_OPTIONS = ["Not yet", "Exploring options", "Yes, already in use"];

export const onRequestPost = async (context: any) => {
  try {
    const request = context.request;
    const body = await request.json() as {
      name?: string;
      email?: string;
      usecase?: string;
      aiStatus?: string;
      aiDetails?: string;
    };

    if (!body.name || !body.email || !body.usecase) {
      return new Response(JSON.stringify({ error: "Name, email, and use case are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email, usecase } = body;

    // Optional: whether they already use AI for this, plus details if they do
    const aiStatus = AI_STATUS_OPTIONS.includes(body.aiStatus ?? "") ? body.aiStatus! : "";
    const aiDetails = aiStatus === "Yes, already in use" ? (body.aiDetails ?? "").slice(0, 1000) : "";

    const webhookUrl = context.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing GOOGLE_SHEET_WEBHOOK_URL environment variable");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Save to Google Sheet (duplicate detection + welcome email handled by App Script)
    const sheetResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, usecase, aiStatus, aiDetails }),
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
