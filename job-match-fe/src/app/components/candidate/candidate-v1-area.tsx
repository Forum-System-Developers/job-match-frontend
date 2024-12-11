"use client";
import React, { useEffect, useMemo, useState } from "react";
import CandidateGridItem from "./candidate-grid-item";
import CandidateListItem from "./candidate-list-item";
import CandidateV1FilterArea from "./filter/candidate-v1-filter-area";
import ShortSelect from "../common/short-select";
import { useProfessionals } from "./hooks/useProfessionals";
import { ProfessionalDetails } from "@/data/professional-data";
import { useAppSelector } from "@/redux/hook";
import slugify from "slugify";
import Pagination from "@/ui/pagination";

const CandidateV1Area = ({
  itemsPerPage,
  style_2 = false,
}: {
  itemsPerPage: number;
  style_2?: boolean;
}) => {
  const { professionals, isLoading } = useProfessionals();
  const candidate_data = professionals;
  const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");
  const { location, tags } = useAppSelector((state) => state.filter);
  const [currentItems, setCurrentItems] = useState<
    ProfessionalDetails[] | null
  >(null);
  const [filterItems, setFilterItems] = useState<ProfessionalDetails[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [shortValue, setShortValue] = useState("");

  const filteredData = useMemo(() => {
    return candidate_data
      .filter((l) =>
        location
          ? slugify(l.city.split(",").join("-").toLowerCase(), "-") === location
          : true
      )
      .filter((item) =>
        tags.length !== 0
          ? tags.some((tag) => item.skills.some((skill) => skill.name === tag))
          : true
      );
  }, [candidate_data, location, tags]);

  useEffect(() => {
    let sortedData = [...filteredData];

    // if (shortValue === "price-high-to-low") {
    //   sortedData = sortedData.sort(
    //     (a, b) => Number(b.min_salary) - Number(a.min_salary)
    //   );
    // }

    const endOffset = itemOffset + itemsPerPage;
    setFilterItems(sortedData);
    setCurrentItems(sortedData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedData.length / itemsPerPage));
  }, [filteredData, itemOffset, itemsPerPage, shortValue]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % candidate_data.length;
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
      <section className="candidates-profile pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
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
              <CandidateV1FilterArea items={professionals} />
              {/* filter area end */}
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="ms-xxl-5 ms-xl-3">
                <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                  <div className="total-job-found">
                    All{" "}
                    <span className="text-dark fw-500">
                      {candidate_data.length}
                    </span>{" "}
                    candidates found
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="short-filter d-flex align-items-center">
                      <div className="text-dark fw-500 me-2">Sort:</div>
                      <ShortSelect />
                    </div>
                    <button
                      onClick={() => setJobType("list")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${
                        jobType === "grid" ? "active" : ""
                      }`}
                      title="Active List"
                    >
                      <i className="bi bi-list"></i>
                    </button>
                    <button
                      onClick={() => setJobType("grid")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${
                        jobType === "list" ? "active" : ""
                      }`}
                      title="Active Grid"
                    >
                      <i className="bi bi-grid"></i>
                    </button>
                  </div>
                </div>

                <div
                  className={`accordion-box grid-style ${
                    jobType === "grid" ? "show" : ""
                  }`}
                >
                  <div className="row">
                    {currentItems &&
                      currentItems.map((item) => (
                        <div
                          key={item.id}
                          className="col-xxl-4 col-sm-6 d-flex"
                        >
                          <CandidateGridItem item={item} />
                        </div>
                      ))}
                  </div>
                </div>

                <div
                  className={`accordion-box list-style ${
                    jobType === "list" ? "show" : ""
                  }`}
                >
                  {currentItems &&
                    currentItems.map((item) => (
                      <CandidateListItem key={item.id} item={item} />
                    ))}
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

export default CandidateV1Area;
