import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul className='flex p-2 text-white items-center justify-around bg-slate-800'>
            <li className='text-2xl font-bold'>
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </li>
            <li>
                <button className='flex w-[88px] h-[30px] items-center justify-around bg-white rounded-full'>
                    <span className='rounded-full'><img className='size-7 ' src="src/assets/google_logo.svg" alt="google" /></span>
                    <span className='text-sm text-black font-bold pr-2'>Google</span>
                </button>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
