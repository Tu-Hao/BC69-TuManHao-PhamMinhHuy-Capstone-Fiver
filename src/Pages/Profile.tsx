import React, { useState, useEffect } from "react";
import { Input, Button, message, Radio, Modal, } from "antd";
import axiosInstance from "../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateUserAvatar } from "../redux/authSlice";

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

// Define the Skill interface for skill suggestions
// interface Skill {
//   id: number;
//   tenSkill: string;
// }

// interface SkillResponse {
//   statusCode: number;
//   content: Skill[];
// }

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
  const [fileList, setFileList] = useState<File | null>(null); // Store selected file
  const [fileName, setFileName] = useState<string>(""); // Store file name for display
  const userId = useSelector((state: RootState) => state.auth.user?.id); // Get user ID from Redux store
  const userToken = useSelector((state: RootState) => state.auth.token); // Get user token from Redux store
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  // Fetch user profile data
  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(`/api/users/${userId}`)
        .then((response) => {
          setUserData(response.data.content); // Populate user data from response
        })
        .catch(() => {
          message.error("Error fetching user profile");
        });
    }
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
 const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  setUserData((prevData) => ({
    ...prevData!,
    skill: value.split(",").map((item) => item.trim()), // Convert comma-separated string back to array
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
            "Content-Type": "multipart/form-data", // Ensure it's multipart/form-data
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

  if (!userData) {
    return <div>Error occurred! Please re-sign in.</div>; 
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="flex space-x-6">
        {/* Avatar */}
        <img
          src={userData.avatar || "/img/user-default.jpg"}
          alt="Avatar"
          className="h-24 w-24 rounded-full object-cover"
        />

        {/* Editable form fields */}
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium">Name:</label>
            <Input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone:</label>
            <Input
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          {/* Editable Gender field with radio buttons */}
          <div>
            <label className="block text-sm font-medium">Gender:</label>
            <Radio.Group
              onChange={handleGenderChange}
              value={userData.gender ? "Male" : "Female"}
              disabled={!isEditing}
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </div>

          <div>
            <label className="block text-sm font-medium">Birthday:</label>
            <Input
              name="birthday"
              value={userData.birthday}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          {/* Editable Skill field */}
          <div>
            <label className="block text-sm font-medium">Skills:</label>
            <Input
              name="skill"
              value={
                isEditing
                  ? userData.skill?.join(", ")
                  : userData.skill?.join(", ") || ""
              } // Display comma-separated list
              onChange={handleSkillChange} // Handle skill change
              disabled={!isEditing}
            />
          </div>

          {/* Editable Certification field */}
          <div>
            <label className="block text-sm font-medium">Certifications:</label>
            <Input
              name="certification"
              value={
                isEditing
                  ? userData.certification?.join(", ")
                  : userData.certification?.join(", ") || ""
              } // Display comma-separated list
              onChange={handleCertificationChange} // Handle certification change
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Booking Jobs:</label>
            <Input
              name="bookingJob"
              value={userData.bookingJob?.length}
              disabled
            />
          </div>

          {/* Non-editable fields */}
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <Input value={userData.email} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">Role:</label>
            <Input value={userData.role} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">ID:</label>
            <Input value={userData.id} disabled />
          </div>
          
                    {/* Edit and Save buttons */}
                    <div className="space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            ) : (
              <Button onClick={handleSave}>Save</Button>
            )}
            {isEditing && (
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            )}
          </div>

          {/* Upload Avatar functionality */}
          <div className="mt-4">
            <label className="block text-sm font-medium">Avatar:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {fileName && <p className="text-sm text-gray-500">Selected file: {fileName}</p>}
          </div>

          <Modal
            title="Bạn muốn sử dụng hình này làm ảnh đại diện?"
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
