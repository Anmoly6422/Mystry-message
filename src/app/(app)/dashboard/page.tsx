'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

import MessageCard from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { Message } from '@/model/User';
import { Apiresponse } from '@/types/Apiresponse';
import { acceptmessageSchema } from '@/schemas/acceptmessageSchema';

const DashboardPage = () => {
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

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

        const response =
          await axios.get<Apiresponse>('/api/get-messages');

        setMessages(response.data.messages || []);

        if (refresh) {
          toast.success('Messages refreshed');
        }
      } catch (error) {
        const axiosError = error as AxiosError<Apiresponse>;

        toast.error(
          axiosError.response?.data.message ||
            'Failed to fetch messages'
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

      const response =
        await axios.get<Apiresponse>('/api/accept-messages');

      setValue(
        'acceptmessage',
        response.data.isAcceptingMessage ?? false
      );
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;

      toast.error(
        axiosError.response?.data.message ||
          'Failed to fetch settings'
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
      const response = await axios.post<Apiresponse>(
        '/api/accept-messages',
        {
          acceptMessages: !acceptMessages,
        }
      );

      setValue('acceptmessage', !acceptMessages);

      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;

      toast.error(
        axiosError.response?.data.message ||
          'Failed to update settings'
      );
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.filter(
        (message) =>
          message._id?.toString() !== messageId
      )
    );
  };

  const profileUrl = useMemo(() => {
    if (!session?.user) return '';

    const username = (session.user as User).username;

    return `${window.location.origin}/u/${username}`;
  }, [session]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(profileUrl);

    toast.success('Profile URL copied');
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Please login first
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <h1 className="text-4xl font-bold mb-6">
        User Dashboard
      </h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">
       Copy Your Unique Link
        </h2>

        <div className="flex gap-2">
         <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />

          <Button onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <Switch
          {...register('acceptmessage')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />

        <span className="ml-2">
          Accept Messages:{' '}
          {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>

      <Separator />

      <Button
        variant="outline"
        className="mt-4"
        onClick={() => fetchMessages(true)}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id?.toString() || index}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages available.</p>
          
        )}
      </div>
    </div>
  );
};

export default DashboardPage;