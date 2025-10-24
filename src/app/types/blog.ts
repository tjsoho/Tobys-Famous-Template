export type BlogFormData = {
  title: string;
  cover_image: string;
  excerpt: string;
  author: string;
  content: string;
};

export type BlogPost = {
  id?: string;
  title: string;
  cover_image?: string;
  excerpt?: string;
  author: string;
  content?: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
};
