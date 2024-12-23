"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import DashboardHeader from "./dashboard-header";
import CitySelect from "./city-select";
import { useCurrentProfessional } from "./hooks/useCurrentProfessional";
import { usePhoto } from "./hooks/usePhoto";
import {
  deleteCV,
  getCV,
  uploadCV,
  uploadPhoto,
  updateProfessional,
} from "../../../../data/professional-data";
import { getUserLocal } from "@/services/auth_service";
import StatusSelect from "./status-select";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const [status, setStatus] = useState<"active" | "busy">("active");
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [city, setCity] = useState<{ value: string; label: string } | null>(
    null
  );
  const [filename, setFilename] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { professional, loading: professionalLoading } =
    useCurrentProfessional();
  const { photoUrl, loading: photoLoading } = usePhoto(
    professional?.id as string
  );

  useEffect(() => {
    if (professional) {
      setFirstName(professional.first_name || "");
      setLastName(professional.last_name || "");
      setBio(professional.description || "");
      setCity(
        professional.city
          ? { value: professional.city, label: professional.city }
          : null
      );
      setStatus(professional.status || null);
    }
  }, [professional]);

  const fetchCV = async () => {
    try {
      const user = getUserLocal();
      const response = await getCV(user?.id as string);
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

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const updatedData = {
        professional: {
          first_name: firstName,
          last_name: lastName,
          description: bio,
          city: city?.label as string,
        },
        status: status.toLowerCase(),
      };

      await updateProfessional(updatedData);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
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
              src={photoUrl || profile_icon_1}
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
                onChange={handlePhotoUpload}
              />
            </div>
            <button className="delete-btn tran3s">Delete</button>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">First Name*</label>
            <input
              type="text"
              placeholder={professional?.first_name}
              value={firstName || ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Last Name*</label>
            <input
              type="text"
              placeholder={professional?.last_name}
              value={lastName || ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">Bio*</label>
            <textarea
              className="size-lg"
              placeholder="Write something interesting about you...."
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
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
          <h4 className="dash-title-three">City*</h4>
          <div className="row">
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label>
                <CitySelect
                  onChange={(selectedCity) => setCity(selectedCity)}
                  selectedCity={city}
                  defaultCity={professional?.city || ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Status*</h4>
          <div className="row">
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Select Profile Status*</label>
                <StatusSelect
                  onChange={(item) =>
                    setStatus(item.label as "active" | "busy")
                  }
                  default={
                    professional?.status === "active" ? "Active" : "Busy"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <a href="" className="dash-btn-two tran3s me-3" onClick={handleSave}>
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
