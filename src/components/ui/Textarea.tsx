"use client";

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, value, onChange, rows = 4, cols = 50 }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      cols={cols}
      className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
  );
};

export { Textarea };
