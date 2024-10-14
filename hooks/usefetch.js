import { useState } from "react";

const useFetch=(cb)=>{
    const [data,setData]=useState(undefined);
    const [loading,setloading]=useState(null);
    const [error,setError]=useState(null);

    const fn=async(...args)=>{
        setloading(true);
        setError(null);
        try {
            const response=await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error)
            
        }finally{
            setloading(false);
        }
    }
    return {data,error,loading,fn};
}
export default useFetch;