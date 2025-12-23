"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { UserIcon } from "../../ui/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "../../../lib/api";
import { useToastContext } from "@/components/providers/ToastProvider";

interface ForgotPasswordFormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ForgotPasswordForm = () => {
  const initialValues: ForgotPasswordFormValues = {
    email: "",
  };
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToastContext();

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await authApi.forgotPassword({
        email: values.email,
      });

      if (response.success) {
        toast.success("Password reset link sent successfully. Please check your email.");
        // Optionally redirect after a delay
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        toast.error(response.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-left mb-8">
        <h1 className="text-2xl font-bold text-blue-primary mb-2 font-dm-sans text-left">
          Forgot Your Password?
        </h1>
        <p className="text-text-gray text-md font-normal font-dm-sans text-left">
          Enter your email, and we&apos;ll send a link to reset your password.
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
              type="email"
              label="Work Email"
              placeholder="e.g. Jandoe@gmail.com"
              icon={<UserIcon />}
              value={values.email}
              onChange={(value) => {
                handleChange({ target: { name: "email", value } });
                if (value === "") {
                  setFieldTouched("email", false);
                }
              }}
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <div className="pt-4">
              <Button
                type="submit"
                variant="badge"
                size="md"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>

            {/* OR Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-text-gray"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-text-gray">OR</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Back to Log In
            </Button>
          </Form>
        )}
      </Formik>

      <div className="text-center mt-6">
        <p className="text-md text-text-gray font-dm-sans">
          Remember your credentials?{" "}
          <Link
            href="/login"
            className="text-blue-primary font-medium hover:text-dark-blue transition-colors font-dm-sans"
          >
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};
