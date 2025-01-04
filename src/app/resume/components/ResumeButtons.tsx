"use client";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import  { useState } from "react";
import tem1 from '../../assests/image 6.png'
import tem2 from '../../assests/image 7 (1).png'
import Cookies from "js-cookie";






interface Template {
  id: string
  name: string
  image: any
}

const templates2: Template[] = [
  {
    id: "Template1",
    name: "Template 1",
    image: tem1
  },
  {
    id: "Template2",
    name: "Template 2",
    image: tem2
  },
  {
    id: "Uploaded",
    name: "Uploaded",
    image: tem2
  }
]

const templates1: Template[] = [
  {
    id: "Template1",
    name: "Template 1",
    image: tem1
  },
  {
    id: "Template2",
    name: "Template 2",
    image: tem2
  },
 
]
const ResumeButtons = ({url="/",resumePdfKey,selectedResumeTemplate}:{url:string,resumePdfKey:any,selectedResumeTemplate
  :string,
 }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
const [view,setView]=useState(url)

const [selectedTemplate, setSelectedTemplate] = useState<string>(selectedResumeTemplate)
const pinqueryToken = Cookies.get("pinquery_token");
// biome-ignore lint/complexity/noUselessTernary: <explanation>
const isUploaded=resumePdfKey?.Uploaded
?true:false;
console.log(isUploaded,resumePdfKey)
const templates=isUploaded?templates2:templates1;
const { toast } = useToast()
const selectTemplate = async (templateId: string) => {
  try {
    const response = await fetch(`https://www.careerzai.com/v1/resume/pdf/select/${templateId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pinqueryToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to select template')
    }

    const data = await response.json()
console.log(data.presignedUrl,"url")

    setSelectedTemplate(templateId)
    setView(data.presignedUrl)
    toast({
      variant: "default",
      title: "Template Selected Successfully!",
      description: "Your chosen template has been applied. You can now customize it to suit your needs.",
    });
    


  } catch (error) {
    console.error('Error selecting template:', error)
  }
}


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
    <><div className="flex justify-center gap-4  pt-10">
      {/* Generate Resume Button */}
      <Link href={view} target="_blank" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        View Resume
      </Link>

      {/* Upload Resume Button */}
      <button type="button"
        className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50"
        onClick={handleUploadClick}
      >
        Upload Resume
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 m-0 mx-0">
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


    <div className="container mx-auto px-4 py-8 max-w-[600px]">
          <h1 className="text-3xl font-bold text-center mb-8">
            Select your Resume Template
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           { templates.map((template) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
                key={template.id}
                className={`relative mx-auto cursor-pointer w-fit transition-all duration-200 hover:scale-105 ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-primary ring-offset-2'
                    : ''
                }`}
                onClick={() => selectTemplate(template.id)}
              >
                <div className="">
                  <Image
                    src={template.image}
                    alt={template.name}
                  
                    className=""
                  />
    
                  <p className="text-center">{template.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default ResumeButtons;
