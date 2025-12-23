'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NarrativeCard } from './NarrativeCard';
import { Button } from '../ui/Button';
import { Logo, MenuIcon, MoreDotsIcon, TextIcon } from '../ui/Icons';
import { ExportDropdown } from '../ui/ExportDropdown';
import { narrativeApi } from '../../lib/api';
import { useToastContext } from '@/components/providers/ToastProvider';

interface NarrativeVersion {
  id: string;
  content: string;
  createdAt: string;
}

export const GeneratedNarrativePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedNarrative, setSelectedNarrative] = useState<string | null>(null);
  const [rejectedNarratives, setRejectedNarratives] = useState<string[]>([]);
  const [actedUponNarratives, setActedUponNarratives] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [narratives, setNarratives] = useState<NarrativeVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draftId, setDraftId] = useState<string | null>(null);
  const toast = useToastContext();

  const fetchDraft = async (id: string) => {
    try {
      const response = await narrativeApi.getDraft(id);
      if (response.success && response.data) {
        const draft = response.data;
        if (draft.versions && draft.versions.length > 0) {
          setNarratives(draft.versions);
        } else {
          toast.error('No narratives generated yet');
        }
      } else {
        toast.error(response.message || 'Failed to load narrative');
      }
    } catch {
      toast.error('Failed to load narrative');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Get draftId from URL or sessionStorage
    const urlDraftId = searchParams.get('draftId');
    const sessionDraftId = sessionStorage.getItem('currentDraftId');
    const currentDraftId = urlDraftId || sessionDraftId;

    if (currentDraftId) {
      setDraftId(currentDraftId);
      fetchDraft(currentDraftId);
    } else {
      toast.error('No draft ID found');
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleApprove = (narrativeType: string) => {
    setSelectedNarrative(narrativeType);
    setActedUponNarratives(prev => [...prev, narrativeType]);
  };

  const handleReject = (narrativeType: string) => {
    console.log(`Rejected ${narrativeType}`);
    setRejectedNarratives(prev => [...prev, narrativeType]);
    setActedUponNarratives(prev => [...prev, narrativeType]);
  };

  const handleExport = async () => {
    if (!draftId || !selectedNarrative) {
      toast.error('Please select a narrative to export');
      return;
    }

    // Find the selected narrative version
    const selectedNarrativeIndex = narratives.findIndex(
      n => `Narrative ${String.fromCharCode(65 + narratives.indexOf(n))}` === selectedNarrative
    );
    
    if (selectedNarrativeIndex === -1) {
      toast.error('Selected narrative not found');
      return;
    }

    const selectedVersion = narratives[selectedNarrativeIndex];
    
    try {
      // Export as PDF
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/narrative/${draftId}/export?format=pdf&versionId=${selectedVersion.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `narrative_${selectedVersion.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Narrative exported as PDF successfully!');
      } else {
        console.error('Export failed');
        toast.error('Failed to export narrative');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export narrative');
    }
    handleDropdownClose();
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard');
    handleDropdownClose();
  };

  const dropdownOptions = [
    {
      icon: <TextIcon />,
      label: 'Copy',
      onClick: () => {
        const selectedNarrativeContent = narratives.find(
          n => `Narrative ${String.fromCharCode(65 + narratives.indexOf(n))}` === selectedNarrative
        )?.content;
        if (selectedNarrativeContent) {
          handleCopy(selectedNarrativeContent);
        }
      }
    },
    {
      label: 'Send to SMF Builder',
      onClick: () => {
        // Get the selected narrative content and draftId
        const selectedNarrativeContent = narratives.find(n => `Narrative ${String.fromCharCode(65 + narratives.indexOf(n))}` === selectedNarrative)?.content;
        if (draftId && selectedNarrativeContent) {
          // Store narrative content in sessionStorage and navigate with draftId
          sessionStorage.setItem('narrativeForSmf', selectedNarrativeContent);
          router.push(`/smf-builder?narrativeId=${draftId}`);
        } else {
          router.push('/smf-builder');
        }
      }
    },
    {
      label: 'Regenerate',
      onClick: () => {
        console.log('Regenerate');
        // Handle regenerate
      }
    }
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-dm-sans flex flex-col">
      {/* Custom Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-placeholder-gray">
        {/* Left side - Menu */}
        <div className="flex items-center">
          <button 
            className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer"
            onClick={() => router.push("/settings")}
          >
            <MenuIcon />
          </button>
        </div>

        {/* Center - Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => router.push("/")}
        >
          <Logo className="h-8 w-8" />
          <span className="text-xl font-normal text-black font-dm-sans">
            ShieldSystems
          </span>
        </div>

        {/* Right side - 3 dots (only when narrative is accepted) */}
        <div className="flex items-center">
          {selectedNarrative && (
            <div className="relative">
              <button 
                className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer"
                onClick={handleDropdownToggle}
              >
                <MoreDotsIcon />
              </button>
              
              {/* Dropdown */}
              <ExportDropdown
                options={dropdownOptions}
                isOpen={isDropdownOpen}
                onClose={handleDropdownClose}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 px-6 py-8 ${selectedNarrative ? 'pb-24' : ''}`}>
        <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-left mb-8">
                <h1 className="text-2xl font-bold text-blue-primary font-dm-sans  ">
                  Generated Narrative
                </h1>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-text-gray font-dm-sans">
                    Here are the generated narrative drafts based on your details.
                  </p>
                </div>
              </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-text-gray font-dm-sans">Loading narratives...</p>
          </div>
        )}

        {/* Narrative Cards */}
        {!isLoading && narratives.length > 0 && (
          <div className="space-y-8">
            {narratives.map((narrative, index) => {
              const narrativeLabel = `Narrative ${String.fromCharCode(65 + index)}`;
              const isRejected = rejectedNarratives.includes(narrativeLabel);
              
              if (isRejected) return null;

              return (
                <NarrativeCard
                  key={narrative.id}
                  title={narrativeLabel}
                  content={narrative.content}
                  onApprove={() => handleApprove(narrativeLabel)}
                  onReject={() => handleReject(narrativeLabel)}
                  onCopy={() => handleCopy(narrative.content)}
                  showActions={!actedUponNarratives.includes(narrativeLabel)}
                />
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-left mt-12">
          <p className="text-base font-semibold text-text-gray font-dm-sans">
            <b>Note:</b> Drafts auto-saved every 2 seconds. Your work is safe.
          </p>
        </div>

        {/* Export Button - Fixed at bottom when at least one narrative is accepted */}
        {selectedNarrative && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-placeholder-gray/20 p-4">
            <div className="max-w-4xl mx-auto">
              <Button
                variant="badge"
                size="lg"
                onClick={handleExport}
                className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-4 font-medium font-dm-sans"
              >
                Export as PDF
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
