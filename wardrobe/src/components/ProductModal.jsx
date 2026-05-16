import './ProductModal.css';
import { priceFormatter } from '../utils/formatters';

function ModalGlyph({ kind }) {
  if (kind === 'like') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.4 4.9 13.7a4.7 4.7 0 0 1 0-6.8 4.9 4.9 0 0 1 6.9 0L12 8.1l.2-.2a4.9 4.9 0 0 1 6.9 0 4.7 4.7 0 0 1 0 6.8L12 20.4Z" />
      </svg>
    );
  }

  if (kind === 'closet') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 4a2 2 0 1 1 2 2c0 1.5-1.2 2.2-2.1 2.9l-6.8 5.4A1 1 0 0 0 3.7 16h16.6a1 1 0 0 0 .6-1.8l-6.8-5.4C13.2 8.2 12 7.5 12 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 13v4.5A1.5 1.5 0 0 1 17.5 19h-11A1.5 1.5 0 0 1 5 17.5v-11A1.5 1.5 0 0 1 6.5 5H11" />
    </svg>
  );
}

function ProductModal({
  isOpen,
  product,
  liked,
  saved,
  selectedSize,
  onClose,
  onLike,
  onSave,
  onShare,
  onShop,
  onSelectSize,
}) {
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="detail-modal" onClick={onClose} role="presentation">
      <article
        className="detail-card"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="detail-top">
          <img src={product.image} alt={product.name} />
          <button
            type="button"
            className="detail-close"
            onClick={onClose}
            aria-label="Close detail"
          >
            X
          </button>

          <div className="detail-actions detail-actions-top">
            <button
              type="button"
              className={`detail-button detail-icon-button ${liked ? 'active' : ''}`}
              onClick={onLike}
              aria-label={`Like ${product.name}`}
            >
              <span className="action-icon">
                <ModalGlyph kind="like" />
              </span>
            </button>
            <button
              type="button"
              className={`detail-button detail-icon-button ${saved ? 'active' : ''}`}
              onClick={onSave}
              aria-label={saved ? `Remove ${product.name} from closet` : `Add ${product.name} to closet`}
            >
              <span className="action-icon">
                <ModalGlyph kind="closet" />
              </span>
            </button>
            <button
              type="button"
              className="detail-button detail-icon-button"
              onClick={onShare}
              aria-label={`Share ${product.name}`}
            >
              <span className="action-icon">
                <ModalGlyph kind="share" />
              </span>
            </button>
          </div>
        </div>

        <div className="detail-body">
          <div className="product-brand">{product.brand}</div>
          <h2 className="product-title">{product.name}</h2>
          <div className="screen-subtitle">
            {product.collection} | Style {product.styleCode}
          </div>
          <div className="detail-price">{priceFormatter.format(product.price)}</div>

          <div className="screen-subtitle">Available sizes</div>
          <div className="size-row">
            {product.sizes.map((size) => {
              const unavailable = product.unavailableSizes?.includes(size);
              const classes = ['size-pill'];

              if (size === selectedSize) {
                classes.push('active');
              }

              if (unavailable) {
                classes.push('unavailable');
              }

              return (
                <button
                  key={size}
                  type="button"
                  className={classes.join(' ')}
                  disabled={unavailable}
                  onClick={() => onSelectSize(size)}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <div className="screen-subtitle">Sold by</div>
          <div className="seller-card">
            <div>
              <strong>{product.seller.name}</strong>
              <div className="screen-subtitle">{product.seller.note}</div>
              <div className="screen-subtitle">
                {product.seller.rating} | {product.seller.reviews} reviews
              </div>
            </div>
            <span className="verified-pill">Verified</span>
          </div>

          <div className="detail-grid">
            <div className="mini-card">
              <div className="screen-subtitle">Material</div>
              <strong>{product.material}</strong>
            </div>
            <div className="mini-card">
              <div className="screen-subtitle">Shipping</div>
              <strong>{product.shipping}</strong>
            </div>
            <div className="mini-card">
              <div className="screen-subtitle">Affiliate</div>
              <strong>{product.affiliateCut}</strong>
            </div>
          </div>

          <div className="detail-list">
            <div className="detail-list-row">
              <span>Category</span>
              <span>{product.category}</span>
            </div>
            <div className="detail-list-row">
              <span>Drop</span>
              <span>{product.dropTag}</span>
            </div>
            <div className="detail-list-row">
              <span>Why it fits</span>
              <span>{product.description}</span>
            </div>
          </div>

          <div className="detail-actions detail-actions-bottom">
            <button type="button" className="detail-button primary" onClick={onShop}>
              Shop via Affiliate Link
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProductModal;
