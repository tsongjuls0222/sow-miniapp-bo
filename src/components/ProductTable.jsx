import { useMemo, useState } from "react";
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

export default function ProductTable({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [selectedRowId, setSelectedRowId] = useState(
    initialProducts?.[0]?.id ?? null
  );
  const [openRowId, setOpenRowId] = useState(null);

  const selectedExists = useMemo(
    () => products.some((item) => item.id === selectedRowId),
    [products, selectedRowId]
  );

  const activeSelectedRowId = selectedExists
    ? selectedRowId
    : products?.[0]?.id ?? null;

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
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = (product) => {
    console.log("Saved product:", product);
    setOpenRowId(null);
  };

  const handleDelete = (product) => {
    console.log("Deleted product:", product);
    setOpenRowId(null);
  };

  return (
    <div className="productTableWrapper">
      <div className="productHeaderRow">
        <div></div>

        <div className="headerCell">
          <FaHashtag className="headerIcon" />
          <span>Article No.</span>
        </div>

        <div className="headerCell">
          <FaBoxOpen className="headerIcon" />
          <span>Product/Service</span>
        </div>

        <div className="headerCell">
          <FaDollarSign className="headerIcon" />
          <span>Price</span>
        </div>

        <div className="headerCell">
          <FaCoins className="headerIcon" />
          <span>In Price</span>
        </div>

        <div className="headerCell">
          <FaBalanceScale className="headerIcon" />
          <span>Unit</span>
        </div>

        <div className="headerCell">
          <FaWarehouse className="headerIcon" />
          <span>In Stock</span>
        </div>

        <div className="headerCell">
          <FaAlignLeft className="headerIcon" />
          <span>Description</span>
        </div>

        <div></div>
      </div>

      {products.map((product) => {
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
                <span className="pillText">{product.articleNo}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.name}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.price}</span>
              </div>

              <div className="pill">
                <span className="pillText">{product.inPrice}</span>
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
              <div className="productExpanded">
                <div className="expandedGrid">
                  <div className="expandedField">
                    <span className="expandedLabel">Article No.</span>
                    <input
                      className="expandedInput"
                      value={product.articleNo}
                      onChange={(e) =>
                        handleChange(product.id, "articleNo", e.target.value)
                      }
                    />
                  </div>

                  <div className="expandedField">
                    <span className="expandedLabel">In Price</span>
                    <input
                      className="expandedInput"
                      value={product.inPrice}
                      onChange={(e) =>
                        handleChange(product.id, "inPrice", e.target.value)
                      }
                    />
                  </div>

                  <div className="expandedField">
                    <span className="expandedLabel">Unit</span>
                    <input
                      className="expandedInput"
                      value={product.unit}
                      onChange={(e) =>
                        handleChange(product.id, "unit", e.target.value)
                      }
                    />
                  </div>

                  <div className="expandedField">
                    <span className="expandedLabel">In Stock</span>
                    <input
                      className="expandedInput"
                      value={product.stock}
                      onChange={(e) =>
                        handleChange(product.id, "stock", e.target.value)
                      }
                    />
                  </div>

                  <div className="expandedField">
                    <span className="expandedLabel">Price</span>
                    <input
                      className="expandedInput"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(product.id, "price", e.target.value)
                      }
                    />
                  </div>

                  <div className="expandedField">
                    <span className="expandedLabel">Product/Service</span>
                    <input
                      className="expandedInput"
                      value={product.name}
                      onChange={(e) =>
                        handleChange(product.id, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="expandedField expandedFieldFull">
                    <span className="expandedLabel">Description</span>
                    <input
                      className="expandedInput"
                      value={product.description}
                      onChange={(e) =>
                        handleChange(product.id, "description", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="expandedActions">
                    <button
                      type="button"
                      className="saveBtn"
                      onClick={() => handleSave(product)}
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="delBtn"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}