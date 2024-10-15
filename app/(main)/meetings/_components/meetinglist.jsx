import { Calendar, Clock, Video } from 'lucide-react'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { format } from 'date-fns'  
import { Button } from '@/components/ui/button'
import CancelMeetingButton from './cancelmeetingbutton'

const MeetingList = ({meetings,type}) => {
    if(meetings.length===0){
        return<p>No {type} meetings Found</p>
    }
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {meetings.map((meeting)=>{
            return( <Card key={meeting.id} className="flex flex-col justify-between shadow-md p-4">
      <CardHeader>
      <CardTitle>{meeting.event.title}</CardTitle>
      <CardDescription> with {meeting.name}</CardDescription>
      <CardDescription>&quot;{meeting.additionalInfo}&quot;</CardDescription>
     </CardHeader>
     <CardContent>
     <div className='flex items-center mb-2'>
     <Calendar className='mr-2 h-4 w-4' />
     <span>{format(new Date(meeting.startTime),"MMMM d, yyyy")}</span></div>

     <div className='flex items-center mb-2'><Clock className='mr-2 h-4 w-4' />
     <span>{format(new Date(meeting.startTime),"h:mm:a")}-{" "} {format(new Date(meeting.endTime),"h:mm:a")}</span></div>
     {meeting.meetLink&& (<div className='flex items-center'>
        <Video className='mr-2 h-4 w-4' />
        <a href={meeting.meetLink} target='_blank' rel="nooopener noreferrer" className='text-blue-500 hover:underline'>Join Meeting</a>
     </div>)}
     </CardContent>
    {type === "upcoming" && (
            <CardFooter className="flex justify-between">
              <CancelMeetingButton meetingId={meeting.id} />
            </CardFooter>)}
</Card>
            )
        })}
    </div>
  )
}

export default MeetingList
