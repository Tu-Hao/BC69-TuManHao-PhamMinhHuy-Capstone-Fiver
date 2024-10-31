import React, { useState } from "react";
import { Modal, Input, Radio, Button, message, Form } from "antd";
import axiosInstance from "../constants/api";
import { validateEmail, validatePhone, validateRequired } from "../Validation/registerValidation";

interface RegisterAdminModalProps {
  visible: boolean;
  onCancel: () => void;
}

const RegisterAdminModal: React.FC<RegisterAdminModalProps> = ({ visible, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: "true",
    role: "USER",
  });

  const handleSubmit = () => {
    if (
      !validateRequired(formData.name, "Name") ||
      !validateEmail(formData.email) ||
      !validatePhone(formData.phone)
    ) return;

    axiosInstance
      .post("/api/users", formData)
      .then(() => {
        message.success("User added successfully");
        onCancel();
      })
      .catch(() => message.error("Error adding user"));
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <Modal
      title="Add New User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>Add</Button>,
      ]}
      centered
      bodyStyle={{ padding: "20px" }}
    >
      <Form layout="vertical">
        <Form.Item label="Name" required>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Phone" required>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Gender" required>
          <Radio.Group
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <Radio value="true">Male</Radio>
            <Radio value="false">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Birthday">
          <Input
            value={formData.birthday}
            onChange={(e) => handleInputChange("birthday", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Role" required>
          <Radio.Group
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
          >
            <Radio value="USER">User</Radio>
            <Radio value="ADMIN">Admin</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterAdminModal;
