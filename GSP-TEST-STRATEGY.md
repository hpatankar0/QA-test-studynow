\# GSP Test Strategy



\## QA Automation Strategy for a Configuration-First Student Recruitment Platform



\---



\## 1. Overview



GSP is a configuration-first student recruitment platform supporting a multi-stage admissions lifecycle.



The platform includes:



\- A 15-stage admissions lifecycle

\- Country-specific document checklists

\- Agent commission rate cards

\- Three levels of permissions

\- Configuration-driven workflows

\- Data-heavy SPA behaviour



Because configuration changes can affect workflow behaviour, the automation strategy must validate both:



1\. The configuration itself

2\. The business workflows affected by that configuration



The primary objective is to detect workflow-breaking changes before they reach users.



\---



\# 2. Automation Priorities



I would not automate every journey at the same priority.



The first automation layer should focus on business-critical workflows where a failure could block an application, cause incorrect financial calculations, expose unauthorized functionality, or prevent an application from progressing.



I would prioritize the following 10 journeys.



\---



\## Priority 0 — Critical Business Journeys



\### 1. Create a Student/Application



\*\*Priority:\*\* P0



Validate that a new student/application can be created successfully with the required information.



\### Why first?



If application creation fails, the rest of the admissions lifecycle cannot proceed.



\### Key validations



\- Required fields

\- Valid application creation

\- Correct initial state/stage

\- Data persistence

\- Correct permissions



\---



\## 2. Move an Application Through the Admissions Lifecycle



\*\*Priority:\*\* P0



Validate representative transitions through the 15-stage admissions lifecycle.



\### Key validations



\- Valid stage transition

\- Required data/documents before transition

\- Invalid transition prevention

\- Correct application state

\- Persistence after refresh

\- Correct permissions for stage changes



\### Why P0?



The admissions lifecycle is the core business workflow.



A configuration change that breaks stage transitions could prevent applications from progressing.



\---



\## 3. Country-Specific Document Checklist



\*\*Priority:\*\* P0



Validate that the correct document requirements are applied based on the relevant country/application configuration.



\### Key validations



\- Correct country checklist

\- Required vs optional documents

\- Document upload/availability

\- Missing document validation

\- Checklist state persistence

\- Correct behaviour after configuration changes



\### Why P0?



The assessment specifically identifies per-country document checklists as a core GSP feature.



A checklist configuration change can directly affect application progression.



\---



\## 4. Permission and Authorization Controls



\*\*Priority:\*\* P0



Validate the three permission levels against critical operations.



\### Key validations



\- User can only access permitted functionality

\- Unauthorized actions are rejected

\- Restricted configuration changes are protected

\- UI visibility matches permissions

\- Backend/API authorization is also enforced



\### Why P0?



Permission failures can result in either:



\- Security exposure

\- Unauthorized business changes

\- Users being blocked from legitimate operations



\---



\# Priority 1 — Important Business Workflows



\## 5. Agent Commission Calculation



\*\*Priority:\*\* P1



Validate that agent commission behaviour follows the configured rate card.



\### Key validations



\- Correct rate applied

\- Correct agent/application relationship

\- Rate-card configuration is respected

\- Calculated result persists

\- Changes to configuration affect future calculations correctly



\### Why P1?



Incorrect commission calculations can create financial and operational issues.



\---



\## 6. Application Document Submission and Validation



\*\*Priority:\*\* P1



Validate the document submission workflow after the relevant checklist has been applied.



\### Key validations



\- Required documents identified

\- Valid documents accepted

\- Missing required documents prevent invalid progression

\- Document status is persisted

\- Application state reflects document completion



\---



\## 7. Configuration Change Regression



\*\*Priority:\*\* P1



Validate that an administrative configuration change does not unexpectedly break existing workflows.



Examples include:



\- Checklist changes

\- Stage-related configuration

\- Commission rate configuration

\- Permission configuration



\### Why P1?



GSP is configuration-first, meaning configuration changes can behave like code changes.



Therefore, configuration changes require regression validation.



\---



\# Priority 2 — Supporting Workflows



\## 8. Search, Filtering and Application Retrieval



