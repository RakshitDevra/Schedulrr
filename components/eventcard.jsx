"use client"

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { Link, Trash, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/usefetch'
import { DeleteEvent } from '@/actions/events'

const EventCard = ({event,username,isPublic=false}) => {
  const [isCopied, setisCopied] = useState(false)
  const router=useRouter();


  const handleCopy=async ()=>{
 try {
await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
setisCopied(true);
setTimeout(()=>setisCopied(false),2000);
 } catch (error) {
  console.log("Failed to Copy : ",error);
 }
  }
const{loading,fn:fnDeleteEvent}=useFetch(DeleteEvent);
const handleDelete=async()=>{
  if(window?.confirm("Are you sure you want to Delete the Event")){
    await fnDeleteEvent(event.id);
    router.refresh();
  }
}
const handleCardClick=(e)=>{
  if(e.target.tagName!="BUTTON" &&e.target.tagName!=="SVG"){
       window?.open(`${window?.location.origin}/${username}/${event.id}`,"_blank")
  }
}
  return (
    <div>
    <Card className="flex flex-col justify-between cursor-pointer" onClick={handleCardClick}>
    <CardHeader>
      <CardTitle className="text-2xl">{event.title}</CardTitle>
      <CardDescription className="flex justify-between">
      <span>

      {event.duration} mins | {event.isPrivate?"Private ":"Public "}
      </span><span>{event._count.bookings} Bookings</span>
      </CardDescription>
    
    </CardHeader>
    <CardContent>
    <p>{event.description.split(".")[0]}</p>
    </CardContent>
    {!isPublic &&<CardFooter className="flex gap-2">

     <Button variant="outline" className="flex items-center" onClick={handleCopy}><Link className="mr-2 h-4 w-4 "/> {" "} {isCopied?"Copeid":"Copy Link"}</Button>
     <Button variant="destructive"onClick={handleDelete} disabled={loading}><Trash2 className='mr-2 h-4 w-4' /> {" "}{loading?"Deleting...":"Delete"}</Button>
    </CardFooter>}
    
  </Card>
  </div>
  )
}

export default EventCard
