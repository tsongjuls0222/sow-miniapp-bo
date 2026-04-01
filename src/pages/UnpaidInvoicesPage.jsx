import { useState } from "react";
import "@/styles/dashboard.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

function UnpaidInvoicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pageLayout">
      <Topbar onHamburgerClick={() => setSidebarOpen(true)} />

      <div className="dashboard">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="dashboardMain">
          <main className="dashboardContent">
            <h1>Unpaid Invoices</h1>
          </main>
        </div>
      </div>
    </div>
  );
}

export default UnpaidInvoicesPage;