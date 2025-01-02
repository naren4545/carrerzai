import type React from 'react'
import { useState, type KeyboardEvent, type ChangeEvent } from 'react'
import { X } from 'lucide-react'

interface CustomTagInputProps {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  placeholder: string
  maxTags?: number
}

const CustomTagInput: React.FC<CustomTagInputProps> = ({ tags, setTags, placeholder, maxTags = 3 }) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '' && tags.length < maxTags) {
      e.preventDefault()
      setTags([...tags, input.trim()])
      setInput('')
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      setTags(tags.slice(0, -1))
    }
  }

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className="flex flex-wrap items-center  w-full rounded-md p-2 focus-within:border-blue-500">
      {tags.map((tag, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<span key={index} className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 m-1 text-sm flex items-center">
          {tag}
          <button type='button' onClick={() => removeTag(index)} className="ml-1 focus:outline-none">
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={tags.length < maxTags ? placeholder : ''}
        className="flex-grow outline-none text-sm p-1"
      />
    </div>
  )
}

export default CustomTagInput

