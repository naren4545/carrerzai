
"use client";
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export { Input };
