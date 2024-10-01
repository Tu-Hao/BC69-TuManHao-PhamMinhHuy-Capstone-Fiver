import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../constants/api"; 

const Banner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        const response = await axiosInstance.get(
          `/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${searchTerm}`
        );
        if (response.data.content.length > 0) {
          // Chuyển hướng tới trang kết quả tìm kiếm
          navigate(`/search/${searchTerm}`, { state: response.data.content });
        } else {
          // Không tìm thấy kết quả
          navigate(`/search/notfound`);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div
      className="container mx-auto my-10 relative h-[50vh] w-[80%] bg-cover rounded-3xl bg-[url('/img/hero-xl-x1.png')]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black rounded-3xl opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-6xl font-semibold">
            Find the right <span className="text-green-500">freelance</span>{" "}
            <br></br> service, right away
          </h1>
          <form className="mt-6" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for any service..."
              className="px-4 py-2 w-80 rounded-lg focus:outline-none text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
