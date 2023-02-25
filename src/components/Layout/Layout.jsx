import { Outlet } from "react-router";
import Sidebar from "../SideBar/Sidebar";
import './Layout.css'

export function Layout(){
    return (
        <div> 
        <main className="main_flex">
            <Sidebar />
            <section className="body">
                <Outlet />
            </section>
        </main>
        </div>
    )
}