// components/ProfileCard.tsx
"use client"
import { useState } from 'react';
import ProfileEditForm from './ProfileEditForm';
import edit from '../../assests/lsicon_edit-filled.svg';
import Image from 'next/image';
import ResumeTitleForm from './ResumeTitleForm';
interface Profile {
    userProfileDescription: string;
    userProfileTitle: string;
}

const JobProfileTitle: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    userProfileTitle: 'Graphic Designer',
    userProfileDescription:
      'Highly motivated and results-driven IT professional with over 5 years of experience in project management and change implementation. Proven ability to lead cross-functional teams and streamline operational processes. Seeking an Associate Director role to leverage my skills in a dynamic environment.',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg py-6 shadow-md  mx-auto relative">
        <div className='px-6'>
      <h3 className="text-[#929292] text-[28px] leading-9 font-normal">Profile Title</h3>
      <h2 className="text-[28px] leading-9 font-medium mb-4">{profile.userProfileTitle}</h2>
      </div>
<hr className='border-black'/>
      <div className='px-6 pt-4'>
      <h4 className="text-[#929292] text-[28px] leading-9 font-normal mb-4">Profile Summary</h4>
      <p className="text-xl">{profile.userProfileDescription}</p>
      <button type='button'
        onClick={handleEditClick}
        className="absolute top-[-14px] right-3 text-blue-500 hover:text-blue-700"
      >
       <Image src={edit} alt="Edit" className="w-6 h-6"/>
      </button>
      {isEditing && (
        <ResumeTitleForm
          profile={profile}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
        </div>
    </div>
  );
};

export default JobProfileTitle;
