import React, { useState } from "react";
import { Modal, Input, Radio, Button, message } from "antd";
import axiosInstance from "../constants/api";

// Define the props for visibility control
interface RegisterAdminModalProps {
  visible: boolean;
  onCancel: () => void; // Function to close the modal
}

const RegisterAdminModal: React.FC<RegisterAdminModalProps> = ({ visible, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: "true", // Default gender to true (Male)
    role: "USER", // Default to user
  });

  const handleSubmit = () => {
    axiosInstance
      .post("/api/users", formData)
      .then(() => {
        message.success("User added successfully");
        onCancel(); // Close the modal after successful submission
      })
      .catch(() => {
        message.error("Error adding user");
      });
  };

  return (
    <Modal
      title="Add New User"
      visible={visible}
      onCancel={onCancel} // Allow the modal to close
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Add
        </Button>,
      ]}
    >
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        style={{ marginBottom: 10 }}
      />
            {/* Gender Radio Group */}
            <Radio.Group
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        style={{ marginBottom: 10 }}
      >
        <Radio value="true">Male</Radio>
        <Radio value="false">Female</Radio>
      </Radio.Group>
      <Input
        placeholder="Birthday"
        value={formData.birthday}
        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
        style={{ marginBottom: 10 }}
      />



      {/* Role Radio Group */}
      <Radio.Group
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <Radio value="USER">User</Radio>
        <Radio value="ADMIN">Admin</Radio>
      </Radio.Group>
    </Modal>
  );
};

export default RegisterAdminModal;
