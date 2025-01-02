import { use, useState } from 'react';
import InputField from './ui/InputField';
import Cookies from "js-cookie";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type NewType = (updatedProfile: any) => void;

interface ProfileEditFormProps {
  profile: {
    _id: string;
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
    _id: profile._id,
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

  const handleSave = async(e: React.FormEvent) => {
    e.preventDefault();

    const handleResume=async(formData:any)=>{
      const pinqueryToken = Cookies.get("pinquery_token");
      try {
        const response = await fetch(`https://www.careerzai.com/v1/resume/${formData._id}`, {
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


await handleResume(formData);
    onSave(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
console.log(formData)
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
