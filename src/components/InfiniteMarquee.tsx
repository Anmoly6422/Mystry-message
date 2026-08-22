'use client';

import React, { useRef } from 'react';

interface MessageItem {
  title: string;
  content: string;
  received: string;
}

interface InfiniteMarqueeProps {
  items: MessageItem[];
}

export default function InfiniteMarquee({ items }: InfiniteMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate items array 3x to ensure uninterrupted infinite scroll
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none group">
      {/* Edge Gradient Fades for Tactile Depth */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#E3D9C2] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#E3D9C2] to-transparent z-20 pointer-events-none" />

      {/* Track Container */}
      <div
        ref={scrollRef}
        className="flex space-x-6 w-max animate-marquee group-hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing"
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="w-[320px] sm:w-[380px] shrink-0 bg-[#EDE6D6] p-6 border-2 border-[#1C1A16] shadow-[5px_5px_0px_#1C1A16] relative font-mono text-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#A8332B] paperclip-clip"
          >
            <div>
              {/* Header Meta */}
              <div className="flex justify-between items-center border-b border-[#C9B896] pb-2 mb-3">
                <span className="font-bold text-[#A8332B] text-xs">
                  [WITNESS ENTRY #{101 + (idx % items.length)}]
                </span>
                <span className="text-[11px] text-[#45566E]">{item.received}</span>
              </div>

              {/* Message Copy */}
              <p className="font-serif italic text-[#1C1A16] mb-6 text-base leading-relaxed line-clamp-3">
                "{item.content}"
              </p>
            </div>

            {/* Footer Classification Tag */}
            <div className="text-right text-[10px] text-[#45566E] tracking-widest uppercase border-t border-dotted border-[#C9B896] pt-2 flex justify-between items-center">
              <span className="font-mono text-[9px] text-[#A8332B] border border-[#A8332B] px-1 py-0.5 font-bold">
                SEALED
              </span>
              <span>CLASSIFICATION: UNTRACEABLE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
