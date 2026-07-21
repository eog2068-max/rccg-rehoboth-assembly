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
    title: "First Sunday Service",
    day: "Sunday",
    time: "08:00",
    endTime: "10:00",
    description: "Praise, worship, the Word of God, and fellowship in His glorious presence. A time of refreshing and renewal.",
    icon: "Radio",
    streamType: "video",
  },
  {
    id: "sun2",
    title: "Second Sunday Service",
    day: "Sunday",
    time: "10:30",
    endTime: "13:00",
    description: "A deeper dive into the Word with extended worship, special ministrations, and altar calls for salvation and rededication.",
    icon: "Radio",
    streamType: "video",
  },
  {
    id: "wed",
    title: "Wednesday Bible Study",
    day: "Wednesday",
    time: "18:00",
    endTime: "20:00",
    description: "In-depth, systematic study of the Bible for spiritual growth, revelation knowledge, and practical Christian living.",
    icon: "BookOpen",
    streamType: "video",
  },
  {
    id: "fri",
    title: "Friday Prayer Meeting",
    day: "Friday",
    time: "19:00",
    endTime: "21:30",
    description: "A night of aggressive, fervent prayers covering personal needs, the church, the nation, and the nations of the world.",
    icon: "Heart",
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
    title: "Wednesday Bible Study - The Grace Life",
    date: "2025-07-02",
    duration: "1:45:00",
    views: "156",
    type: "Bible Study",
  },
  {
    id: "ps4",
    title: "Friday Prayer Meeting - Mid-Year Breakthrough",
    date: "2025-06-27",
    duration: "2:10:00",
    views: "198",
    type: "Prayer Meeting",
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
    title: "Wednesday Bible Study - Spiritual Warfare",
    date: "2025-06-25",
    duration: "1:50:00",
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
