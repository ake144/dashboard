import { Channel, ProgramSchema } from "./types";

 // Static data for channels
 export const staticChannels: Channel[] = [
    { id: 1, name: 'Channel 1', isActive: true },
    { id: 2, name: 'Channel 2', isActive: false },
    { id: 3, name: 'Channel 3', isActive: true },
    { id: 4, name: 'Channel 4', isActive: true },
    { id: 5, name: 'Channel 5', isActive: false },
  ];


  
  export const placeholderPrograms: ProgramSchema[] = [
    {
      id: 1,
      title: "Morning Yoga Routine",
      duration: 30,
      description: "A relaxing morning yoga session to kickstart your day.",
      videoUrl: "https://example.com/yoga-routine",
      channelId: 1,
      typeId: 1,
      categoryId: 101,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "JavaScript Crash Course",
      duration: 120,
      description: "Learn the basics of JavaScript in 2 hours.",
      videoUrl: "https://example.com/js-crash-course",
      channelId: 2,
      typeId: 2,
      categoryId: 102,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Baking 101: Cookies & Cakes",
      duration: 45,
      description: "Master the art of baking with this beginner-friendly program.",
      videoUrl: "https://example.com/baking-101",
      channelId: 3,
      typeId: 3,
      categoryId: 103,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Backpacking Europe",
      duration: 60,
      description: "Tips and tricks for planning your European backpacking trip.",
      videoUrl: "https://example.com/backpacking-europe",
      channelId: 4,
      typeId: 4,
      categoryId: 104,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Guitar for Beginners",
      duration: 75,
      description: "Learn the basics of playing the guitar in this beginner course.",
      videoUrl: "https://example.com/guitar-for-beginners",
      channelId: 5,
      typeId: 5,
      categoryId: 105,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];