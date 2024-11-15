// ResponsibilitiesInput.tsx
"use client";
import{ useState } from "react";
import { useFormContext } from "./FormContext";
import add from '../../../assests/si_add-duotone.svg'
import Image from "next/image";
import remove from '../../../assests/system-uicons_cross-circle.svg'
const ResponsibilitiesInput: React.FC = () => {
  const { formData, addResponsibility, removeResponsibility, setFormData } = useFormContext();
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null); // Track the responsibility being edited
  const [editInput, setEditInput] = useState(""); // Track the edit input value

  const handleAddResponsibility = () => {
    if (input.trim()) {
      addResponsibility(input.trim());
      setInput("");
    }
  };

  const handleEditResponsibility = (id: number, newText: string) => {
    setFormData((prevData) => ({
      ...prevData,
      responsibilities: prevData.responsibilities.map((resp) =>
        resp.id === id ? { ...resp, text: newText } : resp
      ),
    }));
    setEditingId(null);
  };

  return (
    <div className="max-w-[950px] mx-auto py-10 lg:px-0 p-4">
      <h3 className="md:text-4xl text-sm font-medium py-8">Key Responsibilities</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Type responsibility"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddResponsibility()}
          className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
        />
        <button
          type="button"
          onClick={handleAddResponsibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600"
        >
          Add <Image src={add} alt="Add Responsibility" className="h-6 w-6 inline" />
        </button>
      </div>
      <ul className="mt-4">
        {formData.responsibilities.map((resp, index) => (
          <li key={resp.id} className="flex items-center mb-2 w-full">
            <span className="mr-2">{index + 1}.</span>
            {editingId === resp.id ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="border-2 w-full border-gray-300 rounded px-2 py-1 mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleEditResponsibility(resp.id, editInput)}
                  className="text-green-600 hover:underline mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="text-gray-600 hover:underline mr-4"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{resp.text}</span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(resp.id);
                    setEditInput(resp.text);
                  }}
                  className="ml-4 text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeResponsibility(resp.id)}
                  className="ml-2 text-red-600 hover:underline"
                >
                 <Image src={remove} alt="Remove Responsibility" className="h-6 w-6 inline" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsibilitiesInput;
