interface Photo {
  id: string;
  title: string;
  date: string;
  category: string;
  description?: string;
  albumId: string;
}

interface Album {
  id: string;
  name: string;
  coverPhoto: string;
  date: string;
  description: string;
  category: string;
  photoCount: number;
}

export const mockAlbums: Album[] = [
  {
    id: "alb1",
    name: "Sunday Worship Services",
    coverPhoto: "sunday-worship",
    date: "2025-07-13",
    description: "Captured moments from our powerful Sunday worship services where God's presence fills the sanctuary.",
    category: "Services",
    photoCount: 24,
  },
  {
    id: "alb2",
    name: "Youth Conference 2025",
    coverPhoto: "youth-conf",
    date: "2025-06-15",
    description: "An electrifying gathering of young believers hungry for God and empowered for purpose.",
    category: "Events",
    photoCount: 36,
  },
  {
    id: "alb3",
    name: "Special Thanksgiving",
    coverPhoto: "thanksgiving",
    date: "2025-07-04",
    description: "A dedicated service of gratitude to God for His faithfulness and goodness throughout the year.",
    category: "Services",
    photoCount: 18,
  },
  {
    id: "alb4",
    name: "Community Outreach",
    coverPhoto: "outreach",
    date: "2025-06-22",
    description: "Reaching out to the Utako community with love, provisions, and the gospel of Jesus Christ.",
    category: "Outreach",
    photoCount: 20,
  },
  {
    id: "alb5",
    name: "Choir & Worship Ministry",
    coverPhoto: "choir",
    date: "2025-06-29",
    description: "The dedicated men and women who lead us into God's presence through music and worship.",
    category: "Ministry",
    photoCount: 15,
  },
  {
    id: "alb6",
    name: "Prayer Mountain Retreat",
    coverPhoto: "retreat",
    date: "2025-06-10",
    description: "A time of consecration, deep prayers, and spiritual renewal in the presence of God.",
    category: "Events",
    photoCount: 22,
  },
  {
    id: "alb7",
    name: "Easter Celebration",
    coverPhoto: "easter",
    date: "2025-04-20",
    description: "Celebrating the resurrection of our Lord Jesus Christ with joy, praise, and thanksgiving.",
    category: "Services",
    photoCount: 28,
  },
  {
    id: "alb8",
    name: "Children Church Activities",
    coverPhoto: "children",
    date: "2025-07-06",
    description: "Our little ones growing in the knowledge of God through fun, creative, and spirit-filled activities.",
    category: "Ministry",
    photoCount: 16,
  },
  {
    id: "alb9",
    name: "Welfare & Charity",
    coverPhoto: "welfare",
    date: "2025-05-15",
    description: "Demonstrating Christ's love by caring for the needy and supporting members in difficult times.",
    category: "Outreach",
    photoCount: 12,
  },
];

