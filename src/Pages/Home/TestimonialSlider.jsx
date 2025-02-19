import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Container from "../../Components/Container";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TestimonialSlider = () => {
  return (
    <section className="bg-[#F7F9FD]">
      <Container>
        <div className="py-12 px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Don’t just take our word for it – see what{" "}
            <span className="text-green-500 font-bold">our</span> customers have
            to say
          </h2>

          {/* Swiper Slider */}
          <div className="relative mt-8">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1 }, // Mobile devices
                640: { slidesPerView: 2 }, // Tablets
                1024: { slidesPerView: 3 }, // Desktops
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              loop={true}
              className="relative"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="max-w-2xl mx-auto bg-white  p-6 rounded-lg border-t-4 border-blue-500">
                    <p className="text-gray-700">{testimonial.text}</p>
                    <h4 className="mt-4 font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="custom-prev absolute left-[-40px] top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition">
              <FaArrowLeft className="text-gray-700" />
            </button>
            <button className="custom-next absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 translate-x-4 rounded-full shadow-md hover:bg-gray-300 transition">
              <FaArrowRight className="text-gray-700" />
            </button>
          </div>

          {/* Button */}
        </div>
      </Container>
    </section>
  );
};

// Testimonials Data
const testimonials = [
  {
    text: "Asset Panda saved me and my team time and money from looking at other asset management software...",
    name: "Lloyd B.",
    position: "Director of Quality Engineering",
  },
  {
    text: "Our company has really benefited from selecting this software for our startup. Everything can be built to your needs...",
    name: "Ryan V.",
    position: "Operations Manager",
  },
  {
    text: "The interface is user-friendly, and the features are comprehensive. The mobile app allows me to access and update assets...",
    name: "Ivor B.",
    position: "CEO",
  },
  {
    text: "We’ve used several asset tracking solutions, but nothing comes close to the flexibility and ease of use that Asset Panda provides...",
    name: "Sarah M.",
    position: "IT Administrator",
  },
  {
    text: "This tool has significantly improved our asset management process. It’s intuitive, fast, and reliable...",
    name: "Jason T.",
    position: "Finance Manager",
  },

  {
    text: "Managing company assets has never been easier. The reports and tracking features are top-notch...",
    name: "Sophia L.",
    position: "Business Analyst",
  },
  {
    text: "The platform is secure, reliable, and user-friendly. We’ve seen a massive improvement in asset tracking...",
    name: "Daniel K.",
    position: "Procurement Officer",
  },
];

export default TestimonialSlider;
