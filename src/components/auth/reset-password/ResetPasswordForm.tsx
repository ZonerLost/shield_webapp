"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { LockIcon } from "../../ui/Icons";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "../../../lib/api";
import { useToastContext } from "@/components/providers/ToastProvider";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const toast = useToastContext();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      toast.error("Invalid reset link. Please request a new password reset.");
      setTokenError("Invalid reset link. Please request a new password reset.");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, toast]);

  const initialValues: ResetPasswordFormValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Invalid reset token. Please request a new password reset.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.resetPassword({
        token,
        newPassword: values.newPassword,
      });

      if (response.success) {
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back Button */}
      <button 
        className="mb-6 flex items-center text-white hover:text-gray-200 transition-colors"
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-left mb-8">
        <h1 className="text-2xl font-bold text-blue-primary mb-2 font-dm-sans text-left">
          Reset Your Password
        </h1>
        <p className="text-text-gray text-md font-normal font-dm-sans text-left">
          Use a new, strong password to secure your account.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
        }) => (
          <Form className="space-y-6" noValidate>
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

            {tokenError && (
              <div className="text-sm text-red-500 font-dm-sans text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {tokenError}
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                variant="badge"
                size="md"
                className="w-full"
                disabled={isSubmitting || !!tokenError}
              >
                {isSubmitting ? "Resetting..." : "Reset"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
