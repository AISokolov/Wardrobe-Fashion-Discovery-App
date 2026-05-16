export const userImages = {
  you: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80',
  sofia: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
  jake: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
  emma: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80',
  liam: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  olivia: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
  noah: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=240&q=80',
  mia: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80',
  leo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=240&q=80',
  sana: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=240&q=80',
};

export const stories = [
  {
    id: 'you',
    initials: 'You',
    name: 'your fit',
    color: 'linear-gradient(135deg,#694720,#1a1510)',
    image: userImages.you,
    productId: 'arc-jacket',
  },
  {
    id: 'sofia',
    initials: 'SR',
    name: 'sofia_r',
    color: 'linear-gradient(135deg,#213651,#111726)',
    image: userImages.sofia,
    productId: 'vintage-scarf',
  },
  {
    id: 'jake',
    initials: 'JM',
    name: 'jake.m',
    color: 'linear-gradient(135deg,#163a2c,#101916)',
    image: userImages.jake,
    productId: 'nb-550',
  },
  {
    id: 'emma',
    initials: 'ES',
    name: 'emma.s',
    color: 'linear-gradient(135deg,#3a1c71,#d76d77)',
    image: userImages.emma,
    productId: 'uniqlo-heattech',
  },
  {
    id: 'liam',
    initials: 'LW',
    name: 'liam.w',
    color: 'linear-gradient(135deg,#ff7e5f,#feb47b)',
    image: userImages.liam,
    productId: 'adidas-samba',
  },
  {
    id: 'olivia',
    initials: 'OR',
    name: 'olivia.r',
    color: 'linear-gradient(135deg,#6a11cb,#2575fc)',
    image: userImages.olivia,
    productId: 'acne-scarf',
  },
  {
    id: 'noah',
    initials: 'NN',
    name: 'noah.n',
    color: 'linear-gradient(135deg,#ffafbd,#ffc3a0)',
    image: userImages.noah,
    productId: 'carhartt-beanie',
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
    image: userImages.mia,
  },
  {
    id: 'sofia',
    initials: 'SR',
    name: 'Sofia R.',
    preview: 'that jacket is EVERYTHING',
    time: '5m',
    count: 1,
    clickable: true,
    image: userImages.sofia,
  },
  {
    id: 'jake',
    initials: 'JM',
    name: 'Jake M.',
    preview: 'can I borrow the grey hoodie?',
    time: '12m',
    count: 0,
    clickable: true,
    image: userImages.jake,
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
        image: userImages.mia,
        text: 'Friday dinner fit check. Dropping the shirt option first.',
      },
      {
        initials: 'MI',
        sender: 'Mia',
        image: userImages.mia,
        productId: 'formal-shirt',
        note: 'This with navy trousers is clean.',
        reactions: ['Sana: save this', 'Leo: very sharp'],
      },
      {
        initials: 'YO',
        sender: 'You',
        own: true,
        image: userImages.you,
        text: 'Yeah this is exactly the lane I want.',
      },
      {
        initials: 'LE',
        sender: 'Leo',
        image: userImages.leo,
        productId: 'nb-550',
        note: 'Swap in these if you want to relax it a bit.',
        reactions: ['You: easy win', 'Mia: good balance'],
      },
      {
        initials: 'SA',
        sender: 'Sana',
        image: userImages.sana,
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
        image: userImages.sofia,
        text: 'I still think that Stone Island jacket is your best save.',
      },
      {
        initials: 'YO',
        sender: 'You',
        own: true,
        image: userImages.you,
        text: 'I know, I keep going back to it.',
      },
      {
        initials: 'SR',
        sender: 'Sofia',
        image: userImages.sofia,
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
        image: userImages.jake,
        text: 'You going casual or proper dinner fit tonight?',
      },
      {
        initials: 'YO',
        sender: 'You',
        own: true,
        image: userImages.you,
        text: 'Somewhere in between, clean but not too try-hard.',
      },
      {
        initials: 'JM',
        sender: 'Jake',
        image: userImages.jake,
        productId: 'nb-550',
        note: 'These keep it relaxed without making it sloppy.',
      },
    ],
  },
};

export const profile = {
  initial: 'A',
  image: userImages.you,
  username: 'alex.drip',
  handle: 'thrift addict · vintage lover · milan',
  tagline:
    'Profit is proxied through saves and outgoing affiliate clicks.',
  stats: [
    { label: 'Looks', value: '24' },
    { label: 'Inspired', value: '847' },
    { label: 'Following', value: '312' },
    { label: 'Profit', value: '642€', tone: 'good' },
  ],
  tabs: ['Posts', 'Shared', 'Tagged'],
};
