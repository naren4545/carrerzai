"use client";

import { useState } from 'react';
import ProfileEditForm from './ProfileEditForm';
import ImageUpload from './ImageUpload';
import Image from 'next/image';

import imge from '../../assests/imgplaceholder.png';
import degree from '../../assests/lsicon_education-filled.svg';
import location from '../../assests/mdi_location (1).svg';
import share from '../../assests/material-symbols-light_share.svg';
import pen from '../../assests/Group 611.svg';
import emailIcon from '../../assests/material-symbols-light_mail-outline.svg';
import phoneIcon from '../../assests/ic_round-phone.svg';
import genderIcon from '../../assests/material-symbols_person-outline.svg';
import dobIcon from '../../assests/uil_calender.svg';

interface Profile {
  _id: string;
  name: string;

  email: string;
  location: string;
  userPhoneNumber: string;
  gender: string;
  
education: string;
  DOB: string;
}

interface ProfileCardProps {
  profile: Profile;
}
const formatDateOfBirth = (dob:string) => {
  const date = new Date(dob);

  // Format to "31 December 2024"
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US");

  return formattedDate;
};
const ProfileComponent: React.FC<ProfileCardProps> = ({ profile }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [profileData, setProfileData] = useState<Profile>(profile);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleImageClick = () => {
    setIsImageUploadOpen(true);
  };

  const handleSave = (updatedProfile: Profile) => {
    setProfileData(pre=>({...pre,updatedProfile}));
    setIsEditOpen(false);
  };

  const handleImageUpload = (imageUrl: string) => {
    console.log("Image uploaded: ", imageUrl);
    setIsImageUploadOpen(false);
  };

  return (
    <div className="mx-auto  rounded-lg py-7 shadow-md relative my-10 max-w-[1100px]">
      <div className="max-w-[800px] mx-auto py-5">
        <div className="grid grid-cols-3 gap-5">
          <button type="button" className="relative cursor-pointer flex " onClick={handleImageClick}>
            <Image src={imge} alt="Profile" className="" />
          </button>
          <div className="ml-4 col-span-2 flex items-center">
            <div>
            <h2 className="md:text-5xl text-lg mb-3  font-bold">
              {profileData.name}
            </h2>
            <p className="md:text-xl text-sm">{profileData.email}</p>
            <div className="py-4 md:text-xl text-sm">
              <p className="flex items-center pb-3 gap-3">
                <Image src={degree} alt="Degree Icon" /> 
                <span>{profileData.education
}</span>
              </p>
              <p className="flex items-center gap-3">
                <Image src={location} alt="Location Icon" /> 
                <span>{profileData.location}</span>
              </p>
              <button
                type="button"
                className="bg-white flex items-center gap-3 text-orange-500 py-3 px-4 rounded-xl mt-4"
              >
                <Image src={share} alt="Share Icon" /> 
                <span>Share Profile</span>
              </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute top-[-21px] right-4 z-20"
          onClick={handleEditClick}
        >
          <Image src={pen} alt="Edit Icon" />
        </button>
      </div>
      
      <div className="mt-4 pt-4  md:text-xl text-xs max-w-[800px] mx-auto grid grid-cols-2  gap-5">
        <div className="flex items-start gap-3 pb-5">
          <Image src={emailIcon} alt="Email Icon" className='md:w-auto w-5' /> 
          <div>
            <p className="text-[#5E5E5E]">Email</p>
            <p>{profileData.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 pb-5">
          <Image src={phoneIcon} alt="Phone Icon" className='md:w-auto w-5'/> 
          <div>
            <p className="text-[#5E5E5E]">Contact number</p>
            <p>{}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 pb-5">
          <Image src={genderIcon} alt="Gender Icon" className='md:w-auto w-5'/> 
          <div>
            <p className="text-[#5E5E5E]">Gender</p>
            <p>{profileData.gender}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 pb-5">
          <Image src={dobIcon} alt="Date of Birth Icon" className='md:w-auto w-5'/> 
          <div>
            <p className="text-[#5E5E5E]">Date of Birth</p>
            {<p>{formatDateOfBirth(profileData.DOB)}</p>}
          </div>
        </div>
      </div>
      
      {isEditOpen && (
        <ProfileEditForm
          profile={profileData}
          onSave={handleSave}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      
      {isImageUploadOpen && (
        <ImageUpload onUpload={handleImageUpload} onClose={() => setIsImageUploadOpen(false)} />
      )}
    </div>
  );
};

export default ProfileComponent;
