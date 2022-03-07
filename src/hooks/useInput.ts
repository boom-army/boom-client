import { useState } from "react";

export const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return { value, setValue, onChange };
};
