# Backend Design Specification - Version 1.0

## Document Info
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Date | 2025-12-28 |
| Author | @SA |
| Sprint | Sprint 1 |
| Status | Draft |

---

## 1. Architecture Overview

### 1.1 System Architecture
The platform follows a **modern serverless architecture** using Next.js App Router with API routes, SQLite database (via better-sqlite3 and Drizzle ORM), and edge-ready deployment on Vercel.

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                            │
│  (Next.js 15 App Router + React 19 + TypeScript)          │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  Presentation Layer                         │
│  - Server Components (RSC)                                  │
│  - Client Components (Interactive UI)                       │
│  - Route Handlers (API Routes)                             │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  Application Layer                          │
│  - Use Cases (Business Logic)                              │
│  - Services (Domain Services)                              │
│  - DTOs (Data Transfer Objects)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Domain Layer                              │
│  - Entities (Domain Models)                                │
│  - Value Objects                                           │
│  - Domain Events                                           │
│  - Repositories (Interfaces)                               │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│               Infrastructure Layer                          │
│  - Database (SQLite + Drizzle ORM)                         │
│  - File Storage (Local/Vercel Blob)                        │
│  - Email Service (Resend/SendGrid)                         │
│  - Authentication (NextAuth.js/Lucia)                      │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Design Principles
- **Clean Architecture**: Separation of concerns with clear boundaries
- **Domain-Driven Design**: Business logic in domain layer
- **SOLID Principles**: Maintainable and testable code
- **API-First**: RESTful API design
- **Security-First**: Authentication, authorization, input validation
- **Performance**: Edge-ready, optimized queries, caching

---

## 2. Database Design

### 2.1 Technology Stack
- **Database**: SQLite (better-sqlite3)
- **ORM**: Drizzle ORM
- **Migrations**: Drizzle Kit
- **Query Builder**: Drizzle Query

### 2.2 Database Schema

#### 2.2.1 Users Table
```typescript
// users table
{
  id: string (uuid, primary key)
  email: string (unique, not null)
  password_hash: string (not null)
  full_name: string
  role: enum('user', 'expert', 'admin') (default: 'user')
  email_verified: boolean (default: false)
  verification_token: string (nullable)
  reset_token: string (nullable)
  reset_token_expires: timestamp (nullable)
  created_at: timestamp (default: now())
  updated_at: timestamp (default: now())
  last_login: timestamp (nullable)
  is_active: boolean (default: true)
}
```

#### 2.2.2 Species Table
```typescript
// species table
{
  id: string (uuid, primary key)
  common_name: string (not null)
  scientific_name: string (not null, unique)
  vietnamese_name: string
  category: enum('mammal', 'bird', 'reptile', 'amphibian', 'fish', 'invertebrate')
  conservation_status: enum('EX', 'EW', 'CR', 'EN', 'VU', 'NT', 'LC', 'DD')
  protection_level: enum('IA', 'IB', 'IIA', 'IIB') // Vietnam Decree 32
  population_estimate: integer (nullable)
  population_trend: enum('increasing', 'stable', 'decreasing', 'unknown')
  habitat: text
  distribution: text // Geographic distribution in Vietnam
  threats: json // Array of threat descriptions
  description: text
  image_url: string
  featured: boolean (default: false)
  created_by: string (foreign key -> users.id)
  created_at: timestamp (default: now())
  updated_at: timestamp (default: now())
}
```

#### 2.2.3 Reports Table
```typescript
// reports table
{
  id: string (uuid, primary key)
  user_id: string (foreign key -> users.id, nullable for anonymous)
  species_id: string (foreign key -> species.id, nullable)
  report_type: enum('sighting', 'illegal_activity', 'injured_animal', 'other')
  title: string (not null)
  description: text (not null)
  location_name: string
  latitude: decimal(10, 8)
  longitude: decimal(11, 8)
  incident_date: timestamp
  evidence_urls: json // Array of file URLs
  is_anonymous: boolean (default: false)
  status: enum('pending', 'reviewing', 'verified', 'resolved', 'rejected')
  priority: enum('low', 'medium', 'high', 'critical')
  reviewed_by: string (foreign key -> users.id, nullable)
  reviewed_at: timestamp (nullable)
  review_notes: text (nullable)
  created_at: timestamp (default: now())
  updated_at: timestamp (default: now())
}
```

#### 2.2.4 Donations Table
```typescript
// donations table
{
  id: string (uuid, primary key)
  user_id: string (foreign key -> users.id, nullable for guest)
  amount: decimal(10, 2) (not null)
  currency: string (default: 'VND')
  project_id: string (foreign key -> projects.id, nullable)
  payment_method: enum('card', 'bank_transfer', 'momo', 'zalopay')
  payment_status: enum('pending', 'completed', 'failed', 'refunded')
  transaction_id: string (unique)
  receipt_url: string (nullable)
  donor_name: string
  donor_email: string
  is_anonymous: boolean (default: false)
  message: text (nullable)
  created_at: timestamp (default: now())
  updated_at: timestamp (default: now())
}
```

