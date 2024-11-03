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
  Select,
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

interface JobTypeCode {
  id: number;
  tenLoaiCongViec: string;
}

const JobManagement: React.FC = () => {
  const [jobs, setJobs] = useState<Datum[]>([]); // State to store the list of jobs
  const [totalRows, setTotalRows] = useState(0); // Total rows for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [keyword] = useState(""); // Search keyword
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Edit modal state
  const [form] = Form.useForm();
  const userToken = useSelector((state: RootState) => state.auth.token); // Token from Redux
  const userId = useSelector((state: RootState) => state.auth.user?.id); // get ID user from redux
  const [fileList, setFileList] = useState<Record<number, File | null>>({}); // Track file selection for each job
  const [editJobData, setEditJobData] = useState<Datum | null>(null); // Store job data for editing
  const [jobTypes, setJobTypes] = useState<JobTypeCode[]>([]);

    // Fetch job types
    useEffect(() => {
      axiosInstance
        .get("/api/loai-cong-viec")
        .then((response) => {
          setJobTypes(response.data.content);
        })
        .catch(() => {
          message.error("Failed to fetch job types");
        });
    }, []);

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
   // Handle search input and press enter
   const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1); // Reset to page 1 when starting a new search
    fetchJobs(1, value); // Fetch jobs with search keyword
  };

  useEffect(() => {
    fetchJobs(currentPage, searchKeyword);
  }, [currentPage, searchKeyword]);

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
      await axiosInstance.post("/api/cong-viec", values, {
        headers: {
          token: `${userToken}`, // Pass user token for authentication
        },
      });
      message.success("Job created successfully!");

      setIsModalVisible(false);
      form.resetFields();
      fetchJobs(currentPage, keyword); // Reload the table after creation
    } catch (error) {
      message.error("Failed to create job");
    }
  };

  // Handle job update (edit)
  const handleUpdate = async () => {
    if (editJobData) {
      try {
        // Update the job details
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

        setIsEditModalVisible(false); // Close the modal after update
        fetchJobs(currentPage, keyword); // Reload the jobs list
      } catch (error) {
        message.error("Failed to update job");
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

// Handle file selection and confirmation modal
const handleFileChange = (jobId: number, info: any) => {
  const file = info.file.originFileObj || info.file;

  if (file && file.size > 5 * 1024 * 1024) {
    message.error("File size must be smaller than 5MB");
    return;
  }

  setFileList((prev) => ({
    ...prev,
    [jobId]: file, // Store selected file for the specific job
  }));

  Modal.confirm({
    title: "Confirm Upload",
    content: `Are you sure you want to upload this image for Job ID: ${jobId}?`,
    okText: "Yes, upload it",
    cancelText: "Cancel",
    onOk: () => {
      uploadImage(jobId);
    },
  });
};

// Function to upload the image and directly update the table with the new image URL
const uploadImage = async (jobId: number) => {
  const file = fileList[jobId];
  if (!file) {
    message.error("Please try uploading again.");
    return;
  }

  const formData = new FormData();
  formData.append("formFile", file);

  try {
    const response = await axiosInstance.post(
      `/api/cong-viec/upload-hinh-cong-viec/${jobId}`,
      formData,
      {
        headers: {
          token: `${userToken}`, // User token for authentication
        },
      }
    );
    message.success(`Image uploaded successfully for Job ID: ${jobId}, please reload page to take effect.`);

    // Clear file selection after successful upload
    setFileList((prev) => ({ ...prev, [jobId]: null }));

    // Update the jobs data with the new image URL
    const newImage = response.data.hinhAnh;
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, hinhAnh: newImage } : job
      )
    );
  } catch (error: any) {
    const { statusCode, message: errorMessage } = error.response?.data || {};
    message.error(
      `Failed to upload image for Job ID: ${jobId}. Error: ${statusCode} - ${errorMessage}`
    );
  }
};


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
      render: (image: string, record: Datum) => (
        <div className="flex flex-col text-center">
          <img
            src={image || "/img/fiverr-brand-default.jpg"}
            alt="Job"
            className="h-40 w-60 bg-cover mb-3"
          />
          <Upload
            maxCount={1}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={(info) => handleFileChange(record.id, info)}
          >
            <Button icon={<UploadOutlined />}>Choose Image</Button>
          </Upload>
        </div>
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
    <div className="container mt-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Job Management</h1>

      <div className="flex flex-col mb-4 ml-4">
      <Button onClick={showModal} className="bg-blue-500 text-white w-min mb-3">
          Create Job
        </Button>
        <Input.Search
        placeholder="Search jobs by name"
        enterButton="Search"
        onSearch={handleSearch}
          style={{ maxWidth: 400 }}
        />

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
        <Form form={form} layout="vertical" onFinish={handleCreate} initialValues={{ nguoiTao: userId }}>
          <Form.Item label="Job Title" name="tenCongViec" rules={[{ required: true, message: 'Your job need a title' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="giaTien" rules={[{ required: true, message: 'Please input price!' }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Creator ID" name="nguoiTao">
            <InputNumber disabled={true} min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Rating" name="saoCongViec">
            <Rate allowClear />
          </Form.Item>
          <Form.Item label="Short Description" name="moTaNgan" rules={[{ required: true, message: 'Please input description!' }]}>
            <Input.TextArea rows={3} placeholder="Enter short description" />
          </Form.Item>
          <Form.Item label="Description" name="moTa" rules={[{ required: true, message: 'Please input description!' }]}>
            <Input.TextArea rows={5} placeholder="Enter full description" />
          </Form.Item>
          <Form.Item label="Job Type Detail Code" name="maChiTietLoaiCongViec" rules={[{ required: true, message: 'Please select a job type!' }]}>
            <Select>
              {jobTypes.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.tenLoaiCongViec}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Image URL" name="hinhAnh">
            <Input />
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
          <Form layout="vertical" initialValues={{ ...editJobData, nguoiTao: userId }}>
            <Form.Item label="Job Title" rules={[{ required: true, message: 'Title is needed!' }]}>
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
            <Form.Item label="Price" rules={[{ required: true, message: 'Please input description!' }]}>
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
            <Form.Item label="Creator ID">
              <InputNumber disabled={true} 
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
            <Form.Item label="Short Description" rules={[{ required: true, message: 'Please input description!' }]}>
              <Input.TextArea
                value={editJobData.moTaNgan}
                onChange={(e) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    moTaNgan: e.target.value,
                  }))
                }
                rows={3}
                placeholder="Enter short description"
              />
            </Form.Item>
            <Form.Item label="Description" rules={[{ required: true, message: 'Please input description!' }]}>
              <Input.TextArea
                value={editJobData.moTa}
                onChange={(e) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    moTa: e.target.value,
                  }))
                }
                rows={5}
                placeholder="Enter full description"
              />
            </Form.Item>
            <Form.Item label="Job Type Detail Code" rules={[{ required: true, message: 'Please input description!' }]}>
              <Select
                value={editJobData.maChiTietLoaiCongViec}
                onChange={(value) =>
                  setEditJobData((prev) => ({
                    ...prev!,
                    maChiTietLoaiCongViec: value,
                  }))
                }
              >
                {jobTypes.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.tenLoaiCongViec}
                  </Select.Option>
                ))}
              </Select>
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
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default JobManagement;
