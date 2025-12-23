'use client';

import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { TagIcon, OutcomeIcon, TextIcon } from '../../ui/Icons';

interface Step3Props {  
  onGenerate: () => void;
  values: {
    reasonForAttendance: string;
    details: string;
    antecedents: string;
    exhibits: string;
    outcome: string;
  };
  errors: {
    reasonForAttendance?: string;
    details?: string;
    antecedents?: string;
    exhibits?: string;
    outcome?: string;
  };
  touched: {
    reasonForAttendance?: boolean;
    details?: boolean;
    antecedents?: boolean;
    exhibits?: boolean;
    outcome?: boolean;
  };
  handleChange: (event: { target: { name: string; value: string } }) => void;
  setFieldTouched: (field: string, touched: boolean) => void;
  isStepValid: boolean;
}

export const Step3 = ({ onGenerate, values, errors, touched, handleChange, setFieldTouched, isStepValid }: Step3Props) => {
  return (
    <>
      <div className="space-y-6">
        <TextArea
          label="Antecedents (FV Only)"
          placeholder="Enter prior history/background information (Family Violence cases only)"
          icon={<TextIcon />}
          value={values.antecedents}
          onChange={(value) => {
            handleChange({ target: { name: 'antecedents', value } });
            if (value === '') {
              setFieldTouched('antecedents', false);
            }
          }}
          error={touched.antecedents && errors.antecedents ? errors.antecedents : undefined}
        />

        <TextArea
          label="Reason for Attendance"
          placeholder="Enter reason for attendance"
          icon={<OutcomeIcon />}
          value={values.reasonForAttendance}
          onChange={(value) => {
            handleChange({ target: { name: 'reasonForAttendance', value } });
            if (value === '') {
              setFieldTouched('reasonForAttendance', false);
            }
          }}
          error={touched.reasonForAttendance && errors.reasonForAttendance ? errors.reasonForAttendance : undefined}
        />

        <TextArea
          label="Details"
          placeholder="Enter incident details"
          icon={<TextIcon />}
          value={values.details}
          onChange={(value) => {
            handleChange({ target: { name: 'details', value } });
            if (value === '') {
              setFieldTouched('details', false);
            }
          }}
          error={touched.details && errors.details ? errors.details : undefined}
        />

        <TextArea
          label="Exhibits"
          placeholder="Enter exhibits information"
          icon={<TagIcon />}
          value={values.exhibits}
          onChange={(value) => {
            handleChange({ target: { name: 'exhibits', value } });
            if (value === '') {
              setFieldTouched('exhibits', false);
            }
          }}
          error={touched.exhibits && errors.exhibits ? errors.exhibits : undefined}
        />

        <TextArea
          label="Outcome"
          placeholder="Enter outcome information"
          icon={<OutcomeIcon />}
          value={values.outcome}
          onChange={(value) => {
            handleChange({ target: { name: 'outcome', value } });
            if (value === '') {
              setFieldTouched('outcome', false);
            }
          }}
          error={touched.outcome && errors.outcome ? errors.outcome : undefined}
        />
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          variant="badge"
          size="md"
          onClick={onGenerate}
          disabled={!isStepValid}
          className="w-full"
        >
          Generate
        </Button>
      </div>
    </>
  );
};
