import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import WhyShopWithUs from "@/components/WhyShopWithUs";
import HomeCategories from "@/components/HomeCategories";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32">
                <HeaderSlider />
                <HomeProducts />
                <HomeCategories />
                <FeaturedProduct />
                <Banner />
                <WhyShopWithUs />
                {/*<NewsLetter />*/}
            </div>
            <Footer />
        </>
    );
}
