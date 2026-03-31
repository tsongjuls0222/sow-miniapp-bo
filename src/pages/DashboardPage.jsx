import { useState } from "react";
import "@/styles/dashboard.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import ProductTable from "@/components/ProductTable";

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products] = useState([
    {
      id: 1,
      articleNo: "1234567890",
      name: "This is a test product with fifty characters this!",
      inPrice: "900500",
      price: "1500800",
      unit: "kilometers/hour",
      stock: "2500600",
      description: "This is the description with fifty characters this"
    },
    {
      id: 2,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 3,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 4,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 5,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 6,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 7,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 8,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 9,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 10,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 11,
      articleNo: "1234567890",
      name: "This is a test product with fifty characters this!",
      inPrice: "900500",
      price: "1500800",
      unit: "kilometers/hour",
      stock: "2500600",
      description: "This is the description with fifty characters this"
    },
    {
      id: 12,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 13,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 14,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 15,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 16,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 17,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 18,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 19,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    },
    {
      id: 20,
      articleNo: "12345678902",
      name: "This is a test product with fifty characters this 2!",
      inPrice: "9005002",
      price: "15008002",
      unit: "kilometers/hour 2",
      stock: "25006002",
      description: "This is the description with fifty characters this 2"
    }
  ]);

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
            <div className="toolbar">
              <div className="searchSection">
                <div className="searchBox">
                  <input type="text" placeholder="Search Article No..." />
                  <button type="button">⌕</button>
                </div>

                <div className="searchBox">
                  <input type="text" placeholder="Search Product ..." />
                  <button type="button">⌕</button>
                </div>
              </div>

              <div className="actionButtons">
                <button className="actionBtn">
                  New Product <span>●</span>
                </button>
                <button className="actionBtn">
                  Print List <span>●</span>
                </button>
                <button className="actionBtn">
                  Advanced mode <span>●</span>
                </button>
              </div>
            </div>

            <ProductTable products={products} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;