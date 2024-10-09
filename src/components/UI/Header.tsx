import {
  Button,
  Carousel,
  Dropdown,
  Input,
  MenuProps,
  Rate,
  Space,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useGetMenuCV, useSearchByName } from "../../Hook/Api/useCongViec";
import { sleep } from "../../utils/sleep";
import { useData } from "../../constants/Context";
import { PATH } from "../../constants";
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
  const location = useLocation();
  const check = location.pathname === "/";
  useEffect(() => {}, [check]);
  const { setData } = useData();
  const [valueSearch, setValueSearch] = useState<string>("");
  const { data: search } =
    valueSearch !== "" ? useSearchByName(valueSearch) : { data: undefined };
  const { data: menuCV } = useGetMenuCV();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="flex justify-around items-center h-[70px]">
        <div className="text-[30px] font-[700] flex gap-5 items-center">
          <p>
            fiverr<span className="text-green-600">.</span>
          </p>
          <div>
            <Input.Search
              className="pt-2"
              allowClear
              placeholder="Find your work"
              onChange={async (e) => {
                await sleep(1000);
                setValueSearch(e.target.value);
              }}
            />
            <div className="relative">
              <div
                className={cn(
                  "absolute bg-white w-[600px] rounded-md z-20 overflow-y-scroll ",
                  { "h-[500px]": search && search.length > 2 }
                )}
              >
                {search?.map((item) => (
                  <div className="p-3" key={item.id}>
                    <div className="flex gap-2 text-[15px] items-center font-[400]">
                      <img
                        src={item.congViec.hinhAnh}
                        alt=""
                        className="w-[100px] h-[100px]"
                      />
                      <div>
                        <p className="font-[600]">Nhóm: </p>
                        <p>
                          {item.tenLoaiCongViec}-{item.tenNhomChiTietLoai}-
                          {item.tenChiTietLoai}
                        </p>
                        <p className="font-[600]">Tên: </p>
                        <p>{item.congViec.tenCongViec}</p>
                        <p className="font-[600]">Mô tả: </p>
                        <p>{item.congViec.moTaNgan}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <p className="font-[600]">Đánh giá:</p>
                            <Rate
                              value={item.congViec.saoCongViec}
                              disabled
                              allowHalf
                            />
                          </div>
                          <p>Giá: {item.congViec.giaTien}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" sm:visible invisible flex items-center gap-10">
          <a href="#" className=" font-[600] text-[18px]" aria-current="page">
            Become a Seller
          </a>
          <a href="#" className=" font-[600] text-[18px]" aria-current="page">
            Sign In
          </a>

          <div>
            <Button className="border-green-600 text-green-600">John</Button>
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
      <div className="  border-y-2 py-3 px-10">
        <Carousel
          slidesToShow={9}
          draggable={true}
          slidesToScroll={5}
          dots={false}
          variableWidth
          adaptiveHeight
          arrows
          id="carouselHeader"
        >
          {menuCV?.map((item) => {
            const items: MenuProps["items"] = item.dsNhomChiTietLoai
              .flatMap((dsNhom) => [
                {
                  key: dsNhom.id,
                  label: (
                    <div className="text-[16px] font-[500] hover:no-underline">
                      {dsNhom.tenNhom}
                    </div>
                  ),
                  disabled: true,
                },
                dsNhom.dsChiTietLoai.flatMap((loai) => [
                  {
                    key: loai.id,
                    label: (
                      <div
                        onClick={() => {
                          setData({
                            maChiTietCV: loai.id,
                            tenChiTietCV: loai.tenChiTiet,
                            tenNhom: dsNhom.tenNhom,
                            tenLoai: item.tenLoaiCongViec,
                          });
                          localStorage.setItem(
                            "data",
                            JSON.stringify({
                              maChiTietCV: loai.id,
                              tenChiTietCV: loai.tenChiTiet,
                              tenNhom: dsNhom.tenNhom,
                              tenLoai: item.tenLoaiCongViec,
                            })
                          );
                          if (location.pathname !== "/DSCV") {
                            navigate(PATH.DSCV);
                          }
                        }}
                      >
                        {loai.tenChiTiet}
                      </div>
                    ),
                  },
                ]),
              ])
              .flat();

            return (
              <Dropdown
                menu={{ items }}
                className="mx-3 "
                key={item.id}
                trigger={["click"]}
              >
                <p className="text-[18px] font-[600] ">
                  {item.tenLoaiCongViec}
                </p>
              </Dropdown>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
