import { useEffect, useState } from "react";
import { useLanguage } from "@/global/LanguageContext";

const initialForm = {
  article_no: "",
  name: "",
  in_price: "",
  price: "",
  unit: "",
  stock: "",
  description: ""
};

function ProductModal({ open, onClose, onSubmit, loading = false }) {
  const [form, setForm] = useState(initialForm);
  const [popup, setPopup] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setPopup(null);
    }
  }, [open]);

  useEffect(() => {
    if (!popup) return;

    const timer = setTimeout(() => {
      setPopup(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [popup]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit({
      article_no: form.article_no.trim(),
      name: form.name.trim(),
      in_price: Number(form.in_price) || 0,
      price: Number(form.price) || 0,
      unit: form.unit.trim(),
      stock: Number(form.stock) || 0,
      description: form.description.trim()
    });

    if (!result.success) {
      setPopup({
        type: "error",
        text: result.message
      });
      return;
    }

    setPopup({
      type: "success",
      text: result.message
    });

    setForm(initialForm);

    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalBox"
        onClick={(e) => e.stopPropagation()}
      >
        {popup && (
          <div className={`modalPopup ${popup.type}`}>
            {popup.text}
          </div>
        )}

        <h2>{t("Add Product")}</h2>

        <form onSubmit={handleSubmit} className="modalForm">
          <input
            name="article_no"
            placeholder={t("Article No.")}
            value={form.article_no}
            onChange={handleChange}
          />

          <input
            name="name"
            placeholder={t("Product/Service")}
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="in_price"
            type="number"
            placeholder={t("In Price")}
            value={form.in_price}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder={t("Price")}
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="unit"
            placeholder={t("Unit")}
            value={form.unit}
            onChange={handleChange}
          />

          <input
            name="stock"
            type="number"
            placeholder={t("In Stock")}
            value={form.stock}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder={t("Description")}
            value={form.description}
            onChange={handleChange}
          />

          <div className="modalActions">
            <button
              type="button"
              className="modalCancelBtn"
              onClick={onClose}
              disabled={loading}
            >
              {t("Cancel")}
            </button>

            <button
              type="submit"
              className="modalAddBtn"
              disabled={loading}
            >
              {loading ? "Adding..." : t("Add Product")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;