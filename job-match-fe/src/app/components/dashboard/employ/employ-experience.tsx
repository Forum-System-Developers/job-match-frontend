import NiceSelect from "@/ui/nice-select";
import React from "react";

const EmployExperience = () => {
  const handleExperience = (item: { value: string; label: string }) => {};

  return (
    <div className="row align-items-end">
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Experience*</label>
          <NiceSelect
            options={[
              { value: "intern", label: "Intern" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
              { value: "expert", label: "Expert" },
            ]}
            defaultCurrent={0}
            onChange={(item) => handleExperience(item)}
            name="Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployExperience;
