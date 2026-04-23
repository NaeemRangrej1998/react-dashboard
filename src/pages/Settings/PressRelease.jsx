import React from "react";
import { BsStopwatch } from "react-icons/bs";
import { ImCross } from "react-icons/im";

export default function PressRelease() {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white rounded-xl shadow-md  w-full max-w-sm relative">
        <header className="border-b p-4">
          <h2 className="text-xl font-semibold">Press Release Title</h2>
        </header>
        <span className="absolute -top-4 bg-white -right-4 z-20 rounded-full border shadow-lg transition-all duration-200 border-gray-300 p-2 text-gray-600 cursor-pointer">
          <ImCross className="text-sm text-gray-400" />
        </span>
        <div className="p-4 flex flex-col ">
          <div className="flex items-center justify-start mb-4">
            <span className=" text-gray-600 text-2xl"><BsStopwatch /></span>
            <span className="text-gray-600 ml-2">Published on: 2024-06-01</span>
          </div>
          <div className="flex items-center justify-start mb-4">
            <span className=" text-gray-600 text-2xl"><BsStopwatch /></span>
            <span className="text-gray-600 ml-2">Published on: 2024-06-01</span>
          </div>
          <div className="flex items-center justify-start mb-4">
            <span className=" text-gray-600 text-2xl"><BsStopwatch /></span>
            <span className="text-gray-600 ml-2">Published on: 2024-06-01</span>
          </div>

        </div>
        <div className="p-4 border-t flex justify-end">
          <button className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600">
            Read More
          </button>
        </div>

      </div>
    </div>
  );
}
