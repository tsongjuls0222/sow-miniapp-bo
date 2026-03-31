import {
  FaFileInvoice,
  FaUsers,
  FaCog,
  FaBook,
  FaTags,
  FaLayerGroup,
  FaTimesCircle,
  FaFileSignature,
  FaBoxes,
  FaUserFriends,
  FaCloudUploadAlt,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/global/LanguageContext";

const menuItems = [
  { label: "Invoices", icon: <FaFileInvoice />, color: "#79e8e8", path: "/invoices" },
  { label: "Customers", icon: <FaUsers />, color: "#6ae7b3", path: "/customers" },
  { label: "My Business", icon: <FaCog />, color: "#8edbff", path: "/business" },
  { label: "Invoice Journal", icon: <FaBook />, color: "#6fd7ff", path: "/invoice-journal" },
  { label: "Price List", icon: <FaTags />, color: "#ffb84d", path: "/pricelist" },
  { label: "Multiple Invoicing", icon: <FaLayerGroup />, color: "#7ce7f2", path: "/multiple-invoicing" },
  { label: "Unpaid Invoices", icon: <FaTimesCircle />, color: "#ff5b9a", path: "/unpaid" },
  { label: "Offer", icon: <FaFileSignature />, color: "#f4dd67", path: "/offer" },
  { label: "Inventory Control", icon: <FaBoxes />, color: "#90e0d0", path: "/inventory" },
  { label: "Member Invoicing", icon: <FaUserFriends />, color: "#48a8ff", path: "/member-invoicing" },
  { label: "Import/Export", icon: <FaCloudUploadAlt />, color: "#88c9ff", path: "/import-export" },
  { label: "Log out", icon: <FaSignOutAlt />, color: "#b8f1ea", action: "logout" }
];

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item) => {
    if (item.action === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
      onClose?.();
      return;
    }

    if (item.path) {
      navigate(item.path);
      onClose?.();
    }
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebarInner">
          <div className="sidebarTop">
            <div className="sidebarHeader">
              <h2>Menu</h2>
              <button type="button" className="closeSidebarBtn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="sidebarLine"></div>
          </div>

          <div className="sidebarMenuWrap">
            <ul className="sidebarMenu">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  className={`sidebarItem ${location.pathname === item.path ? "active" : ""}`}
                >
                  <span className="sidebarIcon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span className="sidebarLabel">{t(item.label)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {isOpen && <div className="sidebarOverlay" onClick={onClose}></div>}
    </>
  );
}