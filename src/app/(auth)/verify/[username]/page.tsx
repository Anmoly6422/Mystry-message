'use client';

import { verifySchema } from '@/schemas/verifySchema';
import { Apiresponse } from '@/types/Apiresponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from "sonner";
import * as z from 'zod';
import Navbar from '@/components/navbar';

const VerifyAccount = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: param.username,
        code: data.code,
      });

      toast.success(response.data.message || "Clearance Verified");
      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error("Verification Failed", {
        description: axiosError.response?.data.message || "Invalid security code",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDE6D6]">
      <Navbar />

      <main className="grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md p-8 bg-[#EDE6D6] border-2 border-[#1C1A16] shadow-[10px_10px_0px_#1C1A16] relative">
          <div className="absolute -top-4 left-6 bg-[#A8332B] text-[#EDE6D6] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider">
            SECURITY CODE VERIFICATION
          </div>

          <div className="text-center mb-8 border-b-2 border-dashed border-[#C9B896] pb-6">
            <span className="font-mono text-xs font-bold text-[#A8332B] uppercase tracking-widest block mb-1">
              [ CONFIRM CLEARANCE ]
            </span>
            <h1 className="font-display font-black text-3xl uppercase text-[#1C1A16] tracking-wide">
              VERIFY AGENT CODE
            </h1>
            <p className="font-serif text-xs text-[#45566E] mt-2">
              Enter the 6-digit security clearance code dispatched to your registered communication channel for <strong>@{param.username}</strong>.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <label htmlFor="code" className="block font-mono text-xs font-bold uppercase text-[#1C1A16]">
                    6-DIGIT VERIFICATION CODE:
                  </label>

                  <input
                    {...field}
                    id="code"
                    placeholder="000000"
                    className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 font-mono text-center text-lg tracking-widest font-bold text-[#1C1A16] focus:outline-none focus:border-[#A8332B]"
                  />

                  {fieldState.error && (
                    <p className="font-mono text-xs text-[#A8332B]">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <button
              type="submit"
              className="w-full stamp-filled py-4 text-lg font-bold uppercase transition-transform active:scale-95 cursor-pointer shadow-md tracking-widest hover:bg-[#0B0B0A]"
            >
              AUTHENTICATE CLEARANCE CODE
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-[#0B0B0A] text-[#EDE6D6] py-4 text-center font-mono text-xs border-t-2 border-[#A8332B]">
        MYSTERY_MESSAGES SECURITY CLEARANCE VERIFICATION PROTOCOL
      </footer>
    </div>
  );
};

export default VerifyAccount;
