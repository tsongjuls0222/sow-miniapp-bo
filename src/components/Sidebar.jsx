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

const menuItems = [
  { label: "Invoices", icon: <FaFileInvoice />, color: "#79e8e8" },
  { label: "Customers", icon: <FaUsers />, color: "#6ae7b3" },
  { label: "My Business", icon: <FaCog />, color: "#8edbff" },
  { label: "Invoice Journal", icon: <FaBook />, color: "#6fd7ff" },
  { label: "Price List", icon: <FaTags />, color: "#ffb84d" },
  { label: "Multiple Invoicing", icon: <FaLayerGroup />, color: "#7ce7f2" },
  { label: "Unpaid Invoices", icon: <FaTimesCircle />, color: "#ff5b9a" },
  { label: "Offer", icon: <FaFileSignature />, color: "#f4dd67" },
  { label: "Inventory Control", icon: <FaBoxes />, color: "#90e0d0" },
  { label: "Member Invoicing", icon: <FaUserFriends />, color: "#48a8ff" },
  { label: "Import/Export", icon: <FaCloudUploadAlt />, color: "#88c9ff" },
  { label: "Log out", icon: <FaSignOutAlt />, color: "#b8f1ea" }
];

export default function Sidebar({ isOpen, onClose }) {
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
                  className={`sidebarItem ${item.label === "Price List" ? "active" : ""}`}
                >
                  <span className="sidebarIcon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span className="sidebarLabel">{item.label}</span>
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