import { useRef } from 'react';
import './ProductCard.css';
import { compactFormatter, priceFormatter } from '../utils/formatters';

function ActionGlyph({ kind }) {
  if (kind === 'like') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.4 4.9 13.7a4.7 4.7 0 0 1 0-6.8 4.9 4.9 0 0 1 6.9 0L12 8.1l.2-.2a4.9 4.9 0 0 1 6.9 0 4.7 4.7 0 0 1 0 6.8L12 20.4Z" />
      </svg>
    );
  }

  if (kind === 'save') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5V20l-6.5-3.7L5.5 20V6A1.5 1.5 0 0 1 7 4.5Z" />
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

function ActionButton({ active = false, meta, onClick, children, ariaLabel }) {
  return (
    <button
      type="button"
      className={`action-button ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className="action-icon">{children}</span>
      <span className="action-meta">{meta}</span>
    </button>
  );
}

function ProductCard({ product, liked, saved, onLike, onSave, onShare, onOpen }) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(() => {});
    }
  };

  const handleLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <article
      className="feed-card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="feed-image">
        <div className="feed-actions" aria-label="Post actions">
          <ActionButton
            active={liked}
            meta={compactFormatter.format(product.likes + (liked ? 1 : 0))}
            onClick={onLike}
            ariaLabel={`Like ${product.name}`}
          >
            <ActionGlyph kind="like" />
          </ActionButton>
          <ActionButton
            active={saved}
            meta={saved ? 'Saved' : 'Save'}
            onClick={onSave}
            ariaLabel={`Save ${product.name}`}
          >
            <ActionGlyph kind="save" />
          </ActionButton>
          <ActionButton meta="Share" onClick={onShare} ariaLabel={`Share ${product.name}`}>
            <ActionGlyph kind="share" />
          </ActionButton>
        </div>

        <button
          type="button"
          className="feed-card-click"
          onClick={onOpen}
          aria-label={`Open ${product.name}`}
        >
          <img src={product.image} alt={product.name} />
          {product.video ? (
            <video
              ref={videoRef}
              className="feed-card-video"
              src={product.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : null}
        </button>

        <div className="feed-meta">
          <div>
            <span className="product-brand">{product.brand}</span>
            <strong className="product-title">{product.name}</strong>
          </div>

          <div className="product-tags">
            <span className="tag">#{product.brandSlug}</span>
            <span className="tag">#{product.dropTag}</span>
            <span className="price-tag">{priceFormatter.format(product.price)}</span>
          </div>


        </div>
      </div>
    </article>
  );
}

export default ProductCard;