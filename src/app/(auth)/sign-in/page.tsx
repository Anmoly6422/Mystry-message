'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signinSchema } from '@/schemas/signinSchema';
import { toast } from 'sonner';
import Navbar from '@/components/navbar';

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error('Authentication Failed: Incorrect email/username or password');
      } else {
        toast.error(result.error);
      }
    }

    if (result?.url) {
      toast.success('Successfully logged in! Redirecting to dashboard...');
      router.replace('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDE6D6]">
      <Navbar />

      <main className="grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md p-8 bg-[#EDE6D6] border-2 border-[#1C1A16] shadow-[10px_10px_0px_#1C1A16] relative rounded-xs">
          <div className="absolute -top-4 left-6 bg-[#A8332B] text-[#EDE6D6] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider rounded-xs">
            SECURE ACCESS
          </div>

          <div className="text-center mb-8 border-b-2 border-dashed border-[#C9B896] pb-6">
            <span className="font-mono text-xs font-bold text-[#A8332B] uppercase tracking-widest block mb-1">
              Welcome Back
            </span>
            <h1 className="font-display font-extrabold text-3xl uppercase text-[#1C1A16] tracking-wide">
              Login to Your Inbox
            </h1>
            <p className="font-sans text-xs text-[#45566E] mt-2">
              Enter your credentials to manage your anonymous messages.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs font-bold uppercase text-[#1C1A16]">
                      Email or Username
                    </FormLabel>
                    <input
                      {...field}
                      className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 font-mono text-sm text-[#1C1A16] focus:outline-hidden focus:border-[#A8332B] rounded-xs"
                      placeholder="your_username_or_email"
                    />
                    <FormMessage className="font-mono text-xs text-[#A8332B]" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs font-bold uppercase text-[#1C1A16]">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 pr-10 font-mono text-sm text-[#1C1A16] focus:outline-hidden focus:border-[#A8332B] rounded-xs"
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#45566E] hover:text-[#1C1A16]"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage className="font-mono text-xs text-[#A8332B]" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="stamp-filled w-full py-3.5 text-base font-bold uppercase transition-all hover:bg-[#0B0B0A] hover:-rotate-1 active:scale-95 cursor-pointer shadow-md tracking-wider"
              >
                Sign In
              </button>
            </form>
          </Form>

          <div className="text-center mt-8 pt-4 border-t border-[#C9B896] font-sans text-xs text-[#45566E]">
            <p>
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-[#A8332B] font-bold underline hover:text-[#0B0B0A]">
                Create your link
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B0B0A] text-[#EDE6D6] py-4 text-center font-mono text-xs border-t-2 border-[#A8332B]">
        Mystery Messages — Portfolio project built by Anmol Yadav.
      </footer>
    </div>
  );
}