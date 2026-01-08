
import axios from 'axios';

const SENDPULSE_API_URL = 'https://api.sendpulse.com';

interface SendPulseTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SENDPULSE_API_ID;
  const clientSecret = process.env.SENDPULSE_API_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('SendPulse configuration missing: SENDPULSE_API_ID and SENDPULSE_API_SECRET must be set');
  }

  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && now < tokenExpiry - 60) {
    return cachedToken;
  }

  try {
    const response = await axios.post<SendPulseTokenResponse>(`${SENDPULSE_API_URL}/oauth/access_token`, {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    });

    cachedToken = response.data.access_token;
    tokenExpiry = now + response.data.expires_in;
    return cachedToken;
  } catch (error: any) {
    console.error('Error fetching SendPulse access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with SendPulse');
  }
}

export async function sendTransactionalEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Array<{
    content: string;
    filename: string;
    type: string;
  }>;
}) {
  const accessToken = await getAccessToken();
  const fromEmail = process.env.SENDPULSE_FROM_EMAIL || 'noreply@solventisgroup.org';
  const fromName = process.env.SENDPULSE_FROM_NAME || 'Solventis Group';

  const emailData: any = {
    email: {
      subject: options.subject,
      html: Buffer.from(options.html).toString('base64'),
      text: options.text,
      from: {
        name: fromName,
        email: fromEmail,
      },
      to: [
        {
          email: options.to,
        },
      ],
    },
  };

  if (options.attachments && options.attachments.length > 0) {
    emailData.email.attachments_binary = options.attachments.reduce((acc: any, att) => {
      acc[att.filename] = att.content;
      return acc;
    }, {});
  }

  try {
    await axios.post(`${SENDPULSE_API_URL}/smtp/emails`, emailData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return true;
  } catch (error: any) {
    console.error('Error sending SendPulse transactional email:', error.response?.data || error.message);
    throw error;
  }
}

function getBaseUrl(): string {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL;
  }
  return process.env.REPLIT_DEV_DOMAIN 
    ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
    : 'http://localhost:5000';
}

