'use client'
import { Input } from '@/components/ui/input'
import { verifySchema } from '@/schemas/verifySchema'
import { Apiresponse } from '@/types/Apiresponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Eye } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import React from 'react'
import { useForm,Controller } from 'react-hook-form'
import { toast } from "sonner"
import * as z from 'zod'

const verifyAccount = () => {
    const router= useRouter()
    const param= useParams<{username:string}>()
   const form =useForm<z.infer<typeof verifySchema>>({
       resolver:zodResolver(verifySchema),
       defaultValues: {
    code: "",
  },
       
     })

     const onSubmit =async (data: z.infer<typeof verifySchema>)=>{
        try {
          const response=  await axios.post(`/api/verify-code`,{
                username:param.username,
                code:data.code
            })
             toast("Success", {
          description: response.data.message,
        })
          router.replace('/sign-in')
        } catch (error) {
  const axiosError = error as AxiosError<Apiresponse>;

  toast.error("Verification Failed", {
    description: axiosError.response?.data.message,
  });

  console.log("API Message:", axiosError.response?.data.message);
}
     }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className="text-center">
        <h1 className="text-4xl font-extrabold
        tracking-tight lg:text-5xl mb-6">
          Verify Your Account
        </h1>
        <p className="mb-4">Enter the verification code 
            send to your email
        </p>


      </div>
             <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6">
<Controller
  name="code"
  control={form.control}
  render={({ field }) => (
    <div className="space-y-2">
      <label htmlFor="code">Verification Code</label>

      <Input
        {...field}
        placeholder="code"
      />
    </div>
  )}
/>
<button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Submit
        </button>
</form>
        </div>
      
    </div>
  )
}

export default verifyAccount
