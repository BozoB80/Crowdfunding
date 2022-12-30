import React from 'react'


const FormField = ({ labelName, placeholder, inputType, isTextArea, isSelect, value, handleChange }) => {
  return (
    <label className='flex-1 w-full flex flex-col'>
        {labelName && (
            <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] dark:text-black mb-[10px]'>{labelName}</span>
        )}
        
        {isTextArea ? (
            <textarea
                required
                value={value}
                onChange={handleChange}
                rows={10}
                placeholder={placeholder}
                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white dark:text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
            />
        ) : isSelect ? (
            <select
                required
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-gray-200 dark:text-gray-600 text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
            >
                <option value="" disabled selected className='text-[#4b5264]'>--Please choose an option</option>
                {['Save Nature', 'Save Children', 'Build a Project', 'Education', 'Investment', 'Travel', 'DIY Products'].map((item, i) => (
                    <option key={item + i} className='font-epilogue font-medium text-[14px] leading-[22px] text-[#4b5264] mb-[10px]'>{item}</option>
                ))}
            </select>
        ) : (
            <input
                required
                value={value}
                onChange={handleChange}
                type={inputType}
                step="0.1"
                placeholder={placeholder}
                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white dark:text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
            />
        )}
           
        
    </label>
  )
}

export default FormField