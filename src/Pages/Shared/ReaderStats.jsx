import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ReaderStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return null;

  return (
    <motion.div
      className=" py-10 my-10 rounded-4xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-3xl font-bold text-[#4b3f2f] dark:text-gray-100 tracking-wide">{stats.bookCount}+</h3>
          <p className="text-gray-600 dark:text-gray-200">Books Added</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#4b3f2f] dark:text-gray-100 tracking-wide">{stats.reviewCount}+</h3>
          <p className="text-gray-600 dark:text-gray-200">User Reviews</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#4b3f2f] dark:text-gray-100 tracking-wide">{stats.userCount}+</h3>
          <p className="text-gray-600 dark:text-gray-200">Active Users</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReaderStats;