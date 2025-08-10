import React, { useState } from "react";
import { Link } from "react-router";
import SingleBook from "./SingleBook";
import { useQuery } from "@tanstack/react-query";
import useAxioxSecure from "../../hook/UseAxioxSecure";
import Loading from "./Loading";

const BookShelf = () => {
  const axiosSecure = useAxioxSecure();
  

  const { data = [], isLoading } = useQuery({
    queryKey: ["all-book"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-book");
      return res.data;
    },
  });
  console.log(data);

  

  const [searchTerm, setSearchTerm] = useState("");
  const [readingStatus, setReadingStatus] = useState("All");

  const filteredBooks = data.filter((book) => {
    const searchFilter =
      book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.book_author.toLowerCase().includes(searchTerm.toLowerCase());

    const statusFilter =
      readingStatus === "All" || book.reading_status === readingStatus;

    return searchFilter && statusFilter;
  });

  if (isLoading ) {
    return <Loading />;
  }

  return (
    <div>
      {/* Search & Filter Section */}
      <div className="flex pt-10 flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-4 py-2 border bg-gray-100 text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        {/* Dropdown Filter */}
        <select
          className="border bg-gray-100 text-gray-500 border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
          value={readingStatus}
          onChange={(e) => setReadingStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want-to-Read</option>
        </select>
      </div>

      {/* Book Grid */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-10 py-10">
        {filteredBooks.map((singleBook) => (
          <Link to={`/book-shelf/${singleBook._id}`} key={singleBook._id}>
            <SingleBook singleBook={singleBook} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
