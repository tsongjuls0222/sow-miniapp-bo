import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "@/styles/dashboard.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import ProductTable from "@/components/ProductTable";
import { getAllProducts } from "@/services/productService";
import { useAuth } from "@/global/AuthContext";

function DashboardPage() {
  const { accessToken, user, authLoading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const [productfilter, setProductFilter] = useState({
    article_no: "",
    name: ""
  });

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const fetchedProducts = await getAllProducts(productfilter);
        const productData = fetchedProducts?.data?.data ?? fetchedProducts?.data ?? [];

        setProducts(Array.isArray(productData) ? productData : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, searchTrigger]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setProductFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1);
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="pageLayout">
      <Topbar
        onHamburgerClick={() => setSidebarOpen(true)}
        user={user}
      />

      <div className="dashboard">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                  <button type="button" onClick={handleSearch}>
                    ⌕
                  </button>
                </div>

                <div className="searchBox">
                  <input
                    type="text"
                    name="name"
                    placeholder="Search Product ..."
                    value={productfilter.name}
                    onChange={handleFilterChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                  <button type="button" onClick={handleSearch}>
                    ⌕
                  </button>
                </div>
              </div>

              <div className="actionButtons">
                <button className="actionBtn" type="button">
                  New Product <span>●</span>
                </button>
                <button className="actionBtn" type="button">
                  Print List <span>●</span>
                </button>
                <button className="actionBtn" type="button">
                  Advanced mode <span>●</span>
                </button>
              </div>
            </div>

            <ProductTable products={products} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;