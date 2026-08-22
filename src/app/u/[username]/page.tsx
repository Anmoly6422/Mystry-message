'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Send } from 'lucide-react';
import { useCompletion } from '@ai-sdk/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { Apiresponse } from '@/types/Apiresponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { toast } from 'sonner';
import Navbar from '@/components/navbar';

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content") || "";

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [completion, setCompletion] = useState(initialMessageString);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [isHoveringRedacted, setIsHoveringRedacted] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<Apiresponse>("/api/send-message", {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;

      toast.error(axiosError.response?.data.message ?? "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      setIsSuggestLoading(true);

      const res = await fetch("/api/suggest-messages", {
        method: "POST",
      });

      const data = await res.text();
      setCompletion(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to generate suggested prompts");
    } finally {
      setIsSuggestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDE6D6]">
      <Navbar />

      <main className="grow container mx-auto my-8 p-4 sm:p-8 max-w-4xl">
        {/* Case File Header Meta */}
        <div className="bg-[#E3D9C2] p-6 border-2 border-[#1C1A16] shadow-[6px_6px_0px_#1C1A16] mb-8 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A8332B] block mb-1">
                [ OFFICIAL WITNESS TRANSMISSION ]
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-[#1C1A16] tracking-wide">
                STATEMENT DOSSIER FOR @{username}
              </h1>
            </div>
            <span className="font-display font-black text-xs uppercase border-2 border-[#A8332B] text-[#A8332B] px-3 py-1 transform rotate-[-2deg] tracking-widest">
              CONFIDENTIAL
            </span>
          </div>
          <p className="font-serif text-sm text-[#45566E] mt-3">
            You are depositing an anonymous witness statement into the confidential dossier of <strong>@{username}</strong>. All origin tracking is stripped prior to storage.
          </p>
        </div>

        {/* Statement Form Card */}
        <div className="bg-[#EDE6D6] p-6 sm:p-8 border-2 border-[#1C1A16] shadow-[8px_8px_0px_#1C1A16] relative mb-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Redacted "Filed By" Identity Badge */}
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-[#1C1A16] mb-2">
                  FILED BY IDENTITY:
                </label>
                <div
                  onMouseEnter={() => setIsHoveringRedacted(true)}
                  onMouseLeave={() => setIsHoveringRedacted(false)}
                  className="relative cursor-pointer group"
                >
                  <div className="w-full bg-[#0B0B0A] text-[#EDE6D6] px-4 py-2 font-mono text-sm font-bold flex justify-between items-center transition-colors">
                    <span>
                      {isHoveringRedacted
                        ? '[ANONYMOUS WITNESS]'
                        : '██████████████████████████'}
                    </span>
                    <span className="text-[10px] text-[#A8332B] border border-[#A8332B] px-1 py-0.5">
                      HOVER TO INSPECT
                    </span>
                  </div>
                </div>
                <p className="font-mono text-[11px] text-[#A8332B] mt-1 italic">
                  * Recipient never sees this — identity is mathematically redacted.
                </p>
              </div>

              {/* Message Content Field with Ruled Paper styling & Character Count */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-1 font-mono text-xs">
                      <FormLabel className="uppercase font-bold text-[#1C1A16]">
                        CONFIDENTIAL STATEMENT:
                      </FormLabel>
                      <span
                        className={`font-bold ${
                          messageContent.length > 280 ? 'text-[#A8332B]' : 'text-[#45566E]'
                        }`}
                      >
                        {messageContent.length} / 300 CHARACTERS
                      </span>
                    </div>
                    <FormControl>
                      <textarea
                        maxLength={300}
                        rows={6}
                        placeholder="Write your anonymous statement here..."
                        className="w-full ruled-paper p-4 font-serif text-base text-[#1C1A16] border-2 border-[#1C1A16] focus:outline-none focus:border-[#A8332B] resize-none leading-relaxed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-[#A8332B]" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                {isLoading ? (
                  <button
                    disabled
                    className="w-full stamp-filled py-4 text-lg font-bold uppercase flex items-center justify-center space-x-2 opacity-75 cursor-not-allowed"
                  >
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>STAMPING & TRANSMITTING...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || !messageContent.trim()}
                    className="w-full stamp-filled py-4 text-xl font-bold uppercase transition-transform active:scale-95 cursor-pointer shadow-md tracking-widest hover:bg-[#0B0B0A] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    STAMP & DISPATCH STATEMENT
                  </button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* AI Suggested Prompts Section */}
        <div className="bg-[#E3D9C2] p-6 border-2 border-[#1C1A16] shadow-[6px_6px_0px_#1C1A16] space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C9B896] pb-4">
            <div>
              <h3 className="font-display font-black text-xl text-[#1C1A16] uppercase">
                INVESTIGATIVE SUGGESTIONS
              </h3>
              <p className="font-mono text-xs text-[#45566E]">
                Select a recommended prompt to auto-populate statement
              </p>
            </div>
            <button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-[#1C1A16] bg-[#EDE6D6] hover:bg-[#A8332B] hover:text-[#EDE6D6] hover:border-[#A8332B] transition-colors cursor-pointer"
            >
              {isSuggestLoading ? "GENERATING..." : "GENERATE PROMPTS"}
            </button>
          </div>

          <div className="space-y-3">
            {isSuggestLoading ? (
              <p className="font-mono text-xs text-[#45566E] animate-pulse">
                Consulting intelligence engine...
              </p>
            ) : completion ? (
              parseStringMessages(completion).map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageClick(message)}
                  className="w-full text-left bg-[#EDE6D6] p-4 border border-[#1C1A16] font-serif text-sm text-[#1C1A16] hover:border-[#A8332B] hover:bg-[#EDE6D6] transition-all flex justify-between items-center group cursor-pointer"
                >
                  <span>"{message}"</span>
                  <span className="font-mono text-xs text-[#A8332B] opacity-0 group-hover:opacity-100 font-bold uppercase">
                    [ATTACH]
                  </span>
                </button>
              ))
            ) : (
              <p className="font-mono text-xs text-[#45566E]">No suggestions available.</p>
            )}
          </div>
        </div>

        {/* Call to Action for Visitors */}
        <div className="mt-12 text-center p-8 bg-[#0B0B0A] text-[#EDE6D6] border-2 border-[#A8332B]">
          <h4 className="font-display font-extrabold text-2xl uppercase mb-2">
            WANT YOUR OWN CONFIDENTIAL DOSSIER?
          </h4>
          <p className="font-serif text-sm text-[#C9B896] max-w-md mx-auto mb-6">
            Register your agent clearance key to receive anonymous witness statements from your network.
          </p>
          <Link href={'/sign-up'}>
            <button className="stamp-filled px-8 py-3 text-base font-bold uppercase transition-transform active:scale-95 cursor-pointer">
              CREATE YOUR DOSSIER ACCOUNT
            </button>
          </Link>
        </div>
      </main>

      <footer className="bg-[#0B0B0A] text-[#EDE6D6] py-6 text-center font-mono text-xs border-t-2 border-[#A8332B]">
        MYSTERY_MESSAGES © 2026. ANONYMITY MATHEMATICALLY ENFORCED.
      </footer>
    </div>
  );
}