"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import video_bg from "@/assets/dashboard/images/video_post.jpg";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import icon from "@/assets/dashboard/images/icon/icon_16.svg";
import CountrySelect from "../candidate/country-select";
import CitySelect from "../candidate/city-select";
import StateSelect from "../candidate/state-select";
import DashboardHeader from "../candidate/dashboard-header";
import { useLogo } from "./hooks/useLogo";
import { useCurrentCompany } from "./hooks/useCurrentCompany";
import { updateCompany, uploadLogo } from "../../../../data/company-data";
import VideoPopup from "../../common/video-popup";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [youTubeURL, setYouTubeURL] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [city, setCity] = useState<{ value: string; label: string } | null>(
    null
  );

  const { company, isLoading: companyLoading } = useCurrentCompany();
  const { photoUrl, loading: photoLoading } = useLogo(company?.id || null);
  const isLoading = companyLoading || photoLoading;

  useEffect(() => {
    if (company) {
      setName(company.name || null);
      setEmail(company.email || null);
      setWebsite(company.website_url || null);
      setCity(
        company.city ? { value: company.city, label: company.city } : null
      );
      setAddress(company.address_line || null);
      setYouTubeURL(null);
      setPhoneNumber(company.phone_number || null);
      setDescription(company.description || null);
    }
  }, [company]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(file);

      uploadLogo(file);
    }
  };

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const updatedData = {
        name: name,
        address_line: address,
        city: city?.label as string,
        description: description,
        email: email,
        phone_number: phoneNumber,
        website_url: website,
        youtube_video_id: youTubeURL,
      };

      await updateCompany(updatedData);
      // window.location.reload();
    } catch (error) {
      throw new Error("Error updating profile:" + error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          <h2 className="main-title">Profile</h2>

          <div className="bg-white card-box border-20">
            <div className="user-avatar-setting d-flex align-items-center mb-30">
              <Image
                src={photoUrl || profile_icon_1}
                alt="avatar"
                className="lazy-img user-img"
                height={58}
                width={58}
                style={{
                  width: "10%",
                  height: "10%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <div className="upload-btn position-relative tran3s ms-4 me-3">
                Upload new photo
                <input
                  type="file"
                  id="uploadImg"
                  name="uploadImg"
                  placeholder=""
                  onChange={handleUpload}
                />
              </div>
            </div>
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="">Company Name*</label>
              <input
                type="text"
                placeholder="Company Name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Email*</label>
                  <input
                    type="email"
                    placeholder="your-company@email.com"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Website (not required)</label>
                  <input
                    type="text"
                    placeholder="http://your-website.com"
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Phone Number*</label>
                  <input
                    type="tel"
                    placeholder="+123 456 789"
                    value={phoneNumber || ""}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Youtube URL (not required)</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=example"
                    value={youTubeURL || ""}
                    onChange={(e) => setYouTubeURL(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="dash-input-wrapper">
              <label htmlFor="">About Company*</label>
              <textarea
                className="size-lg"
                placeholder="Tell us about your company...."
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="alert-text">
                Brief description of your company. URLs are hyperlinked.
              </div>
            </div>
          </div>
          {/* 
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="col-sm-6 d-flex">
              <div
                className="intro-video-post position-relative mt-20"
                style={{ backgroundImage: `url(${video_bg.src})` }}
              >
                <a
                  className="fancybox rounded-circle video-icon tran3s text-center"
                  onClick={() => setIsVideoOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-play"></i>
                </a>
                <a href="#" className="close">
                  <i className="bi bi-x"></i>
                </a>
              </div>
            </div>
          </div> */}

          <div className="bg-white card-box border-20 mt-40">
            <h4 className="dash-title-three">Address & Location</h4>
            <div className="row">
              <div className="col-12">
                <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">Address*</label>
                  <input
                    type="text"
                    placeholder="Cowrasta, Chandana, Gazipur Sadar"
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-3">
                <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">City*</label>
                  <CitySelect
                    onChange={(city) => setCity(city)}
                    selectedCity={city}
                    defaultCity={company?.city || ""}
                  />
                </div>
              </div>

              {/* <div className="col-12">
                <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">Map Location*</label>
                  <div className="position-relative">
                    <input type="text" placeholder="XC23+6XC, Moiran, N105" />
                    <button className="location-pin tran3s">
                      <Image
                        src={icon}
                        alt="icon"
                        className="lazy-img m-auto"
                      />
                    </button>
                  </div>
                  <div className="map-frame mt-30">
                    <div className="gmap_canvas h-100 w-100">
                      <iframe
                        className="gmap_iframe h-100 w-100"
                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="button-group d-inline-flex align-items-center mt-30">
            <a
              href=""
              className="dash-btn-two tran3s me-3"
              onClick={handleSave}
            >
              Save
            </a>
            <a href="#" className="dash-cancel-btn tran3s">
              Cancel
            </a>
          </div>
        </div>
      </div>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"-6ZbrfSRWKc"}
      />
      {/* video modal end */}
    </>
  );
};

export default EmployProfileArea;
