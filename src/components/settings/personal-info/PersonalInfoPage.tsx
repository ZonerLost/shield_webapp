"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Avatar } from "../../ui/Avatar";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Dropdown } from "../../ui/Dropdown";
import { PhoneInput } from "../../ui/PhoneInput";
import { UserIcon, GenderIcon, EditIcon, MailIcon } from "../../ui/Icons";

interface PersonalInfoFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required"),
  gender: Yup.string()
    .required("Gender is required"),
  dateOfBirth: Yup.string()
    .required("Date of birth is required"),
});

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const PersonalInfoPage = () => {
  const initialValues: PersonalInfoFormValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  };

  const handleSubmit = (values: PersonalInfoFormValues) => {
    console.log("Form submitted:", values);
    // TODO: Implement API call to save personal info
  };

  return (
    <div className="py-8 px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-blue-primary font-dm-sans">
            Personal Info
          </h1>
          <p className="text-lg text-text-gray font-medium font-dm-sans">
            View your agency profile details.
          </p>
        </div>

        {/* Avatar Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Avatar 
              name="Jane Doe"
              size="3xl"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-icons-bg text-white rounded-full flex items-center justify-center shadow-lg hover:bg-icons-bg/90 transition-colors">
              <EditIcon />
            </button>
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, setFieldValue, setFieldTouched }) => (
            <Form className="space-y-6" noValidate>
              {/* Full Name */}
              <Input
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                icon={<UserIcon />}
                value={values.fullName}
                onChange={(value) => {
                  handleChange({ target: { name: "fullName", value } });
                  if (value === "") {
                    setFieldTouched("fullName", false);
                  }
                }}
                error={touched.fullName && errors.fullName ? errors.fullName : undefined}
              />

              {/* Email */}
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email address"
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

              {/* Phone Number */}
              <div>
                <label className="block text-md font-semibold text-blue-primary font-dm-sans mb-2">
                  Phone Number
                </label>
                <PhoneInput
                  value={values.phoneNumber}
                  onChange={(value) => {
                    setFieldValue("phoneNumber", value || "");
                    if (!value || value === "") {
                      setFieldTouched("phoneNumber", false);
                    }
                  }}
                  error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-md font-semibold text-blue-primary font-dm-sans mb-2">
                  Gender
                </label>
                <Dropdown
                  options={genderOptions}
                  value={values.gender}
                  onChange={(value) => {
                    setFieldValue("gender", value);
                    if (value === "") {
                      setFieldTouched("gender", false);
                    }
                  }}
                  placeholder="Select your gender"
                  error={touched.gender && errors.gender ? errors.gender : undefined}
                  icon={<GenderIcon />}
                />
              </div>

              {/* Date of Birth */}
              <Input
                type="date"
                label="Date Of Birth"
                placeholder="Select your date of birth"
                icon={<UserIcon />}
                value={values.dateOfBirth}
                onChange={(value) => {
                  handleChange({ target: { name: "dateOfBirth", value } });
                  if (value === "") {
                    setFieldTouched("dateOfBirth", false);
                  }
                }}
                error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
              />

              {/* Save Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="badge"
                  size="lg"
                  className="w-full"
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
