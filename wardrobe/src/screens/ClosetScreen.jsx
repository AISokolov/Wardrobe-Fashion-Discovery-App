import ClosetCard from "../components/ClosetCard";
import { closetCategories } from "../data/mockData";
import { priceFormatter } from "../utils/formatters";
import "./ClosetScreen.css";

function ClosetScreen({
  products,
  savedProducts,
  activeFilter,
  onFilterChange,
  onOpenProduct,
}) {
  const uniqueBrands = new Set(savedProducts.map((product) => product.brand))
    .size;
  const savedValue = savedProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  );

  return (
    <section className="screen">
      <div className="screen-head">
        <div className="eyebrow">Wardrobe</div>
        <h1 className="screen-title">Closet</h1>
      </div>

      <div className="stats-row">
        <div className="stat">
          <span className="stat-value">{savedProducts.length}</span>
          <span className="stat-label">Looks</span>
        </div>
        <div className="stat">
          <span className="stat-value">{uniqueBrands}</span>
          <span className="stat-label">Brands</span>
        </div>
        <div className="stat stat-wide">
          <span className="stat-value">
            {priceFormatter.format(savedValue)}
          </span>
          <span className="stat-label">Value</span>
        </div>
      </div>

      <div className="chips">
        {closetCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${activeFilter === category ? "active" : ""}`}
            onClick={() => onFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="screen-scroll">
        <div className="closet-grid">
          {products.length ? (
            products.map((product) => (
              <ClosetCard
                key={product.id}
                product={product}
                onOpen={() => onOpenProduct(product.id)}
              />
            ))
          ) : (
            <div className="empty-state">
              <strong>
                Nothing in your closet under {activeFilter.toLowerCase()} yet.
              </strong>
              <p>
                Add products from Explore to your closet and they will land here instantly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClosetScreen;
