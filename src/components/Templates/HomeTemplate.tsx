import { Carousel, Input, Modal, Rate } from "antd";
import {
  useGetDetailTypeCV,
  useGetTypeCV,
  useSearchByName,
} from "../../Hook/Api/useCongViec";
import ReactPlayer from "react-player";
import { sleep } from "../../utils/sleep";
import cn from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";
import { useData } from "../../constants/Context";

export const HomeTemplate = () => {
  const {  setData } = useData();
  const { data: listTypeCV } = useGetTypeCV();
  const { data: detailCV } = useGetDetailTypeCV();
  const [valueSearch, setValueSearch] = useState<string>("");
  const { data: resultSearch } = useSearchByName(valueSearch);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>();

  const navigate = useNavigate();

  return (
    <div className="mx-[100px] my-14 xl:mx-[150px] xl:my-20 2xl:mx-[252px] 2xl:my-20">
      <div className=" relative">
        <div className="flex justify-center ">
          <img src="/image/hero-lg-x1.png" alt="" className=" " />
        </div>
        <div className="w-[50%] left-[25%] top-[30%] 2xl:top-[20%] absolute flex flex-col items-center z-10 ">
          <p className=" text-center text-white font-[500] text-[30px]  2xl:text-[50px] 2xl:font-[700] xl:text-[45px] ">
            Find the right freelance service, right away
          </p>
          <div className="w-full my-2">
            <Input.Search
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
                  "absolute bg-white w-full rounded-md z-20 overflow-y-scroll ",
                  { "h-[500px]": resultSearch && resultSearch.length > 2 }
                )}
              >
                {resultSearch?.map((item) => (
                  <div
                    className=" cursor-pointer "
                    onClick={() => {
                      navigate(PATH.Detail, { state: item.id });
                    }}
                  >
                    <div className="flex gap-2 text-[15px] items-center my-3 hover:bg-slate-200">
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
                          <p className="font-[600]">
                            Đánh giá:
                            <Rate value={item.congViec.danhGia} disabled />
                          </p>
                          <p>Giá: {item.congViec.giaTien}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[15%,85%]">
            <p className="text-white font-[600] text-[20px]">Popular: </p>
            <div className="flex gap-1 truncate hover:overflow-x-scroll w-full text-white items-center">
              {listTypeCV?.map((item) => {
                return (
                  <p
                    className="px-2 whitespace-nowrap"
                    key={item.id}
                    onClick={() => {
                      navigate(PATH.DSCV);
                    }}
                  >
                    {item.tenLoaiCongViec}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[40px] font-[500]">Popular services</p>
        <Carousel
          slidesToShow={4}
          draggable={true}
          infinite={true}
          slidesToScroll={4}
          dots={false}
          autoplay={true}
          autoplaySpeed={4000}
        >
          {detailCV?.map((item) => {
            if (item.hinhAnh && item.dsChiTietLoai.length != 0) {
              return (
                <div key={item.id} className="p-3 ">
                  <div className="bg-green-600 px-3 py-2 rounded-md">
                    <div className="2xl:h-[150px] h-[125px] text-white ">
                      <p>{item.tenNhom}</p>
                      {item.dsChiTietLoai.map((item2) => (
                        <p
                          key={item2.id}
                          className="2xl:text-[20px] text-[16px] ps-3 font-medium hover:underline cursor-pointer"
                          onClick={() => {
                            setData({maChiTietCV:item2.id})
                            navigate(PATH.DSCV );
                          }}
                        >
                          {item2.tenChiTiet}
                        </p>
                      ))}
                    </div>
                    <img
                      src={item.hinhAnh}
                      alt=""
                      className="w-full xl:h-[200px] h-[150px]"
                    />
                  </div>
                </div>
              );
            }
          })}
        </Carousel>
      </div>

      <div>
        <p className="xl:text-[50px] text-[40px] xl:w-full w-[70%] mb-5 font-[600]">
          A whole world of freelance talent at your fingertips
        </p>
        <div className="grid grid-cols-4 gap-4 mb-3">
          <div className="flex flex-col">
            <i className="text-[30px] fa-brands fa-buromobelexperte"></i>
            <p className="text-[25px] xl:text-[30px] font-[600] h-[100px] pe-1">
              Over 700 categories
            </p>
            <p>
              Get results from skilled freelancers from all over the world, for
              every task, at any price point.
            </p>
          </div>
          <div className="flex flex-col">
            <i className="text-[30px] fa-solid fa-bolt"></i>
            <p className="text-[25px] xl:text-[30px] font-[600] h-[100px] pe-1">
              Clear, transparent pricing
            </p>
            <p>
              Pay per project or by the hour (Pro). Payments only get released
              when you approve.
            </p>
          </div>
          <div className="flex flex-col">
            <i className="text-[30px] fa-solid fa-handshake-simple"></i>
            <p className="text-[25px] xl:text-[30px] font-[600] h-[100px] pe-1">
              Quality work done faster
            </p>
            <p>
              Filter to find the right freelancers quickly and get great work
              delivered in no time, every time.
            </p>
          </div>
          <div className="flex flex-col">
            <i className="text-[30px] fa-regular fa-circle"></i>
            <p className="text-[25px] xl:text-[30px] font-[600] h-[100px] pe-1">
              24/7 award-winning support
            </p>
            <p>
              Chat with our team to get your questions answered or resolve any
              issues with your orders.
            </p>
          </div>
        </div>
        <ReactPlayer
          url="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9"
          controls={true}
          width="100%"
          height={"100%"}
        />
      </div>

      <div className="bg-green-800 p-16 rounded-2xl grid grid-cols-[60%,40%] text-white mt-5 items-center">
        <div>
          <p className="text-[30px] ">
            <span className="font-[700] pe-1 ">fiverr</span>pro.
          </p>
          <p className="text-[40px] mt-5">
            New e-Commerce project management service
            <span className="font-[700]">made for your business</span>
          </p>
          <p className="font-[600] mt-7">
            An experienced e-Commerce project manager will plan, coordinate, and
            execute your project. Overseeing a team of e-Commerce experts,
            they'll handle everything from site building, design and content to
            optimization, marketing strategies, and UGC videos.
          </p>
          <p className="my-5">To get started, you should have:</p>
          <ul className="list-disc ps-10">
            <li>An e-Commerce project requiring expertise in various fields</li>
            <li>A budget exceeding $1000</li>
            <li>A desire to get things done, without the hassle</li>
          </ul>
          <button className="border-1 rounded-md   font-[500] mt-5 bg-yellow-500 px-3 py-2">
            <a href="https://pro.fiverr.com/categories/programming-tech/buy/website-development/e-commerce?source=LOHP_business_banner&expert_listings=true">
              Get started
            </a>
          </button>
        </div>
        <img src="/image/X1.png" alt="" />
      </div>

      <div>
        <p className="text-[40px] my-5">What they're saying about Fiverr</p>
        <Carousel
          draggable={true}
          infinite={true}
          slidesToScroll={1}
          dots={false}
          autoplaySpeed={4000}
        >
          <div>
            <div className="grid grid-cols-[40%,60%] gap-5 items-start">
              <button
                onClick={() => {
                  setIsOpenModal(true);
                  setUrl(
                    "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl"
                  );
                }}
              >
                <img
                  className="relative"
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg"
                  alt=""
                />
                <i className="fa-solid fa-play absolute top-[40%] text-[50px]  text-black/60"></i>
              </button>
              <div className="">
                <div className="flex items-center">
                  <p className="text-[20px]">
                    Caitlin Tormey, Chief Commercial OfficerCompany
                  </p>
                  <p className="px-2">|</p>
                  <img src="/image/n.png" alt="" className="w-[100px] " />
                </div>

                <p className="text-[25px] mt-3 pe-1 font-serif italic">
                  "We've used Fiverr for Shopify web development, graphic
                  design, and backend web development. Working with Fiverr makes
                  my job a little easier every day."
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[40%,60%] gap-5 items-start">
              <button
                onClick={() => {
                  setIsOpenModal(true);
                  setUrl(
                    "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9"
                  );
                }}
              >
                <img
                  className="relative"
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg"
                  alt=""
                />{" "}
                <i className="fa-solid fa-play absolute top-[40%] text-[50px]  text-black/60"></i>
              </button>
              <div className="">
                <div className="flex items-center">
                  <p className="text-[20px]">
                    Brighid Gannon (DNP, PMHNP-BC), Co-Founder
                  </p>
                  <p className="px-2"> |</p>
                  <img src="/image/l.png" alt="" className="w-[100px] " />
                </div>

                <p className="text-[25px] pe-3 mt-3 font-serif italic">
                  "We used Fiverr for SEO, our logo, website, copy, animated
                  videos — literally everything. It was like working with a
                  human right next to you versus being across the world."
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[40%,60%] gap-5 items-start">
              <button
                onClick={() => {
                  setIsOpenModal(true);
                  setUrl(
                    "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9"
                  );
                }}
              >
                <img
                  className="relative"
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg"
                  alt=""
                />
                <i className="fa-solid fa-play absolute top-[40%] text-[50px]  text-black/60"></i>
              </button>
              <div className="">
                <div className="flex items-center">
                  <p className="text-[20px]">Tim and Dan Joo, Co-Founders</p>
                  <p className="px-2"> |</p>
                  <img src="/image/h.png" alt="" className="w-[100px] " />
                </div>

                <p className="text-[25px] mt-3 pe-3 font-serif italic">
                  "When you want to create a business bigger than yourself, you
                  need a lot of help. That's what Fiverr does."
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[40%,60%] gap-2 items-start">
              <button
                onClick={() => {
                  setIsOpenModal(true);
                  setUrl(
                    "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9"
                  );
                }}
              >
                <img
                  className="relative"
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg"
                  alt=""
                />
                <i className="fa-solid fa-play absolute top-[40%] text-[50px]  text-black/60"></i>
              </button>
              <div className="">
                <div className="flex items-center">
                  <p className="text-[20px]">Kay Kim, Co-Founder</p>
                  <p className="px-2"> |</p>
                  <img src="/image/r.png" alt="" className="w-[100px] " />
                </div>

                <p className="text-[25px] mt-3 pe-2 font-serif italic">
                  "It's extremely exciting that Fiverr has freelancers from all
                  over the world — it broadens the talent pool. One of the best
                  things about Fiverr is that while we're sleeping, someone's
                  working."
                </p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      <div>
        <p className="my-5 text-[50px]">Explore the marketplace</p>
        <div className="flex justify-evenly 2xl:justify-start items-center flex-wrap [100px] px-[50px] 2xl:px-[0px] gap-x-2 gap-y-5 h-[400px]">
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/programming-tech.png"
              alt=""
              className="w-[55px]  h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Programming & Tech</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/ai-services.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">AI & services</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/business.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Business</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/consulting.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Conssulting</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/digital-marketing.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Digital & Marketing</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/graphics-design.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Graphic & Design</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/music-audio.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Music & Audio</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/video-animation.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Video & Animatioin</p>
          </div>
          <div
            className="w-[160px] flex flex-col items-center cursor-pointer"
            onClick={() => {
              navigate(PATH.DSCV);
            }}
          >
            <img
              src="/image/writing-translation.png"
              alt=""
              className="w-[55px] h-[60px] border-b-4 pb-2"
            />
            <p className="mt-2 ">Writting & Translation</p>
          </div>
        </div>
      </div>

      <Modal
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
        }}
        width={1000}
      >
        <ReactPlayer
          url={url}
          width={"100%"}
          height={500}
          controls={true}
          playing={isOpenModal}
          muted={!isOpenModal}
        />
      </Modal>
    </div>
  );
};
