'use client';

import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { DateIcon, ClockIcon, LockIcon, PhoneIcon } from '../../ui/Icons';

interface Step1Props {
  onNext: () => void;
  values: {
    incidentDate: string;
    time: string;
    location: string;
    callSign: string;
  };
  errors: {
    incidentDate?: string;
    time?: string;
    location?: string;
    callSign?: string;
  };
  touched: {
    incidentDate?: boolean;
    time?: boolean;
    location?: boolean;
    callSign?: boolean;
  };
  handleChange: (event: { target: { name: string; value: string } }) => void;
  setFieldTouched: (field: string, touched: boolean) => void;
  isStepValid: boolean;
}

export const Step1 = ({ onNext, values, errors, touched, handleChange, setFieldTouched, isStepValid }: Step1Props) => {
  return (
    <>
      <div className="space-y-6">
        <Input
          type="date"
          label="Incident Date"
          placeholder="Enter date of incident (DD/MM/YYYY)"
          icon={<DateIcon />}
          value={values.incidentDate}
          onChange={(value) => {
            handleChange({ target: { name: 'incidentDate', value } });
            if (value === '') {
              setFieldTouched('incidentDate', false);
            }
          }}
          error={touched.incidentDate && errors.incidentDate ? errors.incidentDate : undefined}
        />

        <Input
          type="time"
          label="Incident Time"
          placeholder="Enter time of incident (HH:MM)"
          icon={<ClockIcon />}
          value={values.time}
          onChange={(value) => {
            handleChange({ target: { name: 'time', value } });
            if (value === '') {
              setFieldTouched('time', false);
            }
          }}
          error={touched.time && errors.time ? errors.time : undefined}
        />

        <Input
          type="text"
          label="Location"
          placeholder="Enter location"
          icon={<LockIcon />}
          value={values.location}
          onChange={(value) => {
            handleChange({ target: { name: 'location', value } });
            if (value === '') {
              setFieldTouched('location', false);
            }
          }}
          error={touched.location && errors.location ? errors.location : undefined}
        />

        <Input
          type="text"
          label="Call Sign"
          placeholder="Enter call sign"
          icon={<PhoneIcon />}
          value={values.callSign}
          onChange={(value) => {
            handleChange({ target: { name: 'callSign', value } });
            if (value === '') {
              setFieldTouched('callSign', false);
            }
          }}
          error={touched.callSign && errors.callSign ? errors.callSign : undefined}
        />
      </div>

      <div className="mt-8">
        <Button
          type="button"
          variant="badge"
          size="md"
          onClick={onNext}
          disabled={!isStepValid}
          className="w-full"
        >
          Next
        </Button>
      </div>
    </>
  );
};
