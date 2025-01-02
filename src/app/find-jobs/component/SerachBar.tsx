"use client"

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomTagInput from './CustomTagInput'

interface SearchBarProps {
  jobs: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ jobs }) => {
  const router = useRouter()
  const [skillTags, setSkillTags] = useState<string[]>([])
  const [locationTags, setLocationTags] = useState<string[]>([])

  const handleSearch = () => {
    const skill = skillTags.join(',')
    const location = locationTags.join(',')
    
    router.push(`/find-jobs/jobs?location=${encodeURIComponent(location)}${skill ? "&skilltag=" + encodeURIComponent(skill) : ""}`)
  }

  return (
    <div className='px-3'>
      <div className="flex lg:flex-row flex-col w-full max-w-[1100px] mx-auto items-center lg:border lg:border-gray-300 rounded-lg overflow-hidden bg-white border border-black">
        {/* Job Title Search */}
        <div className="flex items-center h-full pl-3 lg:w-[40%] w-full lg:border-r lg:border-0  lg:border-gray-300">
          <CustomTagInput
            tags={skillTags}
            setTags={setSkillTags}
            placeholder="Search job title, company or skill"
            maxTags={3}
          />
        </div>

        {/* Location Search */}
        <div className="flex h-full  items-center border-t border-black pl-3 lg:w-[40%] w-full lg:border-0">
          <CustomTagInput
            tags={locationTags}
            setTags={setLocationTags}
            placeholder="Search location or Remote"
            maxTags={3}
          />
        </div>

        {/* Browse Jobs Button */}
        <button
          type='button'
          onClick={handleSearch}
          className="bg-blue-500 md:inline-block py-5 hidden h-full lg:w-[20%] w-full text-white text-xl font-semibold px-3 hover:bg-blue-600 transition-colors duration-200"
        >
          Browse Jobs
        </button>
      </div>
      <div className='pt-7 text-center'>
        <button
          type='button'
          onClick={handleSearch}
          className="bg-blue-500 md:hidden inline-block py-3 h-full lg:w-[20%] md:w-full w-fit rounded-lg text-white text-sm font-semibold px-3 hover:bg-blue-600 transition-colors duration-200"
        >
          Browse Jobs
        </button>
      </div>
    </div>
  )
}

export default SearchBar

