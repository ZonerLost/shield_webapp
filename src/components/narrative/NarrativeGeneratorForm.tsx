'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { LoadingScreen } from './LoadingScreen';
import { narrativeApi } from '../../lib/api';
import { v4 as uuidv4 } from 'uuid';
import { useToastContext } from '@/components/providers/ToastProvider';

interface FormData {
  incidentDate: string;
  time: string;
  location: string;
  callSign: string;
  victim: string;
  suspect: string;
  witnesses: string;
  reasonForAttendance: string;
  details: string;
  antecedents: string;
  exhibits: string;
  outcome: string;
}

const step1Schema = Yup.object({
  incidentDate: Yup.string().required('Incident date is required'),
  time: Yup.string().required('Time is required'),
  location: Yup.string().required('Location is required'),
  callSign: Yup.string().required('Call sign is required'),
});

const step2Schema = Yup.object({
  victim: Yup.string().required('Victim information is required'),
  suspect: Yup.string().required('Suspect information is required'),
  witnesses: Yup.string().required('Witness information is required'),
});

const validationSchema = Yup.object({
  incidentDate: Yup.string().required('Incident date is required'),
  time: Yup.string().required('Time is required'),
  location: Yup.string().required('Location is required'),
  callSign: Yup.string().required('Call sign is required'),
  victim: Yup.string().required('Victim information is required'),
  suspect: Yup.string().required('Suspect information is required'),
  witnesses: Yup.string().required('Witness information is required'),
  reasonForAttendance: Yup.string().required('Reason for attendance is required'),
  details: Yup.string().required('Details are required'),
  exhibits: Yup.string().required('Exhibits information is required'),
  outcome: Yup.string().required('Outcome is required'),
});

