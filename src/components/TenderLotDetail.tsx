import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Calendar, 
  DollarSign, 
  Building2, 
  MapPin, 
  Phone, 
  FileText, 
  Download, 
  ChevronDown,
  ExternalLink,
  Package,
  CreditCard,
  Clock,
  Award
} from "lucide-react";
import { useState } from "react";
import { ItemsTable } from "./ItemsTable";

// Mock data structure based on requirements
const tenderData = {
  uzexDisplayNo: "LOT-2024-001234",
  startDate: "2024-01-15",
  endDate: "2024-02-28",
  status: { name: "Active" },
  type: { name: "Open Tender" },
  startCost: 150000000,
  currency: { name: "UZS" },
  valuation: { name: "Lowest Price" },
  pledgeName: "Required",
  pledgeValue: 5,
  termPaymentDays: 30,
  advancePaymentPerc: 30,
  termOnlineDays: 45,
  paymentType: { name: "Bank Transfer" },
  financingSource: "State Budget",
  costCoef: 80,
  techCoef: 20,
  publisher: { name: "Ministry of Health of the Republic of Uzbekistan" },
  contacts: "+998 71 244 16 30",
  deliveringRegion: { name: "Tashkent City" },
  deliveringDistrict: { name: "Yunusabad District" },
  deliveringAddress: "12 Farobiy Street, Building 5",
  deliveringPhone: "+998 71 123 45 67",
  addonDescription: "Additional requirements include certification from the Ministry of Health and compliance with international medical equipment standards. All products must have a minimum 2-year warranty.",
  technicalDescription: "Medical equipment must meet ISO 13485 standards. Installation and training services must be provided within 30 days of delivery. All documentation must be in Uzbek and Russian languages.",
  techFile: "technical_specs.pdf",
  techDocFile: "technical_documentation.pdf",
  contractProFile: "contract_project.pdf",
  contractFile: "contract_template.pdf",
  expertiseFile: "expertise_conclusion.pdf",
  link: "https://uzex.uz/tender/lot/001234",
  items: [
    {
      category: { name: "Medical Equipment" },
      product: { name: "Patient Monitoring System" },
      measurement: { name: "Unit" },
      quantity: 50,
      price: 2500000,
      cost: 125000000,
      description: "Multi-parameter patient monitoring system with ECG, SpO2, NIBP, temperature monitoring",
      publishedMonth: { name: "January 2024" },
      guaranteeTerm: 24,
      guaranteeTermType: { name: "Months" },
      deliveryTerm: "60 days from contract signing"
    },
    {
      category: { name: "Laboratory Equipment" },
      product: { name: "Hematology Analyzer" },
      measurement: { name: "Unit" },
      quantity: 10,
      price: 2500000,
      cost: 25000000,
      description: "Automated hematology analyzer with 23 parameters, throughput 60 samples/hour",
      publishedMonth: { name: "January 2024" },
      guaranteeTerm: 36,
      guaranteeTermType: { name: "Months" },
      deliveryTerm: "90 days from contract signing"
    }
  ]
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-muted-foreground">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const FileDownload = ({ fileName }: { fileName: string }) => (
  <Button variant="outline" size="sm" className="w-full justify-between">
    <span className="flex items-center gap-2">
      <FileText className="h-4 w-4" />
      {fileName}
    </span>
    <Download className="h-4 w-4" />
  </Button>
);

