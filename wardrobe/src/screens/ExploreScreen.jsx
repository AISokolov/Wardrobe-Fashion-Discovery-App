import { useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import './ExploreScreen.css';

function ExploreScreen({
  products,
  stories,
  likedIds,
  savedIds,
  onToggleLike,
  onToggleSave,
  onShare,
  onOpenProduct,
  onOpenStory,
}) {
  const feedRef = useRef(null);
  const snapTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (snapTimeoutRef.current) {
        window.clearTimeout(snapTimeoutRef.current);
      }
    };
  }, []);

  const handleFeedScroll = () => {
    if (snapTimeoutRef.current) {
      window.clearTimeout(snapTimeoutRef.current);
    }

    snapTimeoutRef.current = window.setTimeout(() => {
      const feed = feedRef.current;

      if (!feed) {
        return;
      }

      const itemHeight = feed.clientHeight;
      const progress = feed.scrollTop / itemHeight;
      const baseIndex = Math.floor(progress);
      const nextIndex =
        progress - baseIndex >= 0.5
          ? Math.min(baseIndex + 1, products.length - 1)
          : baseIndex;

      feed.scrollTo({
        top: nextIndex * itemHeight,
        behavior: 'smooth',
      });
    }, 90);
  };

  return (
    <section className="screen">
      <div className="screen-head explore-head">
        <div className="eyebrow">Wardrobe</div>
        <h1 className="screen-title">A Feed Worth Wearing</h1>
      </div>

      <div className="stories">
        {stories.map((story) => (
          <button
            key={story.id}
            type="button"
            className="story-pill"
            onClick={() => onOpenStory(story.id)}
          >
            <div className="story-avatar" style={{ background: story.color }}>
              {story.image ? (
                <img src={story.image} alt={story.name} />
              ) : (
                story.initials
              )}
            </div>
            <div className="story-name">{story.name}</div>
          </button>
        ))}
      </div>

      <div ref={feedRef} className="feed-list" onScroll={handleFeedScroll}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            liked={likedIds.has(product.id)}
            saved={savedIds.has(product.id)}
            onLike={() => onToggleLike(product.id)}
            onSave={() => onToggleSave(product.id)}
            onShare={() => onShare(product.id)}
            onOpen={() => onOpenProduct(product.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default ExploreScreen;
