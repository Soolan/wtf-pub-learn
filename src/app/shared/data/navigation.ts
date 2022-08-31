import {Option} from '../models/navigation';

export const PRODUCTS: string[] = ['game', 'wallet', 'faucet', 'dex','learn'];
export const PROFILE: Option[] = [
  {label: 'Wallet', icon:'account_balance_wallet' },
  {label: 'Profile', icon:'account_circle' },
  {label: 'Dashboard', icon:'space_dashboard' },
  {icon: 'logout', label: 'Logout'},
];

export const DIALOG_DELAY: string = '100ms';
