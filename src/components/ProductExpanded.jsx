
import { useLanguage } from "@/global/LanguageContext";

export default function ProductExpanded({
  product,
  onChange,
  onSave,
  onDelete
}) {

const { t } = useLanguage();

  return (
    <div className="productExpanded">
      <div className="expandedGrid">
        <div className="expandedField">
          <span className="expandedLabel">{t("Article No.")}</span>
          <input
            className="expandedInput"
            value={product.article_no || ""}
            onChange={(e) =>
              onChange(product.id, "article_no", e.target.value)
            }
          />
        </div>

        <div className="expandedField">
          <span className="expandedLabel">{t("In Price")}</span>
          <input
            className="expandedInput"
            value={product.in_price || ""}
            onChange={(e) =>
              onChange(product.id, "in_price", e.target.value)
            }
          />
        </div>

        <div className="expandedField">
          <span className="expandedLabel">{t("Unit")}</span>
          <input
            className="expandedInput"
            value={product.unit || ""}
            onChange={(e) =>
              onChange(product.id, "unit", e.target.value)
            }
          />
        </div>

        <div className="expandedField">
          <span className="expandedLabel">{t("In Stock")}</span>
          <input
            className="expandedInput"
            value={product.stock || ""}
            onChange={(e) =>
              onChange(product.id, "stock", e.target.value)
            }
          />
        </div>

        <div className="expandedField">
          <span className="expandedLabel">{t("Price")}</span>
          <input
            className="expandedInput"
            value={product.price || ""}
            onChange={(e) =>
              onChange(product.id, "price", e.target.value)
            }
          />
        </div>

        <div className="expandedField">
          <span className="expandedLabel">{t("Product/Service")}</span>
          <input
            className="expandedInput"
            value={product.name || ""}
            onChange={(e) =>
              onChange(product.id, "name", e.target.value)
            }
          />
        </div>

        <div className="expandedField expandedFieldFull">
          <span className="expandedLabel">{t("Description")}</span>
          <input
            className="expandedInput"
            value={product.description || ""}
            onChange={(e) =>
              onChange(product.id, "description", e.target.value)
            }
          />
        </div>
      </div>

      <div className="expandedActions">
        <button className="saveBtn" onClick={() => onSave(product)}>
          {t("Save")}
        </button>

        <button className="delBtn" onClick={() => onDelete(product)}>
          {t("Delete")}
        </button>
      </div>
    </div>
  );
}