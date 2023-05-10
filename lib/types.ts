export interface Article {
  content: string;
  description: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  image?: string;
  date: string;
  decklist?: string;
}