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
import { Loader2, Eye, EyeOff } from "lucide-react";

import { signupSchema } from "@/schemas/signupschema";
import { Apiresponse } from "@/types/Apiresponse";
import Navbar from "@/components/navbar";

const Page = () => {
  const [username, setusername] = useState("");
  const [usernamemessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [debouncedUsername] = useDebounceValue(username, 300);
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<Apiresponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username clearance"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<Apiresponse>("/api/sign-up", data);
      toast.success(response.data.message);
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error in signup of user", error);
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data.message ?? "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDE6D6]">
      <Navbar />

      <main className="grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md p-8 bg-[#EDE6D6] border-2 border-[#1C1A16] shadow-[10px_10px_0px_#1C1A16] relative">
          <div className="absolute -top-4 left-6 bg-[#A8332B] text-[#EDE6D6] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider">
            AGENT REGISTRATION PROTOCOL
          </div>

          <div className="text-center mb-8 border-b-2 border-dashed border-[#C9B896] pb-6">
            <span className="font-mono text-xs font-bold text-[#A8332B] uppercase tracking-widest block mb-1">
              [ CREATE DOSSIER ]
            </span>
            <h1 className="font-display font-black text-3xl uppercase text-[#1C1A16] tracking-wide">
              REGISTER AGENT KEY
            </h1>
            <p className="font-serif text-xs text-[#45566E] mt-2">
              Establish your clearance credentials to receive confidential witness statements.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Controller */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <label htmlFor="username" className="block font-mono text-xs font-bold uppercase text-[#1C1A16]">
                    DESIRED AGENT USERNAME:
                  </label>

                  <input
                    {...field}
                    id="username"
                    placeholder="agent_codename"
                    className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 font-mono text-sm text-[#1C1A16] focus:outline-none focus:border-[#A8332B]"
                    onChange={(e) => {
                      field.onChange(e);
                      setusername(e.target.value);
                    }}
                  />

                  {isCheckingUsername && (
                    <p className="font-mono text-xs text-[#45566E] animate-pulse">
                      Checking handle availability...
                    </p>
                  )}

                  {!isCheckingUsername && usernamemessage && (
                    <p
                      className={`font-mono text-xs font-bold ${
                        usernamemessage.toLowerCase().includes("unique") ||
                        usernamemessage.toLowerCase().includes("available")
                          ? "text-[#45566E]"
                          : "text-[#A8332B]"
                      }`}
                    >
                      {usernamemessage}
                    </p>
                  )}

                  {fieldState.error && (
                    <p className="font-mono text-xs text-[#A8332B]">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Email Controller */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <label htmlFor="email" className="block font-mono text-xs font-bold uppercase text-[#1C1A16]">
                    OFFICIAL EMAIL ADDRESS:
                  </label>

                  <input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="agent@agency.org"
                    className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 font-mono text-sm text-[#1C1A16] focus:outline-none focus:border-[#A8332B]"
                  />

                  {fieldState.error && (
                    <p className="font-mono text-xs text-[#A8332B]">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password Controller */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <label htmlFor="password" className="block font-mono text-xs font-bold uppercase text-[#1C1A16]">
                    SECURITY PASSPHRASE:
                  </label>

                  <div className="relative">
                    <input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      className="w-full bg-[#E3D9C2] border-2 border-[#1C1A16] p-3 pr-10 font-mono text-sm text-[#1C1A16] focus:outline-none focus:border-[#A8332B]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#45566E] hover:text-[#1C1A16]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

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
              disabled={isSubmitting}
              className="w-full stamp-filled py-4 text-lg font-bold uppercase transition-transform active:scale-95 cursor-pointer shadow-md tracking-widest hover:bg-[#0B0B0A] disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>INITIALIZING DOSSIER...</span>
                </span>
              ) : (
                "REGISTER & GENERATE DOSSIER"
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-4 border-t border-[#C9B896] font-mono text-xs text-[#45566E]">
            <p>
              ALREADY HAVE CLEARANCE?{" "}
              <Link href="/sign-in" className="text-[#A8332B] font-bold underline hover:text-[#0B0B0A]">
                AGENT LOGIN
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B0B0A] text-[#EDE6D6] py-4 text-center font-mono text-xs border-t-2 border-[#A8332B]">
        MYSTERY_MESSAGES AGENT REGISTRATION REGISTRY
      </footer>
    </div>
  );
};

export default Page;
