# PaurusStudents

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Table of Contents

- [Paurus Assignment](#paurus-assignment)
  - [Requirements](#requirements)
  - [Required Technologies](#required-technologies)
- [How to start Angular application locally](#how-to-start-angular-application-locally)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Building](#building)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [GitHub CI/CD](#github-cicd)

## Paurus Assignment

Implement a simple student information system, where the user can:

- add a new student (basic student information and courses that student will be part of),
- edit the student (courses only),
- delete a student.

You will also have to implement a page with an overview of all students (a table where each row displays student information). Table
should have pagination with 20 students per page.

Try to approach its appearance, to test your HTML and CSS skills. Ignore features that are not included in task description (like timezone dropdown, expandable rows, "super admin" tag, left sidebar...)

![Example Image](TableExample.png)

### Requirements:

- Routing (/overview page should be lazily loaded)

### Required technologies:

- Latest Angular
- PrimeNg (component library)

## Hot to start Angular application locally

```bash
// install dependencies
npm ci

// run the server locally
npm run start

// open http://localhost:4200/ url
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Cypress e2e testing

For the cypress end-to-end (e2e) testing, run:

```bash
cypress:open
cypress:run
cypress:run:debug
```

## GitHub CI/CD

On every push the GitHub Action is run and must pass before merging branches

GitHub Action run the following jobs:

- build
  - code-style
  - test-unit
  - test-e2e -> currently disabled because I have not deep dived the issue of different OS browsers environments (it works ok on local mac machine)
