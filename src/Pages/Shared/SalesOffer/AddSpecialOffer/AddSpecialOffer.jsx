import React from "react";
import { useForm } from "react-hook-form";
import useAxioxSecure from "../../../../hook/UseAxioxSecure";
import Swal from "sweetalert2";

const AddSpecialOffer = () => {
  const axiosSecure = useAxioxSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Backend এ POST করাতে পারিস এখানেই

    const res = await axiosSecure.post("/add-special-offer", data);
    console.log(res);
    if (res.data.insertedId) {
      Swal.fire({
        title: "✅ Book Added!",
        text: "Your book has been added successfully.",
        icon: "success",
        confirmButtonColor: "#6366F1",
        confirmButtonText: "Cool!",
      });
      
    } else {
      Swal.fire({
        title: "❌ Failed!",
        text: "Something went wrong while adding the book.",
        icon: "error",
        confirmButtonColor: "#EF4444",
        confirmButtonText: "Try Again",
      });
    }

    reset();
  };

  return (
    <div className="lg:w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10 border border-gray-300">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6 text-primary tracking-wide">
        🌟 Add Special Offer
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Fill out the form below to create an exciting new offer for customers.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Admin Email */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Admin Email
          </label>
          <input
            type="email"
            defaultValue="ratul@gmail.com"
            readOnly
            {...register("adminEmail")}
            className="w-full px-4 py-2 border rounded-xl bg-gray-100 border-gray-300 cursor-not-allowed text-gray-500 shadow-sm"
          />
        </div>

        {/* Offer Title */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Offer Title
          </label>
          <input
            type="text"
            placeholder="Ex: Buy 2kg Tomato, Get 500g Free!"
            {...register("title", { required: "Offer Title is required" })}
            className="w-full px-4 py-2 border rounded-xl border-gray-300  outline-none shadow-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Describe the offer in short..."
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 border rounded-xl border-gray-300 outline-none shadow-sm resize-none"
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Banner Image URL */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Banner Image URL
          </label>
          <input
            type="url"
            placeholder="Upload or paste banner image URL"
            {...register("banner", { required: "Banner URL is required" })}
            className="w-full px-4 py-2 border rounded-xl border-gray-300 outline-none shadow-sm"
          />
          {errors.banner && (
            <p className="text-red-500 text-sm mt-1">{errors.banner.message}</p>
          )}
        </div>

        {/* Valid Till */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Valid Till (Optional)
          </label>
          <input
            type="date"
            {...register("validTill")}
            className="w-full px-4 py-2 border rounded-xl border-gray-300 outline-none shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary cursor-pointer hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transform transition hover:scale-[1.02]"
        >
          ➕ Add Offer
        </button>
      </form>
    </div>
  );
};

export default AddSpecialOffer;
