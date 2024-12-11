"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useCompanies } from "../company/hooks/useCompanies";
import { useAppSelector } from "@/redux/hook";
import slugify from "slugify";
import CompanyV1Filter from "./filter/company-v1-filter";
import ShortSelect from "../common/short-select";
import CompanyGridItem from "./company-grid-item";
import CompanyListItem from "./company-list-item";
import Pagination from "@/ui/pagination";
import { CompanyDetails } from "@/data/company-data";

const CompanyV2Client = ({
  itemsPerPage,
  style_2 = false,
}: {
  itemsPerPage: number;
  style_2?: boolean;
}) => {
  const { companies, isLoading } = useCompanies();
  const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const { location } = useAppSelector((state) => state.filter);
  const [currentItems, setCurrentItems] = useState<CompanyDetails[] | null>(
    null
  );
  const [filterItems, setFilterItems] = useState<CompanyDetails[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [shortValue, setShortValue] = useState("");

  const companiesCount = companies.length;

  const filteredData = useMemo(() => {
    return companies.filter((l) =>
      location
        ? slugify(l.city.split(",").join("-").toLowerCase(), "-") === location
        : true
    );
  }, [companies, location]);

  useEffect(() => {
    let sortedData = [...filteredData];

    const endOffset = itemOffset + itemsPerPage;
    setFilterItems(sortedData);
    setCurrentItems(sortedData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedData.length / itemsPerPage));
  }, [filteredData, itemOffset, itemsPerPage, shortValue]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % companies.length;
    setItemOffset(newOffset);
  };
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value);
  };

  useEffect(() => {
    if (companies) {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companies, searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <section className="company-profiles pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
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
            <div
              className="filter-area-tab offcanvas offcanvas-start"
              id="filteroffcanvas"
            >
              <button
                type="button"
                className="btn-close text-reset d-lg-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
              <div className="main-title fw-500 text-dark">Filter By</div>
              <CompanyV1Filter searchTerm={searchTerm} companies={companies} />
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="ms-xxl-5 ms-xl-3">
              <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                <div className="total-job-found">
                  All <span className="text-dark fw-500">{companiesCount}</span>{" "}
                  company found
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
                  {currentItems?.slice(0, 9).map((item) => (
                    <div
                      key={item.id}
                      className="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex"
                    >
                      <CompanyGridItem item={item} />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`accordion-box list-style ${
                  jobType === "list" ? "show" : ""
                }`}
              >
                {currentItems?.slice(0, 9).map((item) => (
                  <CompanyListItem key={item.id} item={item} />
                ))}
              </div>

              {currentItems && (
                <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing{" "}
                    <span className="text-dark fw-500">{itemOffset + 1}</span>{" "}
                    to{" "}
                    <span className="text-dark fw-500">
                      {Math.min(itemOffset + itemsPerPage, currentItems.length)}
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
  );
};

export default CompanyV2Client;
