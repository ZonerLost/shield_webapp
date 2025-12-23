"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Dropdown } from "../../ui/Dropdown";
import { Button } from "../../ui/Button";
import { TagIcon } from "@/components/ui/Icons";
import { useToastContext } from "@/components/providers/ToastProvider";

interface AppPreferencesFormValues {
  notificationSettings: string;
  autosaveInterval: string;
}

const validationSchema = Yup.object({
  notificationSettings: Yup.string().required("Notification setting is required"),
  autosaveInterval: Yup.string().required("Autosave interval is required"),
});

const notificationOptions = [
  { value: "enable-reminders", label: "Enable reminders" },
  { value: "disable-reminders", label: "Disable reminders" },
  { value: "important-only", label: "Important only" },
];

// Export format is now fixed to PDF only

const autosaveIntervalOptions = [
  { value: "45s", label: "45s (default)" },
  { value: "30s", label: "30s" },
  { value: "60s", label: "60s" },
  { value: "90s", label: "90s" },
  { value: "disabled", label: "Disabled" },
];

export const AppPreferencesPage = () => {
  const toast = useToastContext();

  // Load preferences from localStorage if available
  const getInitialValues = (): AppPreferencesFormValues => {
    const saved = localStorage.getItem('appPreferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          notificationSettings: parsed.notificationSettings || "enable-reminders",
          autosaveInterval: parsed.autosaveInterval || "45s",
        };
      } catch (e) {
        console.error('Error parsing saved preferences:', e);
      }
    }
    return {
    notificationSettings: "enable-reminders",
      autosaveInterval: "45s",
    };
  };

  const initialValues: AppPreferencesFormValues = getInitialValues();

  const handleSubmit = (values: AppPreferencesFormValues) => {
    console.log("App preferences submitted:", values);
    // Save preferences to localStorage
    localStorage.setItem('appPreferences', JSON.stringify({
      notificationSettings: values.notificationSettings,
      autosaveInterval: values.autosaveInterval,
    }));
    toast.success('Preferences saved successfully!');
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
              {/* Language - Read Only */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-blue-primary font-dm-sans mb-2">
                  Language
                </h2>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <TagIcon />
                  </div>
                  <input
                    type="text"
                    value="English (default)"
                    readOnly
                    className="w-full pl-10 pr-4 py-3 border-2 border-placeholder-gray rounded-lg bg-placeholder-gray/10 text-text-gray font-dm-sans cursor-not-allowed"
                  />
                </div>
                
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

              {/* Default Export Format - Read Only (PDF only) */}
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-blue-primary font-dm-sans mb-2">
                  Default Export Format
                </h2>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <TagIcon />
                  </div>
                  <input
                    type="text"
                    value="PDF (default)"
                    readOnly
                    className="w-full pl-10 pr-4 py-3 border-2 border-placeholder-gray rounded-lg bg-placeholder-gray/10 text-text-gray font-dm-sans cursor-not-allowed"
                  />
                </div>
                
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
