const collections = [
    {
        id: 1,
        tag: "The Essentials",
        title: "Ethereal Rings",
        alt: "Handcrafted Rings Collection",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCia20Qa_1XQKIRP6-QC7f6BxjkMReqxD1YHcudP-F6JLCon6z1t0sjSK8HFwvRt6N6hjni85kPAwCIAqps5wBK3LZE2TRxgM_0-yS9k3EaMOK2IhZfwg4i7yJbXmpf9x2S0g3X1IKGFLOsxAcEBOoT5YggKFq1ABaEVyysMJJzasi_I5ehp39O9H9BGVD7a-tzAqahEqzqxS9N7uxLYrCLZadofOAExmXLnA_-UC5zTyd67kmlhoCofO4wYcOID6vl5BMany8tgE0",
        href: "#",
    },
    {
        id: 2,
        tag: "Timeless Grace",
        title: "Celestial Necklaces",
        alt: "Elegant Necklaces Collection",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOb8wfEG7B_HL0dJ70ZUjD79cYOVR1UXSwfLiartCXygq8ZLCHgeFCpFnJwzypwTvWayYGWuSrDrfvCdgsCYd5-oa1zzaGJQnTkmhZ0hyFtd7f44MQQ1Vg6E1Cjbu-BYDnzTaftUPZcfrXA0uWZCjn5jvTdSu9qbS6g_Ri4IZy-RftFHOTVKl8fmfOLdlfRS0BHsxuX9C8x6KNYkYQVdjTRLKe1eTY5u3IWEvv_oBWUxVW8Fyfhchd0LlkQRacGfSMvhOgCy-cEgs",
        href: "#",
    },
    {
        id: 3,
        tag: "Modern Artistry",
        title: "Gilded Earrings",
        alt: "Statement Earrings Collection",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFd1pi74BPDXA1Do3DE-EnwC2FsyLM3kZwC4H2tRoKKdEHqyXgmlj535gZAOydqWdRbJpmg4QIwNm0tVUPPcZmubRQmHG4ZCuOKzInBjmzacPM-V_jdAPXzd7A6c3fBO4dacRhWr9zHOas3ELfTfhrovKy48IfyPAYY4Uik8mokblu6Jp6_TtsV2ifi5HFVdyxhfm9yT79TqzHfukxVpSHhLPkcsROQLoXZscDYVaC426aYuZ-_TUk7btZxiSdivFwtk4mTLhqKQ4",
        href: "#",
    },
    {
        id: 4,
        tag: "Modern shit",
        title: "Gilded Earrings",
        alt: "Statement Earrings Collection",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFd1pi74BPDXA1Do3DE-EnwC2FsyLM3kZwC4H2tRoKKdEHqyXgmlj535gZAOydqWdRbJpmg4QIwNm0tVUPPcZmubRQmHG4ZCuOKzInBjmzacPM-V_jdAPXzd7A6c3fBO4dacRhWr9zHOas3ELfTfhrovKy48IfyPAYY4Uik8mokblu6Jp6_TtsV2ifi5HFVdyxhfm9yT79TqzHfukxVpSHhLPkcsROQLoXZscDYVaC426aYuZ-_TUk7btZxiSdivFwtk4mTLhqKQ4",
        href: "#",
    },
];

const CollectionCard = ({ tag, title, alt, image, href }) => (
    <div className="group cursor-pointer">
        <div className="overflow-hidden aspect-[1/1] bg-gray-100 mb-6">
            <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                {tag}
            </span>
            <h3 className="text-2xl font-serif italic mb-3">{title}</h3>
            <a
                href={href}
                className="text-xs uppercase tracking-widest border-b border-shazi-gold pb-1 hover:text-shazi-gold transition-colors"
            >
                View Collection
            </a>
        </div>
    </div>
);

const HomeCollections = ({ categories }) => {
    return (
        <section className="py-12 px-8 max-w-7xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif text-shazi-black mb-4">
                 Top Collections
                </h2>
                <div className="w-16 h-[1px] bg-shazi-gold mx-auto" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {collections.map((item) => (
                    <CollectionCard key={item.id} {...item} />
                ))}
            </div>
        </section>
    );
};

export default HomeCollections;