export const NarrativeGeneratorForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [draftId, setDraftId] = useState<string>('');
  const autosaveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutosaveValuesRef = useRef<string>('');
  const formValuesRef = useRef<FormData | null>(null);
  const toast = useToastContext();

  const initialValues: FormData = {
    incidentDate: '',
    time: '',
    location: '',
    callSign: '',
    victim: '',
    suspect: '',
    witnesses: '',
    reasonForAttendance: '',
    details: '',
    antecedents: '',
    exhibits: '',
    outcome: ''
  };

  useEffect(() => {
    // Get user ID from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.userId);
        // Generate a new draftId for this session
        setDraftId(uuidv4());
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleNext = async (values: FormData, setFieldTouched: (field: string, touched: boolean) => void) => {
    let isValid = true;
    
    if (currentStep === 1) {
      try {
        await step1Schema.validate({
          incidentDate: values.incidentDate,
          time: values.time,
          location: values.location,
          callSign: values.callSign,
        }, { abortEarly: false });
      } catch (error: unknown) {
        isValid = false;
        if (error && typeof error === 'object' && 'inner' in error) {
          (error as { inner: Array<{ path: string }> }).inner.forEach((err) => {
            setFieldTouched(err.path, true);
          });
        }
      }
    } else if (currentStep === 2) {
      try {
        await step2Schema.validate({
          victim: values.victim,
          suspect: values.suspect,
          witnesses: values.witnesses,
        }, { abortEarly: false });
      } catch (error: unknown) {
        isValid = false;
        if (error && typeof error === 'object' && 'inner' in error) {
          (error as { inner: Array<{ path: string }> }).inner.forEach((err) => {
            setFieldTouched(err.path, true);
          });
        }
      }
    }
    
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Format date from mm/dd/yyyy to yyyy-mm-dd or keep as is
  const formatDateForAPI = (dateStr: string): string => {
    // If already in yyyy-mm-dd format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    // If in mm/dd/yyyy format, convert to yyyy-mm-dd
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [month, day, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // Return as is if format is unknown
    return dateStr;
  };

  // Auto-save function
  const performAutosave = async (values: FormData) => {
    if (!userId || !draftId) return;

    // Check if values have changed
    const valuesStr = JSON.stringify(values);
    
    if (valuesStr === lastAutosaveValuesRef.current) {
      return; // No changes, skip autosave
    }

    // Only autosave if we have some meaningful data
    const hasData = values.callSign || values.location || values.victim || values.details;
    if (!hasData) {
      return;
    }

    try {
      await narrativeApi.autosave(draftId, {
        userId,
        callSign: values.callSign || '',
        date: values.incidentDate ? formatDateForAPI(values.incidentDate) : '',
        time: values.time || '',
        location: values.location || '',
        victim: values.victim || '',
        suspect: values.suspect || '',
        witnesses: values.witnesses || '',
        reasonForAttendance: values.reasonForAttendance || '',
        details: values.details || '',
        antecedents: values.antecedents || '',
        exhibits: values.exhibits || '',
        outcome: values.outcome || '',
      });
      lastAutosaveValuesRef.current = valuesStr;
    } catch (error) {
      console.error('Autosave failed:', error);
      // Don't show error to user for autosave failures
    }
  };

  // Set up auto-save interval
  useEffect(() => {
    if (userId && draftId) {
      // Start auto-save every 2 seconds
      autosaveIntervalRef.current = setInterval(() => {
        if (formValuesRef.current) {
          performAutosave(formValuesRef.current);
        }
      }, 2000);

      return () => {
        if (autosaveIntervalRef.current) {
          clearInterval(autosaveIntervalRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, draftId]);

  const handleSubmit = async (values: FormData) => {
    if (!userId || !draftId) {
      toast.error('User not authenticated');
      return;
    }

    // Validate all required fields are filled (not empty or just whitespace)
    const requiredFields = {
      callSign: values.callSign?.trim(),
      date: values.incidentDate?.trim(),
      time: values.time?.trim(),
      location: values.location?.trim(),
      victim: values.victim?.trim(),
      suspect: values.suspect?.trim(),
      reasonForAttendance: values.reasonForAttendance?.trim(),
      details: values.details?.trim(),
      outcome: values.outcome?.trim(),
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value || value.length === 0)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsGenerating(true);

    try {
      const response = await narrativeApi.generate({
        userId,
        draftId,
        callSign: requiredFields.callSign!,
        date: formatDateForAPI(requiredFields.date!),
        time: requiredFields.time!,
        location: requiredFields.location!,
        victim: requiredFields.victim!,
        suspect: requiredFields.suspect!,
        witnesses: values.witnesses?.trim() || '',
        reasonForAttendance: requiredFields.reasonForAttendance!,
        details: requiredFields.details!,
        antecedents: values.antecedents?.trim() || '',
        exhibits: values.exhibits,
        outcome: requiredFields.outcome!,
        options: { versionCount: 1 },
      });

      if (response.success && response.data) {
        // Store draftId in sessionStorage for the generated narrative page
        sessionStorage.setItem('currentDraftId', response.data.draftId || draftId);
        // Show success toast
        toast.success('Narrative generated successfully!');
        // Navigate to generated narrative page
        router.push(`/generated-narrative?draftId=${response.data.draftId || draftId}`);
      } else {
        // Show error message
        toast.error(response.message || 'Failed to generate narrative');
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Generate narrative error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    toast.error('Generation cancelled by user');
  };

  const isStepValid = (step: number, values: FormData): boolean => {
    switch (step) {
      case 1:
        return !!(values.incidentDate && values.time && values.location && values.callSign);
      case 2:
        return !!(values.victim && values.suspect && values.witnesses);
      case 3:
        return !!(values.reasonForAttendance && values.details && values.exhibits && values.outcome);
      default:
        return false;
    }
  };

  const renderStep = (values: FormData, errors: Record<string, string>, touched: Record<string, boolean>, handleChange: (event: { target: { name: string; value: string } }) => void, setFieldTouched: (field: string, touched: boolean) => void) => {
    const isCurrentStepValid = isStepValid(currentStep, values);
    
    switch (currentStep) {
      case 1:
        return <Step1 onNext={() => handleNext(values, setFieldTouched)} values={values} errors={errors} touched={touched} handleChange={handleChange} setFieldTouched={setFieldTouched} isStepValid={isCurrentStepValid} />;
      case 2:
        return <Step2 onNext={() => handleNext(values, setFieldTouched)} values={values} errors={errors} touched={touched} handleChange={handleChange} setFieldTouched={setFieldTouched} isStepValid={isCurrentStepValid} />;
      case 3:
        return <Step3 onGenerate={() => handleSubmit(values)} values={values} errors={errors} touched={touched} handleChange={handleChange} setFieldTouched={setFieldTouched} isStepValid={isCurrentStepValid} />;
      default:
        return null;
    }
  };

  if (isGenerating) {
    return <LoadingScreen onStop={handleStopGeneration} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, setFieldTouched }) => {
            // Update form values ref for autosave
            formValuesRef.current = values;

            return (
              <Form className="space-y-6" noValidate>
                {/* Header Section */}
                <div className="text-left mb-8">
                  <h1 className="text-2xl font-bold text-blue-primary font-dm-sans">
                    Narrative Generator
                  </h1>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-text-gray font-dm-sans">
                      Turn quick notes into polished incident narratives.
                    </p>
                  </div>
                    <p className="text-base text-right font-semibold text-dark-gray font-dm-sans">
                      Step {currentStep} of 3
                    </p>
                </div>

                {/* Step Content */}
                {renderStep(values, errors, touched, handleChange, setFieldTouched)}
              </Form>
            );
          }}
        </Formik>
    </div>
  );
};