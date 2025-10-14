"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { LockIcon } from "../../ui/Icons";
import { useRouter } from "next/navigation";

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
  const initialValues: ResetPasswordFormValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const router = useRouter();

  const handleSubmit = (values: ResetPasswordFormValues) => {
    console.log("Reset password attempt:", values);
    // Handle password reset logic here
    router.push("/login");
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

            <div className="pt-4">
              <Button
                type="submit"
                variant="badge"
                size="md"
                className="w-full"
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
