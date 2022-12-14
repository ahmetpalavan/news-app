import React from 'react'
import {Bars3Icon} from '@heroicons/react/24/solid'
import Link from 'next/link'

function Header(){
  return (
    <header>
        <div className='grid grid-cols-3 p-10 items-center'>
            <Bars3Icon className='h-8 w-8 cursor-pointer'/>
            <Link href='/' prefetch={false} >
                <h1 className='font-serif text-4xl text-center'>
                The {" "}
                <span className='underline decoration-6 decoration-orange-400 '>PALAVAN</span> {" "} 
                News
                </h1>
            </Link>
            <div className='flex space-x-2  items-center bg- justify-end'>
                {/* Dark Mode Button */}
                <button className='hidden  md:inline bg-slate-900 text-white px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-900'>
                    Subscribe Now
                </button>
            </div> 
        </div>
        {/* NavLinks */}
        {/* SearchBox */}
    </header>
  )
}

export default Header