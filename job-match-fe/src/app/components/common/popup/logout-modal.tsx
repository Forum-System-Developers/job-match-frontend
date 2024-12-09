import React, { useState } from "react";
import Image from "next/image";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/utils/auth_utils";

declare global {
  interface Window {
    bootstrap: any;
  }
}
const LogoutModal = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleDelete = () => {
    setIsRequesting(true);
    handleLogout();

    const modalElement = document.getElementById("deleteModal");
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.hide();
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="remove-account-popup text-center modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <Image src={icon} alt="icon" className="lazy-img m-auto" />
            <h2>{isRequesting ? "Deletion Requested" : "Are you sure?"}</h2>
            <p>
              {isRequesting
                ? "Your account deletion request has been received. You will be logged out shortly."
                : "Are you sure to delete your account? All data will be lost."}
            </p>
            <div className="button-group d-inline-flex justify-content-center align-items-center pt-15">
              {isRequesting ? (
                <button
                  type="button"
                  className="btn-close fw-500 ms-3"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
              ) : (
                <>
                  <a
                    href="#"
                    className="confirm-btn fw-500 tran3s me-3"
                    onClick={handleDelete}
                  >
                    Yes
                  </a>
                  <button
                    type="button"
                    className="btn-close fw-500 ms-3"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
