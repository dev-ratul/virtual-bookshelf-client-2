import React from "react";
import useAxioxSecure from "../../../hook/UseAxioxSecure";
import { useQuery } from "@tanstack/react-query";

const AllSpecialOffer = () => {
  const axiosSecure = useAxioxSecure();
  
  const { data = [], isLoading } = useQuery({
    queryKey: ["AllSpecialOffer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-special-offer");
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center py-10 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="py-10 h-screen">
      
      <div className="grid gap-8  sm:grid-cols-2 lg:grid-cols-4">
        {data.map((offer) => (
          <div
            key={offer._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={offer.banner}
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {offer.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {offer.description.length > 100
                  ? offer.description.slice(0, 100) + "..."
                  : offer.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Admin: {offer.adminEmail}</span>
                <span className="text-red-500 font-medium">
                  Valid till: {new Date(offer.validTill).toLocaleDateString()}
                </span>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSpecialOffer;
