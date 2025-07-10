"use client"
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [showdropdown, setShowdropdown] = useState(false)

  const handleDropdownClick = (path) => {
    setShowdropdown(false)       // Close dropdown
    router.push(path)            // Navigate
  }

  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 md:h-16'>
      <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
        <span className='text-xl md:text-base my-3 md:my-0'>Giveova!</span>
      </Link>

      <div className='relative flex justify-center items-center md:block gap-4'>
        {session && (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              id="dropdownDefaultButton"
              className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              <p className="text-white">Welcome, {session?.user?.name}</p>
              <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button onClick={() => handleDropdownClick('/')} className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</button>
                </li>
                <li>
                  <button onClick={() => handleDropdownClick('/dashboard')} className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</button>
                </li>
                <li>
                  <button onClick={() => handleDropdownClick(`/name/${session.user.name}`)} className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</button>
                </li>
              </ul>
            </div>
          </>
        )}

        {session && (
          <button
            onClick={() => {
              signOut();
              localStorage.clear();
              router.push("/login");
            }}
            className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
