"use client";
import React, { useState, useEffect, useMemo } from "react";
import Pagination from "@/ui/pagination";
import { useAppSelector } from "@/redux/hook";
import slugify from "slugify";
import NiceSelect from "@/ui/nice-select";
import ListItemThree from "./list-item-3";
import JobFilterModal from "../../common/popup/job-filter-modal";
import { JobApplication } from "@/data/job-applications-data";
import { useJobApplications } from "../hooks/useJobApplications";
import FilterAreaAds from "../filter/filter-area-ads";
import FilterAreaApps from "../filter/filter-area-applications";

const JobListV3Area = ({ itemsPerPage }: { itemsPerPage: number }) => {
  const { jobApplications, isLoading } = useJobApplications();

  let all_jobs = jobApplications;
  const maxPrice = jobApplications.reduce((max, job) => {
    return (job.max_salary ?? 0) > max ? job.max_salary ?? 0 : max;
  }, 1);
  const { category, location, search_key } = useAppSelector(
    (state) => state.filter
  );
  const [currentItems, setCurrentItems] = useState<JobApplication[] | null>(
    null
  );
  const [filterItems, setFilterItems] = useState<JobApplication[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [priceValue, setPriceValue] = useState([0, maxPrice]);
  const [shortValue, setShortValue] = useState("");

  const filteredData = useMemo(() => {
    return jobApplications
      .filter((l) =>
        location
          ? slugify(l.city.split(",").join("-").toLowerCase(), "-") === location
          : true
      )
      .filter((item) =>
        category.length !== 0
          ? category.some((c) => item.category_title.includes(c))
          : true
      )
      .filter((item) =>
        search_key
          ? item.name.toLowerCase().includes(search_key.toLowerCase())
          : true
      );
  }, [jobApplications, location, category]);
  // .filter(
  //   (j) =>
  //     (j.min_salary ?? 0) >= priceValue[0] &&
  //     (j.max_salary ?? Infinity) <= priceValue[1]
  // );
  useEffect(() => {
    let sortedData = [...filteredData];

    // if (shortValue === "price-low-to-high") {
    //   sortedData = filteredData.slice().sort((a: any, b: any) => {
    //     const salaryA = a.min_salary ?? 0;
    //     const salaryB = b.min_salary ?? 0;
    //     return salaryA - salaryB;
    //   });
    // }

    // if (shortValue === "price-high-to-low") {
    //   sortedData = filteredData.slice().sort((a: any, b: any) => {
    //     const salaryA = a.max_salary ?? Infinity;
    //     const salaryB = b.max_salary ?? Infinity;
    //     return salaryB - salaryA;
    //   });
    // }

    const endOffset = itemOffset + itemsPerPage;
    setFilterItems(filteredData);
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  }, [
    filteredData,
    itemOffset,
    itemsPerPage,
    priceValue,
    shortValue,
    search_key,
  ]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % all_jobs.length;
    setItemOffset(newOffset);
  };
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <section className="job-listing-three bg-color pt-90 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <button
                type="button"
                className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
                data-bs-toggle="offcanvas"
                data-bs-target="#filteroffcanvas"
              >
                <i className="bi bi-funnel"></i>
                Filter
              </button>
              {/* filter area start */}
              <FilterAreaApps
                priceValue={priceValue}
                setPriceValue={setPriceValue}
                maxPrice={maxPrice}
                items={jobApplications}
              />
              {/* filter area end */}
            </div>

            {/* <div className="col-12"> */}
            <div className="col-xl-9 col-lg-8">
              <div className="job-post-item-wrapper">
                <div className="upper-filter d-flex justify-content-between align-items-start align-items-sm-center mb-30">
                  <div className="d-flex align-items-center">
                    <div className="short-filter d-flex align-items-center">
                      <div className="text-dark fw-500 me-2">Sort:</div>
                      <NiceSelect
                        options={[
                          { value: "", label: "Price Sort" },
                          { value: "price-low-to-high", label: "low to high" },
                          { value: "price-high-to-low", label: "High to low" },
                        ]}
                        defaultCurrent={0}
                        onChange={(item) => handleShort(item)}
                        name="Price Short"
                      />
                    </div>
                  </div>
                </div>

                <div className="wrapper">
                  <div className="row">
                    {currentItems &&
                      currentItems.map((job) => (
                        <div key={job.id} className="col-lg-6 mb-30">
                          <ListItemThree item={job} />
                        </div>
                      ))}
                  </div>
                </div>

                {currentItems && (
                  <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                    <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                      Showing{" "}
                      <span className="text-dark fw-500">{itemOffset + 1}</span>{" "}
                      to{" "}
                      <span className="text-dark fw-500">
                        {Math.min(
                          itemOffset + itemsPerPage,
                          currentItems.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="text-dark fw-500">
                        {filterItems.length}
                      </span>
                    </p>
                    {filterItems.length > itemsPerPage && (
                      <Pagination
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListV3Area;
