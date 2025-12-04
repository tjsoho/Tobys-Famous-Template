export type BlogFormData = {
  title: string;
  cover_image: string;
  excerpt: string;
  author: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
};

export type BlogPost = {
  id?: string;
  title: string;
  cover_image?: string;
  excerpt?: string;
  author: string;
  content?: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  created_at?: string;
  updated_at?: string;
};
