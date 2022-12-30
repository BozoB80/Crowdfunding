import React from 'react'

const CountBox = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center w-[150px]'>
        <h4 className='font-epilogue font-bold text-[30px] text-white dark:text-black p-3 bg-[#1c1c24] dark:bg-[#cdcdd3] rounded-t-[10px] w-full text-center truncate'>{value}</h4>
        <p className='font-epilogue font-normal text-[16px] text-[#808191] dark:text-[#2c2a2a] bg-[#e2e2eb] px-3 py-2 w-full rounded-b-[10px] text-center'>{title}</p>
    </div>
  )
}

export default CountBox