'use client'

import { useState } from 'react'
import Cookies from "js-cookie";
export default function ProfileForm({setisProfile}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    location: '',
    industry: '',
    DOB: '',
    gender: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log(formData)



      const handleProfile=async()=>{
        const pinqueryToken = Cookies.get("pinquery_token");
        try {
          const response = await fetch("https://www.careerzai.com/v1/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${pinqueryToken}`, // Include the Authorization token
            },
            body: JSON.stringify(formData), // Convert the data to a JSON string
          });
      
          if (!response.ok) {
            throw new Error(`Failed to send data: ${response.statusText}`);
          }
      
          const result = await response.json();
          console.log("Data sent successfully:", result);
          setisProfile(true)
          alert('Form submitted successfully!')
        } catch (error) {
          console.error("Error sending data:", error.message);
        }
      
      }  


await handleProfile()




     
    } else {
      alert('Please fill in all required fields')
    }
  }

  return (
    <div className="max-w-4xl mx-auto  p-8 bg-white rounded-lg shadow-md my-11">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.education ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.education ? "true" : "false"}
            >
              <option value="">Select education level</option>
              <option value="High School">High School</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.location ? "true" : "false"}
            >
              <option value="">Select location</option>
              {["Delhi", "Mumbai", "Bengaluru", "Pune", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad", "Jaipur", "Surat",
                "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Bhopal", "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik",
                "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad",
                "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Howrah", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada",
                "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubballi-Dharwad", "Tiruchirappalli",
                "Bareilly", "Moradabad", "Mysuru", "Tiruppur", "Gurgaon", "Aligarh", "Jalandhar", "Bhubaneswar", "Salem",
                "Mira-Bhayandar", "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Gorakhpur", "Guntur", "Bikaner", "Amravati",
                "Noida", "Jamshedpur", "Bhilai", "Warangal", "Cuttack", "Firozabad", "Mangalore", "Belgaum", "Jhansi", "Udaipur",
                "Tirunelveli", "Siliguri", "Ranchi", "Tirupati", "Jammu", "Muzaffarnagar", "Panaji"].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.industry ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.industry ? "true" : "false"}
            >
              <option value="">Select industry</option>
              {["Technology", "Business", "Account", "Creative", "Human Resource", "Legal", "Healthcare", "Marketing",
                "Finance", "Manufacturing", "Retail", "Construction", "Transportation", "Hospitality", "Telecommunications"].map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.dob ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.dob ? "true" : "false"}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.gender ? "true" : "false"}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

