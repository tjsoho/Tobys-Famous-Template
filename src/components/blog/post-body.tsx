type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div
      className="prose prose-lg mx-auto
        prose-headings:text-brand-black
        prose-p:text-brand-black
        prose-a:text-brand-teal prose-a:no-underline hover:prose-a:text-brand-yellow
        prose-strong:text-brand-black
        prose-ul:text-brand-black
        prose-ol:text-brand-black
        prose-blockquote:text-brand-black/70 prose-blockquote:border-brand-black/20
        prose-hr:border-brand-black/20
        prose-img:rounded-lg prose-img:shadow-lg
        prose-code:text-brand-black prose-code:bg-brand-cream/50
        prose-pre:bg-brand-cream/30 prose-pre:border prose-pre:border-brand-black/20"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}