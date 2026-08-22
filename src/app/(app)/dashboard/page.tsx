'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, RefreshCcw, Copy, Check, FolderLock, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

import MessageCard from '@/components/MessageCard';
import { Switch } from '@/components/ui/switch';
import { Message } from '@/model/User';
import { Apiresponse } from '@/types/Apiresponse';
import { acceptmessageSchema } from '@/schemas/acceptmessageSchema';

const DashboardPage = () => {
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm({
    resolver: zodResolver(acceptmessageSchema),
    defaultValues: {
      acceptmessage: false,
    },
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptmessage');

  const fetchMessages = useCallback(
    async (refresh = false) => {
      try {
        setIsLoading(true);
        const response = await axios.get<Apiresponse>('/api/get-messages');
        setMessages(response.data.messages || []);

        if (refresh) {
          toast.success('Dossier refreshed & evidence logs re-audited');
        }
      } catch (error) {
        const axiosError = error as AxiosError<Apiresponse>;
        toast.error(
          axiosError.response?.data.message || 'Failed to fetch evidence statements'
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchAcceptMessage = useCallback(async () => {
    try {
      setIsSwitchLoading(true);
      const response = await axios.get<Apiresponse>('/api/accept-messages');
      setValue('acceptmessage', response.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data.message || 'Failed to fetch dossier security settings'
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetchMessages();
    fetchAcceptMessage();
  }, [status, fetchMessages, fetchAcceptMessage]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<Apiresponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });

      setValue('acceptmessage', !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data.message || 'Failed to update dossier status'
      );
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.filter((message) => message._id?.toString() !== messageId)
    );
  };

  const profileUrl = useMemo(() => {
    if (!session?.user) return '';
    const username = (session.user as User).username;
    return `${window.location.origin}/u/${username}`;
  }, [session]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success('Confidential Dossier Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
        <Loader2 className="animate-spin h-10 w-10 text-[#A8332B]" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#45566E]">
          AUTHENTICATING SECURITY CLEARANCE...
        </span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] p-6 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-[#A8332B]" />
        <h2 className="font-display font-black text-2xl uppercase">ACCESS DENIED</h2>
        <p className="font-serif text-base text-[#45566E] max-w-sm">
          Please login to verify your clearance level and access your witness statement locker.
        </p>
      </div>
    );
  }

  const username = (session.user as User).username || (session.user as User).email;

  return (
    <div className="container mx-auto max-w-6xl p-4 sm:p-8">
      {/* Dashboard Top Header Dossier Banner */}
      <div className="bg-[#E3D9C2] p-6 border-2 border-[#1C1A16] shadow-[8px_8px_0px_#1C1A16] mb-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-[#1C1A16] pb-4 mb-6">
          <div>
            <span className="font-mono text-xs text-[#A8332B] font-bold uppercase tracking-widest block">
              [ AGENT SECURITY LOCKER ]
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-[#1C1A16]">
              DOSSIER: @{username}
            </h1>
          </div>
          <span className="font-display font-black text-sm uppercase px-3 py-1 border-2 border-[#A8332B] text-[#A8332B] transform rotate-[-2deg] tracking-widest">
            CLASSIFICATION: ACTIVE
          </span>
        </div>

        {/* Dossier Unique Link Copy Box */}
        <div className="space-y-2 mb-6">
          <label className="font-mono text-xs uppercase font-bold text-[#1C1A16] block">
            CONFIDENTIAL WITNESS LINK (SHARE WITH SOURCES):
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={profileUrl}
              readOnly
              className="w-full bg-[#EDE6D6] border-2 border-[#1C1A16] px-4 py-2.5 font-mono text-xs sm:text-sm text-[#1C1A16] focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="stamp-filled px-6 py-2.5 text-xs font-bold uppercase flex items-center justify-center space-x-2 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED' : 'COPY DOSSIER LINK'}</span>
            </button>
          </div>
        </div>

        {/* Case Status Toggle Switch */}
        <div className="flex items-center justify-between bg-[#EDE6D6] p-4 border border-[#1C1A16]">
          <div className="flex items-center space-x-3">
            <FolderLock className="w-5 h-5 text-[#A8332B]" />
            <div>
              <span className="font-mono text-xs uppercase font-bold text-[#1C1A16] block">
                DOSSIER STATUS: {acceptMessages ? 'RECEIVING STATEMENTS (OPEN)' : 'STATEMENTS LOCKED (CLOSED)'}
              </span>
              <span className="font-serif text-xs text-[#45566E]">
                Toggle whether new confidential witness statements can be deposited.
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Switch
              {...register('acceptmessage')}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
          </div>
        </div>
      </div>

      {/* Statements Locker Header & Refresh Action */}
      <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-[#C9B896] pb-4">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-[#1C1A16]">
            RECORDED EVIDENCE ({messages.length})
          </h2>
          <p className="font-mono text-xs text-[#45566E]">
            All witness statements sealed inside your encrypted case locker.
          </p>
        </div>

        <button
          onClick={() => fetchMessages(true)}
          disabled={isLoading}
          className="p-3 bg-[#E3D9C2] border-2 border-[#1C1A16] hover:bg-[#A8332B] hover:text-[#EDE6D6] transition-colors cursor-pointer shadow-[3px_3px_0px_#1C1A16]"
          title="Re-audit Case Locker"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <RefreshCcw className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Evidence Statements Grid */}
      {messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((message, index) => (
            <MessageCard
              key={message._id?.toString() || index}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#E3D9C2] p-12 border-2 border-dashed border-[#1C1A16] text-center space-y-3">
          <span className="font-mono text-xs uppercase font-bold text-[#A8332B] block">
            [ DOSSIER EMPTY ]
          </span>
          <h3 className="font-display font-black text-2xl uppercase text-[#1C1A16]">
            NO WITNESS STATEMENTS FILED YET
          </h3>
          <p className="font-serif text-sm text-[#45566E] max-w-md mx-auto">
            Share your confidential dossier link with peers, colleagues, or followers to begin receiving anonymous feedback.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;