import React, { useState, useEffect } from "react";
import { Input, Button, message, Radio } from "antd";
import axiosInstance from "../constants/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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
  skill: string[];  // skill is an array of strings
  certification: string[];  // certification is an array of strings
  bookingJob: any[];
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<Content | null>(null); // Store user data
  const [isEditing, setIsEditing] = useState(false); // State for enabling/disabling editing
  const userId = useSelector((state: RootState) => state.auth.user?.id); // Get user ID from Redux store

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

  // Handle skill and certification changes
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserData((prevData) => ({
      ...prevData!,
      skill: value.split(",").map((item) => item.trim()), // Convert comma-separated string back to array
    }));
  };

  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  if (!userData) {
    return <div>Error occurred! Please re-sign in.</div>; // Display loading state while fetching data
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
              value={isEditing ? userData.skill?.join(", ") : userData.skill?.join(", ") || ""} // Display comma-separated list
              onChange={handleSkillChange} // Handle skill change
              disabled={!isEditing}
            />
          </div>

          {/* Editable Certification field */}
          <div>
            <label className="block text-sm font-medium">Certifications:</label>
            <Input
              name="certification"
              value={isEditing ? userData.certification?.join(", ") : userData.certification?.join(", ") || ""} // Display comma-separated list
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
