import { useState } from 'react';
import InputField from '../../resume/components/ui/InputField';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type NewType = (updatedProfile: any) => void;

interface ProfileEditFormProps {
  profile: {
    name: string;
   
    email: string;
    
    location: string;
    gender: string;
   
  };
  onSave: NewType;
  onClose: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState({
   name: profile.name,
    
    email: profile.email,
    
    location: profile.location,
    gender: profile.gender,
   
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
      <div className="bg-white p-6 lg:px-0 rounded-2xl shadow-lg w-full  overflow-auto max-w-[1092px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <h2 className="md:text-4xl text-xl font-semibold text-center mb-6">Personal Details</h2>
        <hr className='border-black pb-10' />
        
        <form className='max-w-[997px] mx-auto' onSubmit={handleSave}>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <div>
              <InputField
                label="name"
                name="name"
                options={[]}
                placeholder="Enter your first name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
            <InputField
            label="Email ID"
            name="email"
            type="email"
            placeholder="Enter your email"
            options={[]}
            value={formData.email}
            onChange={handleChange}
          />
            </div>
          </div>

         
          
          <InputField
            label="Current Location"
            name="userAddress"
            placeholder="Enter your location"
            value={formData.location}
            onChange={handleChange}
            options={[]}
          />

          <InputField
            label="Gender"
            name="userGender"
            type="radio"
            value={formData.gender}
            onChange={handleChange}
            placeholder=""
            options={[
              { label: 'Female', value: 'Female' },
              { label: 'Male', value: 'Male' },
              { label: 'Other', value: 'Other' },
              
            ]}
          />


<div className='text-center flex gap-3 justify-center w-fit mx-auto'>
          <button type="submit" className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl mx-auto">
          Save & Update
          </button>

          <button onClick={onClose} type="submit" className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl mx-auto">
          close
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
