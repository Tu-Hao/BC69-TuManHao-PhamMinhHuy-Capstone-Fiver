
import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// Define interfaces
interface CongViec {
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  hinhAnh: string;
  moTaNgan: string;
  saoCongViec: number;
}

interface Content {
  id: number;
  congViec: CongViec;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const jobs: Content[] = location.state || [];

  return (
    <div className="container mx-auto py-10">
      {jobs.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy dịch vụ</h1>
          <p className="mt-2">
            Hãy thử tìm các dịch vụ phổ biến như marketing, website, design...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={job.congViec.hinhAnh}
                alt={job.congViec.tenCongViec}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{job.congViec.tenCongViec}</h2>
                <div className="flex items-center mb-2">
                  {Array.from({ length: job.congViec.saoCongViec }, (_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className="text-yellow-500"
                    />
                  ))}
                  <span className="ml-2">({job.congViec.danhGia} đánh giá)</span>
                </div>
                <p className="text-gray-700 mb-2">{job.congViec.moTaNgan}</p>
                <p className="font-bold text-lg">${job.congViec.giaTien}</p>
                <div className="mt-4 flex items-center">
                  <img
                    src={job.avatar}
                    alt={job.tenNguoiTao}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm font-bold">{job.tenNguoiTao}</p>
                    <p className="text-sm text-gray-500">
                      #{job.tenLoaiCongViec} #{job.tenNhomChiTietLoai} #{job.tenChiTietLoai}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
