"use client";
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react'
import React from 'react'

const Usermenu = () => {
  return (
   <UserButton appearence={{
    elements:{
        avatarBox:"w-10 h-10",
    },

   }}> 
    <UserButton.MenuItems>
        <UserButton.Link label='My Events' labelIcon={<ChartNoAxesGantt size={15} />}
            href="/events"></UserButton.Link>
            <UserButton.Action label='manageAccount' />
    </UserButton.MenuItems>
   </UserButton>
  )
}

export default Usermenu