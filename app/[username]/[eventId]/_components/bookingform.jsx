"use client"
import { bookingSchema } from '@/app/_lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { DayPicker } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import "react-day-picker/style.css";
import { useState,useEffect } from 'react'
import { timeSlots } from '@/app/(main)/availability/data'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/usefetch'
import { createBooking } from '@/actions/bookings'
const BookingForm = ({event,availability}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const {register,handleSubmit,formState:{errors},setValue}=useForm({
    resolver:zodResolver(bookingSchema)
  })
  const availableDays=availability.map((day)=> new Date(day.date));
  const timeSlots=selectedDate?availability.find((day)=> day.date===format(selectedDate,"yyyy-MM-dd"))?.slots||[]:[];
  useEffect(() => {
    if(selectedDate){
      setValue("date",format(selectedDate,"yyyy-MM-dd"));
    }
  }, [selectedDate,setValue])
  useEffect(() => {
    if(selectedTime){
      setValue("time",selectedTime);
    }
  }, [selectedTime,setValue])
  
  const {loading,data,fn:fnCreateBooking}=useFetch(createBooking);

  const onSubmit=async(data)=>{
  console.log(data);
  if(!selectedDate || !selectedTime){
    console.log("Date or Time not Selected");
    return;
  }
  const startTime=new Date(`${format(selectedDate,"yyyy-MM-dd")}T${selectedTime}`);
  const endTime=new Date(startTime.getTime()+ event.duration*60000);
  const bookingData={
    eventId:event.id,
    name:data.name,
    email:data.email,
    startTime:startTime.toISOString(),
    endTime:endTime.toISOString(),
    additionalInfo:data.additionalInfo,

  }
  await fnCreateBooking(bookingData);

  }
  if(data){
    return (<div className='text-center p-10 border bg-white'>
      <h2 className='text-2xl font-bold mb-4'>Booking Successful!</h2>
      {data.meetLink &&(<p>Join the meeting:{" "}<a href={data.meetLink} target='_blank' rel="noopener noreferrer" className='text-blue-500 hover:underline'>{data.meetLink}</a></p>)}
    </div>)
  }
  
  return (
    <div className="flex flex-col gap-8 p-10 border bg-white">

    <div className="md:h-26 flex flex-col md:flex-row gap-5">
      
        <div><DayPicker mode='single' selected={selectedDate} onSelect={(date)=>{
          setSelectedDate(date);
          setSelectedTime(date);
        }} disabled={[{before: new Date()}]} modifiers={{available:availableDays}} modifiersStyles={{available:{
          background:"lightblue",bordeRadius:100,
        }}}/></div>
      
      <div className="w-full h-full md:overflow-scroll no-scrollbar">
      {selectedDate && (<div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">{timeSlots.map((slot)=>{return <Button key={slot} onClick={()=>setSelectedTime(slot)}  variant={selectedTime===slot?"default":"outline"}>{slot}</Button>})}
        </div>
        </div>
      )}
        </div>
      
    </div>
    {selectedTime &&(<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div>
    <Input {...register("name")} placeholder="Your Name" />
    {errors.name && (<p className="text-red-500 text-sm">{errors.name.message}</p>)}</div>
    <div>
    <Input {...register("email")} placeholder="Your Email" />
    {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}</div>
    <div>
    <Textarea {...register("additionalInfo")} placeholder="Additional Information" />
    {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}</div>
    <Button type="submit" disabled={loading} className="w-full">{loading?"Scheduling...":"Schedule Event"}</Button>
     </form>)}
    </div>
    
  )
}

export default BookingForm