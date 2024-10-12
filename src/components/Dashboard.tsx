import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="sticky top-0 left-0  w-[15%] h-full bg-gray-800 text-white p-4">
      <h2 className="text-3xl font-bold mb-4 text-lime-500">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/QuanLyNguoiDung" className="hover:text-lime-500">
            Quản lý người dùng
          </Link>
        </li>
        <li>
          <Link to="/admin/QuanLyCongViec" className="hover:text-lime-500">
            Quản lý công việc
          </Link>
        </li>
        <li>
          <Link to="/admin/QuanLyLoaiCongViec" className="hover:text-lime-500">
            Quản lý loại công việc
          </Link>
        </li>
        <li>
          <Link to="/admin/QuanLyDichVu" className="hover:text-lime-500">
            Quản lý dịch vụ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
