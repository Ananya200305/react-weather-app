import React from 'react'
import LogoutBtn from '../logout/LogoutBtn'
import SearchBar from './SearchBar'

export function History() {
  return (
    <div className='flex h-screen w-screen gap-11'>
      <div className='w-1/3 h-full bg-white/10 rounded-t-3xl ml-4 mt-4'>
      <SearchBar/>
      </div>
      <div className='w-2/3 h-full mt-4'>
      <div className='absolute top-5 right-5'>
        <LogoutBtn/>
      </div>
      </div>
    </div>
  )
}


