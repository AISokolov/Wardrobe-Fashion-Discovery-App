import { useEffect, useState } from 'react';
import './DropLookModal.css';

const EMPTY_FORM = {
  image: '',
  brand: '',
  name: '',
  price: '',
  category: 'Tops',
  caption: '',
  description: '',
  shopUrl: '',
};

function DropLookModal({ isOpen, categories, profile, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = {
      image: form.image.trim(),
      brand: form.brand.trim(),
      name: form.name.trim(),
      price: form.price.trim(),
      category: form.category,
      caption: form.caption.trim(),
      description: form.description.trim(),
      shopUrl: form.shopUrl.trim(),
    };

    if (!trimmed.image || !trimmed.brand || !trimmed.name || !trimmed.price || !trimmed.shopUrl) {
      setError('Image, brand, name, price and affiliate link are required.');
      return;
    }

    const priceNumber = Number(trimmed.price);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      setError('Price must be a positive number.');
      return;
    }

    onSubmit({
      ...trimmed,
      price: priceNumber,
    });
  };

  return (
    <div className="drop-modal" onClick={onClose} role="presentation">
      <form
        className="drop-card"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <header className="drop-head">
          <div>
            <div className="eyebrow">Profile</div>
            <h2 className="drop-title">Drop a Look</h2>
            <p className="drop-subtitle">Add a new piece to your feed.</p>
          </div>
          <button
            type="button"
            className="drop-close"
            onClick={onClose}
            aria-label="Close drop a look"
          >
            X
          </button>
        </header>

        <div className="drop-body">
          <label className="drop-field">
            <span>Image URL</span>
            <input
              type="url"
              value={form.image}
              onChange={updateField('image')}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </label>

          <div className="drop-row">
            <label className="drop-field">
              <span>Brand</span>
              <input
                type="text"
                value={form.brand}
                onChange={updateField('brand')}
                placeholder="Stone Island"
                required
              />
            </label>

            <label className="drop-field">
              <span>Name</span>
              <input
                type="text"
                value={form.name}
                onChange={updateField('name')}
                placeholder="Ghost Knit Hoodie"
                required
              />
            </label>
          </div>

          <div className="drop-row">
            <label className="drop-field">
              <span>Price (EUR)</span>
              <input
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={updateField('price')}
                placeholder="192"
                required
              />
            </label>

            <label className="drop-field">
              <span>Category</span>
              <select value={form.category} onChange={updateField('category')}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="drop-field">
            <span>Caption</span>
            <input
              type="text"
              value={form.caption}
              onChange={updateField('caption')}
              placeholder="quiet branding, expensive texture"
            />
          </label>

          <label className="drop-field">
            <span>Description</span>
            <textarea
              rows={2}
              value={form.description}
              onChange={updateField('description')}
              placeholder="Why this piece earns a spot in the feed."
            />
          </label>

          <label className="drop-field drop-field-affiliate">
            <span>Affiliate Link</span>
            <input
              type="url"
              value={form.shopUrl}
              onChange={updateField('shopUrl')}
              placeholder="https://www.zalando.com/your-affiliate-link"
              required
            />
            <small>Outgoing affiliate URL — earns when tapped from the product page.</small>
          </label>

          {error ? <div className="drop-error">{error}</div> : null}

          <div className="drop-author-hint">
            Posting as <strong>{profile?.username ?? 'you'}</strong>
          </div>
        </div>

        <div className="drop-actions">
          <button type="button" className="drop-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="drop-button primary">
            + Drop it
          </button>
        </div>
      </form>
    </div>
  );
}

export default DropLookModal;
