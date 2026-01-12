import {
  notifyLoanRequest,
  notifyLoanApproved as notifyLoanApprovedInternal,
  notifyTransferInitiated,
  notifyAdminsNewLoanRequest,
  notifyAdminsNewTransfer,
  notifyAdminsNewKycDocument,
} from './notification-helper';
import {
  sendLoanRequestUserEmail,
  sendLoanRequestAdminEmail,
  sendKYCUploadedAdminEmail,
  sendLoanApprovedEmail,
  sendTransferInitiatedAdminEmail,
  sendTransferCodeEmail,
  type DocumentInfo,
} from './email';
import type { Language } from './emailTemplates';

interface LoanRequestNotificationParams {
  userId: string;
  loanId: string;
  amount: string;
  loanType: string;
  userFullName: string;
  userEmail: string;
  userPhone: string | null;
  accountType: string;
  duration: number;
  reference: string;
  documents: Array<{
    buffer: Buffer;
    fileName: string;
    mimeType: string;
  }>;
  language: Language;
}

interface KycUploadNotificationParams {
  userId: string;
  userFullName: string;
  userEmail: string;
  documentType: string;
  loanType: string;
  language: Language;
}

interface LoanApprovalNotificationParams {
  userId: string;
  loanId: string;
  amount: string;
  loanType: string;
  userFullName: string;
  userEmail: string;
  reference: string;
  language: Language;
}

interface TransferInitiationNotificationParams {
  userId: string;
  transferId: string;
  amount: string;
  recipient: string;
  userFullName: string;
  userEmail: string;
  language: Language;
}

interface TransferCodeNotificationParams {
  userId: string;
  transferId: string;
  amount: string;
  recipient: string;
  code: string;
  codeSequence: number;
  totalCodes: number;
  userFullName: string;
  userEmail: string;
  language: Language;
}

async function executeMultiChannel(
  channels: Array<() => Promise<unknown>>,
  eventName: string
): Promise<void> {
  const results = await Promise.allSettled(channels.map(fn => fn()));
  
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`[${eventName}] Channel ${index + 1} failed:`, result.reason);
    }
  });
  
  const criticalFailures = results.filter(r => r.status === 'rejected');
  if (criticalFailures.length === results.length) {
    const error = new Error(`[${eventName}] All notification channels failed`);
    console.error(error.message);
    throw error;
  }
}

export async function loanRequestNotification(params: LoanRequestNotificationParams): Promise<void> {
  await executeMultiChannel(
    [
      () => notifyLoanRequest(params.userId, params.loanId, params.amount, params.loanType),
      () => sendLoanRequestUserEmail(
        params.userEmail,
        params.userFullName,
        params.loanType,
        params.amount,
        params.reference,
        params.language
      ),
    ],
    'loanRequestNotification'
  );
}

import { compressDocument } from './compression';

export async function loanRequestAdminNotification(params: LoanRequestNotificationParams): Promise<void> {
  console.log(`[Notification] Triggering loanRequestAdminNotification for loan ${params.loanId}`);
  
  // Compresser les documents avant l'envoi pour éviter l'erreur "Message size limit exceeded"
  const compressedDocs = await Promise.all(
    params.documents.map(async (doc) => {
      try {
        const { buffer, mimeType } = await compressDocument(doc.buffer, doc.mimeType, doc.fileName);
        return {
          ...doc,
          buffer,
          mimeType
        };
      } catch (err) {
        console.error(`[Notification] Failed to compress ${doc.fileName}, using original:`, err);
        return doc;
      }
    })
  );

  await executeMultiChannel(
    [
      () => notifyAdminsNewLoanRequest(
        params.userId,
        params.userFullName,
        params.loanId,
        params.amount,
        params.loanType
      ),
      () => sendLoanRequestAdminEmail(
        params.userFullName,
        params.userEmail,
        params.userPhone,
        params.accountType,
        params.amount,
        params.duration,
        params.loanType,
        params.reference,
        params.userId,
        compressedDocs,
        'fr'
      ),
    ],
    'loanRequestAdminNotification'
  );
}

export async function kycUploadAdminNotification(params: KycUploadNotificationParams): Promise<void> {
  await executeMultiChannel(
    [
      () => notifyAdminsNewKycDocument(
        params.userId,
        params.userFullName,
        params.documentType,
        params.loanType
      ),
      () => sendKYCUploadedAdminEmail(
        params.userFullName,
        params.userEmail,
        params.documentType,
        params.loanType,
        params.userId,
        'fr'
      ),
    ],
    'kycUploadAdminNotification'
  );
}

export async function loanApprovalNotification(params: LoanApprovalNotificationParams): Promise<void> {
  await executeMultiChannel(
    [
      () => notifyLoanApprovedInternal(params.userId, params.loanId, params.amount),
      () => sendLoanApprovedEmail(
        params.userEmail,
        params.userFullName,
        params.loanType,
        params.amount,
        params.reference,
        params.language
      ),
    ],
    'loanApprovalNotification'
  );
}

export async function transferInitiationNotification(params: TransferInitiationNotificationParams): Promise<void> {
  await executeMultiChannel(
    [
      () => notifyTransferInitiated(params.userId, params.transferId, params.amount, params.recipient),
    ],
    'transferInitiationNotification'
  );
}

export async function transferInitiationAdminNotification(params: TransferInitiationNotificationParams): Promise<void> {
  await executeMultiChannel(
    [
      () => notifyAdminsNewTransfer(
        params.userId,
        params.userFullName,
        params.transferId,
        params.amount,
        params.recipient
      ),
      () => sendTransferInitiatedAdminEmail(
        params.userFullName,
        params.userEmail,
        params.amount,
        params.recipient,
        params.transferId,
        params.userId,
        'fr'
      ),
    ],
    'transferInitiationAdminNotification'
  );
}

export async function transferCodeNotification(params: TransferCodeNotificationParams): Promise<void> {
  await executeMultiChannel(
    [
      () => sendTransferCodeEmail(
        params.userEmail,
        params.userFullName,
        params.amount,
        params.recipient,
        params.code,
        params.codeSequence,
        params.totalCodes,
        params.language
      ),
    ],
    'transferCodeNotification'
  );
}
