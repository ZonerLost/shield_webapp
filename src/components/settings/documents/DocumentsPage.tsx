"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { ChatIcon } from "@/components/ui/Icons";
import { narrativeApi, smfApi } from "../../../lib/api";
import { useToastContext } from "@/components/providers/ToastProvider";

interface DocumentCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  type: "narrative" | "smf";
  status?: "in-progress" | "generated" | "exported";
}

interface NarrativeDraft {
  draftId: string;
  userId: string;
  status?: "in-progress" | "generated" | "exported";
  lastSavedAt?: string;
  reasonForAttendance?: string;
  details?: string;
  location?: string;
  victim?: string;
  suspect?: string;
  callSign?: string;
  date?: string;
  time?: string;
  versions?: Array<{ id: string; content: string; createdAt: string }>;
}

interface SmfDraft {
  smfId: string;
  userId: string;
  status: "in-progress" | "generated" | "exported";
  createdAt: string;
  updatedAt: string;
  narrative?: string;
  content?: string;
  officerName?: string;
  referenceId?: string;
}

export const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState<"drafts" | "exported">("exported");
  const [draftsData, setDraftsData] = useState<DocumentCard[]>([]);
  const [exportedData, setExportedData] = useState<DocumentCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const toast = useToastContext();

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);

    try {
      // Get user ID from localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        router.push('/login');
        return;
      }

      const user = JSON.parse(userStr);
      const userId = user.userId;

      if (!userId) {
        toast.error('User ID not found');
        setIsLoading(false);
        return;
      }

      // Fetch narrative drafts and SMF documents in parallel
      const [narrativeResponse, smfResponse] = await Promise.all([
        narrativeApi.getUserDrafts(userId),
        smfApi.getUserSmfs(userId),
      ]);


      // Process narrative drafts - handle both direct array and wrapped response
      let narrativeDrafts: NarrativeDraft[] = [];
      if (narrativeResponse.success && narrativeResponse.data) {
        if (Array.isArray(narrativeResponse.data)) {
          narrativeDrafts = narrativeResponse.data;
        } else if (typeof narrativeResponse.data === 'object' && 'data' in narrativeResponse.data && Array.isArray(narrativeResponse.data.data)) {
          // Handle nested response structure
          narrativeDrafts = narrativeResponse.data.data;
        }
      }
      
      // Process SMF drafts - handle both direct array and wrapped response
      let smfDrafts: SmfDraft[] = [];
      if (smfResponse.success && smfResponse.data) {
        if (Array.isArray(smfResponse.data)) {
          smfDrafts = smfResponse.data;
        } else if (typeof smfResponse.data === 'object' && 'data' in smfResponse.data && Array.isArray(smfResponse.data.data)) {
          // Handle nested response structure
          smfDrafts = smfResponse.data.data;
        }
      }


      // Transform to DocumentCard format
      const allDocuments: DocumentCard[] = [
        ...narrativeDrafts.map((draft) => ({
          id: draft.draftId,
          title: draft.reasonForAttendance 
            ? draft.reasonForAttendance.length > 50 
              ? draft.reasonForAttendance.substring(0, 50) + "..."
              : draft.reasonForAttendance
            : `Narrative - ${draft.location || "Unknown Location"}`,
          description: draft.details 
            ? draft.details.length > 100 
              ? draft.details.substring(0, 100) + "..."
              : draft.details
            : draft.reasonForAttendance || "Narrative document",
          tag: "#Narrative",
          type: "narrative" as const,
          status: draft.status || "in-progress", // Default to in-progress if status is missing
        })),
        ...smfDrafts.map((smf) => ({
          id: smf.smfId,
          title: smf.referenceId 
            ? `SMF - ${smf.referenceId}`
            : smf.officerName
            ? `SMF - ${smf.officerName}`
            : "SMF Document",
          description: smf.narrative
            ? smf.narrative.length > 100
              ? smf.narrative.substring(0, 100) + "..."
              : smf.narrative
            : smf.content
            ? smf.content.length > 100
              ? smf.content.substring(0, 100) + "..."
              : smf.content
            : "SMF document",
          tag: "#SMF",
          type: "smf" as const,
          status: smf.status || "in-progress", // Default to in-progress if status is missing
        })),
      ];


      // Separate into drafts and exported
      // Drafts: status is in-progress, missing, or document has no generated content yet
      const drafts = allDocuments.filter((doc) => {
        const status = doc.status || "in-progress";
        // If status is explicitly generated/exported, don't show in drafts
        if (status === "generated" || status === "exported") {
          return false;
        }
        // Show in drafts if status is in-progress or missing
        return true;
      });
      
      // Exported: status is generated or exported
      const exported = allDocuments.filter((doc) => {
        const status = doc.status || "in-progress";
        return status === "generated" || status === "exported";
      });

      console.log('Drafts:', drafts);
      console.log('Exported:', exported);

      setDraftsData(drafts);
      setExportedData(exported);
    } catch (err) {
      console.error('Error fetching documents:', err);
      toast.error('Failed to load documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentData = activeTab === "drafts" ? draftsData : exportedData;

  const handleDocumentClick = (document: DocumentCard) => {
    // Navigate based on document type
    if (document.type === "narrative") {
      router.push(`/generated-narrative?draftId=${document.id}`);
    } else if (document.type === "smf") {
      router.push(`/draft-statement?smfId=${document.id}`);
    }
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-lg font-semibold text-dark-blue font-dm-sans">
              Loading documents...
            </div>
          </div>
        )}

        {/* Document Cards */}
        {!isLoading && (
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
        )}

        {/* Empty State */}
        {!isLoading && currentData.length === 0 && (
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
