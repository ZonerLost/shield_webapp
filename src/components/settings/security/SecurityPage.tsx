"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { LockIcon } from "../../ui/Icons";
import { authApi } from "../../../lib/api";
import { useToastContext } from "@/components/providers/ToastProvider";

interface SecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and numbers"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const SecurityPage = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const toast = useToastContext();

  const initialValues: SecurityFormValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

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
  }, [router]);

  const handleSubmit = async (values: SecurityFormValues) => {
    if (!userId) return;

    setIsSaving(true);

    try {
      const response = await authApi.changePassword(userId, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.success) {
        toast.success('Password changed successfully!');
        // Reset form
        setTimeout(() => {
          window.location.reload(); // Reload to clear form
        }, 2000);
      } else {
        toast.error(response.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Change password error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-8 px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-blue-primary font-dm-sans">
            Security & Access
          </h1>
          <p className="text-text-gray text-lg font-medium font-dm-sans">
            Manage login and authentication options.
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
              {/* Current Password */}
              <Input
                type="password"
                label="Current Password"
                placeholder="Enter your current password"
                icon={<LockIcon />}
                showInfoIcon={true}
                tooltipText="Enter your current password to verify your identity"
                value={values.currentPassword}
                onChange={(value) => {
                  handleChange({ target: { name: "currentPassword", value } });
                  if (value === "") {
                    setFieldTouched("currentPassword", false);
                  }
                }}
                error={touched.currentPassword && errors.currentPassword ? errors.currentPassword : undefined}
              />

              {/* New Password */}
              <Input
                type="password"
                label="New Password"
                placeholder="Enter your new password"
                icon={<LockIcon />}
                showInfoIcon={true}
                tooltipText="Password must be at least 8 characters with uppercase, lowercase, and numbers"
                value={values.newPassword}
                onChange={(value) => {
                  handleChange({ target: { name: "newPassword", value } });
                  if (value === "") {
                    setFieldTouched("newPassword", false);
                  }
                }}
                error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
              />

              {/* Confirm Password */}
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your new password"
                icon={<LockIcon />}
                showInfoIcon={true}
                tooltipText="Re-enter your new password to confirm it matches"
                value={values.confirmPassword}
                onChange={(value) => {
                  handleChange({ target: { name: "confirmPassword", value } });
                  if (value === "") {
                    setFieldTouched("confirmPassword", false);
                  }
                }}
                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
              />

              {/* Save Button - Fixed at bottom */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-placeholder-gray/20 p-6 -mx-6">
                <div className="max-w-md mx-auto">
                  <Button
                    type="submit"
                    variant="badge"
                    size="lg"
                    className="w-full"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Changing Password...' : 'Save'}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        {/* Bottom padding to prevent content from being hidden behind fixed button */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};
