## The Learn Platform (Part of Write The Future Ecosystem)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.


## Contact Info
Lead: Sohail Salehi [<info@soolan.com>](info@soolan.com)

## Executive Summary
This document summarizes the implementation of an e-learning platform for 
students and teachers in crypto space. This includes but not limited to:
1. A crypto course platform where guests and registered users can take free or paid courses, pass exams, and issue their certificate as NFT (on demand)
2. A creator dashboard for teachers where they create the courses/lessons/slides
3. A profile management service (wit wallet tags) that handle user profiles and their activities, transaction, etc eco system wide.


## Measures of success
A minimum success criteria for this project will be $500K revenue in 3 years.
The following key metrics represent a healthy **problem/solutiom fit**, **product/market fit** and **scale** factors 
by the end of April 2026
- Traction:  85,600 unique monthly visits
- Acquisition: 8560 signups
- Activation: 856 paying customers
- Active users: (Activation + Referrals - cancellation) 5880 
- The minimum course design per quarter: 2

## In Scope
This ecosystem aims to make:
- crypto concepts understandable for users from all walks of life
- the learning experience productive for everyone 
- the financial literacy in crypto space entertaining

## Out of Scope
We are not integrating any network that requires mining (POW, POS, POH, etc).

## Open issues
- how to implement escrow for tokens issued on XRPL?
- reliable way of implementing SSO within Angular Workspace (with multiple projects that share resources on Firebase)
- decision for where to host cloud functionalities (i.e. payment notification handling). 
Current design uses Firebase Cloud functions, GCP Cloud Run and GCP Compute.  

## Proposed solution summary
Write about how your solution works in a detailed narrative, refer to appendices for diagrams, APIs, data structures, database schemas, etc.

## Dependencies
This project has two major dependencies: Google and XRPL
- The **Angular** framework is used for implementing majority of the projects in the workspce.
- For design concerns, responsiveness and supprting various devices and platforms, **Material Design** library is used.
- For Cloud services regarding **build**, **release & monitor**, **analytics** and **engage**, the **Google Cloud Platform** and **Firebase** are used
- For managing user wallets, handling transactions XRPL is utilized.

## Functional requirements
* Users should be able to easily register and receive a wallet tag with *Welcome Fund* in it.
* The user's progress on courses and lessons can be tracked in their dashboard.
* The user achievements (badges, earnings, winnings, NFTs, etc) can be show cased on their profiles on demand.
* The teacher's dashboard should have all the tools required for creating slides, lessons and courses.
* The teacher's dashboard should contain all financial tools necessary to price the paid courses/lessons and manage the transactions, commissions, etc.
* Each registered user in the ecosystem should have a wallet and be able to see their transaction history on the ledger. 
* The **"learn platform"** should be able to handle up to 10,000 concurrent users.

## Non-functional requirements
* Creating & tracking tickets (tasks) Maintaining the system should be integrated to the universal dashboard (already has)
* The system shall be secure and have security standards in place (2FA, AppCheck, email verification codes, ...)
* Using angular workspace (architecture) this service should be easily maintainable, scalable and performant.

## Development server
This project has emulators in place. Run `firebase emulators:start` to get emulators for all firebase services up and running.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
