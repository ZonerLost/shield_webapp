"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../../ui/Button";
import { Dropdown } from "../../ui/Dropdown";
import { RoleIcon, OrgIcon } from "../../ui/Icons";

interface RoleSetupFormData {
  role: string;
  organization: string;
}

const validationSchema = Yup.object({
  role: Yup.string()
    .required("Role is required")
    .min(2, "Role must be at least 2 characters"),
  organization: Yup.string()
    .required("Organization/Station is required")
    .min(2, "Organization/Station must be at least 2 characters"),
});

export const RoleSetupForm = () => {
  const router = useRouter();

  const initialValues: RoleSetupFormData = {
    role: "",
    organization: "",
  };

  const handleSubmit = async (values: RoleSetupFormData) => {
    try {
      console.log("Role setup submitted:", values);
      // Handle role setup logic here
      // For now, redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Role setup error:", error);
    }
  };

  const roleOptions = [
    { value: "officer", label: "Officer" },
    { value: "sergeant", label: "Sergeant" },
    { value: "inspector", label: "Inspector" },
    { value: "detective", label: "Detective" },
    { value: "constable", label: "Constable" },
    { value: "senior-constable", label: "Senior Constable" },
    { value: "leading-senior-constable", label: "Leading Senior Constable" },
    { value: "senior-sergeant", label: "Senior Sergeant" },
    { value: "superintendent", label: "Superintendent" },
    { value: "commander", label: "Commander" },
    { value: "assistant-commissioner", label: "Assistant Commissioner" },
    { value: "deputy-commissioner", label: "Deputy Commissioner" },
    { value: "commissioner", label: "Commissioner" },
  ];

  const organizationOptions = [
    { value: "police-station", label: "Police Station" },
    { value: "detective-branch", label: "Detective Branch" },
    { value: "traffic-police", label: "Traffic Police" },
    { value: "crime-investigation", label: "Crime Investigation Department" },
    { value: "special-operations", label: "Special Operations Group" },
    { value: "counter-terrorism", label: "Counter Terrorism Unit" },
    { value: "cyber-crime", label: "Cyber Crime Unit" },
    { value: "drug-enforcement", label: "Drug Enforcement Unit" },
    { value: "homicide-squad", label: "Homicide Squad" },
    { value: "fraud-squad", label: "Fraud Squad" },
    { value: "sexual-offences", label: "Sexual Offences Unit" },
    { value: "child-protection", label: "Child Protection Unit" },
    { value: "domestic-violence", label: "Domestic Violence Unit" },
    { value: "community-policing", label: "Community Policing Unit" },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-left mb-8">
        <h1 className="text-2xl font-bold text-blue-primary mb-2 font-dm-sans">
          Tell us about your role
        </h1>
        <p className="text-text-gray text-xl font-medium font-dm-sans">
          Shield AI tailors legislation support based on your role and unit.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <Form className="space-y-8" noValidate>
            {/* Role Field */}
            <div>
              <label className="block text-md font-semibold text-blue-primary font-dm-sans mb-2">
                Role
              </label>
              <Dropdown
                placeholder="Select your role (e.g., Officer, Sergeant,...)"
                options={roleOptions}
                value={values.role}
                onChange={(value) => {
                  setFieldValue("role", value);
                  if (value === "") {
                    setFieldTouched("role", false);
                  }
                }}
                error={touched.role && errors.role ? errors.role : undefined}
                icon={<RoleIcon />}
              />
            </div>

            {/* Organization Field */}
            <div>
              <label className="block text-md font-semibold text-blue-primary font-dm-sans mb-2">
                Organisation / Station
              </label>
              <Dropdown
                placeholder="Enter your organisation or station"
                options={organizationOptions}
                value={values.organization}
                onChange={(value) => {
                  setFieldValue("organization", value);
                  if (value === "") {
                    setFieldTouched("organization", false);
                  }
                }}
                error={
                  touched.organization && errors.organization
                    ? errors.organization
                    : undefined
                }
                icon={<OrgIcon />}
              />
            </div>

            {/* Complete Setup Button */}
            <Button type="submit" variant="badge" size="lg" className="w-full">
              Complete Setup
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
