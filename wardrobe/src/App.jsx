import { useEffect, useMemo, useState } from 'react';
import './App.css';
import ProductModal from './components/ProductModal';
import ShareSheet from './components/ShareSheet';
import StoryViewer from './components/StoryViewer';
import TabBar from './components/TabBar';
import { inboxThreads, messages as initialMessages, profile, stories, tabItems } from './data/mockData';
import products from './data/products.json';
import ExploreScreen from './screens/ExploreScreen';
import ClosetScreen from './screens/ClosetScreen';
import InboxScreen from './screens/InboxScreen';
import ProfileScreen from './screens/ProfileScreen';
import { DEFAULT_FILTER, DEFAULT_LIKED, DEFAULT_SAVED, DEFAULT_TAB, STORAGE_KEY } from './utils/constants';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function cloneThreads() {
  return JSON.parse(JSON.stringify(inboxThreads));
}

function getPreview(message, productMap) {
  if (!message) {
    return 'Start chatting';
  }

  if (message.productId) {
    const product = productMap[message.productId];
    return `${message.own ? 'You' : message.sender}: shared ${product?.name ?? 'a product'}`;
  }

  if (message.text) {
    return `${message.own ? 'You' : message.sender}: ${message.text}`;
  }

  return 'New message';
}

function App() {
  const persisted = readStorage();
  const [activeTab, setActiveTab] = useState(persisted?.activeTab ?? DEFAULT_TAB);
  const [activeFilter, setActiveFilter] = useState(persisted?.activeFilter ?? DEFAULT_FILTER);
  const [savedIds, setSavedIds] = useState(new Set(persisted?.saved ?? DEFAULT_SAVED));
  const [likedIds, setLikedIds] = useState(new Set(persisted?.liked ?? DEFAULT_LIKED));
  const [threadState, setThreadState] = useState(cloneThreads);
  const [selectedSizes, setSelectedSizes] = useState(() =>
    Object.fromEntries(products.map((product) => [product.id, product.selectedSize])),
  );
  const [activeDetailId, setActiveDetailId] = useState(null);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [composerText, setComposerText] = useState('');
  const [shareProductId, setShareProductId] = useState(null);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeTab,
        activeFilter,
        saved: [...savedIds],
        liked: [...likedIds],
      }),
    );
  }, [activeFilter, activeTab, likedIds, savedIds]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const productMap = useMemo(
    () => Object.fromEntries(products.map((product) => [product.id, product])),
    [],
  );

  const savedProducts = useMemo(
    () => products.filter((product) => savedIds.has(product.id)),
    [savedIds],
  );

  const filteredSavedProducts = useMemo(() => {
    if (activeFilter === DEFAULT_FILTER) {
      return savedProducts;
    }

    return savedProducts.filter((product) => product.category === activeFilter);
  }, [activeFilter, savedProducts]);

  const chatList = useMemo(
    () =>
      initialMessages.map((chat) => {
        if (!chat.clickable || !threadState[chat.id]) {
          return chat;
        }

        const threadMessages = threadState[chat.id].messages;
        const lastMessage = threadMessages[threadMessages.length - 1];

        return {
          ...chat,
          subtitle: threadState[chat.id].subtitle,
          preview: getPreview(lastMessage, productMap),
          count: activeThreadId === chat.id ? 0 : chat.count,
          time: activeThreadId === chat.id ? 'now' : chat.time,
        };
      }),
    [activeThreadId, productMap, threadState],
  );

  const shareableChats = useMemo(
    () => chatList.filter((chat) => chat.clickable && threadState[chat.id]),
    [chatList, threadState],
  );

  const resolvedStories = useMemo(
    () =>
      stories.map((story) => ({
        ...story,
        product: productMap[story.productId],
      })),
    [productMap],
  );

  const activeStoryIndex = resolvedStories.findIndex((story) => story.id === activeStoryId);

  const activeProduct = activeDetailId ? productMap[activeDetailId] : null;
  const activeSelectedSize = activeProduct ? selectedSizes[activeProduct.id] : null;
  const shareProduct = shareProductId ? productMap[shareProductId] : null;

  const activeThread = activeThreadId
    ? {
        id: activeThreadId,
        ...threadState[activeThreadId],
        messages: threadState[activeThreadId].messages.map((message) => ({
          ...message,
          product: message.productId ? productMap[message.productId] : undefined,
        })),
      }
    : null;

  const toggleSetValue = (setter, collection, id) => {
    setter((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

    return !collection.has(id);
  };

  const appendThreadMessage = (threadId, message) => {
    setThreadState((current) => ({
      ...current,
      [threadId]: {
        ...current[threadId],
        messages: [...current[threadId].messages, message],
      },
    }));
  };

  const handleToggleLike = (id) => {
    toggleSetValue(setLikedIds, likedIds, id);
  };

  const handleToggleSave = (id) => {
    const added = toggleSetValue(setSavedIds, savedIds, id);
    setToast(added ? 'Added to closet' : 'Removed from closet');
  };

  const handleOpenShare = (productId) => {
    setActiveDetailId(null);
    setShareProductId(productId);
  };

  const handleSelectSize = (productId, size) => {
    const product = productMap[productId];

    if (!product || product.unavailableSizes?.includes(size)) {
      return;
    }

    setSelectedSizes((current) => ({
      ...current,
      [productId]: size,
    }));
  };

  const handleShareToChat = (threadId) => {
    if (!shareProductId) {
      return;
    }

    appendThreadMessage(threadId, {
      initials: 'YO',
      sender: 'You',
      own: true,
      productId: shareProductId,
      note: 'Shared this with you.',
    });

    setShareProductId(null);
    setActiveTab('inbox');
    setActiveThreadId(threadId);
    setToast('Product shared to chat');
  };

  const handleSendMessage = () => {
    const nextMessage = composerText.trim();

    if (!activeThreadId || !nextMessage) {
      return;
    }

    appendThreadMessage(activeThreadId, {
      initials: 'YO',
      sender: 'You',
      own: true,
      text: nextMessage,
    });
    setComposerText('');
  };

  const openProduct = (id) => setActiveDetailId(id);

  const renderActiveScreen = () => {
    if (activeTab === 'explore') {
      return (
        <ExploreScreen
          products={products}
          stories={resolvedStories}
          likedIds={likedIds}
          savedIds={savedIds}
          onToggleLike={handleToggleLike}
          onToggleSave={handleToggleSave}
          onShare={handleOpenShare}
          onOpenProduct={openProduct}
          onOpenStory={setActiveStoryId}
        />
      );
    }

    if (activeTab === 'closet') {
      return (
        <ClosetScreen
          products={filteredSavedProducts}
          savedProducts={savedProducts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onOpenProduct={openProduct}
        />
      );
    }

    if (activeTab === 'inbox') {
      return (
        <InboxScreen
          messages={chatList}
          activeThread={activeThread}
          composerText={composerText}
          onComposerChange={setComposerText}
          onSendMessage={handleSendMessage}
          onOpenThread={(threadId) => {
            setActiveThreadId(threadId);
            setComposerText('');
          }}
          onCloseThread={() => {
            setActiveThreadId(null);
            setComposerText('');
          }}
          onOpenProduct={openProduct}
        />
      );
    }

    return (
      <ProfileScreen
        profile={profile}
        products={products.slice(0, 6)}
        onOpenProduct={openProduct}
      />
    );
  };

  return (
    <div className="app-shell">
      <div className="desktop-stage">
        <div className="phone-shell">
          <div className="phone-glow" />
          <div className="phone-bezel">
            <div className="phone-notch" />
            <div className="app-surface">
              <header className="status-bar" aria-hidden="true">
                <span>9:41</span>
                <div className="status-icons">
                  <span />
                  <span />
                  <span />
                </div>
              </header>

              <main className="app-content">{renderActiveScreen()}</main>

              <TabBar tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={Boolean(activeProduct)}
        product={activeProduct}
        liked={activeProduct ? likedIds.has(activeProduct.id) : false}
        saved={activeProduct ? savedIds.has(activeProduct.id) : false}
        selectedSize={activeSelectedSize}
        onClose={() => setActiveDetailId(null)}
        onLike={() => activeProduct && handleToggleLike(activeProduct.id)}
        onSave={() => activeProduct && handleToggleSave(activeProduct.id)}
        onShare={() => activeProduct && handleOpenShare(activeProduct.id)}
        onSelectSize={(size) => activeProduct && handleSelectSize(activeProduct.id, size)}
        onShop={() =>
          activeProduct && window.open(activeProduct.shopUrl, '_blank', 'noopener,noreferrer')
        }
      />

      <ShareSheet
        isOpen={Boolean(shareProduct)}
        chats={shareableChats}
        product={shareProduct}
        onClose={() => setShareProductId(null)}
        onShareToChat={handleShareToChat}
      />

      <StoryViewer
        isOpen={activeStoryIndex >= 0}
        stories={resolvedStories}
        activeIndex={activeStoryIndex >= 0 ? activeStoryIndex : null}
        onClose={() => setActiveStoryId(null)}
        onNext={() => setActiveStoryId(resolvedStories[activeStoryIndex + 1]?.id ?? null)}
        onPrevious={() => setActiveStoryId(resolvedStories[activeStoryIndex - 1]?.id ?? null)}
      />

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}

export default App;
