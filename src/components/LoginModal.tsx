// // import React, { useState } from "react";
// // import { Modal, Button, Input, message } from "antd";
// // import axios from "axios";
// // import { useDispatch } from "react-redux";
// // import { login } from "../redux/authSlice";
// // import { z } from "zod";

// // const loginSchema = z.object({
// //   email: z.string().email("Vui lòng nhập tài khoản hợp lệ"),
// //   password: z.string().min(1, "Vui lòng nhập mật khẩu"),
// // });

// // const LoginModal: React.FC = () => {
// //   const [visible, setVisible] = useState(false);
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
// //   const dispatch = useDispatch();

// //   const handleLogin = async () => {
// //     try {
// //       // Validate form using Zod
// //       loginSchema.parse({ email, password });

// //       // Call the login API
// //       const response = await axios.post(
// //         "https://fiverrnew.cybersoft.edu.vn/api/auth/signin",
// //         { email, password },
// //         {
// //           headers: {
// //             TokenCyberSoft:
// //               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODM2ODAwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NTE1NjAwfQ.ap-iPzMpXDeCuXH0aJnbbSuR3vIW4upk1nOK3h9D-5g",
// //           },
// //         }
// //       );

// //       const token = response.data.token;

// //       // Save user data to Redux
// //       dispatch(login({ email, token }));

// //       setVisible(false); // Close modal after successful login
// //       message.success("Đăng nhập thành công!");
// //       setErrorMessage(null);
// //     } catch (error: any) {
// //       if (error.issues) {
// //         setErrorMessage(error.issues[0].message); // Zod validation error
// //       } else {
// //         setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center h-screen">
// //       {/* Button to open the modal */}
// //       <Button type="primary" onClick={() => setVisible(true)}>
// //         Đăng nhập
// //       </Button>

// //       {/* Ant Design Modal */}
// //       <Modal
// //         title="Đăng nhập"
// //         open={visible}
// //         onCancel={() => setVisible(false)}
// //         footer={[
// //           <Button key="cancel" onClick={() => setVisible(false)}>
// //             Hủy
// //           </Button>,
// //           <Button key="submit" type="primary" onClick={handleLogin}>
// //             Đăng nhập
// //           </Button>,
// //         ]}
// //       >
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Email:
// //             </label>
// //             <Input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Nhập email"
// //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Mật khẩu:
// //             </label>
// //             <Input.Password
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="Nhập mật khẩu"
// //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
// //             />
// //           </div>
// //           {errorMessage && (
// //             <div className="text-red-500 text-sm">{errorMessage}</div>
// //           )}
// //         </div>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default LoginModal;

// import React, { useState } from "react";
// import { Modal, Button, Input, message } from "antd";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../redux/authSlice";
// import { RootState } from "../redux/store"; 
// import { z } from "zod";

// const loginSchema = z.object({
//   email: z.string().email("Vui lòng nhập tài khoản hợp lệ"),
//   password: z.string().min(1, "Vui lòng nhập mật khẩu"),
// });

// const LoginModal: React.FC = () => {
//   const [visible, setVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.auth.user);

//   const handleLogin = async () => {
//     try {
//       // Validate form using Zod
//       loginSchema.parse({ email, password });

//       // Call the login API
//       const response = await axios.post(
//         "https://fiverrnew.cybersoft.edu.vn/api/auth/signin",
//         { email, password },
//         {
//           headers: {
//             TokenCyberSoft:
//               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODM2ODAwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NTE1NjAwfQ.ap-iPzMpXDeCuXH0aJnbbSuR3vIW4upk1nOK3h9D-5g",
//           },
//         }
//       );

//       const userData = response.data;

//       // Save user data to Redux
//       dispatch(login(userData));

//       setVisible(false); // Close modal after successful login
//       message.success("Đăng nhập thành công!");
//       setErrorMessage(null);
//     } catch (error: any) {
//       if (error.issues) {
//         setErrorMessage(error.issues[0].message); // Zod validation error
//       } else {
//         setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
//       }
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     message.info("Đã đăng xuất.");
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {/* If user is logged in, show greeting and logout button */}
//       {user ? (
//         <div className="flex items-center space-x-4">
//           <span>Xin chào, {user.name}!</span>
//           <Button type="default" onClick={handleLogout}>
//             Đăng xuất
//           </Button>
//         </div>
//       ) : (
//         // Otherwise, show the login button
//         <Button type="primary" onClick={() => setVisible(true)}>
//           Đăng nhập
//         </Button>
//       )}

//       {/* Ant Design Modal */}
//       <Modal
//         title="Đăng nhập"
//         open={visible}
//         onCancel={() => setVisible(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setVisible(false)}>
//             Hủy
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleLogin}>
//             Đăng nhập
//           </Button>,
//         ]}
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email:
//             </label>
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Nhập email"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Mật khẩu:
//             </label>
//             <Input.Password
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Nhập mật khẩu"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           {errorMessage && (
//             <div className="text-red-500 text-sm">{errorMessage}</div>
//           )}
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default LoginModal;
