### Key Points
- Research suggests Vietnam has over 300 mammal species, with more than one-third at risk of extinction, and strict laws like the 2017 Penal Code imposing up to 15 years imprisonment for wildlife violations, forming the foundation for any conservation platform.
- The business logic should prioritize user roles for secure access, a centralized database of protected species (e.g., saola, pangolins, tigers) with details on status and threats, and workflows for reporting illegal activities to align with national bans on wildlife trade.
- Evidence leans toward integrating educational features, donation processing, and moderation rules to foster community engagement, similar to platforms like Save Vietnam's Wildlife, while ensuring data validation to prevent misuse.
- It seems likely that incorporating search and filter functionalities for species, along with notification systems for reports, will enhance usability, but complexity in legal compliance (e.g., handling sensitive reports) requires careful hedging for privacy and authority coordination.
- The platform should acknowledge diverse stakeholder views, such as community dependencies on ecosystems versus strict protection needs, to promote balanced conservation without favoring one side.

### User Management
Define roles to control access: Regular users can browse and report; experts contribute content; admins moderate and manage data. Include registration with email verification, login with password hashing, and role-based permissions (e.g., only admins approve reports). For more, see Vietnam's wildlife laws on handling confiscated animals.

### Data Management
Centralize entities like species (with attributes: name, status, habitat) and reports (location, evidence). Use rules for validation, such as requiring geolocation for reports, and integrate with lists from sources like the IUCN Red List or Vietnamese decrees.

### Core Workflows
Support processes like submitting a sighting (user uploads, system validates, admin reviews), donating (process payment, issue receipt), and searching species (filter by category or threat level). Draw inspiration from sites like WWF-Viet Nam for community engagement flows.

---

Vietnam's rich biodiversity, encompassing diverse ecosystems from the Mekong Delta to mountainous forests, hosts a multitude of protected and endangered species, but faces significant threats from habitat loss, poaching, illegal trade, and climate change. Building a website platform dedicated to protected animals in Vietnam requires robust business logic that not only facilitates information dissemination and user interaction but also aligns with national wildlife protection laws, such as the 2017 Penal Code, which imposes severe penalties including up to 15 years imprisonment or fines up to 15 billion VND for violations related to endangered species. This logic should encode real-world rules for data handling, user workflows, and compliance, drawing from established conservation platforms like Save Vietnam's Wildlife (SVW), WWF-Viet Nam, and others that emphasize rescue, education, and advocacy.

The platform's core purpose could be multifaceted: educating the public on protected species, enabling reporting of illegal activities, supporting conservation efforts through donations and volunteering, and providing a database for researchers and authorities. Vietnam is home to iconic endangered species like the saola (often called the "Asian unicorn"), Asian elephant, pangolins, and various primates, with over one-third of its 329 mammal species at risk of extinction, many found in protected areas but still threatened. Laws such as Decree 160/2013 outline handling of confiscated wildlife (e.g., release or rescue), while a 2020 ban on wildlife imports and illegal markets underscores the need for digital tools to aid enforcement.

Business logic, as the set of rules governing how the platform processes data and user actions, should be layered: presentation (UI), application (logic), and data (storage). For instance, user authentication must enforce secure login with role-based access control (RBAC), where regular users view content, experts edit species entries, and admins handle moderation to prevent misinformation or abuse. Validation rules are critical—e.g., report submissions require mandatory fields like location coordinates, species identification, and evidence uploads, with automated checks for completeness before queuing for review.

Inspired by SVW's features, the platform could include workflows for wildlife rescue reporting, where users submit details that trigger notifications to partnered organizations or authorities, ensuring compliance with laws on evidence handling. Similarly, WWF-Viet Nam's emphasis on partnerships and action calls suggests integrating donation processing with payment gateways, where logic calculates receipts, tracks funds for specific projects (e.g., habitat protection), and issues tax-deductible confirmations. Educational modules could feature quizzes or interactive maps of protected areas, with logic tracking user progress for gamification.

A key component is the species database, populated from reliable sources like the Vietnamese Red Data Book or IUCN lists, with entities including scientific names, protection levels (e.g., Group IB under Decree 32 for critically endangered like the Javan rhinoceros), habitats, threats, and images. Search logic should support filters (e.g., by category: mammals, reptiles) and full-text queries, with results paginated for performance.

For reporting illegal activities, business rules must hedge for sensitivity: Anonymize user data if opted, escalate verified reports to entities like the Forest Protection Department, and log actions for audits, aligning with accelerated wildlife legislation completion efforts. Counterarguments to strict enforcement include community livelihoods dependent on ecosystems, so logic could incorporate feedback loops for sustainable alternative suggestions.

The platform should also handle news and events, with CRUD (Create, Read, Update, Delete) operations restricted by roles, and analytics logic to track engagement metrics like page views or report volumes for impact reporting, similar to WCS's impact reports. Potential vulnerabilities, such as business logic flaws in donation flows, require mitigation through input sanitization and transaction integrity checks.

