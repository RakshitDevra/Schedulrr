// "use client"
// import { eventSchema } from '@/app/_lib/validators'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Controller, useForm } from 'react-hook-form'
// import React from 'react'
// import { Input } from './input'
// import {
//     Select,
//     SelectContent,
    
//     SelectItem,

//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
// import { Button } from './button'
// import useFetch from '@/hooks/usefetch'
// import { createEvent } from '@/actions/events'
// import { useRouter } from 'next/navigation'

// const Eventform = ({onSubmitForm,initialData = {} }) => {
//     const router=useRouter();
//    const {register,control,handleSubmit,formState:{errors}}= useForm({
//         resolver:zodResolver(eventSchema),
//         defaultValue:{
//            title: initialData.title || "",
//       description: initialData.description || "",
//       duration: initialData.duration || 30,
//       isPrivate: initialData.isPrivate ?? true,

//         }
//     });

//     const {loading,error,fn:fnCreateEvent}=useFetch(createEvent);

//     const onSubmit=async(data)=>{
//         await fnCreateEvent(data);
//     if(!loading && !error){
//       console.log("Submitted");
//       onSubmitForm();
//     }
      
//     router.refresh();
//     }
//   return (
//     <form className='px-5 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
//     <div>
//  <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Event Title</label>
//     <Input id="title" {...register("title")} className="mt-1" />
//     {errors.title && (<p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>)}

   
//     </div>
//     <div>
//  <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description </label>
//     <Input id="description" {...register("description")} className="mt-1" />
//     {errors.description && (<p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>)}
//     </div>
//     <div>
//  <label htmlFor='duration' className='block text-sm font-medium text-gray-700'>Duration (minutes) </label>
//     <Input id="duration" {...register("duration",{valueAsNumber:true})} type="Number" className="mt-1" />
//     {errors.duration && (<p className='text-red-500 text-sm mt-1'>{errors.duration.message}</p>)}
//     </div>
//     <div>
//  <label htmlFor='isPrivate' className='block text-sm font-medium text-gray-700'>Events Privacy </label>
//  <Controller
//           name="isPrivate"
//           control={control}
//           render={({ field }) => (
//             <Select
//               onValueChange={(value) => field.onChange(value === "true")}
//               value={field.value ? "true" : "false"}
//             >
//  {/* <Controller 
//   name='isPrivate' 
//   control={control}  
//   render={({ field }) => (
//     <Select 
//       onValueChange={(value) => field.onChange(value === "true")}  // Converts string to boolean
//       value={field.value ? "true" : "false"}  // Ensures correct display based on the boolean value
//     > */}
//       <SelectTrigger className="mt-1">
//         <SelectValue placeholder="Select your privacy" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="true">Private</SelectItem>
//         <SelectItem value="false">Public</SelectItem>
        
//       </SelectContent>
//     </Select>
//   )}
// />

//  {/* <Controller 
//   name='isPrivate' 
//   control={control}  
//   render={({ field }) => (
//     <Select 
//       onValueChange={(value) => field.onChange(value === "true")}  // Converts string to boolean
//       value={field.value ? "true" : "false"}  // Ensures correct display based on the boolean value
//     >
//  {/* <Controller name='isPrivate' control={control}  render={({field})=>(<Select onValueChange={(value)=> field.onChange(value==="true")} value={field.value? "true":"false"} > */}
//       {/* <SelectTrigger className="mt-1">
//         <SelectValue placeholder="Select privacy" />
//       </SelectTrigger>
//       <SelectContent>
//           <SelectItem value="true" >Private</SelectItem>
//           <SelectItem value="false" >Public</SelectItem>
      
//       </SelectContent>
//     </Select>
//     )}/> */} 
//  </div>


//     {error && (<p  className='text-red-500 text-sm mt-1'>{error.message}</p>)}

//     <Button type="submit" diasabled={loading}>{loading?"Submitting":"Create Event"}</Button>

//     </form>
//   )
// }

// export default Eventform


//Copied From Github
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventSchema } from "@/app/_lib/validators";
import { createEvent } from "@/actions/events";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/usefetch";

const EventForm = ({ onSubmitForm, initialData = {} }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      duration: initialData.duration || 30,
      isPrivate: initialData.isPrivate ?? true,
    },
  });

  const { loading, error, fn: fnCreateEvent } = useFetch(createEvent);

  const onSubmit = async (data) => {
    await fnCreateEvent(data);
    if (!loading && !error) onSubmitForm();
    router.refresh(); // Refresh the page to show updated data
  };

  return (
    <form
      className="px-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Event Title
        </label>

        <Input id="title" {...register("title")} className="mt-1" />

        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <Textarea
          {...register("description")}
          id="description"
          className="mt-1"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Duration (minutes)
        </label>

        <Input
          id="duration"
          {...register("duration", {
            valueAsNumber: true,
          })}
          type="number"
          className="mt-1"
        />

        {errors.duration && (
          <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="isPrivate"
          className="block text-sm font-medium text-gray-700"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value === "true")}
              value={field.value ? "true" : "false"}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;