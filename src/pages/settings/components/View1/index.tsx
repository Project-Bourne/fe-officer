import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const View1 = () => {

    const router = useRouter();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

  return (
    <div className='py-4 px-8 md:w-full w-[90%] mt-3 border-b-[1.5px]'>
        <div className='flex flex-row w-full items-center justify-between'>
          <h2 className='font-semibold text-[13px]'>Personal Information</h2>
          <div className='flex flex-row items-center border border-sirp-primary rounded-md px-4 py-3 cursor-pointer'>
            <Image
              src={require(`../../../../assets/icons/edit.svg`)}
              alt="Edit btn"
              width={18}
              height={18}
              style={{marginRight: 15}}
              priority
            />
            <h2 className='text-[13px] text-sirp-primary'>Edit Profile</h2>
          </div>
        </div>

        {/* Names */}
        <div className='flex flex-row items-center my-[20px] w-full'>
          <label htmlFor='name' className='text-[12px] text-sirp-grey'>Name: </label>
          
          <div className='flex flex-col gap-4 md:flex-row ml-[3vh] w-full md:w-[50%]'>
            <input 
              name='name'
              type='text' 
              placeholder='First name'
              onChange={(e: any) => setFirstname(e)}
              className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-full'
            />
            <input 
              type='text' 
              placeholder='Last name'
              onChange={(e: any) => setLastname(e)}
              className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-full'
            />
          </div>
        </div>

        {/* Email */}
        <div className='flex flex-row items-center my-[20px] w-full md:w-[50%]'>
          <label htmlFor='email' className='text-[12px] text-sirp-grey'>Email: </label>
          
          <div className='ml-[3vh] w-full items-center flex flex-row relative'>
            <Image
              src={require(`../../../../assets/icons/mail.svg`)}
              alt="mail"
              width={16}
              height={16}
              className='absolute self-center item-center left-[7%]'
            />

            <input 
              type='email' 
              name='email'
              placeholder='Email Address'
              onChange={(e: any) => setEmail(e)}
              className='text-[12px] text-black border-[1.5px] rounded-md py-2 pl-10 pr-7 mx-4 w-full'
            />
            
          </div>
        </div>

      </div>
  )
}

export default View1;