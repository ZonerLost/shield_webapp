"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../../ui/Input";
import { TextArea } from "../../../ui/TextArea";
import { Dropdown } from "../../../ui/Dropdown";
import { FileUpload } from "../../../ui/FileUpload";
import { Button } from "../../../ui/Button";
import { MailIcon, MessageIcon, TagIcon } from "../../../ui/Icons";

interface ContactFormValues {
  email: string;
  category: string;
  message: string;
  attachment: File | null;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  category: Yup.string()
    .required("Category is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const categoryOptions = [
  { value: "legal-chatbot", label: "Legal chatbot response" },
  { value: "technical-issue", label: "Technical issue" },
  { value: "billing", label: "Billing inquiry" },
  { value: "feature-request", label: "Feature request" },
  { value: "other", label: "Other" },
];

export const ContactPage = () => {
  const initialValues: ContactFormValues = {
    email: "",
    category: "",
    message: "",
    attachment: null,
  };

  const handleSubmit = (values: ContactFormValues) => {
    console.log("Contact form submitted:", values);
    // TODO: Implement API call to submit contact form
  };

  return (
    <div className="py-8 px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-blue-primary font-dm-sans">
            Contact Us
          </h1>
          <p className="text-lg text-text-gray font-medium font-dm-sans">
            Find guides or report issues.
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
              {/* Email */}
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                icon={<MailIcon />}
                value={values.email}
                onChange={(value) => {
                  handleChange({ target: { name: "email", value } });
                  if (value === "") {
                    setFieldTouched("email", false);
                  }
                }}
                error={touched.email && errors.email ? errors.email : undefined}
              />

              {/* Category */}
              <Dropdown
                options={categoryOptions}
                value={values.category}
                icon={<TagIcon />}
                onChange={(value) => {
                  setFieldValue("category", value);
                }}
                placeholder="Select Category i.e Legal chatbot response"
                error={touched.category && errors.category ? errors.category : undefined}
              />

              {/* Message */}
              <TextArea
                label="Message"
                placeholder="Write your message here"
                icon={<MessageIcon />}
                value={values.message}
                onChange={(value) => {
                  handleChange({ target: { name: "message", value } });
                  if (value === "") {
                    setFieldTouched("message", false);
                  }
                }}
                rows={6}
                error={touched.message && errors.message ? errors.message : undefined}
              />

              {/* File Upload */}
              <FileUpload
                label="Add Attachment (Optional)"
                onFileSelect={(file) => {
                  setFieldValue("attachment", file);
                }}
              />
            </Form>
          )}
        </Formik>

        {/* Submit Button - Fixed at bottom */}
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
              Submit report
            </Button>
          </div>
        </div>

        {/* Bottom padding to prevent content from being hidden behind fixed button */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};
