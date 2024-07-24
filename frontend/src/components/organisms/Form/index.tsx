// src/components/organisms/Form/index.tsx
import React from 'react';
import { InputField } from '@/components/molecules/InputField';

interface FormProps {
  onSubmit: () => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <InputField label="Name" buttonText="Submit" onButtonClick={onSubmit} />
    </form>
  );
};
