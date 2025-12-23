'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { LoadingScreen } from '../narrative/LoadingScreen';
import { smfApi, narrativeApi } from '../../lib/api';
import { useToastContext } from '@/components/providers/ToastProvider';

export const SMFBuilderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [narrative, setNarrative] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [narrativeId, setNarrativeId] = useState<string | null>(null);
  const toast = useToastContext();

  useEffect(() => {
    // Get user ID from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.userId);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }

    // Check if narrativeId is provided in URL (from narrative generator)
    const urlNarrativeId = searchParams.get('narrativeId');
    if (urlNarrativeId) {
      setNarrativeId(urlNarrativeId);
      // Check if narrative content is in sessionStorage (from generated narrative page)
      const narrativeFromSession = sessionStorage.getItem('narrativeForSmf');
      if (narrativeFromSession) {
        setNarrative(narrativeFromSession);
        sessionStorage.removeItem('narrativeForSmf');
      } else {
        // Fetch narrative content if narrativeId is provided
        fetchNarrativeContent(urlNarrativeId);
      }
    }
  }, [router, searchParams]);

  const fetchNarrativeContent = async (id: string) => {
    try {
      const response = await narrativeApi.getDraft(id);
      if (response.success && response.data) {
        const draft = response.data;
        // Get the first version's content or use a default
        if (draft.versions && draft.versions.length > 0) {
          setNarrative(draft.versions[0].content);
        } else {
          // If no versions, construct from draft fields
          const constructedNarrative = [
            `On ${draft.date} at ${draft.time}, officers with call sign ${draft.callSign} attended ${draft.location}.`,
            draft.victim ? `Victim: ${draft.victim}.` : '',
            draft.suspect ? `Suspect: ${draft.suspect}.` : '',
            draft.reasonForAttendance ? `Reason for attendance: ${draft.reasonForAttendance}.` : '',
            draft.details ? `Details: ${draft.details}.` : '',
            draft.outcome ? `Outcome: ${draft.outcome}.` : '',
          ].filter(Boolean).join(' ');
          setNarrative(constructedNarrative);
        }
      }
    } catch (error) {
      console.error('Error fetching narrative:', error);
      // Don't show error, just leave narrative empty
    }
  };

  const handleGenerate = async () => {
    if (!narrative.trim()) {
      toast.warning('Please enter a narrative to generate SMF');
      return;
    }
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await smfApi.generate({
        userId,
        narrativeId: narrativeId || undefined,
        narrative: narrative.trim(),
      });

      if (response.success && response.data) {
        // Store SMF ID in sessionStorage for the draft statement page
        sessionStorage.setItem('currentSmfId', response.data.smfId);
        // Navigate to draft statement page
        router.push(`/draft-statement?smfId=${response.data.smfId}`);
      } else {
        toast.error(response.message || 'Failed to generate SMF');
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Generate SMF error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    toast.info('Generation cancelled by user');
  };

  if (isGenerating) {
    return <LoadingScreen onStop={handleStopGeneration} />;
  }

  return (
    <div className="bg-white font-dm-sans flex flex-col px-6 py-8 pb-24">

      {/* Main Content */}
      <div className="flex-1 ">
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-blue-primary font-dm-sans">
              Statement of Material Facts Builder
            </h1>
            <p className="text-lg font-medium text-text-gray font-dm-sans">
              Convert narratives into court-ready SMFs
            </p>
          </div>

          {/* Narrative Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-md font-semibold text-blue-primary font-dm-sans">
                Narrative
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-placeholder-gray z-10">
                  <TextIcon />
                </div>
                <textarea
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  placeholder="Aa Paste narrative here..."
                  className="w-full min-h-[200px] md:min-h-[400px] lg:min-h-[500px] px-3 py-3 pl-10 rounded-lg bg-light-gray border border-placeholder-gray focus:outline-none transition-colors duration-200 text-sm font-medium font-dm-sans text-blue-primary placeholder-placeholder-gray resize-none"
                  rows={15}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-placeholder-gray/20 p-4">
            <div className="max-w-2xl mx-auto">
              <Button
                variant="badge"
                size="lg"
                onClick={handleGenerate}
                disabled={!narrative.trim()}
                className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-4 font-medium font-dm-sans disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Generate
              </Button>
            </div>
          </div>
      </div>
  );
};
