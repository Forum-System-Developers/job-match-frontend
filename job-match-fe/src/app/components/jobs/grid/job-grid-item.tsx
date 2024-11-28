"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { IJobType } from "@/types/job-data-type";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";

const JobGridItem = ({
  item,
  style_2 = true,
}: {
  item: IJobType;
  style_2?: boolean;
}) => {
  const { id, logo, duration, location, salary, salary_duration, title } =
    item || {};
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const isActive = wishlist.some((p) => p.id === id);
  const dispatch = useAppDispatch();
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    dispatch(add_to_wishlist(item));
  };
  return (
    <div
      className={`job-list-two ${style_2 ? "style-two" : ""} position-relative`}
    >
      <Link href={`/job-ad/${id}`} className="logo">
        <Image
          src={logo ? logo : profile_icon_1}
          alt="logo"
          className="lazy-img m-auto"
          height={35}
          width={35}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </Link>
      <a
        onClick={() => handleAddWishlist(item)}
        className={`save-btn text-center rounded-circle tran3s cursor-pointer ${
          isActive ? "active" : ""
        }`}
        title={`${isActive ? "Remove Job" : "Save Job"}`}
      >
        <i className="bi bi-bookmark-dash"></i>
      </a>
      <div>
        <Link
          href={`/job-ad/${id}`}
          className={`job-duration fw-500 ${
            duration === "Part time" ? "part-time" : ""
          }`}
        >
          {duration}
        </Link>
      </div>
      <div>
        <Link href={`/job-ad/${id}`} className="title fw-500 tran3s">
          {title}
        </Link>
      </div>
      <div className="job-salary">
        <span className="fw-500 text-dark">${salary}</span> / {salary_duration}
      </div>
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="job-location">
          <Link href={`/job-ad/${id}`}>{location}</Link>
        </div>
        <Link href={`/job-ad/${id}`} className="apply-btn text-center tran3s">
          VIEW
        </Link>
      </div>
    </div>
  );
};

export default JobGridItem;
