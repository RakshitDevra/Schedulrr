"use server"
import { getUserAvailability } from '@/actions/availabilty'
import React from 'react'
import { defaultAvailability } from './data';
import AvailabilityForm from './_components/availabiltyform';

const AvailabiltyPage =async () => {
  const availability=await getUserAvailability();
//  console.log('Default Availability:', defaultAvailability);
 // console.log(availability);
  return <AvailabilityForm initialData={availability || defaultAvailability }/>
}

export default AvailabiltyPage