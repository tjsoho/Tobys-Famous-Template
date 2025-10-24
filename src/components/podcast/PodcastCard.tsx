import Link from 'next/link';

interface PodcastCardProps {
    title: string;
    link: string;
}

export default function PodcastCard({ title, link }: PodcastCardProps) {
    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black border border-white/20 hover:border-white transition-colors p-6 group"
        >
            <div className="flex items-center gap-4">
                <div className="text-white/70 group-hover:text-white transition-colors">
                    <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                        />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-white transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors mt-1">
                        Listen Now →
                    </p>
                </div>
            </div>
        </Link>
    );
}
