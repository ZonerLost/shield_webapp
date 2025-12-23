"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { ChatIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { narrativeApi } from "../../../lib/api";
import { useToastContext } from "@/components/providers/ToastProvider";

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

export const NarrativesPage = () => {
  const router = useRouter();
  const [narratives, setNarratives] = useState<NarrativeDraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToastContext();

  const fetchNarratives = async () => {
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

      // Fetch narrative drafts
      const narrativeResponse = await narrativeApi.getUserDrafts(userId);


      // Process narrative drafts - handle both direct array and wrapped response
      let narrativeDrafts: NarrativeDraft[] = [];
      if (narrativeResponse.success) {
        if (Array.isArray(narrativeResponse.data)) {
          narrativeDrafts = narrativeResponse.data;
        } else if (narrativeResponse.data && typeof narrativeResponse.data === 'object' && 'data' in narrativeResponse.data && Array.isArray(narrativeResponse.data.data)) {
          narrativeDrafts = narrativeResponse.data.data;
        }
      } else {
        toast.error(narrativeResponse.message || 'Failed to load narratives');
      }

      setNarratives(narrativeDrafts);
    } catch (err) {
      console.error('Error fetching narratives:', err);
      toast.error('Failed to load narratives. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNarratives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNarrativeClick = (draftId: string) => {
    // Navigate to generated narrative page with the draft ID
    router.push(`/generated-narrative?draftId=${draftId}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status || status === "in-progress") {
      return <Badge variant="tag" size="sm" className="bg-yellow-100 text-yellow-800">Draft</Badge>;
    } else if (status === "generated") {
      return <Badge variant="tag" size="sm" className="bg-green-100 text-green-800">Generated</Badge>;
    } else if (status === "exported") {
      return <Badge variant="tag" size="sm" className="bg-blue-100 text-blue-800">Exported</Badge>;
    }
    return <Badge variant="tag" size="sm">Unknown</Badge>;
  };

  return (
    <div className="py-8 px-6 lg:py-12 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-4xl font-semibold text-dark-blue font-dm-sans">
            Narratives
          </h1>
          <p className="text-sm lg:text-base text-text-gray font-medium font-dm-sans mt-2">
            View and manage all your narrative documents.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-lg font-semibold text-dark-blue font-dm-sans">
              Loading narratives...
            </div>
          </div>
        )}

        {/* Narratives List */}
        {!isLoading && (
          <div className="space-y-4">
            {narratives.map((narrative) => (
              <div
                key={narrative.draftId}
                onClick={() => handleNarrativeClick(narrative.draftId)}
                className="bg-light-gray rounded-lg border border-placeholder-gray/20 p-6 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  {/* Left Section - Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-icons-bg rounded-lg flex items-center justify-center">
                        <ChatIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-dark-blue font-dm-sans truncate">
                          {narrative.reasonForAttendance 
                            ? narrative.reasonForAttendance.length > 60 
                              ? narrative.reasonForAttendance.substring(0, 60) + "..."
                              : narrative.reasonForAttendance
                            : `Narrative - ${narrative.location || "Unknown Location"}`}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    {narrative.details && (
                      <p className="text-sm text-text-gray font-dm-sans mb-4 line-clamp-2">
                        {narrative.details.length > 150 
                          ? narrative.details.substring(0, 150) + "..."
                          : narrative.details}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-xs text-text-gray font-dm-sans">
                      {narrative.location && (
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">Location:</span>
                          <span>{narrative.location}</span>
                        </div>
                      )}
                      {narrative.date && narrative.time && (
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">Date:</span>
                          <span>{narrative.date} at {narrative.time}</span>
                        </div>
                      )}
                      {narrative.callSign && (
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">Call Sign:</span>
                          <span>{narrative.callSign}</span>
                        </div>
                      )}
                      {narrative.lastSavedAt && (
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">Last Saved:</span>
                          <span>{formatDate(narrative.lastSavedAt)}</span>
                        </div>
                      )}
                    </div>

                    {/* Additional Info */}
                    {(narrative.victim || narrative.suspect) && (
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-text-gray font-dm-sans">
                        {narrative.victim && (
                          <div>
                            <span className="font-semibold">Victim: </span>
                            <span>{narrative.victim}</span>
                          </div>
                        )}
                        {narrative.suspect && (
                          <div>
                            <span className="font-semibold">Suspect: </span>
                            <span>{narrative.suspect}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Versions Count */}
                    {narrative.versions && narrative.versions.length > 0 && (
                      <div className="mt-3 text-xs text-text-gray font-dm-sans">
                        <span className="font-semibold">{narrative.versions.length}</span>
                        <span> version{narrative.versions.length !== 1 ? 's' : ''} generated</span>
                      </div>
                    )}
                  </div>

                  {/* Right Section - Status and Arrow */}
                  <div className="flex flex-col items-end gap-3 ml-4">
                    {getStatusBadge(narrative.status)}
                    <ArrowRightIcon className="text-placeholder-gray group-hover:text-blue-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && narratives.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-light-gray rounded-lg flex items-center justify-center mx-auto mb-4">
              <ChatIcon />
            </div>
            <h3 className="text-lg font-semibold text-dark-blue font-dm-sans mb-2">
              No narratives found
            </h3>
            <p className="text-sm text-text-gray font-dm-sans mb-6">
              You don&apos;t have any narrative documents yet. Create your first narrative to get started.
            </p>
            <Button
              variant="badge"
              size="lg"
              onClick={() => router.push('/narrative-generator')}
            >
              Create Narrative
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

