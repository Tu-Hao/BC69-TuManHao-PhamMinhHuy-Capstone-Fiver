import {
  Avatar,
  Breadcrumb,
  Collapse,
  List,
  Rate,
  Select,
  Slider,
  Tabs,
} from "antd";
import { useLocation } from "react-router-dom";
import { useGetCommentCV, useGetDetailUserById } from "../../Hook/Api/useUser";
import { useGetDetailCV } from "../../Hook/Api/useCongViec";
import { useState } from "react";
import dayjs from "dayjs";

export const DetailCVTemplate = () => {
  const { state } = useLocation();
  const { data: detail } = useGetDetailCV(state);
  const { data: user } = useGetDetailUserById(detail?.congViec.id as number);
  const { data: comment } = useGetCommentCV(state);
  const [check, setCheck] = useState(false);
  const [mes,setmes] =useState<string>()

  return (
    <div className="mx-10">
      <Breadcrumb
        items={[
          {
            title: <p>{detail?.tenLoaiCongViec}</p>,
          },
          {
            title: <p>{detail?.tenNhomChiTietLoai}</p>,
          },
          {
            title: <p className="font-[600]">{detail?.tenChiTietLoai}</p>,
          },
        ]}
        className="text-[20px]"
      />
      <div className=" grid grid-cols-[60%,40%]">
        <div className="mt-5">
          <img src={detail?.congViec.hinhAnh} alt="" className="w-full" />
          <div>
            <p className="text-[25px] font-[500] my-4">About This Gig</p>
            <p className="bg-yellow-300 inline-block font-[500]">
              Top Rated Sekker with all position reviews
            </p>
            <p className="my-3">Hello, Good Day, and welcome to my gig :)</p>
            <p>
              I'm Sajid and I specialize in minimalist logos, I'm working on
              Fiverr since 2015 and successfully completed 7500+ projects to
              date.
            </p>
            <p className="font-[500] my-3">WHAT I OFFER:</p>
            <p>{detail?.congViec.moTaNgan}</p>
            <p className="font-[500] my-3">Thinks I offer</p>
            <p>{detail?.congViec.moTa}</p>
            <p className="bg-yellow-300 inline-block font-[700] my-4">
              I will do the work until you are satisfled with fast and
              responsive communication.
            </p>
            <hr className="h-[3px] bg-slate-300" />
            <div className="flex gap-5">
              <div>
                <p className="text-gray-400">Programming Language</p>
                <p>PHP</p>
              </div>
              <div>
                <p className="text-gray-400">Expertise</p>
                <p>Cross Browser</p>
                <p>Compatibility</p>
                <p>PSD to HTML, Performance</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[20px] font-[700] my-3">About The Seller</p>
            <div className="flex items-center gap-5">
              <Avatar size={150} src={user?.avatar} />
              <div className="flex flex-col gap-1">
                <p className="font-[700]">{user?.name}</p>
                <p>{user?.skill}</p>
                <div>
                  <Rate
                    value={detail?.congViec.saoCongViec}
                    disabled
                    allowHalf
                  />
                  <span>({detail?.congViec.danhGia})</span>
                </div>
                <button className="border-2 border-black py-1 mt-4 rounded-md">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>FAQ</p>
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Which details do I submit to start the project?",
                  children: (
                    <p>
                      Once you hit the ORDER NOW button then you'll get a
                      questionnaire, submit the details as precisely as
                      possible, so I can better understand and deliver you
                      better results.
                    </p>
                  ),
                },
                {
                  key: "2",
                  label:
                    "What exactly will I get from the Basic (Essential) package?",
                  children: (
                    <p>
                      You'll get ONE minimalist logo concept with 3 revisions,
                      once the logo is finalized then you'll get (web and print)
                      files in color/black/white versions, complete logo, and
                      icon separately.
                    </p>
                  ),
                },
                {
                  key: "3",
                  label:
                    "What exactly will I get from the Standard (Professional) package?",
                  children: (
                    <p>
                      You'll get TWO minimalist logo concepts with 5 revisions,
                      once the logo is finalized from 2 given concepts then
                      you'll get (web and print) files in color/black/white
                      versions, a complete logo, an icon separately, and an
                      additional social media kit.
                    </p>
                  ),
                },
                {
                  key: "4",
                  label:
                    "What exactly will I get from the premium (Enterprise) package?",
                  children: (
                    <p>
                      You'll get THREE minimalist logo concepts with 7
                      revisions, once the logo is finalized from 3 given
                      concepts then you'll get (web and print) files in
                      color/black/white versions, a complete logo, an icon
                      separately, and an additional social media kit.
                    </p>
                  ),
                },
                {
                  key: "5",
                  label: "Is there any quality difference in the 3 packages?",
                  children: (
                    <p>
                      The quality of work is the same in all the packages, there
                      is the only difference in the concepts/revisions/file
                      formats. Recommended packages are standard/premium so you
                      have multiple concepts to finalize the desiring minimalist
                      logo concept.
                    </p>
                  ),
                },
                {
                  key: "6",
                  label: "How does revision works?",
                  children: (
                    <p>
                      You can ask for minor shape adjustments, color options,
                      and font options in the revisions. Major or complete
                      changings in the given concept will not consider as
                      revision and it'll cost extra as a new concept.
                    </p>
                  ),
                },
                {
                  key: "7",
                  label: "How can I get copyright?",
                  children: (
                    <p>
                      On the final delivery, the copyrights will automatically
                      be transferred to the buyer.
                    </p>
                  ),
                },
                {
                  key: "8",
                  label: "What includes in Social Media Kit?",
                  children: (
                    <p>
                      In the social media kit, I provide a profile and cover
                      photo with the logo for (FaceBook, Twitter, LinkedIn,
                      Pinterest, Instagram, and Youtube). The client can ask for
                      any alternative platform.
                    </p>
                  ),
                },
                {
                  key: "9",
                  label: "What includes in Stationary Designs?",
                  children: (
                    <p>
                      I'm providing, Single or double-sided Business/name cards,
                      Letterhead, Envelope with print-ready files.
                    </p>
                  ),
                },
                {
                  key: "10",
                  label: "What includes in the Logo Guide Sheet?",
                  children: (
                    <p>
                      In the Logo Guide Sheet, you'll get a process of correctly
                      constructing a minimalist logo with exact proportions, a
                      symbol with clear/safe spacing, color codes/color options,
                      and typography details.
                    </p>
                  ),
                },
              ]}
              defaultActiveKey={["1"]}
            />
          </div>
          <div>
            <div className="flex items-center mt-3 gap-2">
              <p className="text-[20px] ">
                {comment?.length} <span className="font-[600]">Reviews</span>
              </p>
              <Rate
                value={
                  (comment?.reduce((accumulator, product) => {
                    return accumulator + product.saoBinhLuan;
                  }, 0) as number) / (comment?.length as number)
                }
                disabled
                allowHalf
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-[20%,70%,10%]">
                <p>5 Sao</p>
                <Slider
                  className="w-full"
                  min={1}
                  max={comment?.length}
                  value={
                    comment?.filter((item) => item.saoBinhLuan == 5).length
                  }
                />
                <p>
                  ({comment?.filter((item) => item.saoBinhLuan == 5).length})
                </p>
                <p>4 Sao</p>
                <Slider
                  className="w-full"
                  min={1}
                  max={comment?.length}
                  value={
                    comment?.filter((item) => item.saoBinhLuan == 4).length
                  }
                />
                <p>
                  ({comment?.filter((item) => item.saoBinhLuan == 4).length})
                </p>
                <p>3 Sao</p>
                <Slider
                  className="w-full"
                  min={1}
                  max={comment?.length}
                  value={
                    comment?.filter((item) => item.saoBinhLuan == 3).length
                  }
                />
                <p>
                  ({comment?.filter((item) => item.saoBinhLuan == 3).length})
                </p>
                <p>2 Sao</p>
                <Slider
                  className="w-full"
                  min={1}
                  max={comment?.length}
                  value={
                    comment?.filter((item) => item.saoBinhLuan == 2).length
                  }
                />
                <p>
                  ({comment?.filter((item) => item.saoBinhLuan == 2).length})
                </p>
                <p>1 Sao</p>
                <Slider
                  className="w-full"
                  min={1}
                  max={comment?.length}
                  value={
                    comment?.filter((item) => item.saoBinhLuan == 1).length
                  }
                />
                <p>
                  ({comment?.filter((item) => item.saoBinhLuan == 1).length})
                </p>
              </div>
              <div>
                <p>Rating BreackDown</p>
                <div className="h-[150px] overflow-scroll ">
                  {comment
                    ?.filter((item) => item.saoBinhLuan == 5)
                    .map((bl) => (
                      <div className="grid grid-cols-[80%,20%] my-2">
                        <p>{bl.noiDung}</p>
                        <Rate
                          value={bl.saoBinhLuan}
                          disabled
                          allowHalf
                          count={1}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>Filter</p>
            <div className="flex gap-1 items-center">
              <p>Industry</p>
              <span>
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </span>
            </div>
            <div className="h-[500px] overflow-scroll">
              {comment?.map((item) => (
                <div className="my-5">
                  <div className="flex items-center gap-3">
                    <Avatar size={30} src={item.avatar} />
                    <div className="flex items-center">
                      <p>{item.tenNguoiBinhLuan}</p>
                      <Rate
                        value={item.saoBinhLuan}
                        disabled
                        allowHalf
                        count={1}
                        className="text-[14px]"
                      />
                      <span className="text-yellow-400 text-[12px">
                        {item.saoBinhLuan}
                      </span>
                    </div>
                  </div>
                  <div className="ms-11">
                    <p>{item.noiDung}</p>
                    <p className="text-[12px]">
                      {dayjs(item.ngayBinhLuan).format("DD/MM/YYYY hh:mm")}
                    </p>
                    <div className="flex items-center gap-2 text-[14px] font-[600] mt-2">
                      <Rate
                        character={<i className="fa-regular fa-thumbs-up"></i>}
                        count={1}
                      />
                      <p>Helpful</p>
                      <Rate
                        character={<i className="fa-regular fa-thumbs-up "></i>}
                        count={1}
                      />
                      <p>Not Helpful</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ngay đây cần làm đăng nhập để nó có user của người đang dùng  */}
          {/* thay vao đầy  {biến kiểm tra ? } để kiểm tra đăng nhâp  để in ra nội dung bên dưới còn không thì trả về <></>*/}
          <div className="flex gap-3">
            <Avatar size={40} />
            <div className="text-end w-full">
              <textarea
                className="w-full border-[2px]"
                placeholder="Add your comment"
                onChange={(v)=>{
                setmes(v.target.value)
                }}
              ></textarea>
              <button className=" bg-blue-700 text-white px-3 py-1 rounded-md" onClick={()=>{
              // tạo api call để add bình luận có sẵn value của tin nhắn là mes r chỉ thêm các kiểu còn lại rồi post
              }}>Send</button>
            </div>
          </div>
        </div>
        <div className=" p-5">
          <Tabs
            defaultActiveKey="1"
            centered={true}
            size="middle"
            className="border-2"
            items={[
              {
                key: "1",
                label: <p className="text-[20px] font-[600]">Basic</p>,
                children: (
                  <div className="px-5">
                    <div className="flex justify-between items-center font-[500] text-[20px] mb-5">
                      <p>Essential</p>
                      <p className="text-[25px]">US$75</p>
                    </div>
                    <p>1 Logo concept with essential web/print files.</p>
                    <div className="flex items-center gap-3 my-3 font-[500]">
                      <i className="fa-regular fa-clock"></i>
                      <p>2-day delivery</p>
                      <i className="fa-solid fa-rotate"></i>
                      <p>3 Revisions</p>
                    </div>
                    <List
                      itemLayout="horizontal"
                      dataSource={[
                        "1 concept included",
                        "Logo transparency",
                        "Vector file",
                        "rintable file",
                        "Include source file",
                        "tationery designs",
                        "Include social media kit",
                      ]}
                      renderItem={(item, index) => (
                        <List.Item>
                          {index < 5 ? (
                            <i className="fa-solid fa-check pe-2"></i>
                          ) : (
                            <i className="fa-solid fa-check pe-2 text-white/30"></i>
                          )}
                          {item}
                        </List.Item>
                      )}
                    />
                    <button className="text-center w-full bg-black text-white text-[25px] font-[500] rounded-md relative">
                      Continue
                      <i className="fa-solid fa-arrow-right absolute right-5 top-[20%] "></i>
                    </button>
                    <button className="w-full py-3">Compare packages</button>
                  </div>
                ),
              },
              {
                key: "2",
                label: <p className="text-[20px] font-[600]">Standard</p>,
                children: (
                  <div className="px-5">
                    <div className="flex justify-between items-center font-[500] text-[20px] mb-5">
                      <p>Essential</p>
                      <p className="text-[25px]">US$125</p>
                    </div>
                    <p>
                      2 initial Logo concepts, essential web/print files of
                      chosen concept & (social media kit)
                    </p>
                    <div className="flex items-center gap-3 my-3 font-[500]">
                      <i className="fa-regular fa-clock"></i>
                      <p>2-day delivery</p>
                      <i className="fa-solid fa-rotate"></i>
                      <p>5 Revisions</p>
                    </div>
                    <List
                      itemLayout="horizontal"
                      dataSource={[
                        "1 concept included",
                        "Logo transparency",
                        "Vector file",
                        "rintable file",
                        "Include source file",
                        "tationery designs",
                        "Include social media kit",
                      ]}
                      renderItem={(item, index) => (
                        <List.Item>
                          {index !== 5 ? (
                            <i className="fa-solid fa-check pe-2"></i>
                          ) : (
                            <i className="fa-solid fa-check pe-2 text-white/30"></i>
                          )}
                          {item}
                        </List.Item>
                      )}
                    />
                    <button className="text-center w-full bg-black text-white text-[25px] font-[500] rounded-md relative">
                      Continue
                      <i className="fa-solid fa-arrow-right absolute right-5 top-[20%] "></i>
                    </button>
                    <button className="w-full py-3">Compare packages</button>
                  </div>
                ),
              },
              {
                key: "3",
                label: <p className="text-[20px] font-[600]">Premium</p>,
                children: (
                  <div className="px-5">
                    <div className="flex justify-between items-center font-[500] text-[20px] mb-5">
                      <p>Essential</p>
                      <p className="text-[25px]">US$165</p>
                    </div>
                    <p>
                      3 initial Logo concepts, essential web/print files of
                      chosen concept (social media kit & stationery)
                    </p>
                    <div className="flex items-center gap-3 my-3 font-[500]">
                      <i className="fa-regular fa-clock"></i>
                      <p>2-day delivery</p>
                      <i className="fa-solid fa-rotate"></i>
                      <p>7 Revisions</p>
                    </div>
                    <List
                      itemLayout="horizontal"
                      dataSource={[
                        "1 concept included",
                        "Logo transparency",
                        "Vector file",
                        "rintable file",
                        "Include source file",
                        "tationery designs",
                        "Include social media kit",
                      ]}
                      renderItem={(item, index) => (
                        <List.Item>
                          <i className="fa-solid fa-check pe-2"></i>
                          {item}
                        </List.Item>
                      )}
                    />
                    <button className="text-center w-full bg-black text-white text-[25px] font-[500] rounded-md relative">
                      Continue
                      <i className="fa-solid fa-arrow-right absolute right-5 top-[20%] "></i>
                    </button>
                    <button className="w-full py-3">Compare packages</button>
                  </div>
                ),
              },
            ]}
          />
          <button className="w-full py-2 mt-3 rounded-md text-[20px] font-[600] border-2 border-black">
            Contact me
          </button>
        </div>
      </div>
    </div>
  );
};
