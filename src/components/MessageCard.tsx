'use client';

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { Message } from '@/model/User';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Apiresponse } from '@/types/Apiresponse';
import { toast } from 'sonner';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<Apiresponse>(
        `/api/delete-message/${message._id}`
      );
      toast.success(response.data.message);
      onMessageDelete(message._id.toString());
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data.message ?? 'Failed to purge statement'
      );
    }
  };

  return (
    <div className="bg-[#EDE6D6] p-6 border-2 border-[#1C1A16] shadow-[6px_6px_0px_#1C1A16] relative paperclip-clip group flex flex-col justify-between">
      {/* Evidence Top Row */}
      <div className="flex justify-between items-start border-b-2 border-dashed border-[#C9B896] pb-3 mb-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase text-[#A8332B] block">
            [ EVIDENCE EXHIBIT ]
          </span>
          <span className="font-mono text-[11px] text-[#45566E]">
            ID: #{message._id ? message._id.toString().slice(-6).toUpperCase() : 'UNKNOWN'}
          </span>
        </div>

        {/* Delete / Purge Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="p-1.5 font-mono text-xs font-bold uppercase text-[#A8332B] border border-[#A8332B] hover:bg-[#A8332B] hover:text-[#EDE6D6] transition-colors cursor-pointer"
              title="Purge Evidence Statement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#EDE6D6] border-2 border-[#1C1A16] text-[#1C1A16]">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display font-black text-xl uppercase text-[#A8332B]">
                CONFIRM PURGE OF EVIDENCE STATEMENT
              </AlertDialogTitle>
              <AlertDialogDescription className="font-serif text-sm text-[#45566E]">
                This action is irreversible. The witness statement will be permanently expunged from the confidential dossier locker.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="pt-4">
              <AlertDialogCancel className="font-mono text-xs uppercase border-2 border-[#1C1A16] bg-[#E3D9C2]">
                CANCEL
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="font-mono text-xs uppercase bg-[#A8332B] text-[#EDE6D6] hover:bg-[#0B0B0A]"
              >
                PURGE STATEMENT
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Statement Content */}
      <p className="font-serif text-base text-[#1C1A16] leading-relaxed mb-6 font-medium">
        "{message.content}"
      </p>

      {/* Bottom Metadata Timestamp */}
      <div className="pt-3 border-t border-[#C9B896] flex justify-between items-center font-mono text-xs text-[#45566E]">
        <span>FILED: {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}</span>
        <span className="text-[10px] text-[#A8332B] font-bold uppercase tracking-wider">
          UNTRACEABLE
        </span>
      </div>
    </div>
  );
}

export default MessageCard;