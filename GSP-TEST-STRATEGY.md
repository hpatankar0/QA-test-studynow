# GSP Test Strategy

## QA Automation Strategy for a Configuration-First Student Recruitment Platform

## 1. Overview

GSP is a configuration-first student recruitment platform supporting a 15-stage admissions lifecycle. It includes country-specific document checklists, agent commission rate cards, three roles (Admin, Staff and Agent), configuration-driven workflows, and a data-heavy SPA.

Because configuration changes can affect workflow behaviour, the automation strategy must validate both the configuration and the business workflows affected by it.

The objective is to detect workflow-breaking, permission and data-integrity issues before they reach users.

---

# 2. Priority Automation Journeys

I would prioritize the following 10 journeys based on business impact, security risk and their ability to block the admissions lifecycle.

| Priority | Journey | Why it is important |
|---|---|---|
| P0 | 1. Create student/application | Entry point to the admissions lifecycle |
| P0 | 2. Progress application through the 15-stage lifecycle | Core business workflow; failures can block admissions |
| P0 | 3. Country-specific document checklist | Incorrect requirements can block or incorrectly progress applications |
| P0 | 4. Role-based access and Agent student visibility | Security and data-isolation risk |
| P1 | 5. Document upload and validation | Required documents directly affect progression |
| P1 | 6. Offer / CAS / Visa progression | Critical downstream admissions stages |
| P1 | 7. Agent commission rate card | Financial/business impact |
| P1 | 8. Configuration-change regression | Configuration can change workflow behaviour like code |
| P2 | 9. Application search and filtering | Operational users need correct, permission-based data |
| P2 | 10. Application updates and downstream notifications | Important supporting workflow |

### 1. Create Student/Application — P0

Validate required fields, successful creation, initial application state, persistence and permission enforcement.

### 2. 15-Stage Admissions Lifecycle — P0

Validate representative transitions from enquiry/application through offer, CAS/visa and enrolment. Verify prerequisites, valid/invalid transitions, state persistence and role permissions.

### 3. Country-Specific Document Checklist — P0

Validate that the correct checklist is applied for the destination country, including required/optional documents, missing-document validation and its effect on application progression.

### 4. Role-Based Access and Agent Visibility — P0

Validate Admin, Staff and Agent permissions. An Agent must only be able to see and operate on their own students. Unauthorized UI and API requests must be rejected.

### 5. Document Upload and Validation — P1

Validate document submission against the configured checklist and ensure missing required documents prevent invalid progression.

### 6. Offer / CAS / Visa Progression — P1

Validate downstream stage transitions and their prerequisites after application and document requirements are satisfied.

### 7. Agent Commission Rate Card — P1

Validate the configured rate, agent/application relationship, calculation accuracy and persistence.

### 8. Configuration Regression — P1

Validate that changes to document checklists, commission rates or permissions do not unexpectedly break existing workflows.

### 9. Search and Filtering — P2

Validate search, filtering, pagination and permission-based visibility of applications.

### 10. Application Updates / Notifications — P2

Validate permitted updates, required-field rules, persistence and important downstream notifications where supported.

The P0 suite should form the minimum smoke/release gate for critical releases and configuration changes.

---

# 3. Three-Role Permission Model

The assessment defines three GSP roles:

- **Admin**
- **Staff**
- **Agent**

A key requirement is that **Agents must only ever see their own students**.

## Permission Matrix

| Capability | Admin | Staff | Agent |
|---|---:|---:|---:|
| View applications | Yes | Yes | Own students only |
| Search/filter applications | Yes | Yes | Own students only |
| Create application | Yes | Yes | Own students only |
| Update application | Yes | Yes | Own students only |
| Progress application stage | Yes | Yes | Own students only |
| Manage documents | Yes | Yes | Own students only |
| Modify country document checklist | Yes | No | No |
| Manage commission configuration | Yes | No | No |
| Manage permissions | Yes | No | No |
| View other Agents' students | Yes | Yes | No |

### Permission Test Approach

Test permissions at both UI and API/backend levels:

- Verify allowed controls and navigation are available.
- Verify restricted controls/pages cannot be used.
- Verify an Agent cannot view another Agent's students.
- Attempt direct API access to restricted resources.
- Verify unauthorized requests are rejected.
- Verify unauthorized attempts do not change data.

The UI must not be treated as the only security boundary.

---

# 4. Friday 5 PM Canada Checklist Change

An Admin changes Canada's document checklist at 5 PM on Friday. Because GSP is configuration-first, I would treat this change like a production code change.

## What Could Break?

### New Applications

- Wrong checklist assigned to Canada.
- Required document missing or incorrectly added.
- Incorrect country mapping.

### Existing Applications

- Existing applications unexpectedly receiving new requirements.
- Completed applications becoming incomplete.
- Existing document status being recalculated incorrectly.
- Application state changing unexpectedly.

### Stage Progression

A checklist change could prevent an application from progressing because a newly required document is missing.

### Permissions

Only Admin should be able to change the checklist. Staff and Agent must not be able to modify it or bypass the restriction through the API.

### Downstream Workflows

Potential impact should be checked in:

- Document validation
- Application progression
- Agent/Staff workflows
- Search/filtering
- Relevant reporting
- Notifications

## How Automation Catches It Before Monday

I would maintain controlled data for both:

**Existing application:** created before the configuration change.

**New application:** created after the configuration change.

After the change, the automated regression gate would validate:

1. Canada checklist configuration is correct.
2. New Canadian applications receive the expected checklist.
3. Existing applications behave according to the defined business rule.
4. Required documents are correctly enforced.
5. Valid applications can continue through the expected stages.
6. Invalid/incomplete applications are correctly blocked.
7. Admin/Staff/Agent permissions remain correct.
8. Agent data isolation is preserved.
9. Relevant downstream workflows remain functional.

The P0 suite would be the minimum release gate. If a critical check fails, the configuration should not be considered safe for Monday.

---

# 5. Stability Strategy for a Data-Heavy SPA

## Data Isolation

Each test should create or obtain its own data. Tests must not depend on records created by another test.

Use unique identifiers for students/applications and avoid shared mutable state.

## API-Driven Setup

Use APIs to create prerequisite data wherever possible rather than navigating through the UI. This keeps UI tests focused on UI/business behaviour and makes the suite faster.

## Reliable Waits

Avoid fixed sleeps such as:

```typescript
await page.waitForTimeout(5000);