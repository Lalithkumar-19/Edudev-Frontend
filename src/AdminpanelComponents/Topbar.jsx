import React from "react";
import "./topbar.css";
export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Edudev Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
          </div>
        </div>
      </div>
    </div>
  );
}