#### 2.2.5 Projects Table
```typescript
// projects table
{
  id: string (uuid, primary key)
  name: string (not null)
  description: text
  goal_amount: decimal(10, 2)
  current_amount: decimal(10, 2) (default: 0)
  start_date: timestamp
  end_date: timestamp (nullable)
  status: enum('active', 'completed', 'cancelled')
  image_url: string
  created_by: string (foreign key -> users.id)
  created_at: timestamp (default: now())
  updated_at: timestamp (default: now())
}
```

#### 2.2.6 Articles Table
```typescript
// articles table
{
  id: string (uuid, primary key)
  title: string (not null)
  slug: string (unique, not null)
  content: text (not null)
  excerpt: text
  author_id: string (foreign key -> users.id)
  category: enum('news', 'education', 'success_story', 'research')
  tags: json // Array of tags
  featured_image: string
  status: enum('draft', 'published', 'archived')
  published_at: timestamp (nullable)
  views: integer (default: 0)
  created_at: timestamp (default: now())
  updated_at: timestamp (default: now())
}
```

#### 2.2.7 Audit Logs Table
```typescript
// audit_logs table
{
  id: string (uuid, primary key)
  user_id: string (foreign key -> users.id, nullable)
  action: string (not null) // e.g., 'user.login', 'report.create', 'species.update'
  entity_type: string // e.g., 'user', 'report', 'species'
  entity_id: string
  changes: json // Before/after values
  ip_address: string
  user_agent: string
  created_at: timestamp (default: now())
}
```

### 2.3 Database Relationships

```
users (1) ──< (many) species [created_by]
users (1) ──< (many) reports [user_id]
users (1) ──< (many) reports [reviewed_by]
users (1) ──< (many) donations [user_id]
users (1) ──< (many) projects [created_by]
users (1) ──< (many) articles [author_id]
users (1) ──< (many) audit_logs [user_id]

species (1) ──< (many) reports [species_id]

projects (1) ──< (many) donations [project_id]
```

### 2.4 Indexes
```sql
-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_species_status ON species(conservation_status);
CREATE INDEX idx_species_category ON species(category);
CREATE INDEX idx_species_featured ON species(featured);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_donations_user_id ON donations(user_id);
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

---

## 3. API Design

### 3.1 API Structure
```
/api/
├── auth/
│   ├── register          POST
│   ├── login             POST
│   ├── logout            POST
│   ├── verify-email      POST
│   ├── forgot-password   POST
│   └── reset-password    POST
├── users/
│   ├── profile           GET, PATCH
│   ├── [id]              GET, PATCH, DELETE (admin)
│   └── change-password   POST
├── species/
│   ├── /                 GET (list), POST (expert/admin)
│   ├── [id]              GET, PATCH (expert/admin), DELETE (admin)
│   ├── featured          GET
│   └── search            GET
├── reports/
│   ├── /                 GET (list), POST
│   ├── [id]              GET, PATCH, DELETE
│   ├── [id]/review       POST (admin)
│   └── stats             GET (admin)
├── donations/
│   ├── /                 GET (list), POST
│   ├── [id]              GET
│   ├── receipt/[id]      GET
│   └── stats             GET
├── projects/
│   ├── /                 GET (list), POST (admin)
│   ├── [id]              GET, PATCH (admin), DELETE (admin)
│   └── active            GET
├── articles/
│   ├── /                 GET (list), POST (admin)
│   ├── [id]              GET, PATCH (admin), DELETE (admin)
│   └── [slug]            GET
└── admin/
    ├── dashboard         GET
    ├── users             GET
    └── audit-logs        GET
