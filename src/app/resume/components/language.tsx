"use client"
import { useState } from 'react';

const Languages = () => {
  const [languages, setLanguages] = useState([
    'English',
    'Spanish',
    'French',
    'German',
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');

  const handleAddLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
      setShowPopup(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Languages</h3>
        <button type="button"
          onClick={() => setShowPopup(true)}
          className=""
        >
          Add +
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-5">
        {languages.map((language, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="bg-[#A6CBFF] text-xl  rounded px-4 py-2 flex items-center gap-2"
          >
            {language}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<span
              className="cursor-pointer text-red-500"
              onClick={() => setLanguages(languages.filter(l => l !== language))}
            >
              x
            </span>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h4 className="text-lg font-semibold mb-4">Add Language</h4>
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Enter a new language"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-center gap-4">
              <button type="button"
                onClick={handleAddLanguage}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
              <button type="button"
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Languages;
