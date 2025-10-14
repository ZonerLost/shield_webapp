'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NarrativeCard } from './NarrativeCard';
import { Button } from '../ui/Button';
import { Logo, MenuIcon, MoreDotsIcon } from '../ui/Icons';
import { ExportDropdown } from '../ui/ExportDropdown';

export const GeneratedNarrativePage = () => {
  const router = useRouter();
  const [selectedNarrative, setSelectedNarrative] = useState<string | null>(null);
  const [rejectedNarratives, setRejectedNarratives] = useState<string[]>([]);
  const [actedUponNarratives, setActedUponNarratives] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Mock narrative data - in real app, this would come from props or API
  const narrativeA = "On 15/09/2025 at 22:35, officers with call sign Delta 23 attended 45 Murray Street, Perth WA after a report of disturbance at a licensed premises. The suspect, MICHAEL BROWN (DOB 25/11/1990), was observed involved in a physical altercation with the victim, JOHN SMITH (DOB 12/03/1989). Security staff had separated both parties. CCTV footage was obtained and one broken glass seized. The victim sustained minor facial injuries treated by paramedics. The suspect was arrested for assault.";

  const narrativeB = "At 22:35 on 15/09/2025, officers from call sign Delta 23 attended 45 Murray Street, Perth WA in relation to a disturbance. The suspect, MICHAEL BROWN (DOB 25/11/1990), had been in a physical altercation with the victim, JOHN SMITH (DOB 12/03/1989). Security had separated them before police arrival. Exhibits included CCTV footage and a broken glass. The victim received treatment for minor facial injuries. The suspect was arrested for assault and conveyed for processing.";

  const handleApprove = (narrativeType: string) => {
    console.log(`Approved ${narrativeType}`);
    setSelectedNarrative(narrativeType);
    setActedUponNarratives(prev => [...prev, narrativeType]);
  };

  const handleReject = (narrativeType: string) => {
    console.log(`Rejected ${narrativeType}`);
    setRejectedNarratives(prev => [...prev, narrativeType]);
    setActedUponNarratives(prev => [...prev, narrativeType]);
  };

  const handleExport = () => {
    console.log(`Exporting ${selectedNarrative}`);
    // Handle export logic
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    console.log('Content copied to clipboard');
    // Could add a toast notification here
  };

  const dropdownOptions = [
    {
      label: 'Export as Word',
      onClick: () => {
        console.log('Export as Word');
        // Handle Word export
      }
    },
    {
      label: 'Export as Pdf',
      onClick: () => {
        console.log('Export as Pdf');
        // Handle PDF export
      }
    },
    {
      label: 'Copy',
      onClick: () => {
        console.log('Copy');
        // Handle copy
      }
    },
    {
      label: 'Send to SMF Builder',
      onClick: () => {
        router.push('/smf-builder');
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

        {/* Narrative Cards */}
        <div className="space-y-8">
          {!rejectedNarratives.includes('Narrative A') && (
            <NarrativeCard
              title="Narrative A"
              content={narrativeA}
              onApprove={() => handleApprove('Narrative A')}
              onReject={() => handleReject('Narrative A')}
              onCopy={() => handleCopy(narrativeA)}
              showActions={!actedUponNarratives.includes('Narrative A')}
            />
          )}

          {!rejectedNarratives.includes('Narrative B') && (
            <NarrativeCard
              title="Narrative B"
              content={narrativeB}
              onApprove={() => handleApprove('Narrative B')}
              onReject={() => handleReject('Narrative B')}
              onCopy={() => handleCopy(narrativeB)}
              showActions={!actedUponNarratives.includes('Narrative B')}
            />
          )}
        </div>

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
                Export
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
