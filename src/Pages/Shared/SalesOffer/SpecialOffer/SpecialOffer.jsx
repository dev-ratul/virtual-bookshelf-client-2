import React from "react";
import { motion } from "framer-motion";
import useAxioxSecure from "../../../../hook/UseAxioxSecure";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Loading from "../../Loading";

const SpecialOffer = () => {
  const axiosSecure = useAxioxSecure();

  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["special-offer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/special-offer");
      return res.data;
    },
  });

  if (isLoading){

      return <Loading></Loading> 
  }
  if (isError)
    return (
      <p className="text-center text-red-500 mt-20">Failed to load offers</p>
    );
  if (offers.length === 0)
    return (
      <p className="text-center text-gray-500 mt-20">No offers available.</p>
    );

  return (
    <section className="min-h-screen pt-10 sm:pt-16 px-3 sm:px-4 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-[#4b3f2f] tracking-wide text-center    mb-8 sm:mb-12 drop-shadow-lg "
      >
        ✨ Special Offers
      </motion.h1>

      <div className="w-full max-w-7xl shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          style={{ paddingBottom: "2.5rem" }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer._id}>
              <div className="relative group min-h-[380px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden flex items-center justify-center">
                {/* Background Image */}
                <motion.img
                  src={offer.banner}
                  alt={offer.title}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 5, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-[2000ms]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"></div>

                {/* Centered Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative z-10 text-center max-w-[90%] sm:max-w-3xl px-4 sm:px-6"
                >
                  <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                    {offer.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 leading-relaxed line-clamp-4 sm:line-clamp-none">
                    {offer.description}
                  </p>

                  <div className="inline-block backdrop-blur-md bg-white/10 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg text-left text-xs sm:text-base">
                    <p className="text-gray-100">
                      <span className="font-semibold">Admin Email:</span>{" "}
                      {offer.adminEmail}
                    </p>
                    {offer.validTill && (
                      <p className="text-gray-100">
                        <span className="font-semibold">Valid Till:</span>{" "}
                        {new Date(offer.validTill).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SpecialOffer;
