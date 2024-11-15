import { useState } from 'react';
import InputField from './ui/InputField';

interface ResumeTitleForm {
  profile: {
    userProfileDescription: string;
    userProfileTitle: string;
   
   
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSave: (updatedProfile: any) => void;
  onClose: () => void;
}

const ResumeTitleForm: React.FC<ResumeTitleForm> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    userProfileDescription: profile.userProfileDescription,
    userProfileTitle: profile.userProfileTitle
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div onClick={handleBackdropClick} className="fixed inset-0 flex items-center z-50 py-5 justify-center bg-black bg-opacity-50 top-0">
      <div className="bg-white p-6 lg:px-0 rounded-2xl shadow-lg w-full h-full overflow-auto max-w-[1092px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <h2 className="md:text-4xl text-xl font-semibold text-center mb-6">Profile Title</h2>
        <hr className='border-black pb-10' />
        
        <form className='max-w-[997px] mx-auto' onSubmit={handleSave}>
          <div className='grid  grid-cols-1 gap-4'>
            <div>
              <InputField
                label="Profile Title"
                name="userProfileTitle"
                options={[]}
                placeholder="Enter your first name"
                value={formData.userProfileTitle}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
              type='textarea'
                label="Profile Summary"
                name="userProfileDescription"
                options={[]}
                placeholder="Enter your summary"
                value={formData.userProfileDescription}
                onChange={handleChange}
              />
            </div>
          </div>
<div className='text-center'>
          <button type="submit" className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl mx-auto">
          Save & Update
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeTitleForm;
