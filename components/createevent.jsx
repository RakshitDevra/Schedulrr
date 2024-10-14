"use client"
import React, { useEffect } from 'react'


import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { useState } from 'react'

import { useSearchParams, useRouter  } from 'next/navigation'
import Eventform from './ui/eventform'

export default function CreateEventDrawer() {
  const [isOpen,setIsOpen]=useState(false);
    const router=useRouter();
    const searchParams=useSearchParams();
    useEffect(()=>{
      const create=searchParams.get("create");
      if(create=="true"){
        setIsOpen(true);
      }
    },[searchParams]);
  const handleClose=()=>{
  setIsOpen(false);
  if(searchParams.get('create')==="true"){
    router.replace(window?.location?.pathname);
  }
  }
  return (
    <Drawer open={isOpen} onClose={handleClose}>
      
      <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
            
          </DrawerHeader>
           <Eventform onSubmitForm={()=>{handleClose()}}/> 
         {/* <div className='p-4 pb-0'>Hello</div> */}
             
         
           
          <DrawerFooter>
            
            <DrawerClose asChild>
              <Button variant="outline" onclick={handleClose}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>

       
      </DrawerContent>
    </Drawer>
  )
}

