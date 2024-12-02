"use client";
import  { useState } from "react";

const ResumeButtons = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("resume", file);

    try {
      // Get the pinquery token from cookies
      const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("pinquery_token="))
      ?.split("=")[1];
console.log(token)

      if (!token) {
        alert("User is not authenticated.");
        setUploading(false);
        return;
      }

      // Send the POST request
      const response = await fetch("https://www.careerzai.com/v1/resume/pdf/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Resume uploaded successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to upload resume: ${errorData.message || "Unknown error"}`);
      }
    } catch (error:any) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setUploading(false);
      handleClosePopup();
    }
  };

  return (
    <div className="flex ">
      {/* Generate Resume Button */}
      <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Generate Resume
      </button>

      {/* Upload Resume Button */}
      <button type="button"
        className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50"
        onClick={handleUploadClick}
      >
        Upload Resume
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Upload Your Resume</h2>
            <input
              type="file"
              className="border w-full p-2 rounded mb-4"
              onChange={handleFileChange}
            />
            <div className="flex justify-end space-x-4">
              <button type="button"
                className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeButtons;
