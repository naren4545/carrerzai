"use client";

import * as z from "zod";
import { AutoForm } from "@autoform/mui";
import { ZodProvider } from "@autoform/zod";

// Define the Zod schema
const schema = z.object({
  userFirstName: z.string().min(1, "First name must not be empty"),
  userLastName: z.string().min(1, "Last name must not be empty"),
  userEmail: z.string().email("Invalid email address"),
  userAddress: z.string().min(1, "Address must not be empty"),
  userPhoneNumber: z.string().min(1, "Phone number must not be empty"),
  skills: z
    .array(
      z.object({
        skillType: z.string().min(1, "Skill type must not be empty"),
        skillValues: z.array(z.string().min(1, "Skill value must not be empty")),
      })
    )
    .optional(),
  work: z
    .array(
      z.object({
        role: z.string().min(1, "Role must not be empty"),
        company: z.string().min(1, "Company must not be empty"),
        startDate: z.string().min(1, "Start date must not be empty"),
        endDate: z.string().min(1, "End date must not be empty"),
        description: z.string().min(1, "Description must not be empty"),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree must not be empty"),
        institution: z.string().min(1, "Institution must not be empty"),
        startDate: z.string().min(1, "Start date must not be empty"),
        completionDate: z.string().min(1, "Completion date must not be empty"),
      })
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        description: z.string().min(1, "Description must not be empty"),
        issuedBy: z.string().min(1, "Issued by must not be empty"),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        name: z.string().min(1, "Project name must not be empty"),
        description: z.string().min(1, "Description must not be empty"),
        keywords: z.array(z.string().min(1, "Keyword must not be empty")),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  links: z
    .array(
      z.object({
        network: z.string().min(1, "Network name must not be empty"),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  Achievements: z.array(z.string().min(1, "Achievement must not be empty")).optional(),
});

// Pass the Zod schema directly to ZodProvider
const provider = new ZodProvider(schema);

export default function ProfileForm() {
  return (
    <div className="max-w-[1300px] mx-auto py-10">
    <AutoForm
      schema={provider} // Pass the provider directly
      onSubmit={(data) => {
        console.log("Form Data:", data);
      }}
      withSubmit
    />
    </div>
  );
}
