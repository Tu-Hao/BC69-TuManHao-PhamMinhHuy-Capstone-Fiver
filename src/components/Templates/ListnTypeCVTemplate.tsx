import { Carousel, Modal } from "antd";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useGetMenuCV } from "../../Hook/Api/useCongViec";
import { useData } from "../../constants/Context";
import { PATH } from "../../constants";
import { useNavigate } from "react-router-dom";

export const ListnTypeCVTemplate = () => {
  const [open, setOpen] = useState(false);
  const { data: menuCV } = useGetMenuCV();
  const { setData } = useData();
  const navigate = useNavigate();
  const style =
    "hover:underline cursor-pointer bg-[#74767e] text-[14px] font-[600] rounded-2xl py-1 px-3 opacity-85";

  return (
    <div className=" mx-10">
      <div className="bg-[url('/image/G_D.jpg')] bg-cover h-[250px] mt-3 flex flex-col justify-center items-center text-white ">
        <p className="text-[30px] font-[600]">Graphics & Design</p>
        <p className="text-[20px] my-1">Designs to make you stand out.</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className=" flex items-center gap-2 px-3 py-1 rounded-lg mt-2 text-white border-1 border-white text-[18px] font-[600] hover:bg-white  hover:text-black border"
        >
          <i className="fa-solid fa-circle-play "></i>
          <p>How Fiverr Works</p>
        </button>
      </div>

      <div className="relative  mt-3">
        <div className="flex justify-between ">
          <p className="text-[20px] font-[600]">
            Most popular in Graphics & Design
          </p>
        </div>
        <Carousel
          slidesToShow={4}
          slidesToScroll={4}
          adaptiveHeight
          variableWidth
          arrows
          infinite={false}
          id="carouselLNT"
        >
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/Minimalist Logo Design.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">Minimalist Logo Design</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/Illustration.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">Illustration</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/Website Design.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">Website Design</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/Architecture _ Interior Design.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">
              Architecture & Interior Design
            </p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img src="/image/LNT/AI Artists.png" alt="" className="w-[70px]" />
            <p className="text-[20px] font-[600]">AI Artists</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/Image Editing.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">Image Editing</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/T-Shirts _ Merchandise.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">T-Shirts & Merchandise</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/Industrial _ Product Design.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">
              Industrial & Product Design
            </p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="!flex items-center gap-1 me-2">
            <img
              src="/image/LNT/Social Media Design.png"
              alt=""
              className="w-[70px]"
            />
            <p className="text-[20px] font-[600]">Social Media Design</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </Carousel>
      </div>

      <div className="grid grid-cols-4 2xl:grid-cols-6 ">
        {menuCV?.map((item) => {
          return item.dsNhomChiTietLoai.map((item1) => {
            return (
              <div className="p-2 drop-shadow-xl " key={item1.id}>
                {item1.hinhAnh && (
                  <img
                    src={item1.hinhAnh}
                    alt="????"
                    className="w-full h-[200px] rounded-lg"
                  />
                )}
                <p className="font-[600] my-3">{item1.tenNhom}</p>
                <div>
                  {item1.dsChiTietLoai.map((item2) => (
                    <div key={item2.id}>
                      <p
                        className="text-[15px] cursor-pointer hover:underline"
                        onClick={() => {
                          setData({
                            maChiTietCV: item2.id,
                      
                          });
                          localStorage.setItem(
                            "data",
                            JSON.stringify({
                              maChiTietCV: item2.id,
                     
                            })
                          );
                          navigate(PATH.DSCV);
                        }}
                      >
                        {item2.tenChiTiet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          });
        })}
      </div>

      <div className="my-3">
        <p className="text-center text-[30px] font-[600] my-3">
          You might be interested in Graphics & Design
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <p className={style}>Background Removal</p>
          <p className={style}>Thumbnails Design</p>
          <p className={style}>Book Cover Design</p>
          <p className={style}>Minimalist Logo Design</p>
          <p className={style}>Twitch Overlay Design</p>
          <p className={style}>3D Modeling & Rendering</p>
          <p className={style}>Midjourney Artists</p>
          <p className={style}>Children Illustrations</p>
          <p className={style}>Watercolor Logo Design</p>
          <p className={style}>2D Drawings & Floor Plans</p>
          <p className={style}>3D Rendering & Modeling</p>
          <p className={style}>Pattern Making & Fashion</p>
          <p className={style}>Character Design</p>
          <p className={style}>Custom Emotes & Badges</p>
          <p className={style}>Rapid Prototyping</p>
          <p className={style}>Pixel Art Illustration</p>
          <p className={style}>3D Logo Design</p>
          <p className={style}>Label Design</p>
          <p className={style}>Technical Drawing</p>
          <p className={style}>Portraits Retouching</p>
        </div>
      </div>

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        closable={false}
        footer
      >
        <ReactPlayer
          url="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/0e7e8378f90eddda63a8953a16bb68fa-1705932024206/How%20Fiverr%20Works%20EN%20Subs%2016x9"
          controls={true}
          playing
          width="100%"
          height="100%"
        />
      </Modal>
    </div>
  );
};
