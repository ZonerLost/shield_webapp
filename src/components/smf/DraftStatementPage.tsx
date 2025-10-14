'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo, MenuIcon, MoreDotsIcon, TextIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { ExportDropdown } from '../ui/ExportDropdown';

export const DraftStatementPage = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const draftStatement = "On 15/09/2025 at 22:35, officers with call sign Delta 23 attended 45 Murray Street, Perth WA after a report of disturbance at a licensed premises. The suspect, MICHAEL BROWN (DOB 25/11/1990), was observed involved in a physical altercation with the victim, JOHN SMITH (DOB 12/03/1989). Security staff had separated both parties. CCTV footage was obtained and one broken glass seized. The victim sustained minor facial injuries treated by paramedics. The suspect was arrested for assault.";

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleExport = () => {
    console.log('Exporting draft statement...');
    // Handle export logic
  };

  const handleWordExport = () => {
    console.log('Exporting to Word...');
    handleDropdownClose();
  };

  const handlePDFExport = () => {
    console.log('Exporting to PDF...');
    handleDropdownClose();
  };

  const handleCopy = () => {
    console.log('Copying statement...');
    handleDropdownClose();
  };

  const handleRegenerate = () => {
    console.log('Regenerating statement...');
    handleDropdownClose();
  };

  // Dropdown options without SMF Builder
  const dropdownOptions = [
    {
      icon: <TextIcon />,
      label: 'Export to Word',
      onClick: handleWordExport,
    },
    {
      icon: <TextIcon />,
      label: 'Export to PDF',
      onClick: handlePDFExport,
    },
    {
      icon: <TextIcon />,
      label: 'Copy',
      onClick: handleCopy,
    },
    {
      icon: <TextIcon />,
      label: 'Regenerate',
      onClick: handleRegenerate,
    },
  ];

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

        {/* Right side - 3 dots */}
        <div className="flex items-center">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-blue-primary font-dm-sans">
              Draft Statement
            </h1>
            <p className="text-lg font-medium text-text-gray font-dm-sans">
              Review the AI Statement of Material Facts. Edit before exporting.
            </p>
          </div>

          {/* Statement Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark-blue font-dm-sans">
                Statement
              </label>
              <div className="bg-light-gray rounded-xl p-4 border border-placeholder-gray/20">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-icons-bg rounded-lg flex items-center justify-center">
                    <TextIcon />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark-blue font-dm-sans whitespace-pre-wrap">
                      {draftStatement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="text-left mt-8">
            <p className="text-base font-semibold text-text-gray font-dm-sans">
              <b>Note:</b> Ensure details are accurate and complete before exporting.
            </p>
          </div>
        </div>
      </div>

      {/* Export Button - Fixed at bottom */}
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
    </div>
  );
};
