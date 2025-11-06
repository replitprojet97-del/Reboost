import sgMail from '@sendgrid/mail';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function getCredentials() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const email = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !email) {
    throw new Error('SendGrid configuration missing: SENDGRID_API_KEY and SENDGRID_FROM_EMAIL must be set');
  }

  return { apiKey, email };
}

async function getUncachableSendGridClient() {
  const { apiKey, email } = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL;
  }
  return process.env.REPLIT_DEV_DOMAIN 
    ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
    : 'http://localhost:5000';
}

export async function sendVerificationEmail(toEmail: string, fullName: string, token: string, accountType: string, language: string = 'fr') {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const { getEmailTemplate } = await import('./emailTemplates');
    
    const verificationUrl = `${getBaseUrl()}/verify/${token}`;
    const accountTypeText = accountType === 'personal' ? 'personal' : 'business';
    
    const template = getEmailTemplate('verification', language as any, {
      fullName,
      verificationUrl,
      accountTypeText,
    });
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    await client.send(msg);
    console.log(`Verification email sent to ${toEmail} in ${language}`);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(toEmail: string, fullName: string, accountType: string, language: string = 'fr') {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const { getEmailTemplate } = await import('./emailTemplates');
    
    const accountTypeText = accountType === 'personal' ? 'personal' : 'business';
    const loginUrl = `${getBaseUrl()}/login`;
    
    const template = getEmailTemplate('welcome', language as any, {
      fullName,
      accountTypeText,
      loginUrl,
    });
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    await client.send(msg);
    console.log(`Welcome email sent to ${toEmail} in ${language}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

export async function sendContractEmail(toEmail: string, fullName: string, loanId: string, amount: string, contractUrl: string, language: string = 'fr') {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const { getEmailTemplate } = await import('./emailTemplates');
    
    const fullContractUrl = `${getBaseUrl()}${contractUrl}`;
    
    const template = getEmailTemplate('contract', language as any, {
      fullName,
      amount,
      loanId,
      contractUrl: fullContractUrl,
      fromEmail,
    });
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    await client.send(msg);
    console.log(`Contract email sent to ${toEmail} in ${language}`);
    return true;
  } catch (error) {
    console.error('Error sending contract email:', error);
    throw error;
  }
}
