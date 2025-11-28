import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Building2, 
  Globe, 
  Shield, 
  Clock, 
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Euro,
  DollarSign,
  Banknote,
  Lock,
  User,
  MapPin,
  Hash
} from "lucide-react";

type TransferType = "sepa" | "swift" | null;

interface TransferData {
  type: TransferType;
  beneficiaryName: string;
  beneficiaryAddress: string;
  beneficiaryCountry: string;
  iban: string;
  bic: string;
  bankName: string;
  bankAddress: string;
  amount: string;
  currency: string;
  reference: string;
  motif: string;
  urgency: string;
  fraisOption: string;
}

interface PaymentStep {
  id: string;
  name: string;
  description: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "current";
}

const initialTransferData: TransferData = {
  type: null,
  beneficiaryName: "",
  beneficiaryAddress: "",
  beneficiaryCountry: "",
  iban: "",
  bic: "",
  bankName: "",
  bankAddress: "",
  amount: "",
  currency: "EUR",
  reference: "",
  motif: "",
  urgency: "standard",
  fraisOption: "SHA",
};

const sepaCountries = [
  "Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre", "Croatie", 
  "Danemark", "Espagne", "Estonie", "Finlande", "France", "Grèce", 
  "Hongrie", "Irlande", "Italie", "Lettonie", "Lituanie", "Luxembourg",
  "Malte", "Pays-Bas", "Pologne", "Portugal", "République tchèque", 
  "Roumanie", "Slovaquie", "Slovénie", "Suède"
];

const swiftCountries = [
  "États-Unis", "Royaume-Uni", "Suisse", "Canada", "Australie", "Japon",
  "Chine", "Singapour", "Hong Kong", "Émirats arabes unis", "Brésil",
  "Mexique", "Inde", "Afrique du Sud", "Russie", "Corée du Sud"
];

