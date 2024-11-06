import React from "react";
import { Input, Radio, DatePicker, Select, Modal } from "antd";
import dayjs from "dayjs";

interface EditProfileProps {
  userData: any;
  skillsList: any[];
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenderChange: (e: any) => void;
  handleDateChange: (date: any, dateString: string | string[]) => void;
  handleSkillSelectChange: (selectedSkills: string[]) => void;
  handleCertificationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  userData,
  skillsList,
  isModalVisible,
  setIsModalVisible,
  handleInputChange,
  handleGenderChange,
  handleDateChange,
  handleSkillSelectChange,
  handleCertificationChange,
  handleSave,
}) => {
  return (
    <Modal
      title="Edit Profile"
      visible={isModalVisible}
      onOk={handleSave}
      onCancel={() => setIsModalVisible(false)}
      okText="Save"
      cancelText="Cancel"
    >
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <Input name="name" value={userData.name} onChange={handleInputChange} />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone:</label>
          <Input name="phone" value={userData.phone} onChange={handleInputChange} />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender:</label>
          <Radio.Group
            onChange={handleGenderChange}
            value={userData.gender ? "Male" : "Female"}
          >
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </div>

        <div>
          <label className="block text-sm font-medium">Birthday:</label>
          <DatePicker
            value={userData.birthday ? dayjs(userData.birthday) : undefined}
            onChange={handleDateChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Skills:</label>
          <Select
            mode="multiple"
            placeholder="Select skills"
            value={userData.skill}
            onChange={handleSkillSelectChange}
            style={{ width: "100%" }}
          >
            {skillsList.map((skill) => (
              <Select.Option key={skill.id} value={skill.tenSkill}>
                {skill.tenSkill}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium">Certifications:</label>
          <Input
            name="certification"
            value={userData.certification.join(", ")}
            onChange={handleCertificationChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Booking Jobs:</label>
          <Input name="bookingJob" value={userData.bookingJob.length} disabled />
        </div>

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
      </div>
    </Modal>
  );
};

export default EditProfile;