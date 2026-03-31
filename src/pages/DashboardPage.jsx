import { useEffect, useState } from "react";
import "@/styles/dashboard.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import ProductTable from "@/components/ProductTable";
import { getAllProducts } from "@/services/productService";

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productfilter, setProductFilter] = useState({
    article_no: "",
    name: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getAllProducts(productfilter);
        setProducts(fetchedProducts?.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    };

    fetchData();
  }, [productfilter]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setProductFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    setAppliedFilter(productfilter);
    console.log("Applying search with filter:", appliedFilter);
    const fetchedProducts = await getAllProducts(appliedFilter);
    setProducts(fetchedProducts?.data || []);
    console.log("Search applied with filter:", fetchedProducts);
  };

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
                  <input
                    type="text"
                    name="article_no"
                    placeholder="Search Article No..."
                    value={productfilter.article_no}
                    onChange={handleFilterChange}
                  />
                  <button type="button" onClick={handleSearch}>⌕</button>
                </div>

                <div className="searchBox">
                  <input
                    type="text"
                    name="name"
                    placeholder="Search Product ..."
                    value={productfilter.name}
                    onChange={handleFilterChange}
                  />
                  <button type="button" onClick={handleSearch}>⌕</button>
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