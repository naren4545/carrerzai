import  { useState } from 'react';

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      handleImageUpload(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setImage(droppedFile);
      handleImageUpload(droppedFile);
    }
  };

  const handleImageUpload = (file: File) => {
    // In a real app, you might upload this to a server and get back a URL
    const imageUrl = URL.createObjectURL(file);
    onUpload(imageUrl);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Upload Image</h2>
        <div
          className={`border-2 border-dashed rounded-lg p-4 ${
            isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-center text-gray-500 mb-4">Drag & Drop an image here</p>
          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
          <label
            htmlFor="fileInput"
            className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer text-center w-full block"
          >
            Select Image
          </label>
        </div>
        <button type='button' onClick={onClose} className="mt-4 bg-gray-500 text-white px-3 py-1 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
