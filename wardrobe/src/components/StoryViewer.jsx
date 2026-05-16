import './StoryViewer.css';

function StoryViewer({ isOpen, stories, activeIndex, onClose, onNext, onPrevious }) {
  if (!isOpen || activeIndex === null || !stories[activeIndex]) {
    return null;
  }

  const story = stories[activeIndex];
  const isLast = activeIndex === stories.length - 1;
  const isFirst = activeIndex === 0;

  return (
    <div className="story-viewer-backdrop" onClick={onClose} role="presentation">
      <div
        className="story-viewer"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${story.name} story`}
      >
        <div className="story-progress">
          {stories.map((item, index) => (
            <span
              key={item.id}
              className={`story-progress-bar ${index <= activeIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="story-viewer-head">
          <div className="story-viewer-user">
            <div className="story-avatar story-avatar-large" style={{ background: story.color }}>
              {story.image ? (
                <img src={story.image} alt={story.name} />
              ) : (
                story.initials
              )}
            </div>
            <div>
              <strong>{story.name}</strong>
              <div className="story-viewer-meta">Product spotlight</div>
            </div>
          </div>
          <button type="button" className="story-viewer-close" onClick={onClose}>
            X
          </button>
        </div>

        <div className="story-viewer-body">
          <img src={story.product.image} alt={story.product.name} />
          <div className="story-viewer-overlay">
            <span className="product-brand">{story.product.brand}</span>
            <h2 className="story-viewer-title">{story.product.name}</h2>
            <p className="story-viewer-caption">{story.product.caption}</p>
            <button type="button" className="story-viewer-chip">
              Tap product in feed for full details
            </button>
          </div>
        </div>

        <div className="story-viewer-actions">
          <button
            type="button"
            className="story-nav-button"
            onClick={onPrevious}
            disabled={isFirst}
          >
            Previous
          </button>
          <button
            type="button"
            className="story-nav-button primary"
            onClick={isLast ? onClose : onNext}
          >
            {isLast ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryViewer;
