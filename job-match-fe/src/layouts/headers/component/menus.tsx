import React from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import { isAuthenticated } from "@/services/auth_service";

const Menus = () => {
  const isUserAuthenticated = isAuthenticated();

  return (
    <>
      {menu_data.map((menu) => {
        if (menu.title === "Dashboard") {
          const dashboardLink = isUserAuthenticated ? menu.link : "/register";
          return (
            <li key={menu.id} className="nav-item dashboard-menu">
              <Link className="nav-link" href={dashboardLink}>
                {menu.title}
              </Link>
            </li>
          );
        }

        if (menu.title === "Home") {
          return (
            <li key={menu.id} className="nav-item">
              <Link className="nav-link" href={menu.link}>
                {menu.title}
              </Link>
            </li>
          );
        }

        if (menu.sub_menus) {
          return (
            <li key={menu.id} className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                {menu.title}
              </a>
              <ul className="dropdown-menu">
                {menu.sub_menus.map((s, i) => (
                  <li key={i}>
                    <Link href={s.link} className="dropdown-item">
                      <span>{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        }

        if (menu.mega_menus) {
          return (
            <li key={menu.id} className="nav-item dropdown mega-dropdown-sm">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                {menu.title}
              </a>
              <ul className="dropdown-menu">
                <li className="row gx-1">
                  {menu.mega_menus.map((m) => (
                    <div key={m.id} className="col-md-4">
                      <div className="menu-column">
                        <h6 className="mega-menu-title">{m.title}</h6>
                        <ul className="style-none mega-dropdown-list">
                          {m.sub_menus.map((ms, i) => (
                            <li key={i}>
                              <Link href={ms.link} className="dropdown-item">
                                <span>{ms.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </li>
              </ul>
            </li>
          );
        }

        return (
          <li key={menu.id} className="nav-item">
            <Link className="nav-link" href={menu.link}>
              {menu.title}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default Menus;
