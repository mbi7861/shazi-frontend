import logo from "./logo.png";
import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import cart_icon from "./cart_icon.svg";
import contact_us from "./contact-us.png";
import add_icon from "./add_icon.svg";
import order_icon from "./order_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import box_icon from "./box_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import menu_icon from "./menu_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import increase_arrow from "./increase_arrow.svg";
import decrease_arrow from "./decrease_arrow.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import my_location_image from "./my_location_image.svg";
import arrow_icon_white from "./arrow_icon_white.svg";
import heart_icon from "./heart_icon.svg";
import star_icon from "./star_icon.svg";
import redirect_icon from "./redirect_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import upload_area from "./upload_area.png";
import checkmark from "./checkmark.png";
import category_breakers from "./categories/breakers.png";
import category_sockets from "./categories/sockets.png";
import banner1 from "./banner_img_1.png";
import footerBg from "./footer-bg.jpg";
import heroImage from "./hero-image.png";

export const assets = {
    heroImage,
    logo,
    search_icon,
    user_icon,
    cart_icon,
    add_icon,
    order_icon,
    contact_us,
    instagram_icon,
    facebook_icon,
    twitter_icon,
    box_icon,
    product_list_icon,
    menu_icon,
    arrow_icon,
    increase_arrow,
    decrease_arrow,
    arrow_right_icon_colored,
    my_location_image,
    arrow_icon_white,
    heart_icon,
    star_icon,
    redirect_icon,
    star_dull_icon,
    upload_area,
    banner1,
    footerBg,
    checkmark,
    categories: {
        breakers: category_breakers,
        sockets: category_sockets,
    }
};

export const BagIcon = () => {
    return (
        <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
        </svg>
    )
}

export const CartIcon = () => {
    return (
        <svg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M7.72852 15.375C8.59146 15.375 9.29102 16.0186 9.29102 16.8125C9.29102 17.6064 8.59146 18.25 7.72852 18.25C6.86557 18.25 6.16602 17.6064 6.16602 16.8125C6.16602 16.0186 6.86557 15.375 7.72852 15.375Z'
                stroke='#ffffff' strokeWidth='1.6' />
            <path
                d='M16.1035 15.375C16.9664 15.375 17.666 16.0185 17.666 16.8125C17.666 17.6064 16.9664 18.25 16.1035 18.25C15.2406 18.25 14.541 17.6064 14.541 16.8125C14.541 16.0185 15.2406 15.375 16.1035 15.375Z'
                stroke='#ffffff' strokeWidth='1.6' />
            <path
                d='M1 1L1.27209 1.08801C2.62792 1.52656 3.30583 1.74583 3.69358 2.26786C4.08133 2.78989 4.08133 3.48329 4.08133 4.87009V7.47833C4.08133 10.2974 4.14721 11.2276 5.04971 12.1034C5.95221 12.9792 7.40476 12.9792 10.3099 12.9792H11.4167M15.8337 12.9792C17.4598 12.9792 18.2728 12.9792 18.8475 12.5483C19.4222 12.1174 19.5864 11.3849 19.9146 9.91969L20.4352 7.59597C20.7968 5.92937 20.9775 5.09608 20.5151 4.54303C20.0527 3.99 18.4727 3.99 16.7175 3.99H10.3995M4.08133 3.99H6.20833'
                stroke='#ffffff' strokeWidth='1.6' />
        </svg>

    )
}


export const ProfileIcon = () => {
    return (
        <svg width="14" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#ffffff">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                                d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298"
                                id="profile"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export const BoxIcon = () => (
    <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
    </svg>
);

export const HomeIcon = () => (
    <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
    </svg>
);

export const HeartFilledIcon = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-4 h-4 ${className}`}
        fill="red"
    >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
           2 6 4 4 6.5 4c1.74 0 3.41 0.81 4.5 2.09 
           C12.09 4.81 13.76 4 15.5 4 
           18 4 20 6 20 8.5 
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);

export const HeartIcon = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-4 h-4 ${className}`}
    >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
           2 6 4 4 6.5 4c1.74 0 3.41 0.81 4.5 2.09 
           C12.09 4.81 13.76 4 15.5 4 
           18 4 20 6 20 8.5 
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);