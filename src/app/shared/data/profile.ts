export enum Activity {
  Register,
  Login,
  Deposit,
  Withdrawal,
  ProfileUpdate,
  Suspicious,
  Delete
}

export const ACTIVITY: string[] =  ["Register", "Login", "Deposit", "Withdrawal", "ProfileUpdate", "Suspicious", "Delete"];

export enum Loyalty {
  Bronze,
  Silver,
  Gold,
  Platinum,
}

export const LOYALTY: string[] =  ["Bronze", "Silver", "Gold", "Platinum"];

export enum Achievement {
  Finisher,
  Gambler,
  Wizard
}

export const ACHIEVEMENT: string[] =  ["Finisher", "Gambler", "Wizard"];

