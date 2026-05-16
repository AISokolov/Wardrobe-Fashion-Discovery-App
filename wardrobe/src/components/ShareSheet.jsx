import './ShareSheet.css';

function ShareSheet({ isOpen, chats, product, onClose, onShareToChat }) {
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="share-sheet-backdrop" onClick={onClose} role="presentation">
      <div
        className="share-sheet"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Share ${product.name}`}
      >
        <button
          type="button"
          className="share-sheet-handle"
          onClick={onClose}
          aria-label="Close share sheet"
        />
        <div className="share-sheet-copy">
          <div className="eyebrow">Share</div>
          <h2 className="share-sheet-title">{product.name}</h2>
          <p className="share-sheet-subtitle">Send this product into one of your chats.</p>
        </div>

        <div className="share-sheet-list">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              className="share-target"
              onClick={() => onShareToChat(chat.id)}
            >
              <div className="share-target-avatar">
                {chat.image ? (
                  <img src={chat.image} alt={chat.name} />
                ) : (
                  chat.initials
                )}
              </div>
              <div className="share-target-copy">
                <strong>{chat.name}</strong>
                <span>{chat.subtitle ?? chat.preview}</span>
              </div>
              <span className="share-target-cta">Send</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShareSheet;
