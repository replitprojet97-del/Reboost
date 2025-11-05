import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CardTermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CardTermsDialog({ open, onOpenChange }: CardTermsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]" data-testid="modal-card-terms">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Conditions Générales d'Utilisation - Carte Virtuelle ALTUS</DialogTitle>
          <DialogDescription>
            Dernière mise à jour : Novembre 2025
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-3">1. OBJET ET CHAMP D'APPLICATION</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes conditions générales (ci-après « CGU ») régissent l'utilisation de la carte bancaire virtuelle ALTUS
                (ci-après « la Carte Virtuelle »), proposée par ALTUS Finance Group aux clients titulaires d'un compte ALTUS
                (ci-après « le Titulaire »). La Carte Virtuelle est un moyen de paiement dématérialisé lié à votre compte ALTUS.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">2. DESCRIPTION DU SERVICE</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">2.1 Nature de la Carte Virtuelle</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    La Carte Virtuelle est une carte de paiement dématérialisée comportant un numéro de carte à 16 chiffres,
                    une date d'expiration et un cryptogramme visuel (CVV). Elle fonctionne comme une carte bancaire physique
                    mais existe uniquement sous forme électronique.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">2.2 Type de Carte</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li><strong>Carte virtuelle permanente</strong> : coordonnées fixes pendant toute sa durée de validité (3 ans)</li>
                    <li><strong>Carte virtuelle éphémère</strong> : coordonnées temporaires avec montant et durée paramétrables</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">3. CONDITIONS D'ÉLIGIBILITÉ</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">Pour obtenir une Carte Virtuelle, le Titulaire doit :</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Être client ALTUS avec un compte actif et approvisionné</li>
                <li>Avoir complété la vérification d'identité (KYC)</li>
                <li>Ne pas être en situation de découvert non autorisé</li>
                <li>Avoir activé l'authentification forte (double facteur)</li>
                <li>Accepter les présentes CGU et les Conditions Tarifaires</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">4. ACTIVATION ET UTILISATION</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">4.1 Activation</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    La Carte Virtuelle est activée instantanément dès sa création via l'application ou l'espace client ALTUS.
                    Le Titulaire reçoit immédiatement les coordonnées complètes de la carte.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">4.2 Utilisations autorisées</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Paiements sur tous les sites marchands en ligne acceptant Visa/Mastercard</li>
                    <li>Paiements récurrents et abonnements (carte permanente uniquement)</li>
                    <li>Achats sur sites internationaux</li>
                    <li>Paiements sans contact en magasin (si ajoutée à Apple Pay/Google Pay)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">4.3 Limitations</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Pas de retraits d'espèces aux distributeurs automatiques</li>
                    <li>Présentation physique impossible (location de voiture, certains hôtels)</li>
                    <li>Certains prestataires peuvent refuser les cartes virtuelles</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">5. SÉCURITÉ ET PROTECTION</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">5.1 Sécurité renforcée</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Les coordonnées de votre carte bancaire physique ne sont jamais exposées</li>
                    <li>Possibilité de verrouiller/déverrouiller instantanément la carte</li>
                    <li>Suppression définitive en un clic</li>
                    <li>Protection 3D Secure sur toutes les transactions</li>
                    <li>CVV dynamique pour une sécurité maximale</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">5.2 Obligations du Titulaire</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Le Titulaire s'engage à conserver les coordonnées de sa Carte Virtuelle de manière confidentielle
                    et à ne pas les communiquer à des tiers. En cas de suspicion de fraude, le Titulaire doit immédiatement
                    verrouiller ou supprimer la carte via son espace client.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">5.3 Garanties et assurances</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    La Carte Virtuelle bénéficie des mêmes garanties que votre carte physique, incluant la protection contre
                    la fraude, l'assurance achats et la garantie de livraison conforme.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">6. PLAFONDS ET LIMITES</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed">
                  Les plafonds de paiement de la Carte Virtuelle sont identiques à ceux de votre carte principale ALTUS :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Plafond mensuel : jusqu'à 50 000 € selon votre profil</li>
                  <li>Plafond par transaction : jusqu'à 10 000 €</li>
                  <li>Possibilité d'ajuster temporairement les plafonds depuis l'application</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Pour les cartes éphémères, vous définissez le montant maximum et la durée de validité lors de la création.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">7. TARIFICATION</h3>
              <div className="space-y-2">
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li><strong>Création de carte virtuelle :</strong> Gratuit</li>
                  <li><strong>Frais de transaction en zone euro :</strong> 0%</li>
                  <li><strong>Paiements hors zone euro :</strong> 1,5% du montant</li>
                  <li><strong>Cotisation annuelle :</strong> Gratuit</li>
                  <li><strong>Verrouillage/Déverrouillage :</strong> Gratuit et illimité</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">8. DÉBIT ET RELEVÉ</h3>
              <p className="text-muted-foreground leading-relaxed">
                Toutes les opérations effectuées avec la Carte Virtuelle sont débitées en temps réel sur votre compte ALTUS.
                Elles apparaissent immédiatement dans votre historique de transactions et sur vos relevés mensuels.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">9. OPPOSITION ET RÉSILIATION</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">9.1 Verrouillage temporaire</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Vous pouvez verrouiller votre Carte Virtuelle à tout moment depuis votre espace client.
                    Le déverrouillage est instantané.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">9.2 Suppression définitive</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    La suppression d'une Carte Virtuelle est immédiate et irréversible. Les abonnements liés à cette carte
                    seront automatiquement refusés. Il est recommandé de mettre à jour vos informations de paiement chez
                    les commerçants concernés avant suppression.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">9.3 En cas de fraude</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    En cas de perte ou vol présumé des coordonnées, supprimez immédiatement la carte depuis votre application
                    et contactez notre service client au +33 1 XX XX XX XX (disponible 24h/24, 7j/7).
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">10. RESPONSABILITÉ</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                ALTUS ne pourra être tenu responsable en cas de :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Refus d'un commerçant d'accepter la Carte Virtuelle</li>
                <li>Interruption temporaire du service pour maintenance</li>
                <li>Utilisation frauduleuse résultant d'une négligence du Titulaire</li>
                <li>Litiges commerciaux entre le Titulaire et un commerçant</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Le Titulaire est entièrement responsable de l'utilisation de sa Carte Virtuelle et des opérations effectuées
                jusqu'à la notification d'une utilisation frauduleuse.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">11. DURÉE ET MODIFICATION</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes CGU sont conclues pour une durée indéterminée. ALTUS se réserve le droit de modifier
                les présentes CGU à tout moment. Toute modification sera notifiée au Titulaire au moins 2 mois avant
                son entrée en vigueur. L'absence d'opposition dans ce délai vaudra acceptation.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">12. RÉCLAMATIONS</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute réclamation, le Titulaire peut contacter le service client ALTUS :
              </p>
              <ul className="list-none text-muted-foreground space-y-1 ml-2 mt-2">
                <li>• Par email : support@altusgroup.com</li>
                <li>• Par téléphone : +33 1 XX XX XX XX</li>
                <li>• Via l'espace client sécurisé</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                En l'absence de réponse satisfaisante dans un délai de 2 mois, le Titulaire peut saisir le Médiateur de l'AMF.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="font-semibold text-lg mb-3">13. DROIT APPLICABLE ET JURIDICTION</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou exécution
                relève de la compétence exclusive des tribunaux français.
              </p>
            </section>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Note importante :</strong> En activant votre Carte Virtuelle ALTUS, vous reconnaissez avoir lu,
                compris et accepté l'intégralité des présentes Conditions Générales d'Utilisation.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}