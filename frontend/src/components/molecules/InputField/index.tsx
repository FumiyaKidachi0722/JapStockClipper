// src/components/molecules/InputField/index.tsx
import React from 'react';
import { Button } from '@/components/atoms/Button';

interface InputFieldProps {
  label: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type="text" className="block w-full px-3 py-2 border rounded-md" />
      <Button label={buttonText} onClick={onButtonClick} />
    </div>
  );
};
