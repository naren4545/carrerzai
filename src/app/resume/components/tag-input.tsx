import React, { useState, KeyboardEvent } from 'react'

interface TagInputProps {
  tags: string[]
  onTagsChange: (newTags: string[]) => void
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange }) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault()
      if (!tags.includes(input.trim())) {
        onTagsChange([...tags, input.trim()])
      }
      setInput('')
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onTagsChange(tags.slice(0, -1))
    }
  }

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md">
      {tags.map((tag, index) => (
        <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md flex items-center">
          {tag}
          <button
            onClick={() => removeTag(index)}
            className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="flex-grow border-none focus:outline-none"
        placeholder="Type and press Enter to add tags"
      />
    </div>
  )
}

