import { useEffect, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaEllipsisH,
  FaHashtag,
  FaBoxOpen,
  FaDollarSign,
  FaCoins,
  FaBalanceScale,
  FaWarehouse,
  FaAlignLeft
} from "react-icons/fa";

import ProductExpanded from "@/components/ProductExpanded";
import { deleteProduct, updateProduct } from "@/services/productService";
import { useLanguage } from "@/global/LanguageContext";

export default function ProductTable({
  products: initialProducts = [],
  loading = false,
  refetchProducts
}) {
  const [products, setProducts] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openRowId, setOpenRowId] = useState(null);
  const [message, setMessage] = useState(null);
  const { t } = useLanguage();


  useEffect(() => {
    const safeProducts = Array.isArray(initialProducts) ? initialProducts : [];
    setProducts(safeProducts);
  }, [initialProducts]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const safeProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  useEffect(() => {
    if (!safeProducts.length) {
      setSelectedRowId(null);
      setOpenRowId(null);
      return;
    }

    const exists = safeProducts.some((item) => item.id === selectedRowId);

    if (!exists) {
      setSelectedRowId(safeProducts[0].id);
      setOpenRowId(null);
    }
  }, [safeProducts, selectedRowId]);

  const activeSelectedRowId = useMemo(() => {
    const exists = safeProducts.some((item) => item.id === selectedRowId);
    return exists ? selectedRowId : safeProducts?.[0]?.id ?? null;
  }, [safeProducts, selectedRowId]);

  const handleSelectRow = (id) => {
    setSelectedRowId(id);
    setOpenRowId(id);
  };

  const handleToggleDetails = (id) => {
    setSelectedRowId(id);
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const handleChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value
            }
          : item
      )
    );
  };

  const handleSave = async (product) => {
    try {
      const response = await updateProduct(product.id, {
        article_no: product.article_no,
        name: product.name,
        in_price: Number(product.in_price) || 0,
        price: Number(product.price) || 0,
        unit: product.unit,
        stock: Number(product.stock) || 0,
        description: product.description
      });

      if (response?.status !== 200) {
        setMessage({
          type: "error",
          text: "Server error while updating product"
        });
        return;
      }

      if (response?.data?.code !== 1) {
        setMessage({
          type: "error",
          text: response?.data?.message || "Update failed"
        });
        return;
      }

      setMessage({
        type: "success",
        text: response?.data?.message || "Product updated successfully"
      });

      setOpenRowId(null);

      if (typeof refetchProducts === "function") {
        await refetchProducts();
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Network error"
      });
    }
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteProduct(product.id);

      if (response?.status !== 200) {
        setMessage({
          type: "error",
          text: "Server error while deleting product"
        });
        return;
      }

      if (response?.data?.code !== 1) {
        setMessage({
          type: "error",
          text: response?.data?.message || "Delete failed"
        });
        return;
      }

      setMessage({
        type: "success",
        text: response?.data?.message || "Product deleted successfully"
      });

      setOpenRowId(null);

      if (typeof refetchProducts === "function") {
        await refetchProducts();
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Network error"
      });
    }
  };

  if (loading) {
    return <div className="loadingState">Loading products...</div>;
  }

  if (!safeProducts.length) {
    return (
      <div className="productTableWrapper">
        {message && (
          <div className={`popup ${message.type}`}>
            {message.text}
          </div>
        )}
        <div className="emptyState">No products found.</div>
      </div>
    );
  }

  return (
    <div className="productTableWrapper">
      {message && (
        <div className={`popup ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="productHeaderRow">
        <div></div>

        <div className="headerCell">
          <FaHashtag className="headerIcon" />
          <span>{t("Article No.")}</span>
        </div>

        <div className="headerCell">
          <FaBoxOpen className="headerIcon" />
          <span>{t("Product/Service")}</span>
        </div>

        <div className="headerCell">
          <FaDollarSign className="headerIcon" />
          <span>{t("Price")}</span>
        </div>

        <div className="headerCell">
          <FaCoins className="headerIcon" />
          <span>{t("In Price")}</span>
        </div>

        <div className="headerCell">
          <FaBalanceScale className="headerIcon" />
          <span>{t("Unit")}</span>
        </div>

        <div className="headerCell">
          <FaWarehouse className="headerIcon" />
          <span>{t("In Stock")}</span>
        </div>

        <div className="headerCell">
          <FaAlignLeft className="headerIcon" />
          <span>{t("Description")}</span>
        </div>

        <div></div>
      </div>

      {safeProducts.map((product) => {
        const isSelected = activeSelectedRowId === product.id;
        const isOpen = openRowId === product.id;

        return (
          <div key={product.id} className="productItemBlock">
            <div
              className={`productRow ${isSelected ? "selectedRow" : ""}`}
              onClick={() => handleSelectRow(product.id)}
            >
              <div className="rowArrow">
                {isSelected ? <FaArrowRight /> : null}
              </div>

              <div className="pill">
                <span className="pillText">{product.article_no}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.name}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.price}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.in_price}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.unit}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.stock}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.description}</span>
              </div>

              <button
                type="button"
                className="moreBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleDetails(product.id);
                }}
              >
                <FaEllipsisH />
              </button>
            </div>

            {isOpen && (
              <ProductExpanded
                product={product}
                onChange={handleChange}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}