export const TenderLotDetail = () => {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [publisherOpen, setPublisherOpen] = useState(true);
  const [addonOpen, setAddonOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "success";
      case "closed": return "destructive";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero Summary Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-3xl font-bold">{tenderData.uzexDisplayNo}</CardTitle>
                  <Badge variant={getStatusColor(tenderData.status.name)} className="text-sm">
                    {tenderData.status.name}
                  </Badge>
                </div>
                <CardDescription className="text-base">{tenderData.type.name}</CardDescription>
              </div>
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold text-primary">
                  {tenderData.startCost.toLocaleString()} {tenderData.currency.name}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <InfoItem 
                icon={Calendar} 
                label="Start Date" 
                value={new Date(tenderData.startDate).toLocaleDateString()} 
              />
              <InfoItem 
                icon={Calendar} 
                label="End Date" 
                value={new Date(tenderData.endDate).toLocaleDateString()} 
              />
              <InfoItem 
                icon={Clock} 
                label="Active Days" 
                value={`${tenderData.termOnlineDays} days`} 
              />
              <InfoItem 
                icon={Award} 
                label="Evaluation Method" 
                value={tenderData.valuation.name} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Lot Details Card */}
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Lot Details
                </CardTitle>
                <ChevronDown className={`h-5 w-5 transition-transform ${detailsOpen ? "rotate-180" : ""}`} />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <InfoItem 
                    icon={DollarSign} 
                    label="Pledge Required" 
                    value={`${tenderData.pledgeName} (${tenderData.pledgeValue}%)`} 
                  />
                  <InfoItem 
                    icon={CreditCard} 
                    label="Payment Method" 
                    value={tenderData.paymentType.name} 
                  />
                  <InfoItem 
                    icon={Clock} 
                    label="Payment Term" 
                    value={`${tenderData.termPaymentDays} days`} 
                  />
                  <InfoItem 
                    icon={DollarSign} 
                    label="Advance Payment" 
                    value={`${tenderData.advancePaymentPerc}%`} 
                  />
                  <InfoItem 
                    icon={FileText} 
                    label="Financing Source" 
                    value={tenderData.financingSource} 
                  />
                  <InfoItem 
                    icon={Award} 
                    label="Price Coefficient" 
                    value={`${tenderData.costCoef}%`} 
                  />
                  <InfoItem 
                    icon={Award} 
                    label="Technical Coefficient" 
                    value={`${tenderData.techCoef}%`} 
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Publisher & Contacts Card */}
        <Collapsible open={publisherOpen} onOpenChange={setPublisherOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Publisher & Contacts
                </CardTitle>
                <ChevronDown className={`h-5 w-5 transition-transform ${publisherOpen ? "rotate-180" : ""}`} />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Publishing Organization</p>
                  <p className="text-lg font-semibold">{tenderData.publisher.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {tenderData.contacts}
                  </p>
                </div>
                
                <Separator />
                
                <div className="grid gap-6 md:grid-cols-2">
                  <InfoItem 
                    icon={MapPin} 
                    label="Region" 
                    value={tenderData.deliveringRegion.name} 
                  />
                  <InfoItem 
                    icon={MapPin} 
                    label="District" 
                    value={tenderData.deliveringDistrict.name} 
                  />
                  <InfoItem 
                    icon={MapPin} 
                    label="Delivery Address" 
                    value={tenderData.deliveringAddress} 
                  />
                  <InfoItem 
                    icon={Phone} 
                    label="Delivery Phone" 
                    value={tenderData.deliveringPhone} 
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Additional Description */}
        <Collapsible open={addonOpen} onOpenChange={setAddonOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Information
                </CardTitle>
                <ChevronDown className={`h-5 w-5 transition-transform ${addonOpen ? "rotate-180" : ""}`} />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{tenderData.addonDescription}</p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Technical Description */}
        <Collapsible open={techOpen} onOpenChange={setTechOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Technical Description
                </CardTitle>
                <ChevronDown className={`h-5 w-5 transition-transform ${techOpen ? "rotate-180" : ""}`} />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{tenderData.technicalDescription}</p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Files Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Documents & Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {tenderData.techFile && <FileDownload fileName={tenderData.techFile} />}
              {tenderData.techDocFile && <FileDownload fileName={tenderData.techDocFile} />}
              {tenderData.contractProFile && <FileDownload fileName={tenderData.contractProFile} />}
              {tenderData.contractFile && <FileDownload fileName={tenderData.contractFile} />}
              {tenderData.expertiseFile && <FileDownload fileName={tenderData.expertiseFile} />}
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products & Items</CardTitle>
            <CardDescription>Detailed list of all products included in this tender lot</CardDescription>
          </CardHeader>
          <CardContent>
            <ItemsTable items={tenderData.items} />
          </CardContent>
        </Card>

        {/* Footer - Original Link */}
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium">View Original Announcement</p>
              <p className="text-sm text-muted-foreground">Visit the official tender platform for more details</p>
            </div>
            <Button asChild>
              <a href={tenderData.link} target="_blank" rel="noopener noreferrer">
                Open on UZEX
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
