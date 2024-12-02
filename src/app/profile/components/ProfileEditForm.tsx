import { useState } from 'react';
import InputField from '../../resume/components/ui/InputField';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type NewType = (updatedProfile: any) => void;

interface ProfileEditFormProps {
  profile: {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhoneNumber: string;
    userAddress: string;
    userGender: string;
   
  };
  onSave: NewType;
  onClose: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    userFirstName: profile.userFirstName,
    userLastName: profile.userLastName,
    userEmail: profile.userEmail,
    userPhoneNumber: profile.userPhoneNumber,
    userAddress: profile.userAddress,
    userGender: profile.userGender,
   
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
        <h2 className="md:text-4xl text-xl font-semibold text-center mb-6">Personal Details</h2>
        <hr className='border-black pb-10' />
        
        <form className='max-w-[997px] mx-auto' onSubmit={handleSave}>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <div>
              <InputField
                label="First Name"
                name="userFirstName"
                options={[]}
                placeholder="Enter your first name"
                value={formData.userFirstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Last Name"
                name="userLastName"
                options={[]}
                placeholder="Enter your last name"
                value={formData.userLastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <InputField
            label="Email ID"
            name="userEmail"
            type="email"
            placeholder="Enter your email"
            options={[]}
            value={formData.userEmail}
            onChange={handleChange}
          />
          <InputField
            label="Contact Number"
            name="userPhoneNumber"
            type="tel"
            placeholder="+91"
            value={formData.userPhoneNumber}
            onChange={handleChange}
            options={[]}
          />
          <InputField
            label="Current Location"
            name="userAddress"
            placeholder="Enter your location"
            value={formData.userAddress}
            onChange={handleChange}
            options={[]}
          />

          <InputField
            label="Gender"
            name="userGender"
            type="radio"
            value={formData.userGender}
            onChange={handleChange}
            placeholder=""
            options={[
              { label: 'Female', value: 'Female' },
              { label: 'Male', value: 'Male' },
              { label: 'Other', value: 'Other' },
              
            ]}
          />


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

export default ProfileEditForm;
