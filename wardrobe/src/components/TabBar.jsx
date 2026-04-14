import './TabBar.css';

function TabIcon({ name }) {
  if (name === 'spark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />
      </svg>
    );
  }

  if (name === 'hanger') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 4a2 2 0 1 1 2 2c0 1.5-1.2 2.2-2.1 2.9l-6.8 5.4A1 1 0 0 0 3.7 16h16.6a1 1 0 0 0 .6-1.8l-6.8-5.4C13.2 8.2 12 7.5 12 6" />
      </svg>
    );
  }

  if (name === 'chat') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function TabBar({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="tab-bar" aria-label="Primary">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">
            <TabIcon name={tab.icon} />
          </span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default TabBar;
