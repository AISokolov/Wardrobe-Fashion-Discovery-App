import './ProfileScreen.css';

function ProfileScreen({ profile, products, onOpenProduct }) {
  return (
    <section className="screen">
      <div className="screen-head">
        <div className="eyebrow">Wardrobe</div>
      </div>

      <div className="profile-body">
        <section className="profile-hero">
          <div className="profile-avatar">{profile.initial}</div>
          <h2 className="profile-name">{profile.username}</h2>
          <div className="profile-handle">{profile.handle}</div>
          <div className="profile-tagline">{profile.tagline}</div>

          <div className="panel-strip">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="stat">
                <span className={`stat-value ${stat.tone ?? ''}`.trim()}>{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="cta-row">
            <button type="button" className="cta-button">Edit Profile</button>
            <button type="button" className="cta-button primary">+ Drop a Look</button>
          </div>
        </section>

        <div className="profile-tabs">
          {profile.tabs.map((tab, index) => (
            <span key={tab} className={index === 0 ? 'active' : ''}>{tab}</span>
          ))}
        </div>

        <div className="profile-grid">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              className="profile-tile"
              onClick={() => onOpenProduct(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <span className="tile-like">{product.likes} likes</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileScreen;