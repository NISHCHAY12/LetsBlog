import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navfoot/navbar";
import Footer from "./components/navfoot/footer"

const Layout = () => {
    return(
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout;