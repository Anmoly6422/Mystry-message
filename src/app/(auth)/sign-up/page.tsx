"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

import { signupSchema } from "@/schemas/signupschema";
import { Apiresponse } from "@/types/Apiresponse";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {

  const [username,setusername] = useState("")
  const [usernamemessage,setUsernameMessage]= useState("")
  const [isCheckingUsername,setIsCheckingUsername] =useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const [debouncedUsername]= useDebounceValue(username,300)
  const router =useRouter()


  //zod implementation
  const form =useForm<z.infer<typeof signupSchema>>({
    resolver:zodResolver(signupSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })

  useEffect(()=>{
    const checkUsernameUnique=async()=>{
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try{
     const response =  await axios.get(
  `/api/check-username-unique?username=${debouncedUsername}`
);
            setUsernameMessage(response.data.message)
        }catch(error){
          const axiosError= error as AxiosError <Apiresponse>;
          setUsernameMessage(axiosError.response?.data.message ??"error checking username")
        }
        finally{
          setIsCheckingUsername(false);
        }
      }
    }
    checkUsernameUnique()
  },[debouncedUsername])
   
  const onSubmit = async (data: z.infer<typeof signupSchema>)=>{
    setIsSubmitting(true)
    try{
    const response = await axios.post<Apiresponse>('/api/sign-up',data)
  toast.success("Success", {
  description: response.data.message,
})
   router.replace(`/verify/${username}`)
   setIsSubmitting(false)
    }
    catch(error){
      console.error("error in signup of user",error)
      const axiosError= error as AxiosError <Apiresponse>;
        let errorMessage=axiosError.response?.data.message
        toast("Signup failed",{
          description: errorMessage,
        })
        setIsSubmitting(false)
    }
  }

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <div className="w-full max-w-sm p-6 space-y-5 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold
        tracking-tight lg:text-5xl mb-6">
          Join Mystery Message
        </h1>
        <p className="mb-4">Sign up to start your anonymous
          adventure</p>


      </div>

        <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6">
<Controller
  name="username"
  control={form.control}
  render={({ field, fieldState }) => (
    <div className="space-y-2">
      <label htmlFor="username">Username</label>

      <Input
        {...field}
        id="username"
        placeholder="Enter username"
        onChange={(e) => {
          field.onChange(e);
          setusername(e.target.value);
        }}
      />

      {isCheckingUsername && (
        <p className="text-sm text-red-500">
          Checking username...
        </p>
      )}

      {!isCheckingUsername && usernamemessage && (
        <p className="text-sm text-green-500">
          {usernamemessage}
        </p>
      )}

      {fieldState.error && (
        <p className="text-sm text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  )}
/>

<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <div className="space-y-2">
      <label htmlFor="email">Email</label>

      <Input
        {...field}
        id="email"
        type="email"
        placeholder="Enter email"
      />

      {fieldState.error && (
        <p className="text-sm text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  )}
/>

<Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <div className="space-y-2">
      <label htmlFor="password">Password</label>

      {/* IMPORTANT: relative wrapper */}
      <div className="relative">
        <Input
          {...field}
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="pr-10"
        />

        {/* Eye button */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {fieldState.error && (
        <p className="text-sm text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  )}
/>

<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait...
    </>
  ) : (
    "Sign Up"
  )}
</Button>


        </form>

      <div className="text-center mt-4">
        <p>Already a member ?{' '}
          <Link href="/sign-in " className="text-blue-600 hover:text-blue-800">
          Sign in</Link></p> </div>
      </div>
     
    </div>
  )
}

export default page
