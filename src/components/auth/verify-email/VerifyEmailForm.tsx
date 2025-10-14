'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../ui/Button';
import { OTPInput } from '../../ui/OTPInput';

interface VerifyEmailFormData {
  otp: string;
}

const validationSchema = Yup.object({
  otp: Yup.string()
    .required('Verification code is required')
    .length(6, 'Verification code must be 6 digits')
    .matches(/^\d{6}$/, 'Verification code must contain only numbers'),
});

export const VerifyEmailForm = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const initialValues: VerifyEmailFormData = {
    otp: '',
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (values: VerifyEmailFormData) => {
    try {
      console.log('Verification code submitted:', values.otp);
      // Handle verification logic here
      // Redirect to role setup page
      router.push('/role-setup');
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      console.log('Resending verification code...');
      setTimeLeft(30);
      setCanResend(false);
      // Handle resend logic here
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-start mb-8">
        <h1 className="text-2xl font-bold text-blue-primary mb-2 font-dm-sans">
          Verify your email
        </h1>
        <p className="text-text-gray text-xl font-medium font-dm-sans">
          We&apos;ve sent a verification link to your email. Please confirm to activate your Shield AI account.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <Form className="space-y-6" noValidate>
            {/* OTP Input */}
            <div className="space-y-4">
              <OTPInput
                value={values.otp}
                onChange={(value) => {
                  setFieldValue('otp', value);
                  if (value === '') {
                    setFieldTouched('otp', false);
                  }
                }}
                error={touched.otp && errors.otp ? errors.otp : undefined}
              />
            </div>

            {/* Resend Code */}
            <div className="text-center py-6">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-light-blue font-medium hover:text-dark-blue transition-colors font-dm-sans"
                >
                  Resend Code
                </button>
              ) : (
                <p className="text-sm text-text-gray font-dm-sans">
                  {formatTime(timeLeft)} Sec - Resend Code
                </p>
              )}
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              variant="badge"
              size="lg"
              className="w-full"
            >
              Verify
            </Button>
          </Form>
        )}
      </Formik>

      <div className="text-center mt-6">
        <p className="text-md text-text-gray font-dm-sans">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-light-blue font-medium hover:text-dark-blue transition-colors font-dm-sans"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
