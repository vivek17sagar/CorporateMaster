import React from "react";
import { X } from "react-feather";
import navigation from "@src/navigation/vertical";
import { Link } from "react-router-dom";
import { useState } from "react";
const ResponsiveLayout = React.forwardRef(
  ({ handleCloseResponsiveMenu, windowWidth }, ref) => {
    return (
      <div
        style={{
          position: "fixed",
          background: "rgba(0, 0, 0, 0.2)",
          height: "100%",
          width: "100%",
          zIndex: "124000",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          transition: "all 0.5s ease-in-out",
        }}
      >
        {/* if User Clicked out side of this div it will trigger close  */}
        <div
          ref={ref}
          style={{
            transition: "all 0.5s ease-in-out",
            position: "relative",
            width: `${windowWidth <= 425 ? "50px" : "300px"}`,
            height: "100vh",
            backgroundColor: "#ffff",
            left: 0,
            bottom: 0,
            boxShadow: "0 8px 16px #00000029",
          }}
        >
          <section style={{ height: "100%" }}>
            {/* CLOSE SECTION-1 */}
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <X
                size={20}
                style={{ cursor: "pointer" }}
                onClick={handleCloseResponsiveMenu}
              />
            </div>

            {/* OPTIONS SECTION-2 */}

            <div
              style={{
                transition: "all 0.5s ease-in-out",
                height: "100%",
                padding: "20px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <ul
                className="ul_ResponsiveLayout_Component"
                style={{
                  transition: "all 0.5s ease-in-out",
                  listStyle: "none",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  height: "900px",
                  overflowY: "scroll",
                  justifyContent: windowWidth <= 425 ? "flex-start" : "",
                  alignItems: windowWidth <= 425 ? "center" : "",
                }}
              >
                {windowWidth > 425 &&
                  navigation?.map((item) => (
                    <li
                      key={item?.id}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        color:
                          window.location.pathname === item.navLink
                            ? "#786df0"
                            : "",
                        transition: "all 0.5s ease-in-out",
                      }}
                    >
                      <Link
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            window.location.pathname === item.navLink
                              ? "center"
                              : "flex-start",
                          gap:
                            window.location.pathname === item.navLink
                              ? "12px"
                              : "8px",
                          transition: "all 0.5s ease-in-out",
                        }}
                        to={item.navLink}
                      >
                        {item.icon}{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}

                {windowWidth <= 425 &&
                  navigation?.map((item) => (
                    <li
                      key={item?.id}
                      style={{
                        cursor: "pointer",
                        position: "relative",
                        transform: "rotate(90deg)",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // New
                        cursor: "pointer",

                        color:
                          window.location.pathname === item.navLink
                            ? "#786df0"
                            : "",
                        position: "relative",
                        bottom: "-21px",
                        left: "-20px",
                        transition: "all 0.5s ease-in-out",
                      }}
                    >
                      <Link
                        to={item.navLink}
                        title={item?.title}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {item.icon}{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
);

export default ResponsiveLayout;
