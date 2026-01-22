import Link from 'next/link';
import Image from 'next/image';

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
        <Link href={`/team/${slug}`} aria-label={`View ${title} profile`}>
            <article className="group relative bg-black border border-white/20 hover:border-white transition-colors overflow-hidden">
                <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={`${title} profile image`}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
