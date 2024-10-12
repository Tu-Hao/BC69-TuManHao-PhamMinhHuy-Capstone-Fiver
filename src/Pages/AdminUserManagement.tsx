import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Pagination, message } from "antd";
import axiosInstance from "../constants/api";
import RegisterAdminModal from "../components/RegisterAdminModal";

// Define User interface
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1); // For pagination
  const [total, setTotal] = useState(0); // Total number of users
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null); // For editing

  // Fetch users with pagination
  const fetchUsers = (pageNumber: number) => {
    setLoading(true);
    axiosInstance
      .get(`/api/users?page=${pageNumber}`)
      .then((response) => {
        setUsers(response.data.content);
        setTotal(response.data.total); // Assuming total count is returned
      })
      .catch(() => {
        message.error("Error fetching users");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(page); // Load users on page load
  }, [page]);

  // Handle user deletion
  const handleDelete = (id: number) => {
    axiosInstance.delete(`/api/users/${id}`).then(() => {
      message.success("User deleted successfully");
      fetchUsers(page); // Refresh the table
    }).catch(() => {
      message.error("Error deleting user");
    });
  };

  // Handle user edit modal
  const handleEdit = (user: User) => {
    setEditUser(user); // Set the current user for editing
    Modal.confirm({
      title: `Edit ${user.name}`,
      content: (
        <div>
          <Input placeholder="Name" defaultValue={user.name} onChange={(e) => setEditUser({...editUser!, name: e.target.value})}/>
          <Input placeholder="Phone" defaultValue={user.phone} onChange={(e) => setEditUser({...editUser!, phone: e.target.value})}/>
          <Input placeholder="Birthday" defaultValue={user.birthday} onChange={(e) => setEditUser({...editUser!, birthday: e.target.value})}/>
          <Input placeholder="Gender" defaultValue={user.gender ? 'Male' : 'Female'} onChange={(e) => setEditUser({...editUser!, gender: e.target.value === 'Male'})}/>
          <Input placeholder="Role" defaultValue={user.role} onChange={(e) => setEditUser({...editUser!, role: e.target.value})}/>
          <Input placeholder="Skills" defaultValue={user.skill.join(", ")} onChange={(e) => setEditUser({...editUser!, skill: e.target.value.split(", ")})}/>
          <Input placeholder="Certifications" defaultValue={user.certification.join(", ")} onChange={(e) => setEditUser({...editUser!, certification: e.target.value.split(", ")})}/>
        </div>
      ),
      onOk() {
        if (editUser) {
          axiosInstance
            .put(`/api/users/${editUser.id}`, editUser)
            .then(() => {
              message.success("User updated successfully");
              fetchUsers(page);
            })
            .catch(() => {
              message.error("Error updating user");
            });
        }
      },
    });
  };

  // Columns for the table
  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Birthday", dataIndex: "birthday", key: "birthday" },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img
          src={avatar || "/img/user-default.jpg"}
          alt="Avatar"
          className="w-10 h-10 rounded"
        />
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: boolean) => (gender ? "Male" : "Female"),
    },
    { title: "Role", dataIndex: "role", key: "role" },
    {
        title: "Skills",
        dataIndex: "skill",
        key: "skill",
        render: (skills: string[]) => (
          <ul>
            {(skills || []).map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ),
      },
      {
        title: "Certifications",
        dataIndex: "certification",
        key: "certification",
        render: (certifications: string[]) => (
          <ul>
            {(certifications || []).map((certification, index) => (
              <li key={index}>{certification}</li>
            ))}
          </ul>
        ),
      },
      
    {
      title: "Actions",
      key: "actions",
      render: (text: string, user: User) => (
        <div>
          <Button onClick={() => handleEdit(user)}>Edit</Button>
          <Button danger onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 ">
      <h1>User Management</h1>
      <Button
        type="primary"
        onClick={() =>
          Modal.confirm({
            title: "Add New User",
            content: <RegisterAdminModal />, // Use the register modal for new user
            okText: "Add",
            onOk() {
              // Submit new user logic
            },
          })
        }
      >
        Add New User
      </Button>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={false}
        loading={loading}
      />

      {/* Pagination */}
      <Pagination
        current={page}
        total={total}
        pageSize={10}
        onChange={(pageNumber) => setPage(pageNumber)}
      />
    </div>
  );
};

export default AdminUserManagement;
