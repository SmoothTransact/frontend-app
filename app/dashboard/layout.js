import Sidebar from "./Sidebar";
import DashboardNavbar from "./components/DashboardNavbar";

export default function Layout({ children }) {
  return (
    <main className="relative">
      <section className="grid grid-cols-12">
        <aside className="xl:col-span-2 lg:col-span-3 md:hidden sm:hidden lg:block hidden">
          <Sidebar />
        </aside>
        <section className="xl:col-span-10 lg:col-span-9 col-span-12">
          <DashboardNavbar />
          {children}
        </section>
      </section>
    </main>
  );
}
