import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="p-4 py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      <Header />
      {/*Outlet renders the child routers element, if there is one*/}
      <Outlet />
    </div>
  );
}