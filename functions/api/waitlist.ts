import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface Env {
  SES_AWS_REGION?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  SES_FROM_EMAIL?: string;
}

export const onRequestPost = async (context: any) => {
  try {
    const request = context.request;
    const body = await request.json() as { name?: string, email?: string };

    if (!body.name || !body.email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, email } = body;

    // Use environment variables for credentials
    const region = context.env.SES_AWS_REGION;
    const accessKeyId = context.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = context.env.AWS_SECRET_ACCESS_KEY;
    const fromEmail = context.env.SES_FROM_EMAIL;

    if (!region || !accessKeyId || !secretAccessKey || !fromEmail) {
      console.error("Missing SES environment variables");
      return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
    }

    const sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // 1. Send notification to Xapproach team
    const notifyCommand = new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: ["hello@xapproach.com"],
        CcAddresses: ["rizwanrko77@gmail.com"],
      },
      Message: {
        Subject: { Data: `New Waitlist Signup: ${name}` },
        Body: {
          Text: { Data: `You have a new waitlist signup!\n\nName: ${name}\nEmail: ${email}` },
        },
      },
    });

    // 2. Send confirmation to User
    const confirmCommand = new SendEmailCommand({
      Source: fromEmail,
      ReplyToAddresses: ["hello@xapproach.com"],
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: { Data: "Welcome to the Xapproach Waitlist!" },
        Body: {
          Text: { Data: `Hi ${name},\n\nThanks for joining the Xapproach waitlist. I'm Rizwan, building Xapproach as AI-as-a-Service, where you can train, brand, and monetize your own AI. Works for schools, clinics, consultants, startups, and a lot more use cases beyond that.\n\nEarly access is going out in batches. I'll personally make sure you get in as soon as possible.\n\nThis email went out automatically, but I read every reply myself. Write back if you want, I'll see it.\n\nRizwan\nTeam, Xapproach` },
          Html: { Data: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <p>Hi ${name},</p>
              <p>Thanks for joining the Xapproach waitlist. I'm Rizwan, building Xapproach as AI-as-a-Service, where you can train, brand, and monetize your own AI. Works for schools, clinics, consultants, startups, and a lot more use cases beyond that.</p>
              <p>Early access is going out in batches. I'll personally make sure you get in as soon as possible.</p>
              <p>This email went out automatically, but I read every reply myself. Write back if you want, I'll see it.</p>
              <br/>
              <p>Rizwan<br/>Team, Xapproach</p>
            </div>
          ` }
        },
      },
    });

    await Promise.all([
      sesClient.send(notifyCommand),
      sesClient.send(confirmCommand)
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    // The AWS SDK SES client throws a DOMParser error in Cloudflare Workers 
    // when trying to parse the XML response, even if the email was successfully sent.
    // If the HTTP status code is 200, the email was sent successfully.
    if (error && error.$metadata && error.$metadata.httpStatusCode === 200) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.error("SES Email Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email. Please try again later." }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
