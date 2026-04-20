import MessageRow from '../components/MessageRow';
import ThreadMessage from '../components/ThreadMessage';
import './InboxScreen.css';

function InboxScreen({
  messages,
  activeThread,
  composerText,
  onComposerChange,
  onSendMessage,
  onOpenThread,
  onCloseThread,
  onOpenProduct,
}) {
  if (activeThread) {
    return (
      <section className="screen">
        <div className="screen-head inbox-thread-head">
          <button type="button" className="thread-back" onClick={onCloseThread}>
            {'<'}
          </button>
          <div>
            <div className="eyebrow">Inbox</div>
            <h1 className="screen-title">{activeThread.title}</h1>
            <div className="screen-subtitle">{activeThread.subtitle}</div>
          </div>
        </div>

        <div className="screen-scroll thread-scroll">
          <div className="thread-messages">
            {activeThread.messages.map((message, index) => (
              <ThreadMessage
                key={`${message.sender}-${index}`}
                message={message}
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>

          <div className="thread-composer">
            <form
              className="thread-composer-form"
              onSubmit={(event) => {
                event.preventDefault();
                onSendMessage();
              }}
            >
              <input
                className="thread-composer-input"
                value={composerText}
                onChange={(event) => onComposerChange(event.target.value)}
                placeholder={activeThread.composerPlaceholder}
              />
              <button type="submit" className="cta-button primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="screen">
      <div className="screen-head">
        <div className="eyebrow">Wardrobe</div>
        <h1 className="screen-title">Inbox</h1>
      </div>

      <div className="screen-scroll">
        <div className="search-box">Search messages...</div>
        <div className="chips">
          <button type="button" className="chip active">All</button>
          <button type="button" className="chip">Friends</button>
          <button type="button" className="chip">Groups</button>
          <button type="button" className="chip">Customers</button>
        </div>

        <div className="messages">
          {messages.map((message) => (
            <MessageRow key={message.id} message={message} onOpen={onOpenThread} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InboxScreen;
