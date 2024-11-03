import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Pagination, message, Radio } from "antd";
import axiosInstance from "../constants/api";
import RegisterAdminModal from "../components/RegisterAdminModal";
import { validateUserForm } from "../Validation/userValidations";

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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); // Store search keyword

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  // Fetch users with pagination and search
  const fetchUsers = (pageNumber: number, keyword: string = "") => {
    setLoading(true);
    axiosInstance
      .get(`/api/users/phan-trang-tim-kiem`, {
        params: {
          pageIndex: pageNumber,
          pageSize: 10, // Display 10 users per page
          keyword, // Pass the search keyword
        },
      })
      .then((response) => {
        const data = response.data;
        setUsers(data.content.data); // Set the users to display in the table
        setTotal(data.content.totalRow); // Set total number of users for pagination
      })
      .catch(() => {
        message.error("Error fetching users");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(page, searchKeyword); // Load users on page load and when page changes
  }, [page]);

  // Handle user deletion with confirmation
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        // Proceed to delete the user
        axiosInstance
          .delete(`/api/users`, {
            params: { id }, // Send id as query parameter
          })
          .then(() => {
            message.success("User deleted successfully");
            fetchUsers(page, searchKeyword); // Refresh the table
          })
          .catch(() => {
            message.error("Error deleting user");
          });
      },
    });
  };

  // Handle user edit
  const handleEdit = (user: User) => {
    setEditUser(user); // Set the current user for editing
    setIsEditModalVisible(true); // Open the modal for editing
  };

  // Handle closing the edit modal
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false); // Close the modal
    setEditUser(null); // Clear the selected user
  };

// Handle saving the user edits
const handleSaveEdit = () => {
  if (editUser) {
    // Run validation on editUser
    const validationErrors = validateUserForm(editUser);

    // Display specific error messages for each field if there are errors
    if (Object.keys(validationErrors).length > 0) {
      // Loop through each field with an error and show the message
      for (const [field, errorMessage] of Object.entries(validationErrors)) {
        message.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${errorMessage}`);
      }
      return; // Exit the function if there are validation errors
    }

    // Proceed with the API call if validation passes
    axiosInstance
      .put(`/api/users/${editUser.id}`, editUser, {
        params: { id: editUser.id }, // Pass the user id as a query parameter
      })
      .then(() => {
        message.success("User updated successfully");
        fetchUsers(page, searchKeyword); // Refresh the table
        setIsEditModalVisible(false); // Close the modal
      })
      .catch(() => {
        message.error("Error updating user");
      });
  }
};


  // Handle search input and press enter
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPage(1); // Reset to page 1 when starting a new search
    fetchUsers(1, value); // Fetch users with search keyword
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
      render: ( user: User) => (
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
      <h1 className="text-2xl font-semibold mb-6 text-center">User Management</h1>
      <Button onClick={showModal} className="bg-transparent text-lime-500 !border-lime-500 hover:!bg-lime-500 hover:!text-neutral-50">
        Add New User
      </Button>

      {/* Search Input */}
      <Input.Search
        placeholder="Search users by name"
        enterButton="Search"
        onSearch={handleSearch}
        style={{ marginBottom: 20, marginTop: 10 }}
      />

      {/* Pass the modal visibility control as props */}
      <RegisterAdminModal visible={isModalVisible} onCancel={hideModal} />

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

      {/* Edit User Modal */}
      <Modal
  title={`Edit ${editUser?.name}`}
  visible={isEditModalVisible}
  onCancel={handleEditModalCancel}
  onOk={handleSaveEdit}
>
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <label>Name</label>
    <Input
      placeholder="Name"
      value={editUser?.name}
      onChange={(e) => setEditUser((prev) => ({ ...prev!, name: e.target.value }))}
    />
    <label>Email</label>
    <Input
      placeholder="Email"
      value={editUser?.email}
      onChange={(e) => setEditUser((prev) => ({ ...prev!, email: e.target.value }))}
    />
    <label>Phone</label>
    <Input
      placeholder="Phone"
      value={editUser?.phone}
      onChange={(e) => setEditUser((prev) => ({ ...prev!, phone: e.target.value }))}
    />
    <label>Birthday</label>
    <Input
      placeholder="Birthday"
      value={editUser?.birthday}
      onChange={(e) => setEditUser((prev) => ({ ...prev!, birthday: e.target.value }))}
    />
    <label>Gender</label>
    <Radio.Group
      onChange={(e) => setEditUser((prev) => ({ ...prev!, gender: e.target.value === "true" }))}
      value={editUser?.gender ? "true" : "false"}
    >
      <Radio value="true">Male</Radio>
      <Radio value="false">Female</Radio>
    </Radio.Group>
    <label>Skills</label>
    <Input
      placeholder="Skills"
      value={editUser?.skill?.join(", ")}
      onChange={(e) =>
        setEditUser((prev) => ({ ...prev!, skill: e.target.value.split(", ") }))
      }
    />
    <label>Certifications</label>
    <Input
      placeholder="Certifications"
      value={editUser?.certification?.join(", ")}
      onChange={(e) =>
        setEditUser((prev) => ({ ...prev!, certification: e.target.value.split(", ") }))
      }
    />
    <label>Role</label>
    <Radio.Group
      onChange={(e) => setEditUser((prev) => ({ ...prev!, role: e.target.value }))}
      value={editUser?.role}
    >
      <Radio value="USER">USER</Radio>
      <Radio value="ADMIN">ADMIN</Radio>
    </Radio.Group>
  </div>
</Modal>
    </div>
  );
};

export default AdminUserManagement;
