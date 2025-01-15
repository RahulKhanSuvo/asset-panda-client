import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: "https://via.placeholder.com/1600x600", // Replace with your image URL
      title: "Join as HR Manager",
      buttonText: "Get Started as HR",
      buttonAction: () => navigate("/hr"), // Redirect to HR Manager page
    },
    {
      image: "https://via.placeholder.com/1600x600", // Replace with your image URL
      title: "Join as an Employee",
      buttonText: "Get Started as Employee",
      buttonAction: () => navigate("/employee"), // Redirect to Employee page
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
              {/* Background Image */}
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.title}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-2xl sm:text-4xl font-bold mb-4">
                  {slide.title}
                </h1>
                <button
                  onClick={slide.buttonAction}
                  className="bg-[#F80136] text-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-[#F80136] transition-all duration-300"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="custom-prev hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#F80136] text-white p-2 rounded-full cursor-pointer z-10">
        <FaChevronLeft size={24} />
      </div>
      <div className="custom-next hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#F80136] text-white p-2 rounded-full cursor-pointer z-10">
        <FaChevronRight size={24} />
      </div>
    </div>
  );
};

export default Banner;
