import { Button, Pagination, Popover, Rate, Select, Switch } from "antd";
import { useGetPageCV, useSearchByMaLoai } from "../../Hook/Api/useCongViec";
import { useState } from "react";
import cn from "classnames";
import { useData } from "../../constants/Context";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export const DanhSachCVTemplate = () => {
  const { data, setData } = useData();
  const [page, setPage] = useState<number>(1);
  const { data: pageCV } = useGetPageCV(page);
  const { data: resultSearch } = useSearchByMaLoai(data?.maChiTietCV as number);
  const navigate = useNavigate();
  console.log(data);

  return (
    <div>
      <div className="mx-10 mt-3 border-2 rounded-md p-5">
        <div>
          {data?.tenNhom ? (
            <div className="text-[20px]">
              <span className="font-[600]">For result</span>
              <span>: "{data.tenNhom}"</span>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div
          className={cn("flex justify-between ", {
            "mt-3": data?.tenNhom,
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
        {data?.tenNhom ? (
          <Button
            danger
            className="mt-3"
            onClick={() => {
              setData(null);
              localStorage.clear();
            }}
          >
            Reset
          </Button>
        ) : (
          <></>
        )}
      </div>

      <div className="grid 2xl:grid-cols-5 grid-cols-3 mx-10 my-10  ">
        {resultSearch
          ? resultSearch?.map((item) => {
              const { congViec } = item;
              return (
                <div
                  className="p-3 hover:p-0 mx-3 cursor-pointer"
                  key={item.id}
                  onClick={() => {
                    navigate(PATH.Detail, { state: congViec.id });
                  }}
                >
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
              <div
                className="p-3 hover:p-0 mx-3 cursor-pointer"
                key={item.id}
                onClick={() => {
                  navigate(PATH.Detail,{state:item.id});
                }}
              >
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
                  <Rate value={item.saoCongViec} disabled allowHalf count={1} />
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
            ))}
      </div>

      <Pagination
        align="center"
        defaultCurrent={1}
        total={50}
        onChange={(v) => {
          setPage(v);
        }}
      />
    </div>
  );
};
