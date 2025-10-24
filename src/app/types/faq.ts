export interface FAQCategory {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category_id: string;
  created_at?: string;
  category?: FAQCategory;
}
