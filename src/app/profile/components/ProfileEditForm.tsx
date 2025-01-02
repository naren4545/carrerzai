import { useState } from 'react';
import InputField from '../../resume/components/ui/InputField';
import Cookies from "js-cookie";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type NewType = (updatedProfile: any) => void;

interface ProfileEditFormProps {
  profile: {
    name: string;
   _id: string
    email: string;
    DOB: string;
    location: string;
    gender: string;
   education: string
  };
  onSave: NewType;
  onClose: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    _id: profile._id,
   name: profile.name,
    education: profile.education,
    email: profile.email,
    DOB: profile.DOB,
    location: profile.location,
    gender: profile.gender,
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleProfile=async(formData:any)=>{
    const pinqueryToken = Cookies.get("pinquery_token");
    try {
      const response = await fetch(`https://www.careerzai.com/v1/profile/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pinqueryToken}`, // Include the Authorization token
        },
        body: JSON.stringify(formData), // Convert the data to a JSON string
      });
  
      if (!response.ok) {
        throw new Error(`Failed to send data: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Data sent successfully:", result);
      
      
    } catch (error:any) {
      console.error("Error sending data:", error.message);
    }
  
  }  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

handleProfile(formData);

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
            name="location"
            placeholder="Enter your location"
            value={formData.location}
            onChange={handleChange}
            options={[]}
          />

<InputField
            label="date of Birth"
            name="DOB"
            placeholder="Enter your location"
            value={formData.DOB}
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
          <button onClick={handleSave} type="submit" className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl mx-auto">
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
