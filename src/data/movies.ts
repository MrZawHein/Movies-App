export const movies = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Movie ${i + 1}`,
  rating: (Math.random() * 4 + 6).toFixed(1),
  image: `https://picsum.photos/300/450?random=${i + 1}`
}));
