import { db } from "../db";
import { transfers } from "@shared/schema";
import { desc, sql } from "drizzle-orm";

/**
 * Génère un numéro de référence unique pour un transfert avec protection contre la concurrence
 * Format: TRF-YYMMDD-XXXX
 * Ex: TRF-241120-0001
 * 
 * IMPORTANT: Cette fonction doit être appelée dans une transaction pour éviter
 * les problèmes de concurrence. En cas d'échec de contrainte UNIQUE, la transaction
 * sera annulée et devra être retentée par l'appelant.
 */
export async function generateTransferReference(tx?: any): Promise<string> {
  const dbClient = tx || db;
  const now = new Date();
  
  // Format date YYMMDD
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;
  
  // Récupérer la dernière référence du jour avec verrouillage FOR UPDATE
  // pour éviter que deux transactions lisent la même valeur
  const todayPattern = `TRF-${datePrefix}-%`;
  
  const lastTransfer = await dbClient
    .select({ referenceNumber: transfers.referenceNumber })
    .from(transfers)
    .where(sql`${transfers.referenceNumber} LIKE ${todayPattern}`)
    .orderBy(desc(transfers.referenceNumber))
    .limit(1)
    .for('update'); // FOR UPDATE pour verrouiller et faire attendre les transactions concurrentes
  
  let sequence = 1;
  
  if (lastTransfer.length > 0 && lastTransfer[0].referenceNumber) {
    // Extraire le numéro de séquence de la dernière référence
    const parts = lastTransfer[0].referenceNumber.split('-');
    if (parts.length === 3) {
      const lastSequence = parseInt(parts[2], 10);
      if (!isNaN(lastSequence)) {
        sequence = lastSequence + 1;
      }
    }
  }
  
  // Format: TRF-YYMMDD-XXXX (avec padding de 4 chiffres)
  const sequenceStr = sequence.toString().padStart(4, '0');
  return `TRF-${datePrefix}-${sequenceStr}`;
}

/**
 * Génère un numéro de référence avec retry automatique en cas de conflit
 * Utilisé pour les appels hors transaction
 */
export async function generateTransferReferenceWithRetry(maxRetries: number = 3): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await db.transaction(async (tx) => {
        return await generateTransferReference(tx);
      });
    } catch (error: any) {
      // Si c'est une erreur de contrainte UNIQUE et qu'il reste des tentatives, réessayer
      if (error?.code === '23505' && attempt < maxRetries - 1) {
        // Attendre un petit moment aléatoire avant de réessayer (10-50ms)
        await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 40));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Impossible de générer un numéro de référence unique après plusieurs tentatives');
}
