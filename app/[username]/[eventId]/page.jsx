import { getUserByUsername } from '@/actions/users'
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EventCard from '@/components/eventcard';
import { getEventDetails } from '@/actions/events';
import EventDetails from './_components/eventdetails';
import { getEventAvailability } from '@/actions/availabilty';
import BookingForm from './_components/bookingform';

export  async function generateMetadata({params}) {
  const event=await getEventDetails(params.username);
  if(!event){
    return {
      title:"Event Not Found",
    };
  }
  return {
  title:`Book ${event.title} with ${event.user.name} |Schedulrr`,
  description:`Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`

  }
  
}
const Eventpage = async({params}) => {
    console.log(params.eventId);
    console.log(params.username);
   const event=await getEventDetails(params.username,params.eventId);
   const availability=await getEventAvailability(params.eventId);
   console.log(availability);
   if(!event){
    notFound();
   }

  return (
   <div className='flex flex-col justify-center lg:flex-row px-4 py-8'>
  
     <EventDetails event={event}/>
     <Suspense fallback={<div>Loading booking form...</div>} > 
    <BookingForm event={event} availability={availability}/>
    </Suspense>
     
   </div>
  )
}

export default Eventpage