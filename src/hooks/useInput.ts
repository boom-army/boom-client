import { useState } from "react";

interface Props {
  defaultValue: string
}

export const useInput = (defaultValue:Props) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e:any) => {
    setValue(e.target.value);
  };

  return { value, setValue, onChange };
};
