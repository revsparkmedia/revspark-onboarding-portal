import { isTestMode, getTestClinicEmail } from './test-mode';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const recipient = isTestMode() ? getTestClinicEmail() : params.to;

  // TODO: integrate real email provider (Resend, SendGrid, etc.)
  // For now, log the email to the console
  console.log('=== EMAIL ===');
  console.log(`To: ${recipient}`);
  console.log(`Subject: ${params.subject}`);
  console.log(`Body: ${params.html}`);
  console.log('=============');
}

export async function sendMagicLinkEmail(
  to: string,
  magicLink: string,
  clinicName: string
): Promise<void> {
  await sendEmail({
    to,
    subject: `Your RevSpark Onboarding Portal — ${clinicName}`,
    html: `
      <h2>Welcome to RevSpark!</h2>
      <p>Your onboarding portal for <strong>${clinicName}</strong> is ready.</p>
      <p><a href="${magicLink}">Click here to access your portal</a></p>
      <p>This link expires in 7 days.</p>
    `,
  });
}
