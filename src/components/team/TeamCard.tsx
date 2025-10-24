import Link from 'next/link';

interface TeamCardProps {
    title: string;
    excerpt: string;
    coverImage: string;
    slug: string;
}

export default function TeamCard({
    title,
    excerpt,
    coverImage,
    slug,
}: TeamCardProps) {
    return (
        <Link href={`/team/${slug}`}>
            <article className="group relative bg-black border border-white/20 hover:border-white transition-colors overflow-hidden">
                <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-white/70 group-hover:text-white transition-colors">
                        {title}
                    </h3>
                    <p className="text-white/70 mt-4 line-clamp-3">{excerpt}</p>
                </div>
            </article>
        </Link>
    );
}
