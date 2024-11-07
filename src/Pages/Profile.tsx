import React, { useState, useEffect } from "react";
import { Button, message, Modal, Tooltip } from "antd";
import axiosInstance from "../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateUserAvatar } from "../redux/authSlice";
import {
  CameraOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import EditProfile from "../components/EditProfile";
import { QuestionCircleOutlined, PlusOutlined } from "@ant-design/icons";

// Define TypeScript interfaces based on API response
interface Content {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill: string[]; // skill is an array of strings
  certification: string[]; // certification is an array of strings
  bookingJob: any[];
}

interface Skill {
  id: number;
  tenSkill: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<Content>({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    avatar: "",
    gender: true,
    role: "",
    skill: [],
    certification: [],
    bookingJob: [],
  });
  const [isEditing, setIsEditing] = useState(false); // State for enabling/disabling editing
  console.log("isEditing: ", isEditing);
  const [fileList, setFileList] = useState<File | null>(null); // Store selected file
  const [fileName, setFileName] = useState<string>(""); // Store file name for display
  console.log("fileName: ", fileName);
  const userId = useSelector((state: RootState) => state.auth.user?.id); // Get user ID from Redux store
  const userToken = useSelector((state: RootState) => state.auth.token); // Get user token from Redux store
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [skillsList, setSkillsList] = useState<Skill[]>([]); // State for skill options

  // Fetch user profile data
  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(`/api/users/${userId}`)
        .then((response) => {
          setUserData(response.data.content);
        })
        .catch(() => {
          message.error("Error fetching user profile");
        });
    }

    // Fetch available skills
    axiosInstance
      .get("/api/skill")
      .then((response) => {
        setSkillsList(response.data.content); // Populate skills list
      })
      .catch(() => {
        message.error("Error fetching skills");
      });
  }, [userId]);

  // Handle input change by updating user data state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData!,
      [name]: value, // Use the name attribute to target the correct field
    }));
  };

  // Handle gender change with radio buttons
  const handleGenderChange = (e: any) => {
    const selectedGender = e.target.value === "Male" ? true : false;
    setUserData((prevData) => ({
      ...prevData!,
      gender: selectedGender,
    }));
  };

  // Handle skill changes
  const handleSkillSelectChange = (selectedSkills: string[]) => {
    setUserData((prevData) => ({
      ...prevData,
      skill: selectedSkills, // Update skill array with selected skills
    }));
  };

  //  certification changes
  const handleCertificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setUserData((prevData) => ({
      ...prevData!,
      certification: value.split(",").map((item) => item.trim()), // Convert comma-separated string back to array
    }));
  };

  // Save profile changes
  const handleSave = () => {
    if (userId && userData) {
      axiosInstance
        .put(`/api/users/${userId}`, userData)
        .then(() => {
          message.success("Profile updated successfully");
          setIsEditing(false);
          setIsModalVisible(false);
        })
        .catch(() => {
          message.error("Error updating profile");
        });
    }
  };

  // Handle file change (for choosing a file)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size <= 25 * 1024 * 1024) {
        setFileList(selectedFile);
        setPreviewImage(URL.createObjectURL(selectedFile)); // Create preview URL
        setIsModalVisible(true); // Show confirmation modal
      } else {
        message.error("File size must not exceed 25MB");
      }
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (fileList) {
      const formData = new FormData();
      formData.append("formFile", fileList);

      axiosInstance
        .post("/api/users/upload-avatar", formData, {
          headers: {
            token: `${userToken}`, // Add user token for authentication
          },
        })
        .then(() => {
          message.success("Avatar uploaded successfully");

          // Refetch profile data to update avatar
          axiosInstance
            .get(`/api/users/${userId}`)
            .then((response) => {
              const newAvatar = response.data.content.avatar;
              dispatch(updateUserAvatar(newAvatar)); // Update avatar in Redux
              setUserData(response.data.content); // Update user data with new avatar
              setIsModalVisible(false); // Close modal after upload
            })
            .catch(() => {
              message.error("Error refreshing profile data");
            });

          // Clear selected file and file name
          setFileList(null);
          setFileName("");
        })
        .catch(() => {
          message.error("Failed to upload avatar");
        });
    } else {
      message.warning("Please select an image to upload");
    }
  };
  // handleDateChange
  const handleDateChange = (date: any, dateString: string | string[]) => {
    console.log("date: ", date);
    if (typeof dateString === "string") {
      setUserData((prevData) => ({
        ...prevData!,
        birthday: dateString,
      }));
    }
  };

  if (!userData) {
    return <div>Error occurred! Please re-sign in.</div>;
  }

  return (
    <div className="p-6 space-y-4 mt-16 mx-80">
      <h1 className="text-3xl font-bold text-center mb-10">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96 ">
        {/* Avatar */}
        <div className="relative group h-24 w-24 mx-auto flex items-center justify-center">
          <img
            src={userData.avatar || "/img/user-default.jpg"}
            alt="Avatar"
            className="h-24 w-24 rounded-full object-cover cursor-pointer group-hover:opacity-70"
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            <CameraOutlined className="text-white text-3xl" />
          </div>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold">{userData.name}</h2>
          <span className="text-green-500">• Online</span>
          <Button
            type="default"
            className="mt-4 w-full"
            onClick={() => setIsModalVisible(true)}
          >
            Preview Profile
          </Button>
        </div>
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <EnvironmentOutlined /> From
            </div>
            <div>Vietnam</div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <div>
              <CalendarOutlined /> Member since
            </div>
            <div>Mar 2024</div>
          </div>
        </div>
      </div>
      {/* Design like fiverr */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Intro Video{" "}
              <Tooltip title="Beta feature">
                <span className="text-blue-500 text-sm">BETA</span>
              </Tooltip>
            </h2>
            <Tooltip title="Make a connection with potential buyers while building credibility and gaining trust.">
            <QuestionCircleOutlined />
            </Tooltip>
          </div>
          <p className="text-gray-700 mb-4">
            Stand out with a short introduction video.
          </p>
          <Button
            type="primary"
            className="w-full bg-green-500 font-bold hover:!bg-green-600"
          >
            Get started
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              My Portfolio{" "}
              <Tooltip title="New feature">
                <span className="text-pink-500 text-sm">NEW</span>
              </Tooltip>
            </h2>
            <Tooltip title="Your portfolio can showcase two types of work: projects and reviews with files.">
            <QuestionCircleOutlined />
            </Tooltip>

          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center border border-dashed border-gray-300 h-24 rounded">
              <Button type="link" icon={<PlusOutlined />}>
                Add a Project
              </Button>
            </div>
            <div className="flex items-center justify-center border border-gray-300 h-24 rounded bg-gray-50">
              <img src="/img/project-placeholder.b4890b9.svg" alt="Project" />
            </div>
            <div className="flex items-center justify-center border border-gray-300 h-24 rounded bg-gray-50">
              <img src="/img/project-placeholder.b4890b9.svg" alt="Project" />
            </div>
            <div className="flex items-center justify-center border border-gray-300 h-24 rounded bg-gray-50">
              <img src="/img/project-placeholder.b4890b9.svg" alt="Project" />
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <Button type="link" onClick={() => setIsModalVisible(true)}>
            Edit Description
          </Button>
        </div>
        <p className="text-gray-700 mb-6">Add your Description</p>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Languages</h3>
          <Button type="link" onClick={() => setIsModalVisible(true)}>Add New</Button>
        </div>
        <p>English - Basic</p>
        <p>Vietnamese (Tiếng Việt) - Native/Bilingual</p>
        <div className="flex justify-between items-center mb-4 mt-6">
          <h3 className="text-lg font-semibold">Skills</h3>
          <Button type="link" onClick={() => setIsModalVisible(true)}>Add New</Button>
        </div>
        <div className="flex space-x-2 mb-6">
          <Tooltip title="Pending approval">
            <span className="inline-flex items-center px-2 py-1 bg-gray-200 rounded-full text-sm">
              {userData.skill.join(", ")}
            </span>
          </Tooltip>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button type="link" onClick={() => setIsModalVisible(true)}>Add New</Button>
        </div>
        <p> CyberSoft Academy</p>
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-lg font-semibold">Certification</h3>
          <Button type="link" onClick={() => setIsModalVisible(true)}>Add New</Button>
        </div>
        <p>{userData.certification}</p>
      </div>

      <div className="flex space-x-6">
        {/* Modal upload Avatar */}
        <Modal
          title="Use this image as your profile picture?"
          open={isModalVisible}
          onOk={handleUpload}
          onCancel={() => setIsModalVisible(false)}
          okText="Yes"
          cancelText="No"
        >
          <img
            src={previewImage}
            alt="Selected Avatar"
            className="rounded-full h-32 w-32 object-cover mx-auto"
          />
        </Modal>
        {/* Modal Edit profile */}
        <EditProfile
          userData={userData}
          skillsList={skillsList}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleInputChange={handleInputChange}
          handleGenderChange={handleGenderChange}
          handleDateChange={handleDateChange}
          handleSkillSelectChange={handleSkillSelectChange}
          handleCertificationChange={handleCertificationChange}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Profile;
