'use client';

import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { UserIcon } from '../../ui/Icons';
import { LockIcon } from '../../ui/Icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api';
import { useToastContext } from '@/components/providers/ToastProvider';

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const LoginForm = () => {
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToastContext();

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await authApi.login({
        email: values.email,
        password: values.password,
      });

      if (response.success && response.data) {
        const data = response.data as { token?: string; user?: unknown };
        if (data.token) {
          // Store JWT token in localStorage
          localStorage.setItem('authToken', data.token);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          // Show success toast
          toast.success('Logged in successfully!');
          // Redirect to dashboard
          router.push('/dashboard');
        } else {
          toast.error('Login failed. No token received.');
        }
      } else {
        toast.error(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-left mb-8">
        <h1 className="text-2xl font-bold text-blue-primary mb-2 font-dm-sans text-left mx-auto">
          Welcome back to Shield AI
        </h1>
        <p className="text-text-gray text-md font-normal font-dm-sans text-left mx-auto">
          Log in to access legislation fast, stay compliant, and act with confidence.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, errors, touched, handleChange, setFieldTouched }) => (
          <Form className="space-y-6" noValidate>
            <Input
              type="email"
              label="Work Email"
              placeholder="Enter your work email"
              icon={<UserIcon />}
              value={values.email}
              onChange={(value) => {
                handleChange({ target: { name: 'email', value } });
                if (value === '') {
                  setFieldTouched('email', false);
                }
              }}
              error={touched.email && errors.email ? errors.email : undefined}
            />

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
              
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-primary hover:text-dark-blue transition-colors font-dm-sans"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="badge"
              size="md"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="text-center mt-6">
        <p className="text-md text-text-gray font-dm-sans">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-primary font-medium hover:text-dark-blue transition-colors font-dm-sans"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};