```

### 3.2 API Response Format
```typescript
// Success Response
{
  success: true,
  data: T,
  meta?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

// Error Response
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

### 3.3 Authentication & Authorization

#### Authentication Strategy
- **JWT-based authentication** using NextAuth.js or Lucia
- **Session management** with secure HTTP-only cookies
- **Refresh token rotation** for enhanced security

#### Authorization Matrix
| Resource | User | Expert | Admin |
|----------|------|--------|-------|
| View Species | ✅ | ✅ | ✅ |
| Create Species | ❌ | ✅ | ✅ |
| Edit Species | ❌ | ✅ (own) | ✅ |
| Delete Species | ❌ | ❌ | ✅ |
| Submit Report | ✅ | ✅ | ✅ |
| View Own Reports | ✅ | ✅ | ✅ |
| View All Reports | ❌ | ❌ | ✅ |
| Review Reports | ❌ | ❌ | ✅ |
| Make Donation | ✅ | ✅ | ✅ |
| Manage Projects | ❌ | ❌ | ✅ |
| Publish Articles | ❌ | ❌ | ✅ |
| View Audit Logs | ❌ | ❌ | ✅ |

---

## 4. Business Logic Layer

### 4.1 Use Cases (Application Services)

#### User Management
- `RegisterUserUseCase`: Handle user registration with email verification
- `LoginUserUseCase`: Authenticate user and create session
- `VerifyEmailUseCase`: Verify email with token
- `ResetPasswordUseCase`: Handle password reset flow
- `UpdateProfileUseCase`: Update user profile information

#### Species Management
- `GetSpeciesListUseCase`: Retrieve paginated species list with filters
- `GetSpeciesDetailUseCase`: Get detailed species information
- `CreateSpeciesUseCase`: Add new species (expert/admin)
- `UpdateSpeciesUseCase`: Update species information (expert/admin)
- `SearchSpeciesUseCase`: Search species by name or criteria

#### Report Management
- `CreateReportUseCase`: Submit wildlife crime report
- `GetReportListUseCase`: Retrieve user's reports or all (admin)
- `ReviewReportUseCase`: Admin review and update report status
- `GetReportStatsUseCase`: Generate reporting statistics (admin)

#### Donation Management
- `CreateDonationUseCase`: Process donation payment
- `GetDonationHistoryUseCase`: Retrieve donation history
- `GenerateReceiptUseCase`: Generate donation receipt

### 4.2 Domain Services

#### ValidationService
- Email validation
- Password strength validation
- Input sanitization
- File upload validation

#### NotificationService
- Email notifications
- Report status updates
- Donation receipts

#### FileStorageService
- Image upload and optimization
- Evidence file storage
- Receipt generation

#### AuditService
- Log user actions
- Track data changes
- Security event logging

---

## 5. Security Considerations

### 5.1 Authentication Security
- ✅ Password hashing with bcrypt (cost factor: 12)
- ✅ JWT with short expiration (15 minutes)
- ✅ Refresh token rotation
- ✅ HTTP-only, Secure, SameSite cookies
- ✅ CSRF protection
- ✅ Rate limiting on auth endpoints

### 5.2 Data Security
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (output encoding)
- ✅ File upload restrictions (type, size)
- ✅ Sensitive data encryption at rest
- ✅ HTTPS enforcement

### 5.3 Privacy & Compliance
- ✅ Anonymous reporting option
- ✅ Personal data anonymization
- ✅ GDPR-compliant data handling
- ✅ Audit logging for compliance
- ✅ Data retention policies

---

## 6. Performance Optimization

### 6.1 Database Optimization
- Proper indexing on frequently queried columns
- Query optimization with EXPLAIN ANALYZE
- Connection pooling
- Prepared statements

### 6.2 Caching Strategy
- Server-side caching with Next.js cache
- Static generation for species pages
- Incremental Static Regeneration (ISR)
- API response caching

### 6.3 File Handling
- Image optimization (next/image)
- Lazy loading
- CDN for static assets
- Compressed file uploads

---

## 7. Error Handling

### 7.1 Error Types
```typescript
enum ErrorCode {
  // Authentication
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  
  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // Resources
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  
  // Server
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  
  // Rate Limiting
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS'
}
```

### 7.2 Error Handling Strategy
- Centralized error handler middleware
- Structured error responses
- Error logging with context
- User-friendly error messages
- Stack traces in development only

---

## 8. Testing Strategy

### 8.1 Unit Tests
- Use Cases testing
- Domain logic testing
- Utility functions testing
- Target: 80% code coverage

### 8.2 Integration Tests
- API endpoint testing
- Database operations testing
- Authentication flow testing

### 8.3 E2E Tests
- Critical user flows
- Report submission flow
- Donation flow
- Admin workflows

---

## 9. Deployment & DevOps

### 9.1 Environment Configuration
```
Development: Local SQLite
Staging: Vercel + Turso (SQLite edge)
Production: Vercel + Turso (SQLite edge)
```

### 9.2 CI/CD Pipeline
1. Code push to GitHub
2. Automated tests run
3. Build verification
4. Deploy to staging (auto)
5. Manual approval for production
6. Deploy to production
7. Health checks

### 9.3 Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Database monitoring
- API response times
- User activity metrics

---

## 10. Migration Plan

### Phase 1: Foundation (Sprint 1)
- Set up database schema
- Implement authentication
- Create core API endpoints
- Basic CRUD operations

### Phase 2: Features (Sprint 2)
- Complete reporting workflow
- Donation integration
- Content management
- Admin dashboard

### Phase 3: Enhancement (Sprint 3)
- Advanced search
- Analytics dashboard
- Email notifications
- Performance optimization

---

### Next Steps:
- @QA - Review design for quality assurance concerns
- @SECA - Conduct security review
- @DEV - Review technical feasibility and prepare for implementation

#designing #backend-architecture
