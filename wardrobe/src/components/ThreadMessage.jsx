import './ThreadMessage.css';
import { priceFormatter } from '../utils/formatters';

function ThreadMessage({ message, onOpenProduct }) {
  const product = message.product;

  return (
    <div className={`thread-row ${message.own ? 'own' : ''}`}>
      <div className="thread-avatar">
        {message.image ? (
          <img src={message.image} alt={message.sender} />
        ) : (
          message.initials
        )}
      </div>
      <div className="thread-stack">
        <div className={`thread-bubble ${product ? 'thread-bubble-share' : ''}`}>
          {message.text ? <p>{message.text}</p> : null}

          {product ? (
            <button
              type="button"
              className="thread-product-card"
              onClick={() => onOpenProduct(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <div className="thread-product-copy">
                <span className="product-brand">{product.brand}</span>
                <strong>{product.name}</strong>
                <span className="thread-product-price">
                  {priceFormatter.format(product.price)}
                </span>
                {message.note ? <p>{message.note}</p> : null}
              </div>
            </button>
          ) : null}
        </div>

        {message.reactions?.length ? (
          <div className="thread-reactions">
            {message.reactions.map((reaction) => (
              <span key={reaction} className="thread-reaction">
                {reaction}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ThreadMessage;
