import { Outlet } from "react-router";
import { UserContextProvider } from "../../contexts/UserContext";
import Sidebar from "../SideBar/Sidebar";
import './Layout.css'

export function Layout(){
    return (
        <div> 
        <main className="main_flex">
            <UserContextProvider> 
            <Sidebar />
            <section className="body main-body">
                <Outlet />
            </section>
            </UserContextProvider>
        </main>
        </div>
    )
}