// generateCards.ts
type Card = {
  image: string;
  title: string;
  points: number;
  rating: number;
};

export const generateRandomCards = (): Card[] => {
  return Array.from({ length: 12 }, () => ({
    image: "/placeholder-image.jpg", // Replace with your image path
    title: `Random Title ${Math.floor(Math.random() * 100)}`,
    points: 5,
    rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
  }));
};
