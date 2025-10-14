"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Dropdown } from "../../ui/Dropdown";
import { Button } from "../../ui/Button";
import { TagIcon } from "@/components/ui/Icons";

interface AppPreferencesFormValues {
  language: string;
  notificationSettings: string;
  textSize: string;
  defaultExportFormat: string;
  autosaveInterval: string;
}

const validationSchema = Yup.object({
  language: Yup.string().required("Language is required"),
  notificationSettings: Yup.string().required("Notification setting is required"),
  textSize: Yup.string().required("Text size is required"),
  defaultExportFormat: Yup.string().required("Export format is required"),
  autosaveInterval: Yup.string().required("Autosave interval is required"),
});

const languageOptions = [
  { value: "english", label: "English (default)" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
];

const notificationOptions = [
  { value: "enable-reminders", label: "Enable reminders" },
  { value: "disable-reminders", label: "Disable reminders" },
  { value: "important-only", label: "Important only" },
];

const textSizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium (for readability)" },
  { value: "large", label: "Large" },
  { value: "extra-large", label: "Extra Large" },
];

const exportFormatOptions = [
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "DOCX" },
  { value: "txt", label: "TXT" },
];

const autosaveIntervalOptions = [
  { value: "2s", label: "2s (default)" },
  { value: "5s", label: "5s" },
  { value: "10s", label: "10s" },
  { value: "30s", label: "30s" },
  { value: "disabled", label: "Disabled" },
];

export const AppPreferencesPage = () => {
  const initialValues: AppPreferencesFormValues = {
    language: "english",
    notificationSettings: "enable-reminders",
    textSize: "medium",
    defaultExportFormat: "pdf",
    autosaveInterval: "2s",
  };

  const handleSubmit = (values: AppPreferencesFormValues) => {
    console.log("App preferences submitted:", values);
    // TODO: Implement API call to save preferences
  };

  return (
    <div className="py-8 px-6 lg:py-12 lg:px-8">
      <div className="max-w-md mx-auto lg:max-w-2xl">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-4xl font-semibold text-blue-primary font-dm-sans">
            App Preferences
          </h1>
          <p className="text-lg lg:text-xl text-text-gray font-medium font-dm-sans mt-2">
            Customise theme, text, notifications.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="space-y-2 lg:space-y-8" noValidate>
              {/* Language */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-blue-primary font-dm-sans mb-2">
                  Language
                </h2>
                <Dropdown
                  options={languageOptions}
                  value={values.language}
                  onChange={(value) => setFieldValue("language", value)}
                  placeholder="Select Language"
                  error={touched.language && errors.language ? errors.language : undefined}
                  icon={<TagIcon />}
                />
              </div>

              {/* Notification Settings */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-blue-primary font-dm-sans mb-2">
                  Notification Settings
                </h2>
                <Dropdown
                  options={notificationOptions}
                  value={values.notificationSettings}
                  onChange={(value) => setFieldValue("notificationSettings", value)}
                  placeholder="Select Notification Setting"
                  error={touched.notificationSettings && errors.notificationSettings ? errors.notificationSettings : undefined}
                  icon={<TagIcon />}
                />
              </div>

              {/* Text Size */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-blue-primary font-dm-sans mb-2">
                  Text Size
                </h2>
                <Dropdown
                  options={textSizeOptions}
                  value={values.textSize}
                  onChange={(value) => setFieldValue("textSize", value)}
                  placeholder="Select Text Size"
                  error={touched.textSize && errors.textSize ? errors.textSize : undefined}
                  icon={<TagIcon />}
                />
              </div>

              {/* Default Export Format */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-blue-primary font-dm-sans mb-2">
                  Default Export Format
                </h2>
                <Dropdown
                  options={exportFormatOptions}
                  value={values.defaultExportFormat}
                  onChange={(value) => setFieldValue("defaultExportFormat", value)}
                  placeholder="Select Export Format"
                  error={touched.defaultExportFormat && errors.defaultExportFormat ? errors.defaultExportFormat : undefined}
                  icon={<TagIcon />}
                />
              </div>

              {/* Autosave Interval */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-blue-primary font-dm-sans mb-2">
                  Autosave Interval
                </h2>
                <Dropdown
                  options={autosaveIntervalOptions}
                  value={values.autosaveInterval}
                  onChange={(value) => setFieldValue("autosaveInterval", value)}
                  placeholder="Select Autosave Interval"
                  error={touched.autosaveInterval && errors.autosaveInterval ? errors.autosaveInterval : undefined}
                  icon={<TagIcon />}
                />
              </div>
            </Form>
          )}
        </Formik>

        {/* Save Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-placeholder-gray/20 p-6">
          <div className="max-w-md mx-auto lg:max-w-2xl">
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
              Save Changes
            </Button>
          </div>
        </div>

        {/* Bottom padding to prevent content from being hidden behind fixed button */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};
