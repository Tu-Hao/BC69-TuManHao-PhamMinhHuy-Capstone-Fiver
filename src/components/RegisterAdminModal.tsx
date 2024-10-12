import React, { useState } from 'react';
import { Modal, Input, Radio, Button, message } from 'antd';
import axiosInstance from '../constants/api';

const RegisterAdminModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user', // Default to user
    // Add other fields
  });

  const handleSubmit = () => {
    axiosInstance.post('/api/users', formData).then(() => {
      message.success('User added successfully');
    });
  };

  return (
    <Modal title="Add New User" visible={true} footer={null}>
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Radio.Group
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <Radio value="user">User</Radio>
        <Radio value="admin">Admin</Radio>
      </Radio.Group>
      {/* Add more fields as needed */}
      <Button type="primary" onClick={handleSubmit}>
        Add
      </Button>
    </Modal>
  );
};

export default RegisterAdminModal;
