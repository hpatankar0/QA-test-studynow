\# Conduit QA Automation Framework



> \*\*QA Engineer (Automation) Assessment — Playwright + TypeScript\*\*



A maintainable end-to-end and API automation framework for the \*\*Conduit\*\* application, built with \*\*Playwright and TypeScript\*\*.



The framework demonstrates UI automation, REST API testing, authorization testing, independent test-data management, Page Object Model design, Playwright fixtures, parallel execution, failure diagnostics, and CI execution through GitHub Actions.



\---



\## Table of Contents



\- \[Project Overview](#project-overview)

\- \[Application Under Test](#application-under-test)

\- \[Objectives](#objectives)

\- \[Technology Stack](#technology-stack)

\- \[Framework Architecture](#framework-architecture)

\- \[Project Structure](#project-structure)

\- \[Test Coverage](#test-coverage)

\- \[E2E Test Strategy](#e2e-test-strategy)

\- \[API Test Strategy](#api-test-strategy)

\- \[Authorization and Permission Testing](#authorization-and-permission-testing)

\- \[Test Data Strategy](#test-data-strategy)

\- \[Fixtures](#fixtures)

\- \[Page Object Model](#page-object-model)

\- \[Synchronization and Wait Strategy](#synchronization-and-wait-strategy)

\- \[Parallel Execution](#parallel-execution)

\- \[Configuration](#configuration)

\- \[Prerequisites](#prerequisites)

\- \[Installation](#installation)

\- \[Running the Tests](#running-the-tests)

\- \[Test Reports](#test-reports)

\- \[Debugging Failed Tests](#debugging-failed-tests)

\- \[CI/CD](#cicd)

\- \[Failure Handling and Retries](#failure-handling-and-retries)

\- \[Known Limitations](#known-limitations)

\- \[Future Improvements](#future-improvements)

\- \[Assessment Coverage](#assessment-coverage)

\- \[Quality Engineering Principles](#quality-engineering-principles)

\- \[Author](#author)



\---



\# Project Overview



This repository contains an automation framework created for the QA Engineer (Automation) assessment.



The goal is not only to automate individual scenarios, but to demonstrate how a QA automation framework can be structured for:



\- Maintainability

\- Scalability

\- Test isolation

\- Repeatable execution

\- API-driven test setup

\- UI validation

\- Authorization testing

\- Parallel execution

\- Failure diagnostics

\- Continuous Integration



The framework uses Playwright's built-in capabilities for both browser automation and API testing.



\---



\# Application Under Test



\*\*Application:\*\* Conduit



\*\*Environment:\*\*



https://conduit.bondaracademy.com



Conduit is a Medium-style content application where users can:



\- Register

\- Sign in

\- Create articles

\- View articles

\- Edit their articles

\- Delete their articles



The automation suite validates both the user-facing workflows and the underlying REST API behaviour.



\---



\# Objectives



The framework is designed to demonstrate the following QA capabilities:



1\. End-to-end UI automation

2\. REST API automation

3\. Positive and negative testing

4\. Authentication testing

5\. Authorization testing

6\. Test-data generation

7\. Test isolation

8\. Page Object Model

9\. Shared Playwright fixtures

10\. Parallel-safe execution

11\. Reliable synchronization

12\. CI execution

13\. HTML reporting

14\. Failure diagnostics

15\. Maintainable project organization



\---



\# Technology Stack



| Technology | Purpose |

|---|---|

| Playwright | UI and API automation |

| TypeScript | Automation language |

| Node.js | Runtime environment |

| npm | Dependency management |

| REST API | Backend/API validation |

| Page Object Model | UI abstraction |

| Playwright Fixtures | Shared test setup |

| Git | Version control |

| GitHub Actions | Continuous Integration |

| Playwright HTML Report | Test reporting |



\---



\# Framework Architecture



The framework follows a layered automation architecture.



```text

&#x20;                   ┌─────────────────────────┐

&#x20;                   │       Test Specs        │

&#x20;                   │                         │

&#x20;                   │  E2E Tests / API Tests  │

&#x20;                   └────────────┬────────────┘

&#x20;                                │

&#x20;                   ┌────────────▼────────────┐

&#x20;                   │      Test Fixtures      │

&#x20;                   │                         │

&#x20;                   │ User creation / setup   │

&#x20;                   └────────────┬────────────┘

&#x20;                                │

&#x20;             ┌──────────────────┴──────────────────┐

&#x20;             │                                     │

&#x20;     ┌───────▼────────┐                   ┌────────▼────────┐

&#x20;     │   Page Objects │                   │    API Client    │

&#x20;     │                │                   │                  │

&#x20;     │ LoginPage      │                   │ Register         │

&#x20;     │ RegisterPage   │                   │ Login            │

&#x20;     │ ArticlePage    │                   │ Create Article   │

&#x20;     │                │                   │ Get Article      │

&#x20;     └───────┬────────┘                   │ Update Article   │

&#x20;             │                            │ Delete Article   │

&#x20;             │                            └────────┬─────────┘

&#x20;             │                                     │

&#x20;             └──────────────────┬──────────────────┘

&#x20;                                │

&#x20;                   ┌────────────▼────────────┐

&#x20;                   │      Conduit System     │

&#x20;                   │                         │

&#x20;                   │ UI + REST API           │

&#x20;                   └─────────────────────────┘

