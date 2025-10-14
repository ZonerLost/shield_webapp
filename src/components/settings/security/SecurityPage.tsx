"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { LockIcon } from "../../ui/Icons";

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
  const initialValues: SecurityFormValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: SecurityFormValues) => {
    console.log("Security form submitted:", values);
    // TODO: Implement API call to update password
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

            </Form>
          )}
        </Formik>

        {/* Save Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-placeholder-gray/20 p-6">
          <div className="max-w-md mx-auto">
            <Button
              type="submit"
              variant="badge"
              size="lg"
              className="w-full"
              onClick={() => {
                // Trigger form submission
                const form = document.querySelector('form');
                if (form) {
                  const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                  form.dispatchEvent(submitEvent);
                }
              }}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Bottom padding to prevent content from being hidden behind fixed button */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};
