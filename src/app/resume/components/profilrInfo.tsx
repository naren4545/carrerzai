"use client";

import { useState } from 'react';
import ProfileEditForm from './ProfileEditForm';
import ImageUpload from './ImageUpload';
import Image from 'next/image';

import imge from '../../assests/resumeProfileImg.png';
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
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userAddress: string;
  userPhoneNumber: string;
  userGender: string;
  userQualification: string;
 
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
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
    setProfileData(updatedProfile);
    setIsEditOpen(false);
  };

  const handleImageUpload = (imageUrl: string) => {
    console.log("Image uploaded: ", imageUrl);
    setIsImageUploadOpen(false);
  };

  return (
    <div className="mx-auto bg-[#A6CBFF] rounded-lg py-7 shadow-md relative">
      <div className="flex justify-between items-center px-4">
        <div className="grid grid-cols-3 gap-8">
          <button type="button" className="relative cursor-pointer block" onClick={handleImageClick}>
            <Image src={imge} alt="Profile" className="border border-gray-300" />
          </button>
          <div className="ml-4 col-span-2">
            <h2 className="text-[32px] leading-10 font-bold">
              {profileData.userFirstName} {profileData.userLastName}
            </h2>
            <p className="text-xl">{profileData.userEmail}</p>
            <div className="py-4 text-xl">
              <p className="flex items-center pb-3 gap-3">
                <Image src={degree} alt="Degree Icon" /> 
                <span>{profileData.userQualification}</span>
              </p>
              <p className="flex items-center gap-3">
                <Image src={location} alt="Location Icon" /> 
                <span>{profileData.userAddress}</span>
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
        <button
          type="button"
          className="absolute top-[-21px] right-4 z-20"
          onClick={handleEditClick}
        >
          <Image src={pen} alt="Edit Icon" />
        </button>
      </div>
      <hr className="border-black" />
      <div className="mt-4 pt-4 px-4 text-2xl">
        <div className="flex items-start gap-3 pb-5">
          <Image src={emailIcon} alt="Email Icon" /> 
          <div>
            <p className="text-[#5E5E5E]">Email</p>
            <p>{profileData.userEmail}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 pb-5">
          <Image src={phoneIcon} alt="Phone Icon" /> 
          <div>
            <p className="text-[#5E5E5E]">Contact number</p>
            <p>{profileData.userPhoneNumber}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 pb-5">
          <Image src={genderIcon} alt="Gender Icon" /> 
          <div>
            <p className="text-[#5E5E5E]">Gender</p>
            <p>{profileData.userGender}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 pb-5">
          <Image src={dobIcon} alt="Date of Birth Icon" /> 
          <div>
            <p className="text-[#5E5E5E]">Date of Birth</p>
            {/* {<p>{profileData.userDob}</p>} */}
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

export default ProfileCard;
