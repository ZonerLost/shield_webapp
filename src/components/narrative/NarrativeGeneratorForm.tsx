'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { LoadingScreen } from './LoadingScreen';

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

  const handleSubmit = (values: FormData) => {
    console.log('Generating narrative with data:', values);
    setIsGenerating(true);
    
    // Simulate 8 seconds of generation time
    setTimeout(() => {
      setIsGenerating(false);
      // Redirect to generated narrative page
      router.push('/generated-narrative');
    }, 8000);
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    console.log('Generation stopped by user');
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
          {({ values, errors, touched, handleChange, setFieldTouched }) => (
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
          )}
        </Formik>
    </div>
  );
};