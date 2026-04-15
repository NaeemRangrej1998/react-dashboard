import React, { useState, useMemo } from "react";

import {Outlet} from "react-router-dom";

import './App.css'
import Sidebar from './sidebar'
import Header from './Header'


function App() {

  return (
    <>
      <div className="h-dvh flex overflow-hidden">
        <div className="flex-none">
          <Sidebar />
        </div>
        <div className="flex-1  min-w-0 flex flex-col">
          <Header />
           <div className="flex-1 overflow-y-auto overflow-x-hidden
                   md:px-3 mt-2 bg-gray-100 ">
                <Outlet />
            </div>
        </div>
      </div>
    </>
  )

}

export default App
