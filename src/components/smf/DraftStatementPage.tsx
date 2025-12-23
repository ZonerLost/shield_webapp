'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo, MenuIcon, MoreDotsIcon, TextIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { ExportDropdown } from '../ui/ExportDropdown';
import { smfApi } from '../../lib/api';
import { useToastContext } from '@/components/providers/ToastProvider';

export const DraftStatementPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [draftStatement, setDraftStatement] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [smfId, setSmfId] = useState<string | null>(null);
  const toast = useToastContext();

  useEffect(() => {
    // Get SMF ID from URL or sessionStorage
    const urlSmfId = searchParams.get('smfId');
    const sessionSmfId = sessionStorage.getItem('currentSmfId');
    const currentSmfId = urlSmfId || sessionSmfId;

    if (currentSmfId) {
      setSmfId(currentSmfId);
      fetchSmf(currentSmfId);
    } else {
      toast.error('No SMF ID found');
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const fetchSmf = async (id: string) => {
    try {
      const response = await smfApi.getSmf(id);
      if (response.success && response.data) {
        setDraftStatement(response.data.content || '');
      } else {
        toast.error(response.message || 'Failed to load SMF');
      }
    } catch (error) {
      console.error('Error fetching SMF:', error);
      toast.error('Failed to load SMF');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleSave = async (showFeedback = false) => {
    if (!smfId || !draftStatement.trim()) return;
    
    try {
      // Save the edited content back to the backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/smf/${smfId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: draftStatement.trim(),
        }),
      });

      if (response.ok) {
        if (showFeedback) {
          toast.success('SMF saved successfully!');
        }
      } else {
        console.error('Failed to save SMF');
        toast.error('Failed to save SMF');
      }
    } catch (error) {
      console.error('Error saving SMF:', error);
    }
  };

  // Auto-save after user stops typing for 2 seconds
  useEffect(() => {
    if (!smfId || !draftStatement || isLoading) return;

    const timeoutId = setTimeout(() => {
      handleSave(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftStatement, smfId]);

  const handleExport = async () => {
    if (!smfId || !draftStatement) return;
    // Save before exporting
    await handleSave();
    
    // Export as PDF only
    await handlePDFExport();
  };

  const handlePDFExport = async () => {
    if (!smfId || !draftStatement) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/smf/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          smfId,
          content: draftStatement,
          format: 'pdf',
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `smf_${smfId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('SMF exported as PDF successfully!');
      } else {
        console.error('Export failed');
        toast.error('Failed to export SMF');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export SMF');
    }
    handleDropdownClose();
  };

  const handleCopy = () => {
    if (!draftStatement) return;
    navigator.clipboard.writeText(draftStatement);
    handleDropdownClose();
  };

  const handleRegenerate = () => {
    // Navigate back to SMF builder with the same narrative
    router.push('/smf-builder');
    handleDropdownClose();
  };

  // Dropdown options without SMF Builder
  const dropdownOptions = [
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
              Draft
            </h1>
           
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-text-gray font-dm-sans">Loading statement...</p>
            </div>
          )}

          {/* Statement Section */}
          {!isLoading && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-dark-blue font-dm-sans">
                  Statement
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-placeholder-gray z-10">
                    <TextIcon />
                  </div>
                  <textarea
                    value={draftStatement}
                    onChange={(e) => setDraftStatement(e.target.value)}
                    placeholder="Statement of Material Facts will appear here..."
                    className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] px-4 py-4 pl-12 rounded-xl bg-light-gray border border-placeholder-gray/20 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent transition-all text-sm leading-relaxed font-medium font-dm-sans text-dark-blue placeholder-placeholder-gray resize-y"
                    rows={20}
                    style={{ lineHeight: '1.75' }}
                  />
                </div>
                {/* Character count */}
                <div className="flex items-center justify-end">
                  <div className="text-xs text-text-gray font-dm-sans">
                    {draftStatement.length} characters
                  </div>
                </div>
              </div>
            </div>
          )}

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
