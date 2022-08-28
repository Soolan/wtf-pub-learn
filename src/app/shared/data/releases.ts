import {Release} from '../models/release';

export const RELEASES: Release[] = [
  {
    version: "v1.0.0",
    date: "2022, Sep 11th",
    features: [
      "New pages added: Release, Release Notes and Road Map",
      "Sign up/Sign in: Users can register & be authenticated",
      "Profile: Users can manage their profile",
      "Notifications: Users will receive notifications on system events",
      "New lesson: Lesson one is ready. Yay!",
      "Products: A products popup is available next to the user icon.",
    ],
    improvements: [],
    fixes: [],
    operations: ["Automated workflows: Github Actions for staging & production pipelines created"],
  }
]
