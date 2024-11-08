// src/components/RegisterModal.tsx
import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { RootState } from "../redux/store";
import { z } from "zod";
import axiosInstance from "../constants/api";

// Schema xác thực form đăng ký sử dụng Zod
const registerSchema = z
  .object({
    name: z.string().min(1, "Vui lòng nhập họ tên"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    phone: z
      .string()
      .regex(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .min(10, "Số điện thoại phải có ít nhất 10 số"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Vui lòng nhập lại chính xác mật khẩu",
    path: ["confirmPassword"],
  });

const RegisterModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Lấy thông tin user từ Redux
  const user = useSelector((state: RootState) => state.auth.user);

  // Hàm đăng ký
  const handleRegister = async () => {
    try {
      // Xác thực dữ liệu form
      registerSchema.parse(formData);

      // Tạo payload cho API
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };

      // Gọi API đăng ký
      const response = await axiosInstance.post(
        "/api/auth/signup",
        payload
      );

      // Lưu thông tin user vào Redux
      dispatch(login(response.data));
      const payload2 = {
        email: formData.email,
        password: formData.password,
      };
      setVisible(false); // Đóng modal sau khi đăng ký thành công
      try {
        // Call the login API
        const response = await axiosInstance.post("/api/auth/signin", 
          payload2
        );
  
        const { user, token } = response.data.content;
  
        // Dispatch login action with extracted user and token
        dispatch(
          login({
            user, // Save the user data
            token, // Save the token
          })
        );

        message.success("Login successfully !");
      } catch (error: any) {
        if (error.issues) {
          setErrorMessage(error.issues[0].message); // Zod validation error
        } else {
          setErrorMessage("Login failed. Please try signing in again.");
        }
      }
      setErrorMessage(null);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.content); // Hiển thị lỗi từ API
      } else if (error.issues) {
        setErrorMessage(error.issues[0].message); // Lỗi xác thực từ Zod
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center ml-3">
      {user ? (
        <></>
      ) : (
        // Button to open the modal
        <Button
          className="bg-transparent text-lime-500 !border-lime-500 hover:!bg-lime-500 hover:!text-neutral-50"
          onClick={() => setVisible(true)}
        >
          Join
        </Button>
      )}

      {/* Ant Design Modal */}
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            className="text-neutral-50 bg-lime-500"
            onClick={handleRegister}
          >
            Create
          </Button>,
        ]}
      >
        <div className="flex h-full">
          {/* Left half with background image */}
          <div className="w-1/2 relative">
            <img
              src="./img/BGmodal.png"
              alt="BGmodal"
              className="bg-no-repeat bg-cover h-full rounded-md "
            />
            <div className="absolute top-0 text-xl text-neutral-50 mt-4 w-full p-7 ">
              <h2 className="font-bold">Success starts here</h2>
              <li className="before:content-['√'] before:mr-1 text-sm mt-2">
                Over 700 categories
              </li>
              <li className="before:content-['√'] before:mr-1 text-sm mt-1">
                Quality work done faster
              </li>
              <li className="before:content-['√'] before:mr-1 text-sm mt-1">
                Access to talent and businesses across the globe
              </li>
            </div>
          </div>

          {/* Right half with registration form */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">Register an account</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium ">Your name:</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Input your name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">Email:</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">Password:</label>
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">
                  Confirm password:
                </label>
                <Input.Password
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="confirm Password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">
                  Phone number:
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterModal;
