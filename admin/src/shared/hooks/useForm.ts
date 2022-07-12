import { useState } from 'react';

const useForm = <T>(
  initState: T
): {
  inputError: T;
  inputData: T;
  updateError: Function;
  updateData: Function;
} => {
  const [inputData, setInputData] = useState(initState);
  const [inputError, setInputError] = useState(initState);

  const updateData = (field: string, value: any) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  };

  const updateError = (field: string, value: any) => {
    setInputError((prev) => ({ ...prev, [field]: value }));
  };

  return { inputError, inputData, updateError, updateData };
};

export default useForm;
