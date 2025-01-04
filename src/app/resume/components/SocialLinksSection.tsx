"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import editPen from '../../assests/clarity_edit-line.svg';
import deleteIcon from '../../assests/material-symbols-light_delete-outline.svg';
import InputField from './ui/InputField';
import handleResume from '@/utils/resumeUpdate';
import { assert } from 'console';

interface SocialLink {
  network: string;
  url: string;
  _id: string|null;
}

interface SocialLinkCardProps {
  link: SocialLink;
  onEdit: (link: SocialLink) => void;
  onDelete: (id: string|null) => void;
}

const SocialLinkCard: React.FC<SocialLinkCardProps> = ({ link, onEdit, onDelete }) => (
  <div className="flex items-start justify-between overflow-hidden bg-white rounded-lg p-4 mb-4">
    <div className="flex items-start gap-4">
      <div>
        <h3 className="text-xl font-medium">{link.network}</h3>
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          {link.url}
        </a>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button type="button" className="text-gray-500" onClick={() => onEdit(link)}>
        <Image src={editPen} alt="Edit Icon" className="w-[20px]" />
      </button>
      <button type="button" className="text-red-500" onClick={() => onDelete(link._id)}>
        <Image src={deleteIcon} alt="Delete Icon" className="w-[20px]" />
      </button>
    </div>
  </div>
);

interface SocialLinksSectionProps {
  socialLinks: SocialLink[];
  _id: string
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ socialLinks ,_id}) => {
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<SocialLink >({
    network: "",
    url: "",
    _id: ""
  });

  const handleAdd = () => {
    setCurrentLink({
      network: "",
      url: "",
      _id: ""
    });
    setIsFormOpen(true);
  };

  const handleEdit = (link: SocialLink) => {
    setCurrentLink(link);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string|null) => {
    setLinks((prev) =>{
      const data={links:prev.filter((link) => link._id !== id)}
      handleResume(data,_id)
      return prev.filter((link) => link._id !== id)
    });
  };

  const handleSave = async(link: SocialLink) => {
    if (currentLink._id) {
      setLinks((prev) =>{
const data={links:prev.map((l) => (l._id === currentLink._id ? { ...link, _id: currentLink._id } : l))}
handleResume(data,_id)
      return  prev.map((l) => (l._id === currentLink._id ? { ...link, _id: currentLink._id } : l))
    });
    } else {

      const data={links:[...links, { ...link, _id: null }]}
     const res=await handleResume(data,_id)
      setLinks(res.links);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4 overflow-hidden">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <button type="button" onClick={handleAdd} className="text-orange-500 flex items-center gap-2">
          Add <FaPlus />
        </button>
      </div>
      {links.map((link) => (
        <SocialLinkCard key={link._id} link={link} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
      {isFormOpen && (
        <SocialLinkForm onClose={() => setIsFormOpen(false)} onSave={handleSave} initialData={currentLink} />
      )}
    </div>
  );
};

interface SocialLinkFormProps {
  initialData?: SocialLink;
  onSave: (updatedLink: SocialLink) => void;
  onClose: () => void;
}

const SocialLinkForm: React.FC<SocialLinkFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<SocialLink>({
    network: initialData?.network || 'LinkedIn',
    url: initialData?.url || '',
    _id: initialData?._id || Date.now().toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const socialOptions = [
    { label: 'LinkedIn', value: 'LinkedIn' },
    { label: 'GitHub', value: 'GitHub' },
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Twitter', value: 'Twitter' },
    { label: 'Instagram', value: 'Instagram' },
  ];
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div onClick={handleBackdropClick} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white py-6 rounded-lg shadow-lg w-full  overflow-auto max-w-[1092px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <h3 className="text-2xl font-semibold mb-4 text-center">
          {initialData ? 'Edit Social Link' : 'Add Social Link'}
        </h3>
        <hr className="border-black mb-6" />

        <form onSubmit={handleSubmit} className='max-w-[997px] mx-auto px-6'>
          <div className="mb-4">
          <InputField
          placeholder={""}
        label="Network"
        type="select"
        name="network"
        value={formData.network}
        onChange={handleChange}
        options={socialOptions}
      />
          </div>
          <div className="mb-4">
            <InputField
            options={[]}
              label="URL"
              name="url"
              placeholder="Enter profile link"
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center space-x-2">
            <button
              type="button"
              onClick={onClose}
             className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl "
            >
              Cancel
            </button>
            <button type="submit" className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl ">
              {initialData ? 'Save Changes' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialLinksSection;
