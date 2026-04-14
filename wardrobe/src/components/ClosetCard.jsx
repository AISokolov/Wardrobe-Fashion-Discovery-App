import './ClosetCard.css';
import { priceFormatter } from '../utils/formatters';

function ClosetCard({ product, onOpen }) {
  return (
    <button type="button" className="closet-card" onClick={onOpen}>
      <div className="closet-card-frame">
        <div className="closet-image">
          <img src={product.image} alt={product.name} />
        </div>
        <span className="save-badge">*</span>
      </div>
      <div className="closet-copy">
        <strong>{product.name}</strong>
        <div className="closet-meta">
          {priceFormatter.format(product.price)} | {product.category}
        </div>
      </div>
    </button>
  );
}

export default ClosetCard;