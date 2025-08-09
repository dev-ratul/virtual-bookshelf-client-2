import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const FeaturedCategories = ({ categories, onSelectCategory, selected }) => {
  return (
    <section className="max-w-5xl mx-auto mt-10 px-6">
      <div className="flex flex-wrap justify-center gap-4 py-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelectCategory(null)}
          className={`px-6 py-2 rounded-full text-white text-lg font-medium cursor-pointer transition ${
            selected === null
              ? "bg-purple-700 shadow-md"
              : "bg-primary hover:bg-purple-700"
          }`}
        >
          All
        </motion.div>
        {categories.map((cat) => (
          <motion.div
            key={cat}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelectCategory(cat)}
            className={`px-6 py-2 rounded-full text-white text-lg font-medium cursor-pointer transition ${
              selected === cat
                ? "bg-purple-700 shadow-md"
                : "bg-primary hover:bg-purple-700"
            }`}
          >
            {cat}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PopulerBook = ({ populerBook }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(
    new Set(populerBook.map((b) => b.book_category))
  );

  const filteredBooks = selectedCategory
    ? populerBook.filter((b) => b.book_category === selectedCategory)
    : populerBook;

  return (
    <section className=" min-h-screen pt-10 px-6">
      <h1 className="text-4xl font-bold text-[#4b3f2f] tracking-wide text-center">
        Popular Books
      </h1>

      <FeaturedCategories
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selected={selectedCategory}
      />

      {selectedCategory && (
        <h3 className="text-xl text-center font-medium text-indigo-600 mt-8 mb-10">
          Showing books in{" "}
          <span className="font-semibold">{selectedCategory}</span> category
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg col-span-full">
            No books found in this category.
          </p>
        ) : (
          filteredBooks.map((book) => (
            <motion.div
              key={book._id}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
              }}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
            >
              {/* Image Section */}
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 text-white flex flex-col justify-between">
                <h2
                  className="text-xl md:text-2xl font-semibold text-[#4b3f2f] mb-2 truncate"
                  title={book.book_title}
                >
                  {book.book_title}
                </h2>

                <p className="text-[#4b3f2f] text-sm leading-relaxed mb-4 line-clamp-4">
                  {book.book_overview}
                </p>

                {/* ✅ See More Button */}
                <div className="mt-auto pt-4">
                  <Link to={`/popularBook/${book._id}`}>
                    <button
                      // ✅ Replace with your own logic or route
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition w-full"
                    >
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default PopulerBook;
