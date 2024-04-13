import React from "react";
import "../AdminpanelComponents/topbar.css";
export default function Ins_topbar( {setSelected} ) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Edudev instructor</span>
        </div>
        <div className="topRight" >
          <div className="topbarIconContainer" onClick={() => setSelected(6)} >
          </div>
        </div>
      </div>
    </div>
  );
}