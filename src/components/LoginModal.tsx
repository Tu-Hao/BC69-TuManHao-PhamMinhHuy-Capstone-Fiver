// // src/components/LoginModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Input, message, Dropdown } from "antd";
import axiosInstance from "../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

// Define login validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid account"),
  password: z.string().min(1, "Please enter a valid password"),
});

const LoginModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh avatar in LoginModal when updated in the profile
    if (user) (user.avatar); // set other user data as needed
  }, [user]);

 const handleLogin = async () => {
    try {
      // Validate form using Zod
      loginSchema.parse({ email, password });

      // Call the login API
      const response = await axiosInstance.post("/api/auth/signin", {
        email,
        password,
      });

      const { user, token } = response.data.content;

      // Dispatch login action with extracted user and token
      dispatch(
        login({
          user, // Save the user data
          token, // Save the token
        })
      );

      setVisible(false); // Close modal after successful login
      message.success("Login successfully !");
      setErrorMessage(null);
    } catch (error: any) {
      if (error.issues) {
        setErrorMessage(error.issues[0].message); // Zod validation error
      } else {
        setErrorMessage("Login failed. Wrong email or password.");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    message.info("You have logged out !");
    navigate("/"); // Redirect to homepage
  };

  // Define the menu items
  const menuItems = [
    {
      key: "profile",
      label: (
        <div className="text-center">
          <Link to={`/Profile/${user?.id}`}>Profile</Link>
        </div>
      ),
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            key: "admin",
            label: (
              <div className="text-center">
                <Button
                  type="link"
                  onClick={() => navigate("/admin/QuanLyNguoiDung")}
                >
                  Admin Page
                </Button>
              </div>
            ),
          },
        ]
      : []), // Show Admin Page only if the user is an admin
    {
      key: "logout",
      label: (
        <div className="flex place-content-center">
          <Button className="bg-lime-500 text-stone-50" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center ">
      {/* If user is logged in, show greeting and logout button */}
      {user ? (
        <div className="flex items-center space-x-4">
          <span>Xin chào {user.name}!</span>
          <Dropdown
            menu={{
              items: menuItems, // Pass the menuItems array directly
            }}
            trigger={["click"]}
          >
            <img
              className="h-10 w-10 text-center place-content-center rounded-full cursor-pointer"
              src={user.avatar || "/img/user-default.jpg"}
              alt="Avatar"
            ></img>
          </Dropdown>
        </div>
      ) : (
        // show login button
        <Button
          className=" text-gray-900 border-none hover:!text-lime-500 bg-transparent"
          onClick={() => setVisible(true)}
        >
          Sign in
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
            onClick={handleLogin}
          >
            Sign in
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
            <div className="absolute top-0 text-xl text-neutral-50 mt-1 w-full p-7 ">
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
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium ">Email:</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Input email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">Password:</label>
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input password"
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

export default LoginModal;