export default function TransferDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [transferData, setTransferData] = useState<TransferData>(initialTransferData);
  const [paymentSteps, setPaymentSteps] = useState<PaymentStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPaymentStep, setCurrentPaymentStep] = useState(0);

  const totalSteps = 6;

  const updateTransferData = (field: keyof TransferData, value: string) => {
    setTransferData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFees = () => {
    const amount = parseFloat(transferData.amount) || 0;
    const isSepa = transferData.type === "sepa";
    const isUrgent = transferData.urgency === "urgent";

    if (isSepa) {
      const baseFee = amount > 50000 ? 15 : (amount > 10000 ? 8 : 2.50);
      const urgentFee = isUrgent ? 25 : 0;
      return {
        baseFee,
        urgentFee,
        processingFee: 0,
        correspondentFee: 0,
        total: baseFee + urgentFee
      };
    } else {
      const baseFee = 35;
      const urgentFee = isUrgent ? 50 : 0;
      const processingFee = amount * 0.001;
      const correspondentFee = transferData.fraisOption === "OUR" ? 25 : 0;
      return {
        baseFee,
        urgentFee,
        processingFee: Math.min(processingFee, 150),
        correspondentFee,
        total: baseFee + urgentFee + Math.min(processingFee, 150) + correspondentFee
      };
    }
  };

  const generatePaymentSteps = (): PaymentStep[] => {
    const amount = parseFloat(transferData.amount) || 0;
    const fees = calculateFees();
    const isSwift = transferData.type === "swift";

    if (isSwift && amount > 50000) {
      return [
        {
          id: "step1",
          name: "Frais de traitement",
          description: "Frais bancaires et de traitement SWIFT",
          amount: fees.total,
          status: "pending"
        },
        {
          id: "step2",
          name: "Premier versement (40%)",
          description: "Première tranche du virement",
          amount: amount * 0.4,
          status: "pending"
        },
        {
          id: "step3",
          name: "Deuxième versement (30%)",
          description: "Deuxième tranche du virement",
          amount: amount * 0.3,
          status: "pending"
        },
        {
          id: "step4",
          name: "Solde final (30%)",
          description: "Dernière tranche et confirmation",
          amount: amount * 0.3,
          status: "pending"
        }
      ];
    } else if (amount > 10000) {
      return [
        {
          id: "step1",
          name: "Frais de traitement",
          description: `Frais bancaires ${isSwift ? 'SWIFT' : 'SEPA'}`,
          amount: fees.total,
          status: "pending"
        },
        {
          id: "step2",
          name: "Premier versement (50%)",
          description: "Première moitié du montant",
          amount: amount * 0.5,
          status: "pending"
        },
        {
          id: "step3",
          name: "Solde final (50%)",
          description: "Seconde moitié et confirmation",
          amount: amount * 0.5,
          status: "pending"
        }
      ];
    } else {
      return [
        {
          id: "step1",
          name: "Paiement unique",
          description: `Montant total + frais ${isSwift ? 'SWIFT' : 'SEPA'}`,
          amount: amount + fees.total,
          status: "pending"
        }
      ];
    }
  };

  const handleNext = () => {
    if (currentStep === 5) {
      setPaymentSteps(generatePaymentSteps());
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processPaymentStep = async (stepIndex: number) => {
    setIsProcessing(true);
    setCurrentPaymentStep(stepIndex);

    setPaymentSteps(prev => prev.map((step, idx) => ({
      ...step,
      status: idx === stepIndex ? "processing" : step.status
    })));

    await new Promise(resolve => setTimeout(resolve, 2000));

    setPaymentSteps(prev => prev.map((step, idx) => ({
      ...step,
      status: idx === stepIndex ? "completed" : (idx === stepIndex + 1 ? "current" : step.status)
    })));

    setIsProcessing(false);

    if (stepIndex === paymentSteps.length - 1) {
      setCurrentStep(7);
    }
  };

  const formatCurrency = (amount: number, currency: string = "EUR") => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getProgressPercentage = () => {
    return ((currentStep - 1) / (totalSteps - 1)) * 100;
  };

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: "Type" },
      { num: 2, label: "Bénéficiaire" },
      { num: 3, label: "Banque" },
      { num: 4, label: "Montant" },
      { num: 5, label: "Vérification" },
      { num: 6, label: "Paiement" },
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all
                ${currentStep > step.num 
                  ? "bg-green-500 text-white" 
                  : currentStep === step.num 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"}
              `}>
                {currentStep > step.num ? <Check className="w-5 h-5" /> : step.num}
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-12 lg:w-24 h-1 mx-2 rounded ${
                  currentStep > step.num ? "bg-green-500" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          {steps.map(step => (
            <span key={step.num} className="hidden sm:inline">{step.label}</span>
          ))}
        </div>
        <Progress value={getProgressPercentage()} className="mt-4" />
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choisissez le type de virement</h2>
        <p className="text-muted-foreground">Sélectionnez le mode de transfert adapté à votre besoin</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className={`cursor-pointer transition-all hover-elevate ${
            transferData.type === "sepa" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => updateTransferData("type", "sepa")}
          data-testid="card-sepa-option"
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Euro className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Virement SEPA</CardTitle>
                <CardDescription>Zone Euro uniquement</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>Délai: 1-2 jours ouvrés</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Banknote className="w-4 h-4 text-muted-foreground" />
              <span>Frais: 0€ - 15€</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span>27 pays européens</span>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs">Gratuit jusqu'à 10 000€</Badge>
              <Badge variant="secondary" className="text-xs">IBAN requis</Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover-elevate ${
            transferData.type === "swift" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => updateTransferData("type", "swift")}
          data-testid="card-swift-option"
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Virement SWIFT</CardTitle>
                <CardDescription>International</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>Délai: 2-5 jours ouvrés</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Banknote className="w-4 h-4 text-muted-foreground" />
              <span>Frais: 35€ - 150€+</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span>200+ pays</span>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs">Multi-devises</Badge>
              <Badge variant="secondary" className="text-xs">BIC/SWIFT requis</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {transferData.type && (
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">
                  {transferData.type === "sepa" ? "Virement SEPA sélectionné" : "Virement SWIFT sélectionné"}
                </p>
                <p className="text-muted-foreground">
                  {transferData.type === "sepa" 
                    ? "Idéal pour les transferts en euros vers les pays de la zone SEPA. Rapide et économique."
                    : "Recommandé pour les transferts internationaux hors zone euro. Support multi-devises."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Informations du bénéficiaire</h2>
        <p className="text-muted-foreground">Renseignez les coordonnées du destinataire</p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="beneficiaryName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nom complet du bénéficiaire
          </Label>
          <Input
            id="beneficiaryName"
            placeholder="Jean Dupont ou Société SARL"
            value={transferData.beneficiaryName}
            onChange={(e) => updateTransferData("beneficiaryName", e.target.value)}
            data-testid="input-beneficiary-name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="beneficiaryAddress" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Adresse complète
          </Label>
          <Input
            id="beneficiaryAddress"
            placeholder="123 Rue de Paris, 75001 Paris"
            value={transferData.beneficiaryAddress}
            onChange={(e) => updateTransferData("beneficiaryAddress", e.target.value)}
            data-testid="input-beneficiary-address"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="beneficiaryCountry" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Pays du bénéficiaire
          </Label>
          <Select 
            value={transferData.beneficiaryCountry} 
            onValueChange={(value) => updateTransferData("beneficiaryCountry", value)}
          >
            <SelectTrigger data-testid="select-beneficiary-country">
              <SelectValue placeholder="Sélectionner un pays" />
            </SelectTrigger>
            <SelectContent>
              {(transferData.type === "sepa" ? sepaCountries : [...sepaCountries, ...swiftCountries]).map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="grid gap-2">
          <Label htmlFor="iban" className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            IBAN
          </Label>
          <Input
            id="iban"
            placeholder="FR76 1234 5678 9012 3456 7890 123"
            value={transferData.iban}
            onChange={(e) => updateTransferData("iban", e.target.value.toUpperCase())}
            className="font-mono"
            data-testid="input-iban"
          />
          <p className="text-xs text-muted-foreground">
            International Bank Account Number - Format: 2 lettres + 2 chiffres + jusqu'à 30 caractères
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bic" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            BIC / SWIFT
          </Label>
          <Input
            id="bic"
            placeholder="BNPAFRPP"
            value={transferData.bic}
            onChange={(e) => updateTransferData("bic", e.target.value.toUpperCase())}
            className="font-mono"
            data-testid="input-bic"
          />
          <p className="text-xs text-muted-foreground">
            Bank Identifier Code - 8 ou 11 caractères
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Banque du bénéficiaire</h2>
        <p className="text-muted-foreground">Informations sur l'établissement bancaire</p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="bankName" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Nom de la banque
          </Label>
          <Input
            id="bankName"
            placeholder="BNP Paribas"
            value={transferData.bankName}
            onChange={(e) => updateTransferData("bankName", e.target.value)}
            data-testid="input-bank-name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bankAddress" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Adresse de la banque
          </Label>
          <Input
            id="bankAddress"
            placeholder="16 Boulevard des Italiens, 75009 Paris, France"
            value={transferData.bankAddress}
            onChange={(e) => updateTransferData("bankAddress", e.target.value)}
            data-testid="input-bank-address"
          />
        </div>

        {transferData.type === "swift" && (
          <>
            <Separator />
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-3">Banque intermédiaire (optionnel)</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Pour certains pays, une banque correspondante peut être nécessaire pour le routage du virement.
                </p>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="intermediaryBank">Nom de la banque intermédiaire</Label>
                    <Input
                      id="intermediaryBank"
                      placeholder="JP Morgan Chase"
                      data-testid="input-intermediary-bank"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="intermediarySwift">SWIFT intermédiaire</Label>
                    <Input
                      id="intermediarySwift"
                      placeholder="CHASUS33"
                      className="font-mono"
                      data-testid="input-intermediary-swift"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => {
    const fees = calculateFees();
    const amount = parseFloat(transferData.amount) || 0;

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Montant et options</h2>
          <p className="text-muted-foreground">Définissez le montant et les options du virement</p>
        </div>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                Montant à transférer
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="10000.00"
                value={transferData.amount}
                onChange={(e) => updateTransferData("amount", e.target.value)}
                className="text-lg font-semibold"
                data-testid="input-amount"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currency" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Devise
              </Label>
              <Select 
                value={transferData.currency} 
                onValueChange={(value) => updateTransferData("currency", value)}
              >
                <SelectTrigger data-testid="select-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  {transferData.type === "swift" && (
                    <>
                      <SelectItem value="USD">USD - Dollar américain</SelectItem>
                      <SelectItem value="GBP">GBP - Livre sterling</SelectItem>
                      <SelectItem value="CHF">CHF - Franc suisse</SelectItem>
                      <SelectItem value="JPY">JPY - Yen japonais</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reference" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Référence / Communication
            </Label>
            <Input
              id="reference"
              placeholder="Facture N°2024-001 / Paiement contrat"
              value={transferData.reference}
              onChange={(e) => updateTransferData("reference", e.target.value)}
              data-testid="input-reference"
            />
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Délai de traitement
            </Label>
            <RadioGroup 
              value={transferData.urgency} 
              onValueChange={(value) => updateTransferData("urgency", value)}
              className="grid grid-cols-2 gap-4"
            >
              <Label 
                htmlFor="standard" 
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                  transferData.urgency === "standard" ? "border-primary bg-primary/5" : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <div>
                    <p className="font-medium">Standard</p>
                    <p className="text-sm text-muted-foreground">
                      {transferData.type === "sepa" ? "1-2 jours" : "2-5 jours"}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Inclus</Badge>
              </Label>
              <Label 
                htmlFor="urgent" 
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                  transferData.urgency === "urgent" ? "border-primary bg-primary/5" : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <div>
                    <p className="font-medium">Express</p>
                    <p className="text-sm text-muted-foreground">
                      {transferData.type === "sepa" ? "Même jour" : "1-2 jours"}
                    </p>
                  </div>
                </div>
                <Badge>+{transferData.type === "sepa" ? "25" : "50"}€</Badge>
              </Label>
            </RadioGroup>
          </div>

          {transferData.type === "swift" && (
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Répartition des frais
              </Label>
              <RadioGroup 
                value={transferData.fraisOption} 
                onValueChange={(value) => updateTransferData("fraisOption", value)}
                className="grid grid-cols-3 gap-4"
              >
                <Label 
                  htmlFor="sha" 
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all text-center ${
                    transferData.fraisOption === "SHA" ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                >
                  <RadioGroupItem value="SHA" id="sha" className="mb-2" />
                  <p className="font-medium">SHA</p>
                  <p className="text-xs text-muted-foreground">Frais partagés</p>
                </Label>
                <Label 
                  htmlFor="our" 
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all text-center ${
                    transferData.fraisOption === "OUR" ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                >
                  <RadioGroupItem value="OUR" id="our" className="mb-2" />
                  <p className="font-medium">OUR</p>
                  <p className="text-xs text-muted-foreground">Vous payez tout</p>
                </Label>
                <Label 
                  htmlFor="ben" 
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all text-center ${
                    transferData.fraisOption === "BEN" ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                >
                  <RadioGroupItem value="BEN" id="ben" className="mb-2" />
                  <p className="font-medium">BEN</p>
                  <p className="text-xs text-muted-foreground">Bénéficiaire paie</p>
                </Label>
              </RadioGroup>
            </div>
          )}

          <Separator />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Récapitulatif des frais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frais de base</span>
                <span>{formatCurrency(fees.baseFee)}</span>
              </div>
              {fees.urgentFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frais express</span>
                  <span>{formatCurrency(fees.urgentFee)}</span>
                </div>
              )}
              {transferData.type === "swift" && fees.processingFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frais de traitement (0.1%)</span>
                  <span>{formatCurrency(fees.processingFee)}</span>
                </div>
              )}
              {fees.correspondentFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frais correspondant (OUR)</span>
                  <span>{formatCurrency(fees.correspondentFee)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total des frais</span>
                <span>{formatCurrency(fees.total)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Montant total à débiter</span>
                <span>{formatCurrency(amount + fees.total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    const fees = calculateFees();
    const amount = parseFloat(transferData.amount) || 0;

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Vérification du virement</h2>
          <p className="text-muted-foreground">Vérifiez toutes les informations avant de continuer</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {transferData.type === "sepa" 
                  ? <Euro className="w-5 h-5 text-primary" />
                  : <Globe className="w-5 h-5 text-primary" />
                }
              </div>
              <div>
                <CardTitle className="text-lg">
                  Virement {transferData.type?.toUpperCase()}
                </CardTitle>
                <CardDescription>
                  {transferData.urgency === "urgent" ? "Express" : "Standard"} - {transferData.type === "sepa" ? "Zone Euro" : "International"}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4" />
                Bénéficiaire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nom</span>
                <span className="font-medium">{transferData.beneficiaryName || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adresse</span>
                <span className="font-medium">{transferData.beneficiaryAddress || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pays</span>
                <span className="font-medium">{transferData.beneficiaryCountry || "-"}</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">IBAN</span>
                <span className="font-mono font-medium">{transferData.iban || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BIC/SWIFT</span>
                <span className="font-mono font-medium">{transferData.bic || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Banque destinataire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Banque</span>
                <span className="font-medium">{transferData.bankName || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adresse</span>
                <span className="font-medium">{transferData.bankAddress || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                Montant et frais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant du virement</span>
                <span className="font-medium">{formatCurrency(amount, transferData.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total des frais</span>
                <span className="font-medium">{formatCurrency(fees.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Référence</span>
                <span className="font-medium">{transferData.reference || "-"}</span>
              </div>
              {transferData.type === "swift" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Option frais</span>
                  <span className="font-medium">{transferData.fraisOption}</span>
                </div>
              )}
              <Separator className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total à débiter</span>
                <span className="text-primary">{formatCurrency(amount + fees.total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    Vérification importante
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    Veuillez vérifier attentivement toutes les informations. Une fois le virement initié, 
                    il ne pourra plus être annulé ou modifié.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderStep6 = () => {
    const completedSteps = paymentSteps.filter(s => s.status === "completed").length;
    const totalPaymentSteps = paymentSteps.length;
    const allCompleted = completedSteps === totalPaymentSteps && totalPaymentSteps > 0;

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Processus de paiement</h2>
          <p className="text-muted-foreground">
            {paymentSteps.length > 1 
              ? `Votre virement sera traité en ${paymentSteps.length} étapes`
              : "Procédez au paiement pour finaliser votre virement"
            }
          </p>
        </div>

        {paymentSteps.length > 1 && (
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 mb-6">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                    Paiement sécurisé en plusieurs étapes
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Pour les virements importants, nous procédons par étapes pour garantir 
                    la sécurité de vos fonds. Chaque étape doit être validée avant de passer à la suivante.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {paymentSteps.map((step, index) => {
            const isCompleted = step.status === "completed";
            const isProcessing = step.status === "processing";
            const isCurrent = step.status === "current" || (index === 0 && step.status === "pending");
            const isPending = step.status === "pending" && index !== 0;

            return (
              <Card 
                key={step.id}
                className={`transition-all ${
                  isCompleted ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800" :
                  isProcessing ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 animate-pulse" :
                  isCurrent ? "ring-2 ring-primary" : "opacity-60"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isCompleted ? "bg-green-500 text-white" :
                          isProcessing ? "bg-blue-500 text-white" :
                          isCurrent ? "bg-primary text-primary-foreground" :
                          "bg-muted text-muted-foreground"}
                      `}>
                        {isCompleted ? <Check className="w-5 h-5" /> :
                         isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> :
                         <span>{index + 1}</span>}
                      </div>
                      <div>
                        <p className="font-medium">{step.name}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatCurrency(step.amount)}</p>
                      {isCompleted && (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Payé
                        </Badge>
                      )}
                      {isProcessing && (
                        <Badge variant="default" className="bg-blue-500">
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          En cours
                        </Badge>
                      )}
                      {isCurrent && !isProcessing && (
                        <Button 
                          size="sm" 
                          onClick={() => processPaymentStep(index)}
                          disabled={isProcessing}
                          data-testid={`button-pay-step-${index}`}
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          Payer
                        </Button>
                      )}
                      {isPending && (
                        <Badge variant="secondary">En attente</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {paymentSteps.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progression du paiement</span>
              <span className="font-medium">{completedSteps}/{totalPaymentSteps} étapes</span>
            </div>
            <Progress value={(completedSteps / totalPaymentSteps) * 100} className="h-2" />
          </div>
        )}
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Virement effectué avec succès</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Votre virement {transferData.type?.toUpperCase()} de {formatCurrency(parseFloat(transferData.amount) || 0, transferData.currency)} 
        {" "}vers {transferData.beneficiaryName} a été initié avec succès.
      </p>

      <Card className="max-w-md mx-auto mb-8">
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Référence de transaction</span>
            <span className="font-mono font-medium">TRF-{Date.now().toString(36).toUpperCase()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date d'exécution prévue</span>
            <span className="font-medium">
              {new Date(Date.now() + (transferData.type === "sepa" ? 86400000 : 172800000)).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Statut</span>
            <Badge className="bg-green-500">En traitement</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => {
          setCurrentStep(1);
          setTransferData(initialTransferData);
          setPaymentSteps([]);
        }} data-testid="button-new-transfer">
          Nouveau virement
        </Button>
        <Button data-testid="button-view-history">
          Voir l'historique
        </Button>
      </div>
    </div>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return transferData.type !== null;
      case 2:
        return transferData.beneficiaryName && transferData.iban && transferData.bic;
      case 3:
        return transferData.bankName;
      case 4:
        return transferData.amount && parseFloat(transferData.amount) > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Système de Virement</h1>
                <p className="text-xs text-muted-foreground">SEPA & SWIFT - Démonstration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex">
                <Shield className="w-3 h-3 mr-1" />
                Sécurisé SSL
              </Badge>
              <Badge variant="secondary">
                Mode Demo
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {currentStep <= 6 && currentStep !== 7 && renderStepIndicator()}

        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
            {currentStep === 7 && renderSuccess()}

            {currentStep <= 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  data-testid="button-next"
                >
                  {currentStep === 5 ? "Procéder au paiement" : "Continuer"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Cette page est une démonstration. Aucune transaction réelle n'est effectuée.
          </p>
        </div>
      </div>
    </div>
  );
}
