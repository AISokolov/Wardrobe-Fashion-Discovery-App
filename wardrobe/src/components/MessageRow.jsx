import './MessageRow.css';

function MessageRow({ message, onOpen }) {
  if (message.clickable) {
    return (
      <button type="button" className="message-row clickable" onClick={() => onOpen(message.id)}>
        <div className="message-avatar">{message.initials}</div>
        <div>
          <strong className="message-name">{message.name}</strong>
          <div className="message-preview">{message.preview}</div>
        </div>
        <div>
          <div className="message-time">{message.time}</div>
          {message.count ? <div className="message-count">{message.count}</div> : <div className="message-meta">.</div>}
        </div>
      </button>
    );
  }

  return (
    <div className="message-row">
      <div className="message-avatar">{message.initials}</div>
      <div>
        <strong className="message-name">{message.name}</strong>
        <div className="message-preview">{message.preview}</div>
      </div>
      <div>
        <div className="message-time">{message.time}</div>
        {message.count ? <div className="message-count">{message.count}</div> : <div className="message-meta">.</div>}
      </div>
    </div>
  );
}

export default MessageRow;