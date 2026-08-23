'use client';

import React, { useState } from 'react';

export default function SenderPreviewMockup() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setMessage('');
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Outer Phone Shell */}
      <div className="bg-[#1C1A16] p-3 rounded-[36px] shadow-2xl border-4 border-[#C9B896]/30 relative">
        {/* Top Phone Notch / Camera Pill */}
        <div className="w-28 h-4 bg-[#0B0B0A] mx-auto rounded-b-full mb-3 flex justify-center items-center">
          <div className="w-3 h-3 rounded-full bg-[#1C1A16]" />
        </div>

        {/* Inner Phone Display Screen */}
        <div className="bg-[#EDE6D6] rounded-[24px] p-5 border border-[#C9B896] text-[#1C1A16]">
          {/* Sender Header */}
          <div className="text-center mb-4 pb-3 border-b border-[#C9B896]">
            <div className="w-12 h-12 rounded-full bg-[#A8332B] text-[#EDE6D6] font-display font-bold text-xl flex items-center justify-center mx-auto mb-2 shadow-xs">
              A
            </div>
            <h4 className="font-display font-extrabold text-lg tracking-wide uppercase">
              Send to @alex
            </h4>
            <p className="text-xs text-[#45566E] font-sans">
              Write an anonymous message to Alex.
            </p>
          </div>

          {/* Sender Form Mockup */}
          {submitted ? (
            <div className="py-8 text-center animate-fade-in space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto text-lg">
                ✓
              </div>
              <p className="font-bold text-sm text-emerald-950">Message Sent Anonymously!</p>
              <p className="text-xs text-[#45566E]">Alex won't know who sent it.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="mock-message-input" className="sr-only">
                  Send an anonymous message
                </label>
                <textarea
                  id="mock-message-input"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send an anonymous message..."
                  className="w-full p-3 text-xs bg-[#E3D9C2]/60 rounded-xs border border-[#C9B896] focus:border-[#A8332B] focus:outline-hidden resize-none font-sans placeholder-[#45566E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#A8332B] text-[#EDE6D6] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#1C1A16] transition-colors cursor-pointer shadow-xs"
              >
                Send Anonymously
              </button>

              {/* Privacy Reassurance Note */}
              <div className="flex items-center justify-center space-x-1 text-[10px] text-[#45566E] pt-1">
                <span>🔒 100% Anonymous</span>
                <span>·</span>
                <span>No IP or account recorded</span>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Phone Indicator Bar */}
        <div className="w-24 h-1 bg-[#C9B896]/40 rounded-full mx-auto mt-3" />
      </div>
    </div>
  );
}
