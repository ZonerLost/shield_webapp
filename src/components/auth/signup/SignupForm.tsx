'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { UserIcon, MailIcon, LockIcon } from '../../ui/Icons';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions'),
});

export const SignupForm = () => {
  const router = useRouter();

  const initialValues: SignupFormData = {
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  };

  const handleSubmit = async (values: SignupFormData) => {
    try {
      console.log('Signup form submitted:', values);
      // Handle signup logic here
      // For now, redirect to login page
      router.push('/verify-email');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-left mb-8">
        <h1 className="text-2xl font-bold text-blue-primary mb-2 font-dm-sans text-left mx-auto">
          Create your Shield AI account
        </h1>
        <p className="text-text-gray text-md font-normal font-dm-sans text-left mx-auto">
          Create your account for instant access to legislation and guidance.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, errors, touched, handleChange, setFieldValue, setFieldTouched }) => (
          <Form className="space-y-6" noValidate>
            {/* Full Name Field */}
            <div className="space-y-2">
              <Input
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                icon={<UserIcon />}
                value={values.fullName}
                onChange={(value) => {
                  handleChange({ target: { name: 'fullName', value } });
                  if (value === '') {
                    setFieldTouched('fullName', false);
                  }
                }}
                error={touched.fullName && errors.fullName ? errors.fullName : undefined}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Input
                type="email"
                label="Work Email Address"
                placeholder="you@example.com"
                icon={<MailIcon />}
                value={values.email}
                onChange={(value) => {
                  handleChange({ target: { name: 'email', value } });
                  if (value === '') {
                    setFieldTouched('email', false);
                  }
                }}
                error={touched.email && errors.email ? errors.email : undefined}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                icon={<LockIcon />}
                showInfoIcon={true}
                tooltipText="Enter your account password to sign in"
                value={values.password}
                onChange={(value) => {
                  handleChange({ target: { name: 'password', value } });
                  if (value === '') {
                    setFieldTouched('password', false);
                  }
                }}
                error={touched.password && errors.password ? errors.password : undefined}
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={values.agreeToTerms}
                  onChange={(e) => setFieldValue('agreeToTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-primary bg-white border-2 border-placeholder-gray rounded"
                />
                <label htmlFor="agreeToTerms" className="text-sm font-medium text-dark-blue font-dm-sans">
                  I have read and agree to Shield AI&apos;s Terms & Conditions & Privacy Policies.
                </label>
              </div>
              {touched.agreeToTerms && errors.agreeToTerms && (
                <p className="text-sm text-red-500 font-dm-sans">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="badge"
              size="lg"
              className="w-full"
            >
              Start Playing
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
