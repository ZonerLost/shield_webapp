"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Dropdown } from "../../ui/Dropdown";
import { PhoneInput } from "../../ui/PhoneInput";
import { UserIcon, GenderIcon, MailIcon } from "../../ui/Icons";
import { authApi } from "../../../lib/api";
import { useToastContext } from "@/components/providers/ToastProvider";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const toast = useToastContext();
  const [initialValues, setInitialValues] = useState<PersonalInfoFormValues>({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // Get userId from localStorage first
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        router.push('/login');
        return;
      }

      try {
        const user = JSON.parse(userStr);
        const userId = user.userId;
        
        if (!userId) {
          router.push('/login');
          return;
        }

        setUserId(userId);

        // Fetch latest user data from backend
        const response = await authApi.getUser(userId);

        if (response.success && response.data && typeof response.data === 'object' && 'user' in response.data) {
          const userData = (response.data as { user: { fullName?: string; email?: string; phoneNumber?: string; gender?: string; dateOfBirth?: string } }).user;
          setInitialValues({
            fullName: userData.fullName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            gender: userData.gender || "",
            dateOfBirth: userData.dateOfBirth || "",
          });
        } else {
          // Fallback to localStorage if API fails
          setInitialValues({
            fullName: user.fullName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            gender: user.gender || "",
            dateOfBirth: user.dateOfBirth || "",
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to localStorage on error
        const user = JSON.parse(userStr);
        setUserId(user.userId);
        setInitialValues({
          fullName: user.fullName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "",
          dateOfBirth: user.dateOfBirth || "",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (values: PersonalInfoFormValues) => {
    if (!userId) return;

    setIsSaving(true);

    try {
      const response = await authApi.updateUser(userId, {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
      });

      if (response.success && response.data && typeof response.data === 'object' && 'user' in response.data) {
        // Update localStorage with new user data
        const userData = (response.data as { user: { userId?: string; fullName?: string; email?: string; phoneNumber?: string; gender?: string; dateOfBirth?: string } }).user;
        const updatedUser = {
          userId: userData.userId,
          fullName: userData.fullName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update personal information');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

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

              {/* Email - Display Only */}
              <div>
                <label className="block text-md font-semibold text-blue-primary font-dm-sans mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <MailIcon />
                  </div>
                  <input
                    type="email"
                    value={values.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 border-2 border-placeholder-gray rounded-lg bg-placeholder-gray/10 text-text-gray font-dm-sans cursor-not-allowed"
                  />
                </div>
                
              </div>

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
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