\*\*Priority:\*\* P2



Validate that users can find and retrieve the correct applications.



\### Key validations



\- Search

\- Filtering

\- Pagination

\- Application details

\- Correct data returned

\- Permission-based visibility



\---



\## 9. Application Updates



\*\*Priority:\*\* P2



Validate that permitted users can update application information without corrupting existing data.



\### Key validations



\- Editable fields

\- Required field validation

\- Persistence

\- Existing data retained

\- Permission enforcement



\---



\## 10. Notifications / Downstream Workflow Behaviour



\*\*Priority:\*\* P2



Where supported by the platform, validate important notifications or downstream actions triggered by application state/configuration changes.



\### Key validations



\- Trigger condition

\- Correct recipient

\- Correct application context

\- No duplicate notification

\- Failure handling



\---



\# 3. Prioritization Model



The prioritization is based on business impact rather than simply technical complexity.



| Priority | Focus | Reason |

|---|---|---|

| P0 | Application creation | Entry point to admissions |

| P0 | Lifecycle/stage transitions | Core admissions workflow |

| P0 | Country document checklist | Can block application progression |

| P0 | Permissions | Security and access control |

| P1 | Agent commission | Financial/business impact |

| P1 | Document validation | Required for application progression |

| P1 | Configuration regression | Configuration can change workflow behaviour |

| P2 | Search/filtering | Important operational capability |

| P2 | Application updates | Supporting business workflow |

| P2 | Notifications | Important downstream behaviour |



The P0 suite should be the minimum smoke/regression gate before a critical release or configuration change.



\---



\# 4. Three-Level Permission Model



The assessment states that GSP has three levels of permissions but does not define the exact role names.



For this strategy, I would use the following proposed mapping:



1\. \*\*Administrator\*\*

2\. \*\*Operational User\*\*

3\. \*\*Read-only User\*\*



The actual production role names should be mapped to these categories when the application permission model is confirmed.



\---



\## Permission Matrix



| Capability | Administrator | Operational User | Read-only User |

|---|---:|---:|---:|

| View applications | Yes | Yes | Yes |

| Search/filter applications | Yes | Yes | Yes |

| Create application | Yes | Yes | No |

| Update application | Yes | Yes | No |

| Progress application stage | Yes | Yes | No |

| Manage documents | Yes | Yes | No |

| Modify country checklist | Yes | No | No |

| Manage commission configuration | Yes | No | No |

| Manage permissions | Yes | No | No |

| Delete sensitive/business data | Yes | No | No |



\---



\## Permission Testing Approach



Permissions should be tested at two levels.



\### UI Level



Verify:



\- Restricted controls are hidden/disabled where appropriate

\- Unauthorized pages cannot be accessed

\- Authorized controls are available

\- Navigation respects permissions



\### API/Backend Level



Verify:



\- Unauthorized requests are rejected

\- Direct API calls cannot bypass UI restrictions

\- Correct HTTP authorization response is returned

\- Data remains unchanged after unauthorized attempts



The UI should never be considered the only security boundary.



\---



\# 5. Friday 5 PM Canada Checklist Change Scenario



\## Scenario



An administrator changes the Canadian document checklist at 5 PM on Friday.



Because GSP is configuration-first, this change should be treated similarly to a production code change.



A configuration change can affect existing applications and downstream workflows.



\---



\# 6. What Could Break?



I would investigate the following areas.



\## 6.1 New Applications



New Canadian applications may receive the updated checklist.



Potential failures:



\- Incorrect documents assigned

\- Missing required document

\- Unexpected additional requirement

\- Incorrect country mapping



\---



\## 6.2 Existing Applications



Existing applications may behave differently depending on how checklist configuration is applied.



Potential failures:



\- Existing applications unexpectedly receiving new requirements

\- Existing required documents becoming optional

\- Previously completed applications becoming incomplete

\- Incorrect application state



\---



\## 6.3 Application Stage Transitions



A checklist change could affect whether an application is allowed to progress.



Potential failures:



```text

Application

&#x20;   ↓

Required document check

&#x20;   ↓

Document missing

&#x20;   ↓

Stage transition blocked

