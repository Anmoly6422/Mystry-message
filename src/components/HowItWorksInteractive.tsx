'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Share2, MessageSquare, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function HowItWorksInteractive() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>('');
  const [sentMessage, setSentMessage] = useState<boolean>(false);

  // Auto cycle steps every 4.5 seconds unless user manually interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (step: number) => {
    setIsAutoPlaying(false);
    setActiveStep(step);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    toast.success('Demo profile link copied!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSentMessage(true);
    setTimeout(() => {
      setMessageText('');
      setSentMessage(false);
    }, 3000);
  };

  const steps = [
    {
      id: 1,
      num: '01',
      title: 'Create your inbox',
      badge: '30-Second Setup',
      desc: 'Sign up for free and generate your unique, personal anonymous feedback link.',
      detail: 'Your link comes ready to receive untraceable messages instantly.',
      icon: Sparkles,
    },
    {
      id: 2,
      num: '02',
      title: 'Share your link',
      badge: 'Universal Link',
      desc: 'Post your link on Instagram, Twitter/X, LinkedIn, or in your bio.',
      detail: 'No app download or registration needed for anyone sending a message.',
      icon: Share2,
    },
    {
      id: 3,
      num: '03',
      title: 'Receive honest messages',
      badge: '100% Anonymous',
      desc: 'Read unvarnished, authentic feedback inside your private dashboard.',
      detail: 'Messages are stripped of IP traces & identity metadata before arrival.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Step Selection Tabs Header */}
      <div className="flex justify-center items-center space-x-2 mb-10">
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => handleStepClick(s.id)}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all rounded-full flex items-center space-x-2 cursor-pointer ${
              activeStep === s.id
                ? 'bg-[#1C1A16] text-[#EDE6D6] shadow-md scale-105'
                : 'bg-[#EDE6D6] text-[#45566E] border border-[#C9B896] hover:border-[#1C1A16]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#A8332B]" />
            <span>Step {s.num}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Interactive Steps List (Left Side) */}
        <div className="lg:col-span-7 space-y-4 relative">
          {/* Vertical Connecting Line with Pulse */}
          <div className="absolute left-6 top-8 bottom-8 w-1 bg-[#C9B896]/50 hidden sm:block z-0" />

          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`p-6 rounded-xs border-2 transition-all duration-300 cursor-pointer relative z-10 ${
                  isActive
                    ? 'bg-[#EDE6D6] border-[#1C1A16] shadow-[8px_8px_0px_#A8332B] -translate-y-1'
                    : 'bg-[#EDE6D6]/70 border-[#C9B896] hover:border-[#1C1A16] hover:bg-[#EDE6D6] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Step Badge Circle */}
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full font-display font-black text-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#A8332B] text-[#EDE6D6] shadow-md scale-110'
                        : 'bg-[#C9B896]/40 text-[#1C1A16]'
                    }`}
                  >
                    {step.num}
                  </div>

                  <div className="grow space-y-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-wide text-[#1C1A16]">
                        {step.title}
                      </h3>
                      <span
                        className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs border ${
                          isActive
                            ? 'border-[#A8332B] text-[#A8332B] bg-[#A8332B]/10'
                            : 'border-[#C9B896] text-[#45566E]'
                        }`}
                      >
                        {step.badge}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-[#1C1A16] font-medium leading-relaxed">
                      {step.desc}
                    </p>

                    {isActive && (
                      <p className="font-sans text-xs text-[#45566E] pt-2 border-t border-dashed border-[#C9B896] animate-fade-in flex items-center space-x-1">
                        <Icon className="w-3.5 h-3.5 text-[#A8332B] shrink-0" />
                        <span>{step.detail}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Phone Screen (Right Side) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm">
            {/* Phone Outer Shell */}
            <div className="bg-[#1C1A16] p-3 rounded-[38px] shadow-2xl border-4 border-[#C9B896]/40 relative transition-transform duration-300 hover:scale-[1.02]">
              {/* Phone Camera Notch */}
              <div className="w-28 h-4 bg-[#0B0B0A] mx-auto rounded-b-full mb-3 flex justify-center items-center">
                <div className="w-3 h-3 rounded-full bg-[#1C1A16]" />
              </div>

              {/* Dynamic Screen Content */}
              <div className="bg-[#EDE6D6] rounded-[26px] p-5 border border-[#C9B896] min-h-[380px] flex flex-col justify-between text-[#1C1A16] relative overflow-hidden">
                
                {/* STEP 1 PREVIEW: INBOX LINK CREATION */}
                {activeStep === 1 && (
                  <div className="space-y-4 animate-fade-in my-auto">
                    <div className="w-14 h-14 rounded-full bg-[#A8332B] text-[#EDE6D6] font-display font-bold text-2xl flex items-center justify-center mx-auto shadow-md">
                      A
                    </div>

                    <div className="text-center space-y-1">
                      <span className="font-mono text-[10px] text-[#A8332B] font-bold uppercase tracking-wider border border-[#A8332B] px-2 py-0.5 rounded-xs">
                        Inbox Ready
                      </span>
                      <h4 className="font-display font-extrabold text-xl uppercase">
                        @alex's Anonymous Inbox
                      </h4>
                      <p className="text-xs text-[#45566E]">
                        Your personal feedback link is created and active.
                      </p>
                    </div>

                    {/* Live Copyable Link Card */}
                    <div className="bg-[#E3D9C2] p-3 rounded-xs border border-[#1C1A16] space-y-2">
                      <span className="text-[10px] font-mono font-bold text-[#45566E] uppercase block">
                        Your Shareable Link:
                      </span>
                      <div className="flex items-center justify-between bg-[#EDE6D6] p-2 border border-[#C9B896] rounded-xs font-mono text-xs text-[#1C1A16]">
                        <span className="truncate">mystry-messages.app/u/alex</span>
                        <button
                          onClick={handleCopyLink}
                          className="text-[#A8332B] hover:text-[#1C1A16] p-1 cursor-pointer"
                          title="Copy Link"
                        >
                          {copiedLink ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#45566E] text-center font-mono italic">
                      ✓ Ready to receive messages instantly
                    </p>
                  </div>
                )}

                {/* STEP 2 PREVIEW: SOCIAL SHARE CARDS */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-fade-in my-auto">
                    <div className="text-center space-y-1 pb-2 border-b border-[#C9B896]">
                      <span className="font-mono text-[10px] text-[#A8332B] font-bold uppercase tracking-wider border border-[#A8332B] px-2 py-0.5 rounded-xs">
                        Share Anywhere
                      </span>
                      <h4 className="font-display font-extrabold text-lg uppercase">
                        Post to Your Audience
                      </h4>
                    </div>

                    {/* Instagram Story Share Mockup */}
                    <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 p-0.5 rounded-xs shadow-xs text-white">
                      <div className="bg-[#1C1A16] p-3 rounded-xs space-y-2 text-center">
                        <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">
                          📸 Instagram Story / Bio
                        </span>
                        <p className="font-serif italic text-xs text-[#EDE6D6]">
                          "Send me anonymous feedback or questions! 🤫"
                        </p>
                        <div className="inline-flex items-center space-x-1 bg-[#A8332B] text-[#EDE6D6] px-3 py-1 rounded-xs font-mono text-[10px] font-bold">
                          <span>mystry-messages.app/u/alex</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Twitter/X Share Card Mockup */}
                    <div className="bg-[#E3D9C2] p-3 rounded-xs border border-[#1C1A16] text-xs space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#45566E] block">
                        🐦 Twitter / X / LinkedIn
                      </span>
                      <p className="font-sans text-[#1C1A16] text-[11px]">
                        Dropping my anonymous link here. Say anything! 👇
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 3 PREVIEW: ANONYMOUS SENDER FORM */}
                {activeStep === 3 && (
                  <div className="space-y-3 animate-fade-in my-auto">
                    <div className="text-center pb-2 border-b border-[#C9B896]">
                      <h4 className="font-display font-extrabold text-lg uppercase">
                        Send to @alex
                      </h4>
                      <p className="text-xs text-[#45566E]">
                        Write an anonymous message to Alex.
                      </p>
                    </div>

                    {sentMessage ? (
                      <div className="py-6 text-center space-y-2 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto text-lg">
                          ✓
                        </div>
                        <p className="font-bold text-sm text-emerald-950">Message Sent Anonymously!</p>
                        <p className="text-xs text-[#45566E]">Stripped of identity metadata.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSendMessage} className="space-y-3">
                        <textarea
                          rows={3}
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Send an anonymous message..."
                          className="w-full p-2.5 text-xs bg-[#E3D9C2]/70 rounded-xs border border-[#C9B896] focus:border-[#A8332B] focus:outline-hidden resize-none font-sans"
                        />

                        <button
                          type="submit"
                          className="stamp-filled w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#1C1A16] transition-colors cursor-pointer shadow-xs"
                        >
                          Send Anonymously
                        </button>
                      </form>
                    )}

                    <div className="flex items-center justify-center space-x-1 text-[10px] text-[#45566E] pt-1">
                      <span>🔒 100% Anonymous</span>
                      <span>·</span>
                      <span>No IP recorded</span>
                    </div>
                  </div>
                )}

                {/* Bottom Interactive Step Indicator */}
                <div className="pt-3 border-t border-dashed border-[#C9B896] flex justify-between items-center text-[10px] font-mono text-[#45566E]">
                  <span>STEP {activeStep} OF 3</span>
                  <span className="text-[#A8332B] font-bold uppercase">
                    {activeStep === 1 && '• SETUP'}
                    {activeStep === 2 && '• SHARE'}
                    {activeStep === 3 && '• RECEIVE'}
                  </span>
                </div>
              </div>

              {/* Bottom Phone Bar */}
              <div className="w-24 h-1 bg-[#C9B896]/40 rounded-full mx-auto mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
