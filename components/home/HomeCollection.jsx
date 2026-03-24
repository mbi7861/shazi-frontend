"use client";
import { getImageUrl } from "@/app/utils/utils";
import { useRouter } from "next/navigation";

const HomeCollections = ({ categories }) => {
    const router = useRouter();
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
        {categories.map((cat, idx) => (
          // <CollectionCard key={`${item.slug}-${idx}`} item={item} />
          <div className="group cursor-pointer"
          key={cat.slug || idx}
          onClick={() => router.push(`/all-products?category=${cat.slug}`)}
          >
            <div className="overflow-hidden aspect-[1/1] bg-gray-100 mb-6">
              <img
                src={getImageUrl(cat.image?.uuid, "categories")}
                alt={cat.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif italic mb-3">{cat.title}</h3>
              <a
                className="text-xs uppercase tracking-widest border-b border-shazi-gold pb-1 hover:text-shazi-gold transition-colors"
              >
                View Collection
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCollections;
