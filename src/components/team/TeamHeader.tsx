import Image from "next/image";

type Props = {
    title: string;
    coverImage: string;
    excerpt: string;
};

export function TeamHeader({ title, coverImage, excerpt }: Props) {
    return (
        <div className="relative">
            {/* Hero Image */}
            <div className="relative w-full h-[100vh]">
                {coverImage ? (
                    <div className="relative h-full flex items-center justify-center bg-black">
                        <div className="absolute inset-0 scale-[0.95]">
                            <Image
                                src={coverImage}
                                alt={title}
                                fill
                                className="object-contain"
                                priority
                                sizes="100vw"
                                style={{
                                    objectPosition: 'center',
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Centered Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-24">
                    <div className="max-w-4xl w-full text-center">
                        <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
                            {title}
                        </h1>
                        {excerpt && (
                            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
                                {excerpt}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
