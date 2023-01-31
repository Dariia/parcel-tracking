import React  from 'react';

export type FormDataType = { [key: string]: File | string }

export const collectFormData = (formRef: React.RefObject<HTMLFormElement>):FormDataType => {
  return formRef.current ? { ...Object.fromEntries(new FormData( formRef.current )) } : {};
}

export const isValidZipCode = (str: string): boolean =>
  /^\d{5}(-\d{4})?$/.test(str) || /\b\d{5}\b/g.test(str);
