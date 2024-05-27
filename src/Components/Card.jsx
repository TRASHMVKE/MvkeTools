import React from "react";
import "./Card.css";

export default function Card({ page }) {
  return (
    <div className="card ">
      <span></span>
      <div class="content ">
        <img
          className=" w-[500px] bg-cover rounded-lg  "
          src={page.imageUrl}
          alt=""
        />
        <div className="absolute w-[95%] rounded-lg pl-4 z-10 bottom-2 backdrop-blur-2xl flex items-center ">
          <div className="flex gap-3">
            <h1>{page.nombre}</h1>
            <div className="flex items-center content-end mt-1 ">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
