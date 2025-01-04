"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import certificateIcon from "../../assests/certificateIcon.svg";
import editPen from "../../assests/clarity_edit-line.svg";
import deleteIcon from "../../assests/material-symbols-light_delete-outline.svg";
import InputField from "./ui/InputField";
import handleResume from "@/utils/resumeUpdate";

interface Certification {
  description: string;
  issuedBy: string;
  url: string;
  _id: string | null;
}

interface CertificationCardProps {
  certification: Certification;
  onEdit: (cert: Certification) => void;
  onDelete: (id: string|null) => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  onEdit,
  onDelete,
}) => (
  <div className="flex items-start justify-between bg-white rounded-lg p-4 mb-4">
    <div className="flex items-start gap-4">
      <Image src={certificateIcon} alt="Certification Icon" className="" />
      <div>
        <h3 className="text-xl font-medium">{certification.description}</h3>
        <p className="text-base">{certification.issuedBy}</p>
        <a
          href={certification.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View Certification
        </a>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button
        type="button"
        className="text-gray-500"
        onClick={() => onEdit(certification)}
      >
        <Image src={editPen} alt="Edit Icon" className="w-[20px]" />
      </button>
      <button
        type="button"
        className="text-red-500"
        onClick={() => onDelete(certification._id)}
      >
        <Image src={deleteIcon} alt="Delete Icon" className="w-[20px]" />
      </button>
    </div>
  </div>
);

interface CertificationSectionProps {
  certifications: Certification[];
  _id: string;
}

const CertificationSection: React.FC<CertificationSectionProps> = ({
  certifications,
  _id,
}) => {
  const [certList, setCertList] = useState<Certification[]>(certifications);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentCert, setCurrentCert] = useState<Certification>({
    description: "",
    issuedBy: "",
    url: "",
    _id: "",
  });

  const handleAdd = () => {
    setCurrentCert({
      description: "",
      issuedBy: "",
      url: "",
      _id: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (cert: Certification) => {
    setCurrentCert(cert);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string|null) => {
    setCertList((prev) => prev.filter((cert) => cert._id !== id));
  };

  const handleSave = async(cert: Certification) => {
    if (currentCert._id) {
      setCertList((prev) => {
        const data = {
          certifications: prev.map((c) =>
            c._id === currentCert._id ? { ...cert, _id: currentCert._id } : c
          ),
        };

        handleResume(data, _id);
        return prev.map((c) =>
          c._id === currentCert._id ? { ...cert, _id: currentCert._id } : c
        );
      });
    } else {


      const data = {
        certifications: [...certList, { ...cert, _id: null }],
      };

      const res=await handleResume(data,_id)
      setCertList(res.certifications);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="text-orange-500 flex items-center gap-2"
        >
          Add <FaPlus />
        </button>
      </div>
      {certList.map((cert) => (
        <CertificationCard
          key={cert._id}
          certification={cert}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {isFormOpen && (
        <CertificationForm
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          initialData={currentCert}
        />
      )}
    </div>
  );
};

interface CertificationFormProps {
  initialData?: Certification;
  onSave: (updatedCert: Certification) => void;
  onClose: () => void;
}

const CertificationForm: React.FC<CertificationFormProps> = ({
  initialData,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Certification>({
    description: initialData?.description || "",
    issuedBy: initialData?.issuedBy || "",
    url: initialData?.url || "",
    _id: initialData?._id || Date.now().toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-h-fit h-full overflow-auto max-w-[1092px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <h3 className="text-2xl font-semibold mb-4">
          {initialData ? "Edit Certification" : "Add Certification"}
        </h3>
        <hr className="border-black mb-6" />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              type="text"
              options={[]}
              label="Certification Name"
              name="description"
              placeholder="Enter certification name"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
              options={[]}
              label="Issued By"
              name="issuedBy"
              placeholder="Enter issuing organization"
              value={formData.issuedBy}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
              options={[]}
              label="Certification URL"
              name="url"
              placeholder="Enter certification link"
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {initialData ? "Save Changes" : "Add Certification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationSection;
