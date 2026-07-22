export interface ServiceSchedule {
  id: string;
  title: string;
  day: string;
  time: string;
  endTime: string;
  description: string;
  icon: string;
  streamType: "video" | "audio-only";
}

export interface PastStream {
  id: string;
  title: string;
  date: string;
  duration: string;
  views: string;
  thumbnail?: string;
  type: string;
}

export const serviceSchedules: ServiceSchedule[] = [
  {
    id: "sun1",
    title: "Sunday Worship Service",
    day: "Sunday",
    time: "07:00",
    endTime: "10:00",
    description: "Praise, worship, the Word of God, and fellowship in His glorious presence. A time of refreshing and renewal.",
    icon: "Radio",
    streamType: "video",
  },
  {
    id: "tue",
    title: "Tuesday Digging Deep (Bible Study)",
    day: "Tuesday",
    time: "17:30",
    endTime: "19:00",
    description: "In-depth, systematic study of the Bible for spiritual growth, revelation knowledge, and practical Christian living.",
    icon: "BookOpen",
    streamType: "video",
  },
  {
    id: "thu",
    title: "Thursday Faith Clinic",
    day: "Thursday",
    time: "17:30",
    endTime: "19:00",
    description: "A special time of faith-building teachings, prayers, and declarations for divine healing, breakthroughs, and supernatural interventions.",
    icon: "Sparkles",
    streamType: "video",
  },

];

export const pastStreams: PastStream[] = [
  {
    id: "ps1",
    title: "Sunday Worship Service - The Power of Faith",
    date: "2025-07-13",
    duration: "2:15:00",
    views: "342",
    type: "Sunday Service",
  },
  {
    id: "ps2",
    title: "Sunday Worship Service - Walking in Destiny",
    date: "2025-07-06",
    duration: "2:20:00",
    views: "289",
    type: "Sunday Service",
  },
  {
    id: "ps3",
    title: "Tuesday Bible Study - The Grace Life",
    date: "2025-07-01",
    duration: "1:30:00",
    views: "156",
    type: "Bible Study",
  },

  {
    id: "ps5",
    title: "Sunday Worship Service - Grace to Overcome",
    date: "2025-06-29",
    duration: "2:05:00",
    views: "267",
    type: "Sunday Service",
  },
  {
    id: "ps6",
    title: "Tuesday Bible Study - Spiritual Warfare",
    date: "2025-06-24",
    duration: "1:30:00",
    views: "134",
    type: "Bible Study",
  },
];

export function getNextService(): ServiceSchedule | null {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[now.getDay()];
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  for (const service of serviceSchedules) {
    if (service.day === currentDay && currentTime < service.endTime) {
      return service;
    }
  }

  for (let i = 1; i <= 7; i++) {
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + i);
    const futureDay = dayNames[futureDate.getDay()];
    const found = serviceSchedules.find((s) => s.day === futureDay);
    if (found) return found;
  }

  return serviceSchedules[0];
}

export function isCurrentlyLive(): ServiceSchedule | null {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[now.getDay()];
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  for (const service of serviceSchedules) {
    if (service.day === currentDay && currentTime >= service.time && currentTime < service.endTime) {
      return service;
    }
  }
  return null;
}

export function getLiveViewers(): number {
  return Math.floor(Math.random() * 150) + 50;
}
