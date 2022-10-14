import {Release} from '../models/release';
import {WtfProduct} from './enums';

export const RELEASES: Release[] = [
  {
    version: "v1.1.1",
    date: "2022-09-25",
    product: WtfProduct.Learn,
    features: [
      "Lesson 1: Lesson one finalized and published.",
    ],
    improvements: [
      "Release Notes: The roadmap/release notes are populated dynamically now based on given dates.",
    ],
    fixes: [
      "Firebase Duplicates: Duplicate docs on update, in collections and sub-collections are fixed.",
      "Order Updates: Updates on drag and drop lists for lessons/slides are fixed."
    ],
    operations: [
      "Website: The dev, test, staging and production have separate environments and workflows.",
      "Learn: The dev, test, staging and production have separate environments and workflows.",
      "Dashboard: The dev, test, staging and production have separate environments and workflows.",
      "Emulators: All firebase emulators (Firestore, Storage, Authentication, Functions and Messaging) are activated for the dev/test environments.",
      "Security Rules: Firestore and SDtorage security rules updated for all apps in the wtf-pub project.",
      "Cloud Messaging: Notifications added to the Learn and Website.",
      "Websocket: A new websocket server added to track basic events."
    ],
  },
  {
    version: "v1.0.0",
    date: "2022-09-11",
    product: WtfProduct.Learn,
    features: [
      "Release page: It contains 'Release Notes' and 'Road Map'",
      "Sign up/Sign in: Users can register & be authenticated",
      "Profile: Users can manage their profile",
      "Dashboard: Users can see the summary of their learning progress + earning and achievements",
      "Notifications: Users will receive notifications on system events",
      "New lesson: Lesson one draft is ready. Yay!",
      "Products: A products popup is available next to the user icon.",
    ],
    improvements: [],
    fixes: [],
    operations: ["Automated workflows: Github Actions for staging & production pipelines created"],
  },
]
