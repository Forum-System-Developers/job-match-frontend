import React from "react";
import Image from "next/image";
import shape from "@/assets/images/shape/shape_02.svg";

const MapArea = () => {
  return (
    <div className="inner-banner-one position-relative pb-0">
      <div className="map-banner">
        <div className="gmap_canvas h-100 w-100">
          <iframe
            className="gmap_iframe h-100 w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.5354351473075!2d23.37673477586617!3d42.65000767116739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa86940322e46b%3A0x9dcf2a89d173b821!2sTelerik%20Academy!5e0!3m2!1sfr!2sbg!4v1733979383626!5m2!1sfr!2sbg"
            width="100%" // Use 100% for width
            height="100%" // Use 100% for height
            style={{ border: 0 }} // Use an object for style
            allowFullScreen // Use camelCase for attributes
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
    </div>
  );
};

export default MapArea;
