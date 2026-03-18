const STORAGE_KEY = "wardrobe-prototype-v1";
const DEFAULT_TAB = "explore";
const DEFAULT_FILTER = "All";

const state = {
  products: [],
  activeTab: DEFAULT_TAB,
  activeFilter: DEFAULT_FILTER,
  activeDetailId: null,
  saved: new Set(),
  liked: new Set(),
  toastTimer: null,
};

const app = document.getElementById("app");
const modal = document.getElementById("detail-modal");
const tabButtons = document.querySelectorAll(".tab-button");

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const stories = [
  { initials: "You", name: "your fit", color: "linear-gradient(135deg,#694720,#1a1510)" },
  { initials: "SR", name: "sofia_r", color: "linear-gradient(135deg,#213651,#111726)" },
  { initials: "JM", name: "jake.m", color: "linear-gradient(135deg,#163a2c,#101916)" },
  { initials: "VH", name: "vintghunt", color: "linear-gradient(135deg,#4d2122,#1e1213)" },
  { initials: "PK", name: "priya.k", color: "linear-gradient(135deg,#36204c,#17101d)" },
];

const messages = [
  { initials: "FC", name: "The Fits Council", preview: "Mia: omg that fit pic tho", time: "2m", count: 3 },
  { initials: "SR", name: "Sofia R.", preview: "that jacket is EVERYTHING", time: "5m", count: 1 },
  { initials: "JM", name: "Jake M.", preview: "can I borrow the grey hoodie?", time: "12m", count: 0 },
  { initials: "SD", name: "Summer Drip", preview: "You: lmaooo the shorts though", time: "1h", count: 0 },
  { initials: "PK", name: "Priya K.", preview: "she liked your outfit post", time: "3h", count: 0 },
  { initials: "VH", name: "Vintage Hunters", preview: "Alex: found a Helmut Lang jacket!", time: "5h", count: 7 },
];

async function init() {
  await loadProducts();
  loadPersistedState();
  render();
  bindEvents();
}

async function loadProducts() {
  const response = await fetch("./data/products.json");
  state.products = await response.json();
}

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state.saved = new Set(["arc-jacket", "levi-501", "nb-550", "vintage-scarf"]);
      state.liked = new Set(["arc-jacket", "stone-knit"]);
      return;
    }

    const parsed = JSON.parse(raw);
    state.saved = new Set(parsed.saved ?? []);
    state.liked = new Set(parsed.liked ?? []);
    state.activeTab = parsed.activeTab ?? DEFAULT_TAB;
    state.activeFilter = parsed.activeFilter ?? DEFAULT_FILTER;
  } catch {
    state.saved = new Set(["arc-jacket", "levi-501", "nb-550", "vintage-scarf"]);
    state.liked = new Set(["arc-jacket", "stone-knit"]);
  }
}

function persistState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      saved: [...state.saved],
      liked: [...state.liked],
      activeTab: state.activeTab,
      activeFilter: state.activeFilter,
    }),
  );
}

function bindEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  const tab = event.target.closest("[data-tab]");

  if (tab) {
    state.activeTab = tab.dataset.tab;
    persistState();
    render();
    return;
  }

  if (!button) {
    if (event.target === modal) {
      closeDetail();
    }
    return;
  }

  const { action, id, category } = button.dataset;

  if (action === "toggle-like") {
    toggleSet(state.liked, id);
    persistState();
    render();
  }

  if (action === "toggle-save") {
    toggleSet(state.saved, id);
    persistState();
    render();
    showToast(state.saved.has(id) ? "Saved to closet" : "Removed from closet");
  }

  if (action === "open-detail") {
    state.activeDetailId = id;
    renderModal();
  }

  if (action === "close-detail") {
    closeDetail();
  }

  if (action === "shop") {
    const product = getProductById(id);
    if (product) {
      window.open(product.shopUrl, "_blank", "noopener,noreferrer");
    }
  }

  if (action === "share") {
    const product = getProductById(id);
    if (product) {
      shareProduct(product);
    }
  }

  if (action === "set-filter") {
    state.activeFilter = category;
    persistState();
    render();
  }
}

