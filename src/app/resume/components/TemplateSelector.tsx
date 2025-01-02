'use client'

import Image from "next/image"
import { useState } from "react"
import tem1 from '../../assests/image 6.png'
import tem2 from '../../assests/image 7 (1).png'
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast"
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

export default function TemplateSelector({resumePdfKey,selectedResumeTemplate
}: {resumePdfKey:any,selectedResumeTemplate
  :string
}) {
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


      setSelectedTemplate(templateId)
      toast({
        variant: "default",
        title: "Template Selected Successfully!",
        description: "Your chosen template has been applied. You can now customize it to suit your needs.",
      });
      


    } catch (error) {
      console.error('Error selecting template:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[600px]">
      <h1 className="text-3xl font-bold text-center mb-8">
        Select your Resume Template
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       { templates.map((template) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
            key={template.id}
            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
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
  )
}

