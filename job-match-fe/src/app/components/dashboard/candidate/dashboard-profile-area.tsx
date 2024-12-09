"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import search from "@/assets/dashboard/images/icon/icon_16.svg";
import DashboardHeader from "./dashboard-header";
import CountrySelect from "./country-select";
import CitySelect from "./city-select";
import StateSelect from "./state-select";
import { useProfessional } from "./hooks/useProfessional";
import { usePhoto } from "./hooks/usePhoto";
import {
  deleteCV,
  getCV,
  uploadCV,
  uploadPhoto,
} from "../../../../data/professional-data";
import { currentUser, UserDetails } from "@/utils/auth_utils";
import { set } from "react-hook-form";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const { professional, loading: professionalLoading } = useProfessional();
  const [user, setUser] = useState<UserDetails | null>(null);
  const { photoUrl, loading: photoLoading } = usePhoto(
    professional?.id as string
  );
  const [filename, setFilename] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const isUploaded = false;

  const fetchCV = async () => {
    try {
      const user = await currentUser();
      setUser(user);
      const response = await getCV(user.id as string);
      setFilename(response?.filename ?? null);
    } catch (error) {
      console.error("Error: CV could not be fetched.");
    }
  };

  useEffect(() => {
    fetchCV();
  }, [file]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    await uploadCV(file);
    setFile(null);
    setFilename(file.name);
  };

  const handleDelete = async () => {
    try {
      await deleteCV();
      setFile(null);
      setFilename(null);
      window.location.reload();
    } catch (error) {
      console.error("Error: Photo could not be deleted.");
    }
  };

  const isLoading = professionalLoading || photoLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(file);

      uploadPhoto(file);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">My Profile</h2>

        <div className="bg-white card-box border-20">
          <div className="user-avatar-setting d-flex align-items-center mb-30">
            <Image
              src={photoUrl ? photoUrl : profile_icon_1}
              alt="avatar"
              className="lazy-img user-img"
              height={68}
              width={68}
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
                onChange={handlePhotoUpload}
              />
            </div>
            <button className="delete-btn tran3s">Delete</button>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Full Name*</label>
            <input type="text" placeholder="Md James Brower" />
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">Bio*</label>
            <textarea
              className="size-lg"
              placeholder="Write something interesting about you...."
            ></textarea>
            <div className="alert-text">
              Brief description for your profile. URLs are hyperlinked.
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Resume Attachment</h4>
          {filename && (
            <div className="dash-input-wrapper mb-20">
              <label htmlFor="">CV Attachment*</label>

              <div className="attached-file d-flex align-items-center justify-content-between mb-15">
                <span>{filename}</span>
                <a
                  href=""
                  className="remove-btn"
                  onClick={() => handleDelete()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i className="bi bi-x"></i>
                  <span>Delete</span>
                </a>
              </div>
            </div>
          )}

          <div className="dash-btn-one d-inline-block position-relative me-3">
            <i className="bi bi-plus"></i>
            Upload CV
            <input
              type="file"
              id="uploadCV"
              name="uploadCV"
              placeholder=""
              onChange={handleFileSelect}
            />
          </div>
          <small>Upload file .pdf</small>

          {file && (
            <button
              onClick={() => handleFileUpload(file!)}
              style={{ alignSelf: "center", margin: "10px" }}
              className="btn btn-primary mt-2"
            >
              Upload CV
            </button>
          )}
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>

          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Network 1</label>
            <input type="text" placeholder="#" />
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Network 2</label>
            <input type="text" placeholder="#" />
          </div>
          <a href="#" className="dash-btn-one">
            <i className="bi bi-plus"></i> Add more link
          </a>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Address & Location</h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input
                  type="text"
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <CountrySelect />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label>
                <CitySelect />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Zip Code*</label>
                <input type="number" placeholder="1708" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <StateSelect />
              </div>
            </div>
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Map Location*</label>
                <div className="position-relative">
                  <input type="text" placeholder="XC23+6XC, Moiran, N105" />
                  <button className="location-pin tran3s">
                    <Image
                      src={search}
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
            </div>
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <a href="#" className="dash-btn-two tran3s me-3">
            Save
          </a>
          <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileArea;
