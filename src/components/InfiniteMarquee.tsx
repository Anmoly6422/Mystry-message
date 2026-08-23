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

  // Duplicate items array exactly once for a seamless CSS marquee loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none group">
      {/* Edge Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#E3D9C2] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#E3D9C2] to-transparent z-20 pointer-events-none" />

      {/* Track Container */}
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label="Recent anonymous messages feed"
        className="flex space-x-6 w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] focus:[animation-play-state:paused] hover:[animation-play-state:paused] motion-reduce:animate-none cursor-grab active:cursor-grabbing focus:outline-hidden"
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="w-[300px] sm:w-[360px] shrink-0 bg-[#EDE6D6] p-5 rounded-xs border border-[#1C1A16] shadow-xs relative text-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              {/* Header Meta */}
              <div className="flex justify-between items-center border-b border-[#C9B896] pb-2 mb-3 font-mono text-xs">
                <span className="font-semibold text-[#A8332B]">
                  Message #{101 + (idx % items.length)}
                </span>
                <span className="text-[11px] text-[#45566E]">{item.received}</span>
              </div>

              {/* Message Copy */}
              <p className="font-serif italic text-[#1C1A16] mb-5 text-base leading-relaxed line-clamp-3">
                "{item.content}"
              </p>
            </div>

            {/* Footer Tag */}
            <div className="text-xs text-[#45566E] font-mono border-t border-dashed border-[#C9B896] pt-2 flex justify-between items-center">
              <span className="text-[10px] text-[#A8332B] font-semibold border border-[#A8332B]/40 px-1.5 py-0.5 rounded-xs">
                Anonymous
              </span>
              <span className="text-[11px]">Untraceable</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
