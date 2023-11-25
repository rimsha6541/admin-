import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
 
  defaultValue,
  required,
  name,
  label,
  type,
  placeholder,
  onChange,
  value
}) => {
  return (
    <>
      <Input
       
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default InputArea;
