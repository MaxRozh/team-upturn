import React from 'react';

type PropsType = {
  // className?: string;
  // label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  // error?: { text: string };
  defaultValue?: string;
  onChange?: Function;
};

function UiInput({
  // className = '',
  // label = '',
  name = '',
  type = 'text',
  placeholder,
  // error,
  defaultValue,
  onChange
}: PropsType) {
  // const hasError = error || errorText;
  // const finalClass = `${className}  ${
  //   hasError && 'border-red-600'
  // }`;

  return (
    <div>
      {/*{label && (*/}
      {/*  <label*/}
      {/*    className={`text-sm text-gray-600 ${hasError && 'text-red-600'} ${horizontal && 'sm:w-24'}`}*/}
      {/*    htmlFor={name}*/}
      {/*  >*/}
      {/*    {label}*/}
      {/*  </label>*/}
      {/*)}*/}
      <div>
        <input
          type={type}
          name={name}
          // eslint-disable-next-line max-len
          className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.currentTarget.value)}
        />
        {/*{description && <span className="mt-2 text-gray-600 text-xs">{description}</span>}*/}
        {/* eslint-disable-next-line max-len */}
        {/*{errorText && <div className="bg-red-200 mt-2 py-2 px-4 text-xs text-red-600 rounded-sm">{errorText}</div>}*/}
      </div>
    </div>
  );
}

export default UiInput;
