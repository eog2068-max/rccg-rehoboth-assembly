import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper, SectionTitle } from "./section-wrapper";

const events = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "8:00 AM & 10:30 AM",
    venue: "Main Auditorium",
    color: "bg-[#1A237E]",
    colorLight: "bg-[#EBF0FA]",
  },
  {
    title: "Midweek Bible Study",
    date: "Every Wednesday",
    time: "6:00 PM",
    venue: "Church Hall",
    color: "bg-[#2E7D32]",
    colorLight: "bg-[#E8F5E9]",
  },
  {
    title: "Special Thanksgiving Service",
    date: "Last Sunday of the Month",
    time: "8:00 AM",
    venue: "Main Auditorium",
    color: "bg-[#D32F2F]",
    colorLight: "bg-[#FFEBEE]",
  },
];

export function UpcomingEvents() {
  return (
    <SectionWrapper className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle title="Upcoming Events" subtitle="Join us for these upcoming gatherings" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.title}
              className="bg-white rounded-2xl shadow-lg shadow-black/5 overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Colored banner */}
              <div className={`${event.color} h-2`} />

              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1A237E] mb-3">{event.title}</h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-[#1A237E]/50 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-[#1A237E]/50 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-[#1A237E]/50 shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <Button
                    asChild
                    variant="outline"
                    className={`rounded-xl w-full border-[#1A237E]/20 text-[#1A237E] hover:bg-[#EBF0FA]`}
                  >
                    <Link href="/events">
                      Register
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-[#D32F2F] font-semibold hover:gap-2.5 transition-all text-sm"
          >
            View All Events
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}