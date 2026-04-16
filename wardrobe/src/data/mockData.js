export const stories = [
  {
    id: 'you',
    initials: 'You',
    name: 'your fit',
    color: 'linear-gradient(135deg,#694720,#1a1510)',
    productId: 'arc-jacket',
  },
  {
    id: 'sofia',
    initials: 'SR',
    name: 'sofia_r',
    color: 'linear-gradient(135deg,#213651,#111726)',
    productId: 'vintage-scarf',
  },
  {
    id: 'jake',
    initials: 'JM',
    name: 'jake.m',
    color: 'linear-gradient(135deg,#163a2c,#101916)',
    productId: 'nb-550',
  },
];

export const closetCategories = [
  'All',
  'Tops',
  'Bottoms',
  'Footwear',
  'Outerwear',
  'Accessories',
];

export const tabItems = [
  { id: 'explore', label: 'Explore', icon: 'spark' },
  { id: 'closet', label: 'Closet', icon: 'hanger' },
  { id: 'inbox', label: 'Inbox', icon: 'chat' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

export const messages = [
  {
    id: 'fits-council',
    initials: 'FC',
    name: 'The Fits Council',
    preview: 'Mia: omg that fit pic tho',
    time: '2m',
    count: 3,
    clickable: true,
  },
  {
    id: 'sofia',
    initials: 'SR',
    name: 'Sofia R.',
    preview: 'that jacket is EVERYTHING',
    time: '5m',
    count: 1,
    clickable: true,
  },
  {
    id: 'jake',
    initials: 'JM',
    name: 'Jake M.',
    preview: 'can I borrow the grey hoodie?',
    time: '12m',
    count: 0,
    clickable: true,
  },
];

export const inboxThreads = {
  'fits-council': {
    title: 'The Fits Council',
    subtitle: 'Mia, Leo, Sana',
    composerPlaceholder: 'Message The Fits Council...',
    messages: [
      {
        initials: 'MI',
        sender: 'Mia',
        text: 'Friday dinner fit check. Dropping the shirt option first.',
      },
      {
        initials: 'MI',
        sender: 'Mia',
        productId: 'formal-shirt',
        note: 'This with navy trousers is clean.',
        reactions: ['Sana: save this', 'Leo: very sharp'],
      },
      {
        initials: 'YO',
        sender: 'You',
        own: true,
        text: 'Yeah this is exactly the lane I want.',
      },
      {
        initials: 'LE',
        sender: 'Leo',
        productId: 'nb-550',
        note: 'Swap in these if you want to relax it a bit.',
        reactions: ['You: easy win', 'Mia: good balance'],
      },
      {
        initials: 'SA',
        sender: 'Sana',
        productId: 'stone-knit',
        note: 'And keep this on standby if it gets colder later.',
        reactions: ['You: texture is crazy'],
      },
    ],
  },
  sofia: {
    title: 'Sofia R.',
    subtitle: 'Styling chat',
    composerPlaceholder: 'Message Sofia...',
    messages: [
      {
        initials: 'SR',
        sender: 'Sofia',
        text: 'I still think that Stone Island jacket is your best save.',
      },
      {
        initials: 'YO',
        sender: 'You',
        own: true,
        text: 'I know, I keep going back to it.',
      },
      {
        initials: 'SR',
        sender: 'Sofia',
        productId: 'vintage-scarf',
        note: 'This would make the whole look feel more styled.',
      },
    ],
  },
  jake: {
    title: 'Jake M.',
    subtitle: 'Direct message',
    composerPlaceholder: 'Message Jake...',
    messages: [
      {
        initials: 'JM',
        sender: 'Jake',
        text: 'You going casual or proper dinner fit tonight?',
      },
      {
        initials: 'YO',
        sender: 'You',
        own: true,
        text: 'Somewhere in between, clean but not too try-hard.',
      },
      {
        initials: 'JM',
        sender: 'Jake',
        productId: 'nb-550',
        note: 'These keep it relaxed without making it sloppy.',
      },
    ],
  },
};

export const profile = {
  initial: 'A',
  username: 'alex.drip',
  handle: 'thrift addict · vintage lover · milan',
  tagline:
    'Profit is proxied through saves and outgoing affiliate clicks.',
  stats: [
    { label: 'Looks', value: '24' },
    { label: 'Inspired', value: '847' },
    { label: 'Following', value: '312' },
    { label: 'Profit', value: 'EUR 642', tone: 'good' },
  ],
  tabs: ['Posts', 'Shared', 'Tagged'],
};
