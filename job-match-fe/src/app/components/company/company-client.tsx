"use client";

import React, { useState, useEffect } from "react";
import CompanyV1Area from "../company/company-v1-area";
import CompanyV1Filter from "../company/filter/company-v1-filter";
import { useCompanies } from "../company/hooks/useCompanies";

const CompanyV2Client = () => {
  const { companies } = useCompanies(); // Fetch all companies
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useEffect(() => {
    if (companies) {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companies, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <CompanyV1Area
      companies={filteredCompanies}
      searchTerm={searchTerm}
      onSearch={handleSearch}
    />
  );
};

export default CompanyV2Client;
