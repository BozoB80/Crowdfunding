import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useStateContext } from '../context'
import { CustomButton } from './'
import { logo, menu, search, thirdweb } from '../assets'
import { navlinks } from '../constants'
import { slideIn, fadeIn } from '../utils/motion'
import DarkModeButton from './DarkModeButton'


const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const{ connect, address } = useStateContext();


  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] dark:bg-[#cdcdd3] rounded-[100px]'>
        <input type="text" placeholder='Search for campaigns' className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white dark:text-black bg-transparent outline-none' />
        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img src={search} alt="search" className='w-[15px] h-[15px] object-contain' />
        </div>
      </div>

      <div className='sm:flex hidden flex-row justify-end gap-4'>
        <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect()
          }}
        />

        <Link to="/profile">
          <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] dark:bg-[#cdcdd3] flex justify-center items-center cursor-pointer'>
            <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
          </div>
        </Link>
      </div>

      {/* Small screen Navigation: */}

      <motion.div className='sm:hidden flex justify-between items-center relative'>
        <div className='w-[40px] h-[40px] z-20 rounded-[10px] bg-[#2c2f32] dark:bg-[#cdcdd3] flex justify-center items-center cursor-pointer'>
            <img src={logo} alt="user" className='w-[60%] h-[60%] object-contain' />
        </div>

        {!toggleDrawer && (
          <img 
            src={menu}
            alt="menu"
            className='w-[34px] h-[34px] object-contain cursor-pointer'
            onClick={() => setToggleDrawer(true)}
          />
        )}

        {toggleDrawer && (
        <motion.div
          variants={slideIn('up', 'spring', 0, 2)}
          initial="hidden"
          whileInView="show"
          className='absolute top-0 right-0 left-0 bg-[#1c1c24] dark:bg-[#f1ecec] z-10 shadow-secondary pb-48'
        >
          <div className='flex justify-end items-center py-1'>
            <img 
              src={menu}
              alt="menu"
              className='flex w-[34px] h-[34px] cursor-pointer'
              onClick={() => setToggleDrawer(false)}
            />
          </div>
          <ul className='mb-4'>
            {navlinks.map((link, i) => (
              <motion.li 
                variants={fadeIn('right', 'spring', i * 0.5, 0.7)}
                initial="hidden"
                whileInView="show"
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43] dark:bg-[#cdcdd3]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link)
                }}
              >
                <img 
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale' }`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>{link.name}</p>
              </motion.li>
            ))}
          </ul>

          <motion.div 
            variants={fadeIn('left', 'spring', 3.2, 0.5)}
            className='flex mx-4 justify-between'
          >
              <CustomButton 
                btnType="button"
                title={address ? 'Create a campaign' : 'Connect'}
                styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                handleClick={() => {
                  if(address) navigate('create-campaign')
                  else connect()
                }}
              />
              <DarkModeButton />
          </motion.div>
        </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Navbar