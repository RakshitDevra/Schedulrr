"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Controller, useForm } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { timeSlots } from '../data';

import useFetch from '@/hooks/usefetch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateAvailability } from '@/actions/availabilty';
import { availabilitySchema } from '@/app/_lib/validators';

  
const AvailabilityForm= ({ initialData }) => {
 //   console.log(initialData);
  const {register,handleSubmit,control,setValue,watch,formState:{errors}}=useForm({
        resolver:zodResolver(availabilitySchema),
        defaultValues:{...initialData},
    });

    const {error,loading,fn}=useFetch(updateAvailability);

    const onSubmit=async(data)=>{
       await fn(data);
    }
    
    
      
    
    const daysarr=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    return (<form onSubmit={handleSubmit(onSubmit)}>
              {daysarr.map((day)=>{
                const isAvailable=watch(`${day}.isAvailable`);
                return (
          <div key={day} className="flex items-center space-x-4 mb-4">
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setValue(`${day}.isAvailable`, checked);
                    if (!checked) {
                      setValue(`${day}.startTime`, "09:00");
                      setValue(`${day}.endTime`, "17:00");
                    }
                  }}
                />
              )}
            />
            <span className="w-24">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>
            {isAvailable && (
              <>
                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <span>to</span>
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[day]?.endTime && (<span className='text-red-500 text-sm ml-2'>{errors[day].endTime.message}</span>)}
                
              </>
            )}
          </div>
        );
      })}
          <div className='flex items-center space-x-4'>
            <span className='w-48'>Minimun gap before bookings (minutes)</span>
            <Input type="number" className="w-32" {...register("timeGap",{
                valueAsNumber:true,
            })} />
            {errors?.timeGap && ( <span className='text-red-500 text-sm ml-2'>{errors.timeGap.message}</span>)}
          

          </div>
          {error &&  ( <span className='text-red-500 text-sm ml-2'>{error?.message}</span>)}
          <Button type="submit" className="mt-5" disabled={loading}>{loading?"Updating":"Update Availability"}</Button>
    </form>
  );
}
export default AvailabilityForm