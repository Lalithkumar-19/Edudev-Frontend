import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Video from "../assets/videopixel.mp4"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../Styles/Carousal.css";

// import required modules
import { Pagination, Navigation } from "swiper";

export default function Carousal() {
  const [screenwidth, setwidth] = useState(false);
  var onresize = function () {
    if (!(360 <= window.innerWidth <= 740)) {
      setwidth(true);
    }
    else {
      setwidth(false);
    }
  }

  window.addEventListener("resize", onresize);

  if (screenwidth) {
    return (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide> <video muted controls={false} ><source src={Video} type="video/mp4" /> </video> </SwiperSlide>
          <SwiperSlide><img src="/slide-pic-1.jpg" alt="rooling_pic" /></SwiperSlide>
          <SwiperSlide><img src="/slide-pic-2.jpg" alt="sec_pic" /></SwiperSlide>
          {/* <SwiperSlide><img src="https://watermark.lovepik.com/photo/40170/5268.jpg_wh1200.jpg" alt="third_pic" /></SwiperSlide> */}

        </Swiper>


      </>
    )
  }

  else {
    return (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}

          navigation={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {/* <SwiperSlide> <video   controls='false' autoPlay loop muted ><source src={Video} type="video/mp4" /> </video> </SwiperSlide> */}
          <SwiperSlide><img src="/slide-pic-1.jpg" alt="rooling_pic" /></SwiperSlide>
          <SwiperSlide><img src="/slide-pic-2.jpg" alt="sec_pic" /></SwiperSlide>
          {/* <SwiperSlide><img src="https://watermark.lovepik.com/photo/40170/5268.jpg_wh1200.jpg" alt="third_pic" /></SwiperSlide> */}

        </Swiper>

      </>
    )
  }

}



