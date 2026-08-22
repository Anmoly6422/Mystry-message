'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
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
        toast.error('Authentication Failed: Incorrect credentials');
      } else {
        toast.error(result.error);
      }
    }

    if (result?.url) {
      toast.success('Clearance Granted: Redirecting to dossier locker');
      router.replace('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDE6D6]">
      <Navbar />

      <main className="grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md p-8 bg-[#EDE6D6] border-2 border-[#1C1A16] shadow-[10px_10px_0px_#1C1A16] relative">
          <div className="absolute -top-4 left-6 bg-[#A8332B] text-[#EDE6D6] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider">
            AGENT CLEARANCE CHECK
          </div>

          <div className="text-center mb-8 border-b-2 border-dashed border-[#C9B896] pb-6">
            <span className="font-mono text-xs font-bold text-[#A8332B] uppercase tracking-widest block mb-1">
              [ SECURE LOGIN ]
            </span>
            <h1 className="font-display font-black text-3xl uppercase text-[#1C1A16] tracking-wide">
              AGENT AUTHENTICATION
            </h1>
            <p className="font-serif text-xs text-[#45566E] mt-2">
              Enter your credentials to access your classified witness statement locker.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs font-bold uppercase text-[#1C1A16]">
                      EMAIL OR USERNAME:
                    </FormLabel>
                    <input
                      {...field}
                      className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 font-mono text-sm text-[#1C1A16] focus:outline-none focus:border-[#A8332B]"
                      placeholder="agent_identifier"
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
                      SECURITY PASSPHRASE:
                    </FormLabel>
                    <input
                      type="password"
                      {...field}
                      className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 font-mono text-sm text-[#1C1A16] focus:outline-none focus:border-[#A8332B]"
                      placeholder="••••••••••••"
                    />
                    <FormMessage className="font-mono text-xs text-[#A8332B]" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full stamp-filled py-4 text-lg font-bold uppercase transition-transform active:scale-95 cursor-pointer shadow-md tracking-widest hover:bg-[#0B0B0A]"
              >
                VERIFY & UNLOCK DOSSIER
              </button>
            </form>
          </Form>

          <div className="text-center mt-8 pt-4 border-t border-[#C9B896] font-mono text-xs text-[#45566E]">
            <p>
              NEW AGENT?{' '}
              <Link href="/sign-up" className="text-[#A8332B] font-bold underline hover:text-[#0B0B0A]">
                REGISTER CLEARANCE KEY
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B0B0A] text-[#EDE6D6] py-4 text-center font-mono text-xs border-t-2 border-[#A8332B]">
        MYSTERY_MESSAGES ARCHIVE ACCESS CONTROL
      </footer>
    </div>
  );
}