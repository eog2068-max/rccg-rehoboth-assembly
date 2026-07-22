"use client";

import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import { SectionWrapper, SectionTitle } from "./section-wrapper";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getNextSunday(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? (now.getHours() >= 7 ? 7 : 0) : 7 - dayOfWeek;
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(7, 0, 0, 0);
  return nextSunday;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetRef = useRef<Date>(getNextSunday());

  useEffect(() => {
    // Set initial value
    setTimeLeft(calculateTimeLeft(targetRef.current));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetRef.current));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-lg shadow-black/5 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-[#1A237E]/10">
        <span className="text-3xl md:text-4xl font-bold text-[#1A237E] tabular-nums" suppressHydrationWarning>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs md:text-sm font-medium text-gray-500 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const timeLeft = useCountdown();
  const isZero = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <SectionWrapper className="bg-[#F0F4FF] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 text-center">
        <SectionTitle title="Next Service" subtitle="Counting down to our next worship gathering" />

        {!isZero && (
          <div className="flex items-center justify-center gap-2 md:gap-6 mt-8 px-1">
            <CountdownBox value={timeLeft.days} label="Days" />
            <span className="text-2xl font-bold text-[#1A237E]/30 mt-[-20px]">:</span>
            <CountdownBox value={timeLeft.hours} label="Hours" />
            <span className="text-2xl font-bold text-[#1A237E]/30 mt-[-20px]">:</span>
            <CountdownBox value={timeLeft.minutes} label="Minutes" />
            <span className="text-2xl font-bold text-[#1A237E]/30 mt-[-20px]">:</span>
            <CountdownBox value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-white rounded-xl px-4 py-3 shadow-md shadow-black/5 text-sm md:text-base text-gray-600 max-w-full">
          <Clock className="size-4 text-[#1A237E]" />
          <span>
            <strong className="text-[#1A237E]">Sundays:</strong> 7:00 AM
          </span>
          <span className="text-gray-300 mx-1 hidden sm:inline">|</span>
          <span>
            <strong className="text-[#1A237E]">Tuesdays:</strong> 5:30 PM (Bible Study)
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}