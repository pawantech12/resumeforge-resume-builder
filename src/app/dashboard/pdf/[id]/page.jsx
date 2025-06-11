"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResumePreview } from "@/components/resume-preview";
import axios from "axios";

export default function PDFPreviewPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/resume/${params.id}`);
        const resume = res.data.resume;
        setResumeData(resume);
      } catch (error) {
        console.log("Error fetching resume data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
          <p className="mt-4 text-lg font-medium">Generating PDF preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/resumes/${params.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">PDF Preview</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="print:shadow-none">
        <Card className="mx-auto max-w-[800px] overflow-hidden print:border-none print:shadow-none">
          <div className="bg-white p-8 print:p-0">
            <ResumePreview template="professional" data={resumeData} />
          </div>
        </Card>
      </div>

      <style jsx global>{`
        @media print {
          header,
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .print-container {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
