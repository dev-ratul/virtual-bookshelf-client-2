import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router";
import { motion } from "framer-motion";

const PopulerBookDetails = () => {
  const { id } = useParams();

  const { data: book = {}, isLoading, isError } = useQuery({
    queryKey: ["popularBook", id],
    queryFn: async () => {
      const res = await axios.get(`https://virtual-bookshelf-server-three.vercel.app/popularBook/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-500 font-semibold text-lg">
        Failed to load book details.
      </p>
    );

  return (
    <motion.div
      className="max-w-6xl  mx-auto my-10 p-6 md:p-10 rounded-3xl shadow-2xl bg-[#1f2937] backdrop-blur-lg border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Book Image */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            src={book.cover_photo}
            alt={book.book_title}
            className="w-full h-[450px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Book Info */}
        <div className="text-white space-y-6">
          {/* Title & Author */}
          <div>
            <h1 className="text-4xl font-extrabold text-primary">
              {book.book_title}
            </h1>
            <p className="mt-2 text-lg text-gray-300">
              By <span className="font-semibold">{book.book_author}</span>
            </p>
          </div>

          {/* Overview */}
          <p className="text-gray-200 leading-relaxed">
            {book.book_overview}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-indigo-500/20 border border-indigo-400 rounded-full text-sm">
              📚 {book.book_category}
            </span>
            <span className="px-4 py-2 bg-green-500/20 border border-green-400 rounded-full text-sm">
              📄 {book.total_page} pages
            </span>
            <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-400 rounded-full text-sm">
              📈 {book.upvote} upvotes
            </span>
            <span className="px-4 py-2 bg-pink-500/20 border border-pink-400 rounded-full text-sm">
              📖 {book.reading_status}
            </span>
          </div>

          {/* Uploader Info */}
          <div className="p-5 bg-[#1f2937] rounded-xl border border-gray-700">
            <p className="font-semibold text-indigo-300">Uploaded By:</p>
            <p>
              {book.user_name}{" "}
              <span className="text-gray-400">({book.user_email})</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PopulerBookDetails;