function handleKeydown(event) {
  if (event.key === "Escape" && state.activeDetailId) {
    closeDetail();
  }
}

function toggleSet(set, id) {
  if (set.has(id)) {
    set.delete(id);
    return;
  }

  set.add(id);
}

function closeDetail() {
  state.activeDetailId = null;
  renderModal();
}

function getProductById(id) {
  return state.products.find((product) => product.id === id);
}

function getSavedProducts() {
  return state.products.filter((product) => state.saved.has(product.id));
}

function getFilteredSavedProducts() {
  const savedProducts = getSavedProducts();

  if (state.activeFilter === DEFAULT_FILTER) {
    return savedProducts;
  }

  return savedProducts.filter((product) => product.category === state.activeFilter);
}

function render() {
  app.innerHTML = `
    ${renderExploreScreen()}
    ${renderClosetScreen()}
    ${renderInboxScreen()}
    ${renderProfileScreen()}
  `;

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });

  renderModal();
}

function renderExploreScreen() {
  const cards = state.products
    .map((product) => {
      const liked = state.liked.has(product.id);
      const saved = state.saved.has(product.id);
      const likeCount = product.likes + (liked ? 1 : 0);

      return `
        <article class="feed-card">
          <div class="feed-image">
            <div class="feed-actions" aria-label="Post actions">
              <button class="action-button ${liked ? "active" : ""}" data-action="toggle-like" data-id="${product.id}" aria-label="Like ${product.name}">
                <span class="action-icon">♡</span>
                <span class="action-meta">${compactFormatter.format(likeCount)}</span>
              </button>
              <button class="action-button ${saved ? "active" : ""}" data-action="toggle-save" data-id="${product.id}" aria-label="Save ${product.name}">
                <span class="action-icon">✦</span>
                <span class="action-meta">${saved ? "Saved" : "Save"}</span>
              </button>
              <button class="action-button" data-action="share" data-id="${product.id}" aria-label="Share ${product.name}">
                <span class="action-icon">↗</span>
                <span class="action-meta">Share</span>
              </button>
            </div>

            <button class="feed-card-click" data-action="open-detail" data-id="${product.id}" aria-label="Open ${product.name} details">
              <img src="${product.image}" alt="${product.name}" />
            </button>

            <div class="feed-meta">
              <div class="author-chip">
                <div class="author-avatar">${product.author.initials}</div>
                <div class="author-info">
                  <strong>@${product.author.handle}</strong>
                  <span>${product.author.rank}</span>
                </div>
              </div>

              <div>
                <span class="product-brand">${product.brand}</span>
                <strong class="product-title">${product.name}</strong>
              </div>

              <div class="product-tags">
                <span class="tag">#${product.brandSlug}</span>
                <span class="tag">#${product.dropTag}</span>
                <span class="price-tag">${priceFormatter.format(product.price)}</span>
              </div>

              <p class="feed-caption">${product.caption}</p>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="screen ${state.activeTab === "explore" ? "active" : ""}">
      <div class="screen-head">
        <div class="eyebrow">Wardrobe</div>
        <h1 class="screen-title">A Feed Worth Wearing</h1>
        <p class="screen-subtitle">Scroll the looks, save what lands, and open any product for the full affiliate card.</p>
      </div>

      <div class="stories">
        ${stories
          .map(
            (story) => `
              <div class="story-pill">
                <div class="story-avatar" style="background:${story.color}">${story.initials}</div>
                <div class="story-name">${story.name}</div>
              </div>
            `,
          )
          .join("")}
      </div>

      <div class="feed-list">${cards}</div>
    </section>
  `;
}

function renderClosetScreen() {
  const savedProducts = getSavedProducts();
  const filteredProducts = getFilteredSavedProducts();
  const uniqueBrands = new Set(savedProducts.map((product) => product.brand)).size;
  const totalValue = savedProducts.reduce((sum, product) => sum + product.price, 0);

  const chips = ["All", "Tops", "Bottoms", "Footwear", "Outerwear", "Accessories"]
    .map(
      (category) => `
        <button class="chip ${state.activeFilter === category ? "active" : ""}" data-action="set-filter" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join("");

  const closetItems = filteredProducts.length
    ? filteredProducts
        .map(
          (product) => `
            <button class="closet-card" data-action="open-detail" data-id="${product.id}">
              <div class="closet-card-frame">
                <div class="closet-image">
                  <img src="${product.image}" alt="${product.name}" />
                </div>
                <span class="save-badge">✦</span>
              </div>
              <div class="closet-copy">
                <strong>${product.name}</strong>
                <div class="closet-meta">${priceFormatter.format(product.price)} · ${product.category}</div>
              </div>
            </button>
          `,
        )
        .join("")
    : `
      <div class="empty-state">
        <strong>No saved pieces in ${state.activeFilter.toLowerCase()} yet.</strong>
        <p>Save products from Explore and they will land here instantly.</p>
      </div>
    `;

  return `
    <section class="screen ${state.activeTab === "closet" ? "active" : ""}">
      <div class="screen-head">
        <div class="eyebrow">Wardrobe</div>
        <h1 class="screen-title">Closet</h1>
      </div>

      <div class="stats-row">
        <div class="stat">
          <span class="stat-value">${savedProducts.length}</span>
          <span class="stat-label">Looks</span>
        </div>
        <div class="stat">
          <span class="stat-value">${uniqueBrands}</span>
          <span class="stat-label">Brands</span>
        </div>
        <div class="stat">
          <span class="stat-value">${priceFormatter.format(totalValue)}</span>
          <span class="stat-label">Value</span>
        </div>
      </div>

      <div class="chips">${chips}</div>

      <div class="screen-scroll">
        <div class="closet-grid">
          ${closetItems}
          <div class="add-card">
            <span><strong>+</strong>Add item</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderInboxScreen() {
  return `
    <section class="screen ${state.activeTab === "inbox" ? "active" : ""}">
      <div class="screen-head">
        <div class="eyebrow">Wardrobe</div>
        <h1 class="screen-title">Inbox</h1>
      </div>

      <div class="screen-scroll">
        <div class="search-box">⌕ Search messages...</div>
        <div class="chips">
          <button class="chip active">All</button>
          <button class="chip">Friends</button>
          <button class="chip">Groups</button>
          <button class="chip">Customers</button>
        </div>

        <div class="messages">
          ${messages
            .map(
              (message) => `
                <div class="message-row">
                  <div class="message-avatar">${message.initials}</div>
                  <div>
                    <strong class="message-name">${message.name}</strong>
                    <div class="message-preview">${message.preview}</div>
                  </div>
                  <div>
                    <div class="message-time">${message.time}</div>
                    ${message.count ? `<div class="message-count">${message.count}</div>` : `<div class="message-meta">·</div>`}
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProfileScreen() {
  const gallery = state.products
    .slice(0, 6)
    .map(
      (product) => `
        <button class="profile-tile" data-action="open-detail" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <span class="tile-like">♥ ${compactFormatter.format(product.likes)}</span>
        </button>
      `,
    )
    .join("");

  return `
    <section class="screen ${state.activeTab === "profile" ? "active" : ""}">
      <div class="screen-head">
        <div class="eyebrow">Wardrobe</div>
      </div>

      <div class="profile-body">
        <section class="profile-hero">
          <div class="profile-avatar">A</div>
          <h2 class="profile-name">alex.drip</h2>
          <div class="profile-handle">thrift addict · vintage lover · milan</div>
          <div class="profile-tagline">Profit is proxied through saves and outgoing affiliate clicks.</div>

          <div class="panel-strip">
            <div class="stat">
              <span class="stat-value">24</span>
              <span class="stat-label">Looks</span>
            </div>
            <div class="stat">
              <span class="stat-value">847</span>
              <span class="stat-label">Inspired</span>
            </div>
            <div class="stat">
              <span class="stat-value">312</span>
              <span class="stat-label">Following</span>
            </div>
            <div class="stat">
              <span class="stat-value good">${priceFormatter.format(642)}</span>
              <span class="stat-label">Profit</span>
            </div>
          </div>

          <div class="cta-row">
            <button class="cta-button">Edit Profile</button>
            <button class="cta-button primary">+ Drop a Look</button>
          </div>
        </section>

        <div class="profile-tabs">
          <span class="active">Posts</span>
          <span>Shared</span>
          <span>Tagged</span>
        </div>

        <div class="profile-grid">${gallery}</div>
      </div>
    </section>
  `;
}

function renderModal() {
  const product = state.activeDetailId ? getProductById(state.activeDetailId) : null;

  if (!product) {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = "";
    return;
  }

  const saved = state.saved.has(product.id);
  const liked = state.liked.has(product.id);

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  modal.innerHTML = `
    <article class="detail-card" role="dialog" aria-modal="true" aria-label="${product.name}">
      <div class="detail-top">
        <img src="${product.image}" alt="${product.name}" />
        <button class="detail-close" data-action="close-detail" aria-label="Close detail">✕</button>
      </div>

      <div class="detail-body">
        <div class="product-brand">${product.brand}</div>
        <h2 class="product-title">${product.name}</h2>
        <div class="screen-subtitle">${product.collection} · Style ${product.styleCode}</div>
        <div class="detail-price">${priceFormatter.format(product.price)}</div>

        <div class="screen-subtitle">Select size</div>
        <div class="size-row">
          ${product.sizes
            .map(
              (size) => `
                <span class="size-pill ${size === product.selectedSize ? "active" : ""}">${size}</span>
              `,
            )
            .join("")}
        </div>

        <div class="screen-subtitle">Sold by</div>
        <div class="seller-card">
          <div>
            <strong>${product.seller.name}</strong>
            <div class="screen-subtitle">${product.seller.note}</div>
            <div class="screen-subtitle">${product.seller.rating} · ${product.seller.reviews} reviews</div>
          </div>
          <span class="verified-pill">Verified</span>
        </div>

        <div class="detail-grid">
          <div class="mini-card">
            <div class="screen-subtitle">Material</div>
            <strong>${product.material}</strong>
          </div>
          <div class="mini-card">
            <div class="screen-subtitle">Shipping</div>
            <strong>${product.shipping}</strong>
          </div>
          <div class="mini-card">
            <div class="screen-subtitle">Affiliate</div>
            <strong>${product.affiliateCut}</strong>
          </div>
        </div>

        <div class="detail-list">
          <div class="detail-list-row"><span>Category</span><span>${product.category}</span></div>
          <div class="detail-list-row"><span>Drop</span><span>${product.dropTag}</span></div>
          <div class="detail-list-row"><span>Why it fits</span><span>${product.description}</span></div>
        </div>

        <div class="detail-actions">
          <button class="detail-button ${liked ? "active" : ""}" data-action="toggle-like" data-id="${product.id}">
            ${liked ? "Liked" : "Like"}
          </button>
          <button class="detail-button ${saved ? "active" : ""}" data-action="toggle-save" data-id="${product.id}">
            ${saved ? "Saved" : "Save"}
          </button>
        </div>

        <div class="detail-actions">
          <button class="detail-button" data-action="share" data-id="${product.id}">Share</button>
          <button class="detail-button primary" data-action="shop" data-id="${product.id}">
            Shop via Affiliate Link
          </button>
        </div>
      </div>
    </article>
  `;
}

async function shareProduct(product) {
  const shareData = {
    title: `${product.brand} ${product.name}`,
    text: `${product.caption} ${product.shopUrl}`,
    url: product.shopUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    showToast("Product link copied");
  } catch {
    showToast("Share cancelled");
  }
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.remove(), 1800);
}

init();
