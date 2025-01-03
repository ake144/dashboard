

export const users = async (): Promise<number> => {
    // Simulate fetching user count
    return new Promise((resolve) => setTimeout(() => resolve(1234), 500)); // Example: 1234 users
  };
  
  export const programs = async (): Promise<number> => {
    // Simulate fetching program count
    return new Promise((resolve) => setTimeout(() => resolve(56), 500)); // Example: 56 programs
  };
  
  export const channels = async (): Promise<number> => {
    // Simulate fetching channel count
    return new Promise((resolve) => setTimeout(() => resolve(12), 500)); // Example: 12 channels
  };
  



  
  // Simulate fetching program counts categorized by type
  export const programCountWithCategory = async (): Promise<Record<string, number>> => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            Movies: 25,
            Series: 15,
            Documentaries: 10,
            Sports: 6,
            TVShows: 4,
          }),
        500
      )
    ); // Example: categorized program counts
  };
  
  // Simulate fetching the total number of favorite programs
  export const favoriteCount = async (): Promise<number> => {
    return new Promise((resolve) => setTimeout(() => resolve(30), 500)); // Example: 30 favorites
  };
  
  // Simulate fetching the total number of programs in the "watch later" list
  export const watchLaterCount = async (): Promise<number> => {
    return new Promise((resolve) => setTimeout(() => resolve(20), 250)); // Example: 20 watch later
  };

  export const FeaturedCount = async (): Promise<number> => {
    return new Promise((resolve) => setTimeout(() => resolve(30), 200)); // Example: 30 favorites
  };
  
  // Simulate fetching the total number of programs in the "watch later" list
  export const RecommendedCount = async (): Promise<number> => {
    return new Promise((resolve) => setTimeout(() => resolve(20), 100)); // Example: 20 watch later
  };
  
  