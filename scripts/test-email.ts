import { sendContractEmail } from '../server/email';

async function test() {
  const testEmail = process.env.ADMIN_EMAIL || 'test@solventisgroup.org';
  console.log(`[Test] Tentative d'envoi d'un mail de contrat de test à : ${testEmail}`);
  
  try {
    await sendContractEmail(
      testEmail,
      'Jean Dupont (Test)',
      'LOAN-TEST-123',
      '50000',
      'https://solventisgroup.org/dashboard',
      'fr'
    );
    console.log('[Test] Mail envoyé avec succès !');
  } catch (error) {
    console.error('[Test] Échec de l\'envoi :', error);
  }
}

test();
