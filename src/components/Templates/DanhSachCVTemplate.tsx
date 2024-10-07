import {
  Button,
  Carousel,
  Dropdown,
  MenuProps,
  Pagination,
  Popover,
  Rate,
  Select,
  Switch,
} from "antd";
import {
  useGetMenuCV,
  useGetPageCV,
  useSearchByMaLoai,
} from "../../Hook/Api/useCongViec";
import { useState } from "react";
import cn from "classnames";

export const DanhSachCVTemplate = () => {
  const { data: menuCV } = useGetMenuCV();

  const [maLoaiChiTiet, setMaLoaiChiTiet] = useState<number>(1);
  const [tenChiTietLoai, setTenChiTietLoai] = useState<string>();
  const [page, setPage] = useState<number>(1);
  
  const { data: pageCV } = useGetPageCV(page);
  const { data: resultSearch } = useSearchByMaLoai(maLoaiChiTiet);

  return (
    <div>
      <div className="  border-y-2 py-3 px-10">
        <Carousel
          slidesToShow={10}
          draggable={true}
          slidesToScroll={5}
          dots={false}
          variableWidth
          adaptiveHeight
          arrows
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
                          setMaLoaiChiTiet(loai.id);
                          setTenChiTietLoai(loai.tenChiTiet);
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

      <div className="mx-10 mt-3 border-2 rounded-md p-5">
        <div>
          {tenChiTietLoai ? (
            <div className="text-[20px]">
              <span className="font-[600]">For result</span>
              <span>: "{tenChiTietLoai}"</span>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div
          className={cn("flex justify-between ", {
            "mt-3": tenChiTietLoai,
          })}
        >
          <div>
            <Select
              defaultValue="Category"
              style={{ width: 120 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
            <Select
              defaultValue="SerVice Options"
              style={{ width: 120 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
            <Select
              defaultValue="Seller Details"
              style={{ width: 120 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
            <Select
              defaultValue="Budget"
              style={{ width: 120 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
            <Select
              defaultValue="Delivery Time"
              style={{ width: 120 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </div>
          <div className="flex items-center gap-1">
            <Switch defaultValue={false} />
            <span>Pro services</span>
            <Switch defaultValue={false} />
            <span>Local sellers</span>
            <Switch defaultValue={false} />
            <span>Online Sellers</span>
          </div>
        </div>
        {tenChiTietLoai ? (
          <Button
            danger
            className="mt-3"
            onClick={() => {
              setTenChiTietLoai(undefined);
              setMaLoaiChiTiet(1);
            }}
          >
            Reset
          </Button>
        ) : (
         <></>
        )}
      </div>

      <div className="grid grid-cols-5 mx-10 my-10  ">
        {resultSearch?.length != 0
          ? resultSearch?.map((item) => {
              const { congViec } = item;
              console.log(congViec);
              return (
                <div className="p-3" key={item.id}>
                  <img src={congViec.hinhAnh} alt="" className="w-full" />
                  <div className="h-[100px] ">
                      <p className=" text-wrap h-[50px] truncate">
                        <span className="font-[600]">Name: </span>
                        <Popover content={congViec.tenCongViec} title="Title">
                          {congViec.tenCongViec}
                        </Popover>
                      </p>
                      <p className=" text-wrap h-[50px] truncate">
                        <span className="font-[600]">Mô tả: </span>
                        <Popover content={congViec.moTaNgan} title="Title">
                          {congViec.moTaNgan}
                        </Popover>
                      </p>
                    </div>
                  <div className="flex items-center gap-1">
                      <Rate
                        value={congViec.saoCongViec}
                        disabled
                        allowHalf
                        count={1}
                      />
                      <p>{congViec.saoCongViec}</p>
                    </div>
                  <hr className="h-[3px] bg-black" />
                  <div
                      className="flex justify-between items-center mx-1"
                      id="like"
                    >
                      <Rate
                        character={<i className="fa-solid fa-heart"></i>}
                        count={1}
                        onChange={(e) => {
                          console.log(e);
                        }}
                        onFocus={() => {
                          console.log();
                        }}
                      />
                      <p>
                        <span className="font-[600]">STARTING AT: </span>$
                        {congViec.giaTien}
                      </p>
                    </div>
                </div>
              );
            })
          : pageCV?.data.map((item) => (
              <div key={item.id}>
                <div className="p-3">
                  <img src={item.hinhAnh} alt="" className="w-full" />
                  <div className="h-[100px] ">
                    <p className=" text-wrap h-[50px] truncate">
                      <span className="font-[600]">Name: </span>
                      <Popover content={item.tenCongViec} title="Title">
                        {item.tenCongViec}
                      </Popover>
                    </p>
                    <p className=" text-wrap h-[50px] truncate">
                      <span className="font-[600]">Mô tả: </span>
                      <Popover content={item.moTaNgan} title="Title">
                        {item.moTaNgan}
                      </Popover>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Rate
                      value={item.saoCongViec}
                      disabled
                      allowHalf
                      count={1}
                    />
                    <p>{item.saoCongViec}</p>
                  </div>
                  <hr className="h-[3px] my-2" />
                  <div
                    className="flex justify-between items-center mx-1"
                    id="like"
                  >
                    <Rate
                      character={<i className="fa-solid fa-heart"></i>}
                      count={1}
                    />
                    <p>
                      <span className="font-[600]">STARTING AT: </span>$
                      {item.giaTien}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <Pagination
        align="center"
        defaultCurrent={page}
        total={50}
        onChange={(v) => {
          setPage(v);
        }}
      />
    </div>
  );
};