export const mockPhotos: Photo[] = [
  // Album 1: Sunday Worship
  { id: "p1", title: "Praise and Worship", date: "2025-07-13", category: "Services", description: "The congregation in deep worship", albumId: "alb1" },
  { id: "p2", title: "Sermon Time", date: "2025-07-13", category: "Services", description: "Pastor delivering the Word", albumId: "alb1" },
  { id: "p3", title: "Altar Call", date: "2025-07-13", category: "Services", description: "Souls responding to the altar call", albumId: "alb1" },
  { id: "p4", title: "Congregation Seated", date: "2025-07-13", category: "Services", description: "A packed sanctuary of worshippers", albumId: "alb1" },
  { id: "p5", title: "Prayer Session", date: "2025-07-13", category: "Services", description: "Corporate prayer moment", albumId: "alb1" },
  { id: "p6", title: "Special Ministration", date: "2025-07-13", category: "Services", description: "Choir leading a special song", albumId: "alb1" },
  // Album 2: Youth Conference
  { id: "p7", title: "Opening Session", date: "2025-06-15", category: "Events", description: "Youth conference kick-off", albumId: "alb2" },
  { id: "p8", title: "Praise Party", date: "2025-06-15", category: "Events", description: "Youth in energetic praise", albumId: "alb2" },
  { id: "p9", title: "Group Photo", date: "2025-06-15", category: "Events", description: "All youth conference attendees", albumId: "alb2" },
  { id: "p10", title: "Drama Ministration", date: "2025-06-15", category: "Events", description: "Youth drama presentation", albumId: "alb2" },
  { id: "p11", title: "Worship Time", date: "2025-06-15", category: "Events", description: "Deep worship session", albumId: "alb2" },
  { id: "p12", title: "Prayer Tunnel", date: "2025-06-15", category: "Events", description: "Youth in prayer tunnel", albumId: "alb2" },
  // Album 3: Thanksgiving
  { id: "p13", title: "Thanksgiving Procession", date: "2025-07-04", category: "Services", description: "Members in thanksgiving procession", albumId: "alb3" },
  { id: "p14", title: "Testimony Time", date: "2025-07-04", category: "Services", description: "Members sharing testimonies", albumId: "alb3" },
  { id: "p15", title: "Dance Ministry", date: "2025-07-04", category: "Services", description: "Dance ministration for thanksgiving", albumId: "alb3" },
  { id: "p16", title: "Special Choir Song", date: "2025-07-04", category: "Services", description: "Choir's special thanksgiving song", albumId: "alb3" },
  // Album 4: Outreach
  { id: "p17", title: "Food Distribution", date: "2025-06-22", category: "Outreach", description: "Distributing food items to the community", albumId: "alb4" },
  { id: "p18", title: "Community Engagement", date: "2025-06-22", category: "Outreach", description: "Interacting with community members", albumId: "alb4" },
  { id: "p19", title: "Evangelism Team", date: "2025-06-22", category: "Outreach", description: "Team heading out for evangelism", albumId: "alb4" },
  { id: "p20", title: "Prayer for Residents", date: "2025-06-22", category: "Outreach", description: "Praying with community residents", albumId: "alb4" },
  // Album 5: Choir
  { id: "p21", title: "Choir in Rehearsal", date: "2025-06-29", category: "Ministry", description: "Choir rehearsing for Sunday", albumId: "alb5" },
  { id: "p22", title: "Instrumentalists", date: "2025-06-29", category: "Ministry", description: "Instrumentalists in action", albumId: "alb5" },
  { id: "p23", title: "Worship Leader", date: "2025-06-29", category: "Ministry", description: "Leading the congregation in worship", albumId: "alb5" },
  // Album 6: Retreat
  { id: "p24", title: "Morning Devotion", date: "2025-06-10", category: "Events", description: "Devotion at the retreat", albumId: "alb6" },
  { id: "p25", title: "Group Prayer", date: "2025-06-10", category: "Events", description: "Intense group prayer session", albumId: "alb6" },
  { id: "p26", title: "Bible Study Session", date: "2025-06-10", category: "Events", description: "Study session at the retreat", albumId: "alb6" },
  // Album 7: Easter
  { id: "p27", title: "Sunrise Service", date: "2025-04-20", category: "Services", description: "Early morning resurrection service", albumId: "alb7" },
  { id: "p28", title: "Easter Celebration", date: "2025-04-20", category: "Services", description: "Joyful Easter celebration", albumId: "alb7" },
  { id: "p29", title: "Children's Easter", date: "2025-04-20", category: "Services", description: "Children celebrating Easter", albumId: "alb7" },
  // Album 8: Children
  { id: "p30", title: "Bible Class", date: "2025-07-06", category: "Ministry", description: "Children in Bible class", albumId: "alb8" },
  { id: "p31", title: "Kids Praise", date: "2025-07-06", category: "Ministry", description: "Children singing praises", albumId: "alb8" },
  { id: "p32", title: "Art & Craft", date: "2025-07-06", category: "Ministry", description: "Creative activities for children", albumId: "alb8" },
  // Album 9: Welfare
  { id: "p33", title: "Care Package Distribution", date: "2025-05-15", category: "Outreach", description: "Distributing care packages", albumId: "alb9" },
  { id: "p34", title: "Visit to Hospital", date: "2025-05-15", category: "Outreach", description: "Hospital visitation team", albumId: "alb9" },
  { id: "p35", title: "Support for Widows", date: "2025-05-15", category: "Outreach", description: "Supporting widows in the parish", albumId: "alb9" },
];

export const galleryCategories = ["All", "Services", "Events", "Ministry", "Outreach"];