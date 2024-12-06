"use client";
import React from "react";
import Image from "next/image";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";
import { JobAdResponse } from "@/data/job-ad-data";

const ListItemTwo = ({ item }: { item: JobAdResponse }) => {
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const isActive = wishlist.some((p) => p.id === item.id);
  const dispatch = useAppDispatch();
  // handle add wishlist
  const handleAddWishlist = (item: JobAdResponse) => {
    dispatch(add_to_wishlist(item));
  };
  return (
    <div className="job-list-one style-two position-relative border-style mb-20">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-5">
          <div className="job-title d-flex align-items-center">
            <Link href={`/company/${item.company_id}`} className="logo">
              <Image
                src={item.company_logo ? item.company_logo : profile_icon_1}
                alt="logo"
                className="lazy-img m-auto"
                height={35}
                width={35}
                style={{
                  width: "50%",
                  height: "50%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Link>
            <div className="split-box1">
              <Link
                href={`/company/${item.company_id}`}
                className="job-duration fw-500"
              >
                {item.company_name}
              </Link>

              <Link href={`/job-ad/${item.id}`} className="title fw-500 tran3s">
                {item.title.slice(0, 22)} {item.title.length > 20 ? ".." : ""}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="job-salary">
            <span className="fw-500 text-dark">Min Salary</span> /{" "}
            {item.min_salary}
          </div>
          <div className="job-salary">
            <span className="fw-500 text-dark">Max Salary</span> /{" "}
            {item.max_salary}
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
            <a
              onClick={() => handleAddWishlist(item)}
              className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                isActive ? "active" : ""
              }`}
              title={`${isActive ? "Remove Job" : "Save Job"}`}
            >
              <i className="bi bi-bookmark-dash"></i>
            </a>
            <Link
              href={`/job-ad/${item.id}`}
              className="apply-btn text-center tran3s"
            >
              VIEW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemTwo;
