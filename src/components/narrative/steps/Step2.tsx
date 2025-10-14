'use client';

import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { EyeIcon, SuspectIcon, VictimIcon } from '../../ui/Icons';

interface Step2Props {
  onNext: () => void;
  values: {
    victim: string;
    suspect: string;
    witnesses: string;
  };
  errors: {
    victim?: string;
    suspect?: string;
    witnesses?: string;
  };
  touched: {
    victim?: boolean;
    suspect?: boolean;
    witnesses?: boolean;
  };
  handleChange: (event: { target: { name: string; value: string } }) => void;
  setFieldTouched: (field: string, touched: boolean) => void;
  isStepValid: boolean;
}

export const Step2 = ({ onNext, values, errors, touched, handleChange, setFieldTouched, isStepValid }: Step2Props) => {
  return (
    <>
      <div className="space-y-6">
        <Input
          type="text"
          label="Victim"
          placeholder="Enter victim information"
            icon={<VictimIcon />}
          value={values.victim}
          onChange={(value) => {
            handleChange({ target: { name: 'victim', value } });
            if (value === '') {
              setFieldTouched('victim', false);
            }
          }}
          error={touched.victim && errors.victim ? errors.victim : undefined}
        />

        <Input
          type="text"
          label="Suspect"
          placeholder="Enter suspect information"
          icon={<SuspectIcon />}
          value={values.suspect}
          onChange={(value) => {
            handleChange({ target: { name: 'suspect', value } });
            if (value === '') {
              setFieldTouched('suspect', false);
            }
          }}
          error={touched.suspect && errors.suspect ? errors.suspect : undefined}
        />

        <TextArea
          label="Witnesses"
          placeholder="Enter witness information"
          icon={<EyeIcon />}
          value={values.witnesses}
          onChange={(value) => {
            handleChange({ target: { name: 'witnesses', value } });
            if (value === '') {
              setFieldTouched('witnesses', false);
            }
          }}
          error={touched.witnesses && errors.witnesses ? errors.witnesses : undefined}
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
