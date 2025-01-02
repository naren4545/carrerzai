'use client'

import { useState, useEffect } from 'react'
import { PenSquare } from 'lucide-react'
import { set, z } from 'zod'
import Cookies from "js-cookie";
import { Autocomplete } from './Autocomplete';
import { useToast } from '@/hooks/use-toast';
const businessProfileSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  industry: z.string().min(2, "Industry must be at least 2 characters long"),
  website: z.string().url("Invalid URL").optional(),
  employeeCount: z.number().int().positive("Employee count must be a positive integer"),
  foundedYear: z.number().int().min(1800, "Founded year must be 1800 or later").max(new Date().getFullYear(), "Founded year cannot be in the future"),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string()
  }),
})

type BusinessProfile = z.infer<typeof businessProfileSchema>

const emptyProfile: BusinessProfile = {
  name: "",
  description: "",
  industry: "",
  website: "",
  employeeCount: 1,
  foundedYear: new Date().getFullYear(),
  location: {
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: ""
  }
}
const cityOptions = [
  "Delhi", "Mumbai", "Bengaluru", "Pune", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Bhopal", "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik",
  "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad",
  "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Howrah", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada",
  "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubballi-Dharwad",
  "Tiruchirappalli", "Bareilly", "Moradabad", "Mysuru", "Tiruppur", "Gurgaon", "Aligarh", "Jalandhar",
  "Bhubaneswar", "Salem", "Mira-Bhayandar", "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Gorakhpur",
  "Guntur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Warangal", "Cuttack", "Firozabad",
  "Mangalore", "Belgaum", "Jhansi", "Udaipur", "Tirunelveli", "Siliguri", "Ranchi", "Tirupati", "Jammu",
  "Muzaffarnagar", "Panaji"
]

const industryOptions = [
  "Technology", "Business", "Account", "Creative", "Human Resource", "Legal", "Healthcare", "Marketing",
  "Finance", "Manufacturing", "Retail", "Construction", "Transportation", "Hospitality", "Telecommunications"
]
export default function BusinessProfile() {
  const [profile, setProfile] = useState<BusinessProfile | null>(emptyProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Partial<z.ZodFormattedError<BusinessProfile>>>({})
const [isbixProfile, setIsbixProfile] = useState(false)

const { toast } = useToast()

  useEffect(() => {
    // Simulating an API call to fetch the profile
    const fetchProfile = async () => {
      try {
        const pintudeToken = Cookies.get("pintude_token");

        if (!pintudeToken) {
          return;
        }
        // Replace with your actual API endpoint
        const response = await fetch('https://www.careerzai.com/v1/business', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pintudeToken}` // Include the token in the header
          }
        });
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
          setIsbixProfile(true)
        } else {
          // If no profile exists, set to null
          setProfile(null)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setProfile(null)
      }
    }

    fetchProfile()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setErrors({})
  }

  const handleSubmit = async () => {
    try {
      const pintudeToken = Cookies.get("pintude_token");

      if (!pintudeToken) {
        return;
      }
      const dataToSubmit = profile || emptyProfile
      businessProfileSchema.parse(dataToSubmit)
      setErrors({})

      const method = isbixProfile ? 'PUT' : 'POST'
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint
      const response = await fetch('https://www.careerzai.com/v1/business', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pintudeToken}`
        },
        body: JSON.stringify(dataToSubmit)
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        method === 'POST' && setIsbixProfile(true) 
        setProfile(updatedProfile.business)
        setIsEditing(false)



        method === 'POST' ?  toast({
          variant: "default",
          title: "Business Profile Created!",
          description: "Your business profile has been created successfully. You can now start posting jobs to attract top talent.",
        }):toast({
          variant: "default",
          title: "Profile Updated Successfully!",
          description: "Your business profile has been updated successfully. Keep posting jobs and growing your business.",
        });;
      } else {
        console.error('Failed to update profile')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.format())
      } else {
        console.error('Error updating profile:', error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => {
      if (!prev) return null
      return {
        ...prev,
        [name]: name === 'employeeCount' || name === 'foundedYear' ? parseInt(value) || 0 : value
      }
    })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => {
      if (!prev) return null
      return {
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      }
    })
  }
  const handleAutocompleteChange = (field: string, value: string) => {
    if (field === 'city') {
      setProfile(prev => {
        if (!prev) return null
        return {
          ...prev,
          location: {
            ...prev.location,
            city: value
          }
        }
      })
    } else {
      setProfile(prev => {
        if (!prev) return null
        return {
          ...prev,
          [field]: value
        }
      })
    }
  }
  if (profile === null && !isEditing) {
    return (
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">No Business Profile Found</h3>
              <button
                onClick={() => {
                  setProfile(emptyProfile)
                  setIsEditing(true)
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Business Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Business Profile</h3>
              {!isEditing && profile && (
                <button
                  onClick={handleEdit}
                  className="text-indigo-600 hover:text-indigo-900"
                  aria-label="Edit profile"
                >
                  <PenSquare className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={profile?.name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name._errors.join(', ')}</p>}
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={profile?.description || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description._errors.join(', ')}</p>}
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                <Autocomplete
                  options={industryOptions}
                  value={profile?.industry || ''}
                  onChange={(value) => handleAutocompleteChange('industry', value)}
                  placeholder="Select an industry"
                  disabled={!isEditing}
                />
                {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry._errors.join(', ')}</p>}
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  value={profile?.website || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website._errors.join(', ')}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700">Employee Count</label>
                  <input
                    type="number"
                    name="employeeCount"
                    id="employeeCount"
                    value={profile?.employeeCount || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.employeeCount && <p className="mt-1 text-sm text-red-600">{errors.employeeCount._errors.join(', ')}</p>}
                </div>
                <div>
                  <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">Founded Year</label>
                  <input
                    type="number"
                    name="foundedYear"
                    id="foundedYear"
                    value={profile?.foundedYear || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.foundedYear && <p className="mt-1 text-sm text-red-600">{errors.foundedYear._errors.join(', ')}</p>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={profile?.location.address || ''}
                      onChange={handleLocationChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.location?.address && <p className="mt-1 text-sm text-red-600">{errors.location.address._errors.join(', ')}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <Autocomplete
                      options={cityOptions}
                      value={profile?.location.city || ''}
                      onChange={(value) => handleAutocompleteChange('city', value)}
                      placeholder="Select a city"
                      disabled={!isEditing}
                    />
                    {errors.location?.city && <p className="mt-1 text-sm text-red-600">{errors.location.city._errors.join(', ')}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={profile?.location.state || ''}
                      onChange={handleLocationChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.location?.state && <p className="mt-1 text-sm text-red-600">{errors.location.state._errors.join(', ')}</p>}
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={profile?.location.country || ''}
                      onChange={handleLocationChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.location?.country && <p className="mt-1 text-sm text-red-600">{errors.location.country._errors.join(', ')}</p>}
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      value={profile?.location.zipCode || ''}
                      onChange={handleLocationChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.location?.zipCode && <p className="mt-1 text-sm text-red-600">{errors.location.zipCode._errors.join(', ')}</p>}
                  </div>
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {profile ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

