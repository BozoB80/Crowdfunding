import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'

import { useStateContext } from '../context'
import { CountBox, CustomButton, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { thirdweb } from '../assets'

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address, getUserCampaigns } = useStateContext();

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState([])

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])
  

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate('/')
    setIsLoading(false);
  }


  // fetchUserCampaigns
  const [campaigns, setCampaigns] = useState([])

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchUserCampaigns();
  }, [address, contract])


  return (
    <div>
      {isLoading && <Loader />}

      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign" className='w-full h-[410px] object-cover rounded-xl' />
          <div className='relative w-full h-[5px] bg-[#3a3a43] dark:bg-[#cdcdd3] mt-2'>
            <div className='absolute h-full bg-[#4acd8d]' style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`}}>
            </div>
          </div>
        </div>

        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountBox title="Days left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total backers" value={donators.length} />
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col gap-[40px]'>
          <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white dark:text-gray-800 uppercase'>Creator</h4>
            <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] dark:bg-[#cdcdd3] cursor-pointer'>
                <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
              </div>
              <div>
                <h4 className='font-epilogue font-semibold text-[14px] text-white dark:text-gray-800 break-all'>{state.owner}</h4>
                <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>{campaigns.length === 1 ? `${campaigns.length} campaign` : `${campaigns.length} campaigns`} </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white dark:text-gray-800 uppercase'>Story</h4>
            <div className='mt-[20px]'>
              <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>10 {state.description}</p>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white dark:text-gray-800 uppercase'>Donators</h4>
            <div className='mt-[20px] flex flex-col gap-4'>
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className='flex justify-between items-center gap-4'>
                  <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all'>{index + 1}.{' ' + item.donator}</p>
                  <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all'>{item.donation}</p>
                </div>
              )) : (
                <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>
                  No donators yet. Be the first one.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='flex-1'>
          <h4 className='font-epilogue font-semibold text-[18px] text-white dark:text-gray-800 uppercase'>Fund</ h4>
          <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] dark:bg-[#cdcdd3] rounded-[10px]'>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191] dark:text-gray-800'>
              Fund the campaign
            </p>
            <div className='mt-[30px]'>
                <input 
                  type="number"
                  placeholder='ETH 0.1'
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white dark:text-gray-800 text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                />

                <div className='my-[20px] p-4 bg-[#13131a] dark:bg-[#e2e2eb] rounded-[10px]'>
                  <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white dark:text-gray-800'>Back it because you believe in it.</h4>
                  <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>Support the project for no reward, just because it speaks to you.</p>
                </div>

                <div>
                  <CustomButton 
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleDonate}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails