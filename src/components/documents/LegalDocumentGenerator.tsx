import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { FileText, Download, Eye, Printer, Share2 } from "lucide-react";

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: "form_in01" | "articles_of_association" | "psc_register" | "employment_contract" | "nda";
  category: "company_formation" | "employment" | "legal";
  requiredFields: string[];
}

const LegalDocumentGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const documentTemplates: DocumentTemplate[] = [
    {
      id: "form_in01",
      name: "Form IN01 - Company Registration",
      description: "Application to register a company at Companies House",
      type: "form_in01",
      category: "company_formation",
      requiredFields: ["companyName", "companyType", "sicCodes", "registeredAddress", "directors", "shareholders"]
    },
    {
      id: "articles_of_association",
      name: "Articles of Association",
      description: "Legal document defining company rules and regulations",
      type: "articles_of_association",
      category: "company_formation",
      requiredFields: ["companyName", "shareCapital", "directors", "businessPurpose"]
    },
    {
      id: "psc_register",
      name: "PSC Register",
      description: "People with Significant Control register",
      type: "psc_register",
      category: "company_formation",
      requiredFields: ["companyName", "pscDetails", "registeredAddress"]
    },
    {
      id: "employment_contract",
      name: "Employment Contract",
      description: "Standard UK employment agreement template",
      type: "employment_contract",
      category: "employment",
      requiredFields: ["employeeName", "jobTitle", "salary", "startDate", "workingHours", "benefits"]
    },
    {
      id: "nda",
      name: "Non-Disclosure Agreement",
      description: "Confidentiality agreement for business relationships",
      type: "nda",
      category: "legal",
      requiredFields: ["partyOne", "partyTwo", "purpose", "duration", "governingLaw"]
    }
  ];

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setGeneratedContent("");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDocument = async () => {
    if (!selectedTemplate || !user) return;

    setLoading(true);
    try {
      // Save to database
      const { data, error } = await supabase
        .from("legal_documents")
        .insert({
          user_id: user.id,
          document_type: selectedTemplate.type,
          document_data: formData,
          status: "draft"
        })
        .select()
        .single();

      if (error) throw error;

      // Generate document content based on template
      const content = generateDocumentContent(selectedTemplate, formData);
      setGeneratedContent(content);

      // Update with generated content
      await supabase
        .from("legal_documents")
        .update({ generated_content: content })
        .eq("id", data.id);

      toast({
        title: "Document Generated",
        description: `${selectedTemplate.name} has been created successfully.`,
      });

    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateDocumentContent = (template: DocumentTemplate, data: Record<string, any>): string => {
    switch (template.type) {
      case "form_in01":
        return `
FORM IN01 - APPLICATION TO REGISTER A COMPANY

Company Name: ${data.companyName || '[COMPANY NAME]'}
Company Type: ${data.companyType || 'Private company limited by shares'}
SIC Codes: ${data.sicCodes || '[SIC CODES]'}

REGISTERED OFFICE ADDRESS:
${data.registeredAddress || '[REGISTERED ADDRESS]'}

DIRECTORS:
${data.directors || '[DIRECTOR DETAILS]'}

SHAREHOLDERS:
${data.shareholders || '[SHAREHOLDER DETAILS]'}

This application is made in accordance with the Companies Act 2006.

Signature: _____________________
Date: ${new Date().toLocaleDateString('en-GB')}
        `;

      case "articles_of_association":
        return `
ARTICLES OF ASSOCIATION

${data.companyName || '[COMPANY NAME]'}

1. INTERPRETATION
These Articles of Association govern the management and operation of ${data.companyName || '[COMPANY NAME]'}.

2. SHARE CAPITAL
The company's authorized share capital is £${data.shareCapital || '100'} divided into ${data.shareCapital || '100'} ordinary shares of £1 each.

3. DIRECTORS
The company shall have a minimum of ${data.directors || '1'} director(s).

4. BUSINESS PURPOSE
The company's business purpose is: ${data.businessPurpose || '[BUSINESS PURPOSE]'}

5. GENERAL PROVISIONS
These Articles are subject to the provisions of the Companies Act 2006.

Date: ${new Date().toLocaleDateString('en-GB')}
        `;

      case "employment_contract":
        return `
EMPLOYMENT CONTRACT

This Employment Contract is made between:
Employer: ${data.companyName || '[COMPANY NAME]'}
Employee: ${data.employeeName || '[EMPLOYEE NAME]'}

1. JOB DETAILS
Position: ${data.jobTitle || '[JOB TITLE]'}
Start Date: ${data.startDate || '[START DATE]'}
Salary: £${data.salary || '[SALARY]'} per annum
Working Hours: ${data.workingHours || '37.5'} hours per week

2. BENEFITS
${data.benefits || 'Standard company benefits package'}

3. TERMS AND CONDITIONS
This contract is governed by UK employment law and company policies.

Employer Signature: _____________________
Employee Signature: _____________________
Date: ${new Date().toLocaleDateString('en-GB')}
        `;

      default:
        return `Document content for ${template.name} would be generated here with the provided data.`;
    }
  };

  const renderFormFields = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="space-y-4">
        {selectedTemplate.requiredFields.map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field} className="capitalize">
              {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </Label>
            {field.includes('address') || field.includes('purpose') || field.includes('details') ? (
              <Textarea
                id={field}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                value={formData[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            ) : (
              <Input
                id={field}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                value={formData[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Legal Document Generator</h2>
        <p className="text-muted-foreground">
          Generate UK-compliant legal documents automatically with pre-filled data
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Template Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Document Template</h3>
          <div className="grid gap-3">
            {documentTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {template.category.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Form and Preview */}
        <div className="space-y-6">
          {selectedTemplate && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTemplate.name}</CardTitle>
                  <CardDescription>
                    Fill in the required information to generate your document
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderFormFields()}
                  <Button 
                    onClick={generateDocument} 
                    disabled={loading} 
                    className="w-full"
                  >
                    {loading ? "Generating..." : "Generate Document"}
                  </Button>
                </CardContent>
              </Card>

              {generatedContent && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Document Preview</CardTitle>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedContent}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalDocumentGenerator;