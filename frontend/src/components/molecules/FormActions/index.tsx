// frontend/src/components/molecules/FormActions/index.tsx

import React from 'react';

import { Button } from '@/components/atoms/Button';
import { LinkButton } from '@/components/atoms/LinkButton';
import { Text } from '@/components/atoms/Text';

import styles from './FormActions.module.css';

type FormActionsProps = {
  buttonText: string;
  linkText: string;
  linkHref: string;
  message: string;
};

export const FormActions: React.FC<FormActionsProps> = ({
  buttonText,
  linkText,
  linkHref,
  message,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button type="submit">{buttonText}</Button>
      </div>
      <div className={styles.linkContainer}>
        <Text className={styles.linkText}>{message}</Text>
        <LinkButton href={linkHref}>{linkText}</LinkButton>
      </div>
    </div>
  );
};
