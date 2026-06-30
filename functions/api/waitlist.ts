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
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: { Data: "Welcome to the Xapproach Waitlist!" },
        Body: {
          Text: { Data: `Hi ${name},\n\nThanks for joining the Xapproach waitlist — you're in.\n\nWe're building Xapproach as AI as a Service: train your own AI on your content, brand it as yours, and put it to work for your business — whether you're running a school, a clinic, a consultancy, or a startup.\n\nWe'll reach out personally as we get closer to launch, with early access ahead of everyone else.\n\nTalk soon,\nThe Xapproach Team` },
          Html: { Data: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <p>Hi ${name},</p>
              <p>Thanks for joining the Xapproach waitlist — you're in.</p>
              <p>We're building Xapproach as AI as a Service: train your own AI on your content, brand it as yours, and put it to work for your business — whether you're running a school, a clinic, a consultancy, or a startup.</p>
              <p>We'll reach out personally as we get closer to launch, with early access ahead of everyone else.</p>
              <br/>
              <p>Talk soon,<br/>The Xapproach Team</p>
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
