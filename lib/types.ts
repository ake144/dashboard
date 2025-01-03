export   interface ProgramSchema {
    id: number;
    title: string;
    duration: number;
    description: string;
    videoUrl: string;
    channelId: number;
    typeId: number;
    categoryId: number;
    imageUrl: string | null;
  }


  export interface Channel {
    id: number;
    name: string;
    isActive: boolean;
  }