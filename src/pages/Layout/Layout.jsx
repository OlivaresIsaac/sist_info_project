// import { SideBar } from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
// import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    <div> 
    <p>Soy layout</p>
    <Outlet />
    </div>
    // <UserContextProvider>
    //   <main>
    //     <SideBar />

    //     <section className="body">
    //       <Outlet />
    //     </section>
    //   </main>
    // </UserContextProvider>
  );
}