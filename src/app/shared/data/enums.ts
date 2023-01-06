export enum SlideType {
  Start,
  Static,
  SingleChoice,
  MultipleChoice,
  FixedFillIn,
  MixedFillIn,
  HintFillIn,
  Swipe,
  Match,
  EasyReview,
  HardReview,
  Poll,
  Summary
}

export enum Position {
  Top,
  Bottom,
  Left,
  Right
}

export enum Status {
  Start,
  Resume,
  Retake
}

export enum Operation {
  Add,
  Remove,
  Edit,
}

export enum Level {
  Easy,
  Moderate,
  Advanced
}

export enum WtfProduct {
  Website,
  Learn,
  Dashboard,
  Loor,
  Wallet,
  Faucet,
  NFT,
  DEX
}

export enum BillableItem {
  Course,
  Exam,
  Certificate
}

export enum Cost {
  Free,
  Paid
}

export enum Difficulty {
  Easy,
  Moderate,
  Hard
}

export enum EventType {
  Greetings,
  HealthCheck,
  Payment,
  Faucet,
  Registration,
  Login,
  CourseStarted,
  CourseCompleted,
  LessonStarted,
  LessonCompleted,
  ExamPassed,
  NFTIssued,
  Certified,
  GameStarted,
  Winner,
  BugReport,
}

export enum DenialReason {
  NoReasonToDeny,
  SessionExpired,
  AccountSuspended,
  AccountNotVerified,
  RestrictedArea,
  JustBecause
}

export enum TxType {
  Payment
}

export enum CryptoSymbol {
  XRP,
  WTF
}