To organize, consider the following tables:

| User Role | Permissions | Examples from Similar Platforms |
|-----------|-------------|---------------------------------|
| Regular User | Browse species, submit reports, donate, view news | SVW's donation and adoption features |
| Expert/Contributor | Edit species data, contribute articles (pending approval) | WWF's educational resources |
| Admin/Moderator | Approve/reject content, manage users, generate reports | WCS's conservation action moderation |
| Guest | Limited browsing only | Public access on ENV's law library |

| Entity | Key Attributes | Business Rules |
|--------|----------------|---------------|
| Species | Name, scientific name, IUCN status (e.g., CR for critically endangered), habitat, threats, protection law (e.g., Decree 32 Group IB) | Must reference official lists; updates require admin approval |
| Report | User ID, species ID, location (GPS), description, evidence (photos/files), status (pending/approved) | Validation: Required fields; auto-notify if illegal activity detected |
| Donation | User ID, amount, purpose (e.g., specific species), transaction ID | Process only if payment succeeds; log for tax purposes |
| News Article | Title, content, author ID, publish date | Moderation queue; auto-archive after 1 year |

| Category | Sample Protected Species | Protection Level | Threats |
|----------|---------------------------|------------------|---------|
| Mammals | Tiger (Panthera tigris), Saola (Pseudoryx nghetinhensis), Asian Elephant (Elephas maximus) | Decree 32 Group IB, CITES Appendix I, IUCN CR/EN | Poaching, habitat loss, illegal trade |
| Reptiles | Hawksbill Turtle (Eretmochelys imbricata), King Cobra (Ophiophagus hannah) | Decree 32 Group IB/IIB, CITES Appendix I/II, IUCN CR | Trade in shells/skins, habitat destruction |
| Primates | Grey-shanked Douc (Pygathrix cinerea), Tonkin Snub-nosed Monkey (Rhinopithecus avunculus) | Decree 32 Group IB, CITES Appendix I, IUCN CR | Hunting, pet trade |
| Plants/Corals | Aquilaria crassna (agarwood), Various Acropora Corals | IUCN EN/VU | Overharvesting, climate change |

Overall, this business logic ensures the platform is scalable, compliant, and impactful, potentially integrating with APIs for real-time updates from sources like the Viet Nam Red List, while balancing technological efficiency with conservation goals. Development should prioritize primary sources for accuracy, such as government decrees and NGO reports, to build trust and effectiveness.

### Key Citations
- [10 endangered species in Vietnam | Earth - Vocal Media](https://vocal.media/earth/10-endangered-species-in-vietnam)
- [Wildlife species protected by law in Viet Nam (PDF, 156 KB)](https://www.traffic.org/site/assets/files/6210/protected-wildlife-species-viet-nam.pdf)
- [Endangered species of Vietnam - List](https://www.earthsendangered.com/search-regions3.asp?mp=&search=1&sgroup=allgroups&ID=390)
- [Viet Nam Includes Numerous Rare and Precious Wildlife Species in ...](https://en.mae.gov.vn/Pages/chi-tiet-tin-Eng.aspx?ItemID=8717)
- [Over one-third of Vietnam's mammals are at risk of extinction](https://wildlife.org/over-one-third-of-vietnams-mammals-are-at-risk-of-extinction/)
- [Preserving Biodiversity and Culture in Viet Nam | World Wildlife Fund](https://www.worldwildlife.org/places/viet-nam/)
- [Wildlife Law Library - Education For Nature - Vietnam](https://env4wildlife.org/wildlife-law-library/)
- [Overview of Vietnam's law on wildlife conservation and protection](https://vietnamlawmagazine.vn/overview-of-vietnams-law-on-wildlife-conservation-and-protection-27456.html)
- [WCS Viet Nam > Resources > Law database](https://programs.wcs.org/vietnam/en-us/Resource/Law-database.aspx)
- [Vietnam Strengthens Law Enforcement Efforts to Protect Wildlife](https://wildaid.org/vietnampenalcode/)
- [Vietnam bans wildlife imports, closes illegal wildlife markets as part ...](https://www.humaneworld.org/en/news/breaking-vietnam-bans-wildlife-imports)
- [Accelerating completion of wildlife protection legislation](https://en.nhandan.vn/accelerating-completion-of-wildlife-protection-legislation-post146323.html)
- [Business logic - Wikipedia](https://en.wikipedia.org/wiki/Business_logic)
- [What Is Business Logic | Attacks Prevention & Mitigation | Imperva](https://www.imperva.com/learn/application-security/business-logic/)
- [A Guide to Understanding Business Logic and Software - Cflow](https://www.cflowapps.com/business-logic-and-software/)
- [Save Vietnam's Wildlife](https://svw.vn/)
- [WWF-Viet Nam](https://vietnam.panda.org/en/)