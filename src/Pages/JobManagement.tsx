import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Table,
  message,
  Pagination,
  Modal,
  Form,
  InputNumber,
  Rate,
  Upload,
} from "antd";
import axiosInstance from "../constants/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UploadOutlined } from "@ant-design/icons"; // Import icon for upload button

// Interface for the job data response
interface Content {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  data: Datum[];
}

interface Datum {
  id: number;
  tenCongViec: string; // Job title
  danhGia: number; // Numbers of review
  giaTien: number; // Price
  nguoiTao: number; // Creator
  hinhAnh: string; // Picture (display as an image)
  moTa: string; // Descriptions
  maChiTietLoaiCongViec: number; // Job Type Detail Code
  moTaNgan: string; // Short descriptions
  saoCongViec: number; // Rating (display stars based on this value)
}

const JobManagement: React.FC = () => {
  const [jobs, setJobs] = useState<Datum[]>([]); // State to store the list of jobs
  const [totalRows, setTotalRows] = useState(0); // Total rows for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [keyword, setKeyword] = useState(""); // Search keyword
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Edit modal state
  const [form] = Form.useForm();
  const userToken = useSelector((state: RootState) => state.auth.token); // Token from Redux
  const [fileList, setFileList] = useState<File | null>(null); // For file upload
  const [editJobData, setEditJobData] = useState<Datum | null>(null); // Store job data for editing

  // Function to fetch jobs based on page number and keyword
  const fetchJobs = (pageNumber: number, keyword: string) => {
    setLoading(true);
    axiosInstance
      .get("/api/cong-viec/phan-trang-tim-kiem", {
        params: {
          pageIndex: pageNumber,
          pageSize: 10, // Display 10 jobs per page
          keyword,
        },
      })
      .then((response) => {
        const { data } = response.data.content as Content;
        setJobs(data);
        setTotalRows(response.data.content.totalRow); // Total rows for pagination
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to fetch jobs");
        setLoading(false);
      });
  };

  // Show modal for creating a new job
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false); // Hide edit modal
    form.resetFields(); // Reset form when the modal is closed
    setEditJobData(null); // Reset the edit job data
  };

  // Handle job creation
  const handleCreate = async (values: Datum) => {
    try {
      const response = await axiosInstance.post("/api/cong-viec", values, {
        headers: {
          token: `${userToken}`, // Pass user token for authentication
        },
      });
      const { id } = response.data; // Extract id from the response
      message.success("Job created successfully!");

      // If the user has selected a file, proceed with uploading the image
      if (fileList) {
        const formData = new FormData();
        formData.append("formFile", fileList);

        // Make another POST request to upload the image for the created job
        await axiosInstance.post(
          `/api/cong-viec/upload-hinh-cong-viec/${id}`,
          formData,
          {
            headers: {
              token: `${userToken}`, // Pass user token for authentication
            },
          }
        );
        message.success("Image uploaded successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
      setFileList(null); // Reset file upload
      fetchJobs(currentPage, keyword); // Reload the table after creation
    } catch (error) {
      message.error("Failed to create job or upload image");
    }
  };

// Handle job update (edit)
const handleUpdate = async () => {
  if (editJobData) {
    try {
      // Update the job details first
      await axiosInstance.put(
        `/api/cong-viec/${editJobData.id}`,
        editJobData,
        {
          headers: {
            token: `${userToken}`, // Pass user token for authentication
          },
        }
      );
      message.success("Job updated successfully");

      // If a file is selected, upload the new image
      if (fileList) {
        const formData = new FormData();
        formData.append("formFile", fileList);

        // Upload the image
        await axiosInstance.post(
          `/api/cong-viec/upload-hinh-cong-viec/${editJobData.id}`,
          formData,
          {
            headers: {
              token: `${userToken}`, // Pass user token for authentication
            },
          }
        );
        message.success("Image uploaded successfully");
      }

      setIsEditModalVisible(false); // Close the modal after update
      setFileList(null); // Reset file upload
      fetchJobs(currentPage, keyword); // Reload the jobs list
    } catch (error) {
      message.error("Failed to update job or upload image");
    }
  }
};


  // Handle edit job
  const handleEdit = (job: Datum) => {
    setEditJobData(job); // Set job data to pre-fill the modal fields
    setIsEditModalVisible(true); // Show the edit modal
  };

  // Handle delete job
  const handleDelete = (jobId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      content: "Once deleted, you will not be able to recover this job!",
      okText: "Yes, delete it",
      cancelText: "Cancel",
      onOk: () => {
        // Proceed with deletion after confirmation
        axiosInstance
          .delete(`/api/cong-viec/${jobId}`, {
            headers: {
              token: `${userToken}`, // Add user token for authentication
            },
          })
          .then(() => {
            message.success("Job deleted successfully");
            fetchJobs(currentPage, keyword); // Reload the jobs after deletion
          })
          .catch(() => {
            message.error("Failed to delete job");
          });
      },
      onCancel() {
        message.info("Job deletion cancelled");
      },
    });
  };

  // Fetch jobs on initial render and when keyword changes
  useEffect(() => {
    fetchJobs(currentPage, keyword);
  }, [currentPage, keyword]);

  // Handle file selection
  const handleFileChange = (info: any) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      const file = info.file.originFileObj;
      setFileList(file); // Set the selected file
    }
  };
  // API call to upload the image for the edited job
  // const handleEditImageUpload = async (formData: FormData, jobId: number) => {
  //   try {
  //     await axiosInstance.post(
  //       `/api/cong-viec/upload-hinh-cong-viec/${jobId}`,
  //       formData,
  //       {
  //         headers: {
  //           token: `${userToken}`, // Pass user token for authentication
  //         },
  //       }
  //     );
  //     message.success("Image uploaded successfully!");
  //   } catch (error) {
  //     message.error("Failed to upload image");
  //   }
  // };
  // Handle file selection for the edit modal
  // const handleEditFileChange = (info: any, jobId: number) => {
  //   if (info.file.status === "done" || info.file.status === "uploading") {
  //     const file = info.file.originFileObj;
  //     const formData = new FormData();
  //     formData.append("formFile", file); // Append selected file

  //     // Automatically call the API to upload the image
  //     handleEditImageUpload(formData, jobId);
  //   }
  // };

  // Table columns definition
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Job Title",
      dataIndex: "tenCongViec",
      key: "tenCongViec",
      render: (text: string) => <div style={{ maxWidth: 100 }}>{text}</div>,
    },
    {
      title: "Short Description",
      dataIndex: "moTaNgan",
      key: "moTaNgan",
      render: (text: string) => <div style={{ maxWidth: 250 }}>{text}</div>, // Allow longer descriptions
    },
    {
      title: "Description",
      dataIndex: "moTa",
      key: "moTa",
      render: (text: string) => <div style={{ maxWidth: 650 }}>{text}</div>, // Allow longer descriptions
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (price: number) => `${price.toLocaleString()} $`,
    },
    {
      title: "Rating",
      dataIndex: "saoCongViec",
      key: "saoCongViec",
      render: (rating: number) =>
        [...Array(rating)].map((_, i) => (
          <FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />
        )),
    },
    {
      title: "Creator",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (image: string) => (
        <img
          src={image || "/img/fiverr-brand-default.jpg"}
          alt="Job"
          className="w-20 h-20 object-cover"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Datum) => (
        <div className="space-x-2 flex flex-col">
          <Button
            className="bg-red-500 text-white ml-2"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
          <Button
            className="bg-yellow-500 text-white"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-6">Job Management</h1>

      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search job by name"
          onSearch={(value) => setKeyword(value)}
          style={{ maxWidth: 400 }}
        />
        <Button onClick={showModal} className="bg-blue-500 text-white">
          Create Job
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={jobs}
        rowKey="id"
        pagination={false}
        loading={loading}
      />

      <Pagination
        current={currentPage}
        total={totalRows}
        pageSize={10}
        onChange={(page) => setCurrentPage(page)}
        className="mt-4"
      />

      <Modal
        title="Create Job"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="create" type="primary" onClick={() => form.submit()}>
            Create
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item label="Job Title" name="tenCongViec">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="giaTien">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Creator" name="nguoiTao">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Rating" name="saoCongViec">
            <Rate allowClear />
          </Form.Item>
          <Form.Item label="Short Description" name="moTaNgan">
            <Input.TextArea rows={3} placeholder="Enter short description" />
          </Form.Item>
          <Form.Item label="Description" name="moTa">
            <Input.TextArea rows={5} placeholder="Enter full description" />
          </Form.Item>
          <Form.Item label="Job Type Detail Code" name="maChiTietLoaiCongViec">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Image URL" name="hinhAnh">
            <Input />
          </Form.Item>
          <Form.Item label="Upload Job Image" valuePropName="file">
            <Upload
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Job Modal */}
      <Modal
        title="Edit Job"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        {editJobData && (
          <Form layout="vertical">
            <Form.Item label="Job Title">
              <Input
                value={editJobData.tenCongViec}
                onChange={(e) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    tenCongViec: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item label="Price">
              <InputNumber
                value={editJobData.giaTien}
                onChange={(value) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    giaTien: Number(value),
                  }))
                }
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Creator">
              <InputNumber
                value={editJobData.nguoiTao}
                onChange={(value) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    nguoiTao: Number(value),
                  }))
                }
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Rating">
              <Rate
                value={editJobData.saoCongViec}
                onChange={(value) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    saoCongViec: value,
                  }))
                }
                allowClear
              />
            </Form.Item>
            <Form.Item label="Short Description">
              <Input.TextArea
                value={editJobData.moTaNgan}
                onChange={(e) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    moTaNgan: e.target.value,
                  }))
                }
                rows={3} placeholder="Enter short description"
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                value={editJobData.moTa}
                onChange={(e) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    moTa: e.target.value,
                  }))
                }
                rows={5} placeholder="Enter full description"
              />
            </Form.Item>
            <Form.Item label="Job Type Detail Code">
              <InputNumber
                value={editJobData.maChiTietLoaiCongViec}
                onChange={(value) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    maChiTietLoaiCongViec: Number(value),
                  }))
                }
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Image URL">
              <Input
                value={editJobData.hinhAnh}
                onChange={(e) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    hinhAnh: e.target.value,
                  }))
                }
              />
            </Form.Item>

            <Form.Item label="Or Upload Image">
  <Upload
    maxCount={1}
    beforeUpload={() => false} // Prevent auto-upload
    onChange={(info) => {
      const file = info.file.originFileObj as File | undefined; // Type assertion
      if (file) {
        setFileList(file); // Only set if file is valid
        // call my api post here
      } else {
        setFileList(null); // Handle the case where no file is selected
      }
    }}
  >
    <Button icon={<UploadOutlined />}>Select Image</Button>
  </Upload>
</Form.Item>


          </Form>
        )}
      </Modal>
    </div>
  );
};

export default JobManagement;

