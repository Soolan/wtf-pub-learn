import {Denial} from '../models/denial';
import {CryptoSymbol} from './enums';
import {Balance} from '../models/balance';

export const STATUSES = ['Start', 'Resume', 'Retake'];

export const LEVELS = ['Easy', 'Moderate', 'Advanced'];

export const ACTIONS = [
  'welcome!',
  'read & proceed',
  'pick the right answer',
  'pick the right answer',
  'type in the right answer',
  'pick the right answer',
  'multiple choice question',
  'swipe to the left or right',
  'match: answers->questions',
  '',
  '',
  'poll: pick anything',
  'congratulations!'
];

export const OPTIONS_BREAKPOINT = 25;

export const BLANK_PLACEHOLDER = "------";

export const BLANK_SPACES = ['start', 'end'];

export const POSITIONS = ['Top', 'Bottom', 'Left', 'Right'];

export const LANDING = {
  heading: {
    content: "Crypto,",
    keyword: "Crypto"
  },
  subheading: "the fun way.",
  description:[
    {
      content: "Understand the crypto buzzwords, ",
      keyword: "crypto"
    },
    {
      content: "in a playful way, ",
      keyword: "playful"
    },
    {
      content: "one course at a time.",
      keyword: "course"
    },
  ],
  bullets: [
    {title: 'Blockchain', description: 'All you can learn!', icon: 'logo-blt.png', navigate: 'courses'},
    {title: 'LOOR', description: 'Financial freedom game', icon: 'loor-character.png', navigate: 'https://loor'},
    {title: 'Free WTF', description: 'Show me the money!', icon: 'logo-branding.png', navigate: 'https://faucet'},
    {title: 'Marketplace', description: 'Authentic NFTs', icon: 'logo-grey-white-glow.png', navigate: 'https://nft'},
  ]
};

export const DENIAL_REASONS: Denial[] = [
  {reason: '', remedy: '', action: ''},
  {reason: 'Your session has expired.', remedy: 'Please login again.', action: 'Login'},
  {reason: 'Your account has been suspended.', remedy: 'Please reach out customer service to appeal.', action: 'Customer Service'},
  {reason: 'You don\'t have permission to access this page.', remedy: 'Please upgrade to access this page.', action: 'Upgrade'},
  {reason: 'Your profile needs verification.', remedy: 'Please click on the activation link in the email.', action: 'Resend Email'},
  {reason: 'Just Because!', remedy: 'Beg!', action: 'Beg More!'},
];

export const CRYPTO_SYMBOLS = ["XRP", "WTF"];

export const WELCOME_FUND: Balance = {
  currency: CryptoSymbol.WTF,
  amount: 5
}

export const HOT_TAG = 1000;

export const EVENTS = [
  {label: "[Welcome]", icon: ''},
  {label: "[Ping]", icon: ''},
  {label: "made a payment", icon: ''},
  {label: "registered", icon: ''},
  {label: "logged in", icon: ''},
  {label: "started a course", icon: ''},
  {label: "completed a course", icon: ''},
  {label: "started a lesson", icon: ''},
  {label: "completed a lesson", icon: ''},
  {label: "passed exam", icon: ''},
  {label: "issued NFT", icon: ''},
  {label: "is certified!", icon: ''},
  {label: "started a game", icon: ''},
  {label: "won!", icon: ''},
  {label: "reported a bug", icon: ''},
  ];
