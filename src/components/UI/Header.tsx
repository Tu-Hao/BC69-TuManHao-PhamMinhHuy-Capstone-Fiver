import { Avatar, Button, Dropdown, MenuProps, Popover, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a href="#" className=" font-[600] text-[18px]" aria-current="page">
        Become a Seller
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a href="#" className=" font-[600] text-[18px]" aria-current="page">
        Sign In
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a href="#" className=" font-[600] text-[18px]" aria-current="page">
        John{" "}
      </a>
    ),
    disabled: true,
  },
];

export const Header = () => {
  const user = undefined;
  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="flex justify-around items-center h-[70px]">
        <div className="text-[30px] font-[700]">
          fiverr<span className="text-green-600">.</span>
        </div>
        <div className=" sm:visible invisible flex items-center gap-10">
          <a href="#" className=" font-[600] text-[18px]" aria-current="page">
            Become a Seller
          </a>
          <a href="#" className=" font-[600] text-[18px]" aria-current="page">
            Sign In
          </a>
          {/* chỗ này chưa tạo biến user đúng kiểu nên hơi đỏ */}
          {/* {user ? (
            <div className="flex items-center gap-4">
              <p>Hi, {user?.hoTen}</p>
              <Popover
                content={
                  <div className="flex flex-col p-[12px]">
                    <div>
                      <p className="cursor-pointer hover:text-red-700 text-[20px] mb-5">
                        Thông tin cá nhân
                      </p>
                    </div>
                    <div>
                      <Button className="w-full">Đăng xuất</Button>
                    </div>
                  </div>
                }
              >
                <Avatar
                  size={"large"}
                  className="bg-[#87d068] text-center"
                  icon={<i className="fa-regular fa-user p-0"></i>}
                />
              </Popover>
            </div>
          ) : (
          )} */}
            <div>
              <Button type="primary">John</Button>
            </div>
        </div>
        <div className="sm:hidden block">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <i className="fa-solid fa-bars"></i>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