export async function sendVerificationEmail(toEmail: string, fullName: string, token: string, accountType: string, language: string = 'fr') {
  try {
    const { getEmailTemplate } = await import('./emailTemplates');
    const verificationUrl = `${getBaseUrl()}/verify/${token}`;
    const accountTypeText = accountType === 'personal' ? 'personal' : 'business';
    
    const template = getEmailTemplate('verification', language as any, {
      fullName,
      verificationUrl,
      accountTypeText,
    });
    
    await sendTransactionalEmail({
      to: toEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.log(`Verification email sent to ${toEmail} using SendPulse`);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(toEmail: string, fullName: string, accountType: string, language: string = 'fr') {
  try {
    const { getEmailTemplate } = await import('./emailTemplates');
    const accountTypeText = accountType === 'personal' ? 'personal' : 'business';
    const loginUrl = `${getBaseUrl()}/login`;
    
    const template = getEmailTemplate('welcome', language as any, {
      fullName,
      accountTypeText,
      loginUrl,
    });
    
    await sendTransactionalEmail({
      to: toEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.log(`Welcome email sent to ${toEmail} using SendPulse`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

export async function sendContractEmail(toEmail: string, fullName: string, loanId: string, amount: string, contractUrl: string, language: string = 'fr') {
  try {
    const { getEmailTemplate } = await import('./emailTemplates');
    const dashboardUrl = `${getBaseUrl()}/contracts`;
    const fromEmail = process.env.SENDPULSE_FROM_EMAIL || 'noreply@solventisgroup.org';
    
    const template = getEmailTemplate('contract', language as any, {
      fullName,
      amount,
      loanId,
      dashboardUrl,
      fromEmail,
    });
    
    await sendTransactionalEmail({
      to: toEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.log(`Contract email sent to ${toEmail} using SendPulse`);
    return true;
  } catch (error) {
    console.error('Error sending contract email:', error);
    throw error;
  }
}

export async function sendResetPasswordEmail(toEmail: string, fullName: string, token: string, language: string = 'fr') {
  try {
    const resetUrl = `${getBaseUrl()}/reset-password/${token}`;
    const logoUrl = 'https://solventisgroup.org/logo.png';
    const currentYear = new Date().getFullYear();
    
    const subject = language === 'en' 
      ? 'Reset your password - SOLVENTIS GROUP'
      : 'Réinitialisez votre mot de passe - SOLVENTIS GROUP';
    
    const html = `
<!DOCTYPE html>
<html lang="\${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SOLVENTIS GROUP</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" bgcolor="#f4f4f4">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden;">
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #c9a227 100%); padding: 30px;">
              <img src="\${logoUrl}" alt="SolventisGroup" width="180" />
              <h1 style="color: #ffffff; margin-top: 15px;">\${language === 'en' ? 'Password Reset' : 'Réinitialisation du mot de passe'}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p>Bonjour <strong>\${fullName}</strong>,</p>
              <p>\${language === 'en' ? 'Click the button below to reset your password:' : 'Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :'}</p>
              <div align="center" style="margin: 30px 0;">
                <a href="\${resetUrl}" style="background: #2563eb; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                  \${language === 'en' ? 'Reset Password' : 'Réinitialiser mon mot de passe'}
                </a>
              </div>
              <p style="font-size: 12px; color: #6b7280;">\${resetUrl}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 12px; color: #64748b;">&copy; \${currentYear} SOLVENTIS GROUP</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    
    const text = `Bonjour \${fullName}, visitez ce lien pour réinitialiser votre mot de passe: \${resetUrl}`;
    
    await sendTransactionalEmail({
      to: toEmail,
      subject,
      html,
      text,
    });

    console.log(`Reset password email sent to \${toEmail} using SendPulse`);
    return true;
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw error;
  }
}

export async function sendContactFormEmail(name: string, email: string, phone: string, message: string) {
  try {
    const fromEmail = process.env.SENDPULSE_FROM_EMAIL || 'noreply@solventisgroup.org';
    const subject = \`Nouveau message de contact - \${name}\`;
    
    const html = \`<p>Nom: \${name}</p><p>Email: \${email}</p><p>Téléphone: \${phone}</p><p>Message: \${message}</p>\`;
    const text = \`Nouveau message de contact\\nNom: \${name}\\nEmail: \${email}\\nMessage: \${message}\`;
    
    await sendTransactionalEmail({
      to: fromEmail,
      subject,
      html,
      text,
    });

    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
}

export async function sendLoanRequestUserEmail(toEmail: string, fullName: string, loanType: string, amount: string, reference: string, language: string = 'fr') {
  try {
    const { getEmailTemplate } = await import('./emailTemplates');
    const dashboardUrl = \`\${getBaseUrl()}/dashboard\`;
    const template = getEmailTemplate('loanRequestUser', language as any, { fullName, loanType, amount, reference, dashboardUrl });
    
    await sendTransactionalEmail({ to: toEmail, subject: template.subject, html: template.html, text: template.text });
    return true;
  } catch (error) {
    console.error('Error sending loan request user email:', error);
    throw error;
  }
}

export async function sendLoanRequestAdminEmail(fullName: string, email: string, phone: string | null, accountType: string, amount: string, duration: number, loanType: string, reference: string, userId: string, documents: any[], language: string = 'fr') {
  try {
    const fromEmail = process.env.SENDPULSE_FROM_EMAIL || 'noreply@solventisgroup.org';
    const adminEmail = process.env.ADMIN_EMAIL || fromEmail;
    const { getEmailTemplate } = await import('./emailTemplates');
    const reviewUrl = \`\${getBaseUrl()}/admin/loans/\${reference}\`;
    const template = getEmailTemplate('loanRequestAdmin', language as any, { fullName, email, phone, accountType, amount, duration, loanType, reference, userId, reviewUrl, documents });
    
    await sendTransactionalEmail({ to: adminEmail, subject: template.subject, html: template.html, text: template.text });
    return true;
  } catch (error) {
    console.error('Error sending loan request admin notification:', error);
    throw error;
  }
}
