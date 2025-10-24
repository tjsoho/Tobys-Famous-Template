"use client";

interface Props {
    videoId?: string;
}

export default function DynamicYoutubeVideo({ videoId }: Props) {
    if (!videoId) return null;

    // Extract video ID from full URL if provided
    const extractVideoId = (input: string) => {
        // Handle full YouTube URLs
        const urlMatch = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (urlMatch) return urlMatch[1];

        // If no URL pattern matches, assume it's already a video ID
        return input;
    };

    const finalVideoId = extractVideoId(videoId);

    return (
        <div className="relative w-full pt-[56.25%]">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${finalVideoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
