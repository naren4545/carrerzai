// components/InputField.js
import React from 'react';

const InputField = ({ label, type = "text", placeholder, name, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 md:text-xl text-sm mb-2" htmlFor={name}>
        {label}
      </label>

      {type === "radio" ? (
        <div className="flex space-x-4 md:text-xl">
          {options.map((option, index) => (
            <label key={index} className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                onChange={onChange}
                checked={value === option.value}
                className="form-radio text-blue-500 h-5 w-5 md:h-[30px] md:w-[30px]"
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))}
        </div>
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="border-2 border-black bg-white rounded-[20px] w-full py-2 px-3 md:h-[80px] h-[80px] leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border-2 border-black bg-white rounded-[20px] w-full py-2 px-3 md:h-[150px] h-[90px] leading-tight focus:outline-none focus:shadow-outline"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border-2 border-black bg-white rounded-[20px] w-full py-2 px-3 ${type === "message" ? "md:h-[150px] h-[90px]" : "md:h-[80px] h-[50px]"} leading-tight focus:outline-none focus:shadow-outline`}
        />
      )}
    </div>
  );
};

export default InputField;
