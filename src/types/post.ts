export type PostType = 'lost' | 'found';

export type Category = 'card' | 'school' | 'it' | 'other';

export interface Post {
  id: string;
  type: PostType;
  title: string;
  description: string;
  category: Category;
  location: string;
  date: string;
  images: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
  status: 'active' | 'resolved';
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export const categoryLabels: Record<Category, string> = {
  card: 'บัตร',
  school: 'อุปกรณ์การเรียน',
  it: 'IT/อุปกรณ์',
  other: 'อื่นๆ',
};

export const categoryIcons: Record<Category, string> = {
  card: 'CreditCard',
  school: 'BookOpen',
  it: 'Laptop',
  other: 'Package',
};
