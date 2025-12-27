# Project Plan - Version 1.0

## Document Info
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Date | 2025-12-27 |
| Author | @PM |
| Status | Approved |

---

## Project Title
Protected Animal Conservation Platform for Vietnam

## Business Goals
- To create a platform that educates the public about Vietnam's protected animal species.
- To provide a secure and reliable system for reporting illegal wildlife activities, aligning with national laws.
- To foster a community dedicated to wildlife conservation through engagement, donations, and volunteering opportunities.
- To serve as a valuable database for researchers and authorities involved in conservation efforts.

## Scope & Features

### Must-Have
- [ ] User registration with email verification and secure login.
- [ ] Role-based access control (Regular User, Expert, Admin).
- [ ] Centralized database of protected species with detailed information (name, status, habitat, threats).
- [ ] Workflow for submitting reports of illegal activities with geolocation and evidence.
- [ ] Search and filter functionality for the species database.

### Should-Have
- [ ] Donation processing system to support conservation projects.
- [ ] Content management system for news, articles, and events.
- [ ] Notification system for report status updates.
- [ ] Moderation tools for user-generated content and reports.

### Could-Have (if time permits)
- [ ] Gamification elements for educational modules (e.g., quizzes).
- [ ] Interactive maps of protected areas.
- [ ] Volunteer opportunity listings.
- [ ] API for real-time data integration from sources like the IUCN Red List.

## User Stories / Use Cases
| ID | As a... | I want... | So that... | Priority |
|----|---------|-----------|------------|----------|
| US-01 | Regular User | to browse a database of protected species | I can learn about endangered animals in Vietnam. | Must |
| US-02 | Regular User | to submit a report of an illegal wildlife sighting | I can contribute to law enforcement and conservation efforts. | Must |
| US-03 | Expert | to contribute and edit information about species | I can ensure the data on the platform is accurate and up-to-date. | Should |
| US-04 | Admin | to manage users and moderate content | I can maintain the integrity and safety of the platform. | Must |
| US-05 | Regular User | to donate to a specific conservation project | I can financially support the causes I care about. | Should |

## Target Platforms & Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js (React) |
| Backend | Node.js (Next.js API routes) |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

## High-Level Timeline
| Phase | Duration | Target Date |
|-------|----------|-------------|
| Planning | 1 day | 2024-07-29 |
| Design | 3 days | 2024-08-01 |
| Development | 10 days | 2024-08-15 |
| Testing | 4 days | 2024-08-19 |
| Deployment | 1 day | 2024-08-20 |

## Risks & Assumptions
| Type | Description | Mitigation |
|------|-------------|------------|
| Risk | Handling of sensitive user data in reports requires strict privacy and security measures. | Anonymize user data where possible and implement robust data protection protocols. Coordinate with legal advisors. |
| Risk | Potential for misuse or false reporting. | Implement a verification and moderation workflow for all submitted reports. |
| Assumption | Partner organizations and authorities are willing to collaborate on the reporting workflow. | Initiate contact and establish partnerships early in the project. |

## Task Assignments
| Role | Responsibility |
|------|----------------|
| @SA | Backend architecture, database design |
| @designer | UI/UX design |
| @dev | Implementation of features |
| @devops | CI/CD, deployment |
| @tester | Quality assurance and testing |
| @po | Product ownership and backlog management |

## Approval Status
Approved

Note: Plan approved by user on 2025-12-27.

---

### Next Step After Approval:
- @SA @designer @po - Start design phase (in parallel)
- @reporter - Begin progress tracking

#planning