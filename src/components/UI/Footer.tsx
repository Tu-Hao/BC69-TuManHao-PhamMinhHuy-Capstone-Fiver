export const Footer = () => {
  return (
    <div>
      <div className="border-y-4 ">
        <div className="grid grid-cols-5 py-[30px] px-10">
          <div className="px-5">
            <h5 className="font-[600] text-[19px]">Categories</h5>
            <ul className="text-black/70 font-[500] ">
              <li>Graphics & Design</li>
              <li>Digital Marketing</li>
              <li>Writing & Translation</li>
              <li>Video & Animation</li>
              <li>Music & Audio</li>
              <li>Programming & Tech</li>
              <li>AI Services</li>
              <li>Consulting</li>
              <li>Data</li>
              <li>Business</li>
              <li>Personal Growth & Hobbies</li>
              <li>Photography</li>
              <li>Finance</li>
              <li>End-to-End Projects</li>
              <li>Service Catalog</li>
            </ul>
          </div>
          <div className="px-5">
            <h5 className="font-[600] text-[19px]">For Clients</h5>
            <ul className="text-black/70 font-[500]">
              <li>How Fiverr Works</li>
              <li>Customer Success Stories</li>
              <li>Trust & Safety</li>
              <li>Quality Guide</li>
              <li>
                Fiverr Learn <p className="text-black/40">Online Courses</p>
              </li>
              <li>Fiverr Guides</li>
              <li>Fiverr Answers</li>
            </ul>
          </div>
          <div className="px-5">
            <h5 className="font-[600] text-[19px]">For Freelancers</h5>
            <ul className="text-black/70 font-[500]">
              <li>Become a Fiverr Freelancer</li>
              <li>Become an Agency</li>
              <li>Kickstart</li>
              <li>Community Hub</li>
              <li>Forum</li>
              <li>Events</li>
            </ul>
          </div>
          <div className="px-5">
            <h5 className="font-[600] text-[19px]">Business Solutions</h5>
            <ul className="text-black/70 font-[500]">
              <li>Fiverr Pro</li>
              <li>Project Management Service</li>
              <li>
                ClearVoice <p className="text-black/40">Content Marketing</p>
              </li>
              <li>
                Working Not Working{" "}
                <p className="text-black/40">Creative Talent</p>
              </li>
              <li>
                AutoDS <p className="text-black/40">Dropshipping Tool</p>
              </li>
              <li>Fiverr Logo Maker</li>
              <li>Contact Sales</li>
            </ul>
          </div>
          <div className="px-5">
            <h5 className="font-[600] text-[19px]">Company</h5>
            <ul className="text-black/70 font-[500]">
              <li>About Fiverr</li>
              <li>Help & Support</li>
              <li>Social Impact</li>
              <li>Careers</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Partnerships</li>
              <li>Creator Network</li>
              <li>Affiliates</li>
              <li>Invite a Friend</li>
              <li>Press & News</li>
              <li>Investor Relations</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-black/70 mx-5">
        <div className="flex gap-4 items-center">
          <img src="/image/Fiverr_logo.png" alt="" className="h-[30px]" />
          <p className="text-black/50">© Fiverr International Ltd. 2024</p>
        </div>
        <div className="flex justify-evenly items-center gap-8">
          <i className="fa-brands fa-tiktok"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin-in" />
          <i className="fa-brands fa-facebook-f" />
          <i className="fa-brands fa-pinterest"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <div className="hover:bg-black/20 rounded-2xl px-3 py-2 ">
            <i className="fa-solid fa-globe !text-[15px]"> </i>
            <span className="text-[13px] font-[500]"> English</span>
          </div>
          <p className="text-[13px] font-[600] rounded-2xl px-3 py-2 hover:bg-black/20">
            US$ USD
          </p>
          <img src="/image/body_bl.png" alt="" className="w-[37px]" />
        </div>
      </div>
    </div>
  );
};
