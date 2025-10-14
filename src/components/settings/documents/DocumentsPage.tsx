"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { ChatIcon } from "@/components/ui/Icons";

interface DocumentCard {
  id: string;
  title: string;
  description: string;
  tag: string;
}

const draftsData: DocumentCard[] = [
  {
    id: "1",
    title: "Traffic Stop Report",
    description: "Initial draft of traffic violation incident involving speeding and expired registration",
    tag: "#Narrative",
  },
  {
    id: "2",
    title: "Domestic Dispute",
    description: "Preliminary report on domestic violence call with witness statements pending",
    tag: "#SMF",
  },
  {
    id: "3",
    title: "Burglary Investigation",
    description: "Ongoing investigation of residential break-in with multiple suspects identified",
    tag: "#Narrative",
  },
];

const exportedData: DocumentCard[] = [
  {
    id: "1",
    title: "Assault on Premises",
    description: "Report of a disturbance at the local shopping center involving multiple parties",
    tag: "#Narrative",
  },
  {
    id: "2",
    title: "Vehicle Accident",
    description: "An officer responded to a two-vehicle collision at the intersection of Main and Oak",
    tag: "#Narrative",
  },
  {
    id: "3",
    title: "Assault Case",
    description: "Summary of AI-generated SMF based on witness testimony and evidence collection",
    tag: "#SMF",
  },
  {
    id: "4",
    title: "Arrest Without a Warrant",
    description: "Inquiry regarding police authority and probable cause for warrantless arrest",
    tag: "#Narrative",
  },
  {
    id: "5",
    title: "Incident of Collision",
    description: "This document is based on a traffic accident investigation with detailed findings",
    tag: "#SMF",
  },
];

export const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState<"drafts" | "exported">("exported");
  const router = useRouter();

  const currentData = activeTab === "drafts" ? draftsData : exportedData;

  const handleDocumentClick = (document: DocumentCard) => {
    // Navigate to chat page with document context
    router.push(`/chat?documentId=${document.id}&title=${encodeURIComponent(document.title)}`);
  };

  return (
    <div className="py-8 px-6 lg:py-12 lg:px-8">
      <div className="max-w-md mx-auto lg:max-w-4xl">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-4xl font-semibold text-dark-blue font-dm-sans">
            Documents & Data
          </h1>
          <p className="text-sm lg:text-base text-text-gray font-dm-sans mt-2">
            Access drafts and exported files.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 lg:mb-12">
          <Button
            variant={activeTab === "drafts" ? "coffee" : "outline"}
            size="sm"
            onClick={() => setActiveTab("drafts")}
          >
            Drafts
          </Button>
          <Button
            variant={activeTab === "exported" ? "coffee" : "outline"}
            size="sm"
            onClick={() => setActiveTab("exported")}
          >
            Exported
          </Button>
        </div>

        {/* Document Cards */}
        <div className="space-y-4">
          {currentData.map((document) => (
            <div
              key={document.id}
              onClick={() => handleDocumentClick(document)}
              className="bg-light-gray rounded-lg border border-placeholder-gray/20 p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow cursor-pointer"
            >
              {/* Document Icon */}
              <div className="flex-shrink-0">
                <div className="flex-shrink-0 w-10 h-10 bg-icons-bg rounded-lg flex items-center justify-center">
                  <ChatIcon />
                </div>
              </div>

              {/* Document Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-dark-blue font-dm-sans">
                  {document.title}
                </h3>
                <p className="text-sm text-text-gray font-dm-sans truncate">
                  {document.description}
                </p>
              </div>

               {/* Document Tag */}
               <div className="flex-shrink-0">
                 <Badge variant="tag" size="md">
                   {document.tag}
                 </Badge>
               </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-light-gray rounded-lg flex items-center justify-center mx-auto mb-4">
              <ChatIcon />
            </div>
            <h3 className="text-lg font-semibold text-dark-blue font-dm-sans mb-2">
              No {activeTab} documents
            </h3>
            <p className="text-sm text-text-gray font-dm-sans">
              {activeTab === "drafts"
                ? "You don't have any draft documents yet."
                : "You don't have any exported documents yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
