import {Roadmap} from '../models/roadmap';

export const ROADMAPS:Roadmap[] = [
  {
    version: "v1.0.0",
    date: "2022-09-11",
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
  }
];
