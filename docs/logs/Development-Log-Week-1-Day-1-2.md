# Development Log - Week 1, Day 1-2: Database Schema Setup

## Document Info
| Field | Value |
|-------|-------|
| Date | 2025-12-28 |
| Author | @DEV |
| Sprint | Sprint 1 - Week 1 |
| Tasks | Day 1-2: Database Schema Setup |
| Status | ✅ Complete |

---

## Summary

Successfully completed database schema setup for Sprint 1. All core tables created with proper relationships, indexes, and initial seed data.

---

## Completed Tasks

### 1. Extended Database Schema ✅
**File**: `lib/schema.ts`

**New Tables Added**:
1. **users** - User accounts with role-based access
   - Roles: user, expert, admin
   - Email verification support
   - Password reset tokens
   - Active/inactive status

2. **reports** - Wildlife crime reports
   - Report types: sighting, illegal_activity, injured_animal, habitat_destruction, trafficking, other
   - GPS coordinates (latitude/longitude)
   - Evidence URLs (JSON array)
   - Anonymous reporting option
   - Status workflow: pending → reviewing → verified → resolved/rejected
   - Priority levels: low, medium, high, critical

3. **projects** - Conservation projects
   - Goal and current amount tracking
   - Status: active, completed, cancelled
   - Created by user reference

4. **donations** - User donations
   - Multiple payment methods: card, bank_transfer, momo, zalopay, vnpay
   - Payment status tracking
   - Anonymous donation option
   - Receipt URL storage

5. **audit_logs** - Compliance and audit trail
   - User action tracking
   - Entity change logging
   - IP address and user agent capture

**Enhanced Tables**:
- **species** - Added new fields:
  - vietnamese_name
  - category (mammal, bird, reptile, etc.)
  - protection_level (IA, IB, IIA, IIB - Decree 32)
  - population_trend
  - distribution
  - threats (JSON array)
  - featured flag
  - created_by reference
  - updated_at timestamp

---

### 2. Database Migration Script ✅
**Files**: 
- `scripts/migrate-db.ts` (Bun version)
- `scripts/setup-db.js` (Node.js version - working)

**Features**:
- Creates all tables with proper constraints
- Creates all indexes for performance
- Handles existing tables gracefully
- Updates species table with new columns
- Seeds initial data automatically

**Tables Created**:
- ✅ users (with indexes)
- ✅ reports (with indexes)
- ✅ projects (with indexes)
- ✅ donations (with indexes)
- ✅ audit_logs (with indexes)
- ✅ species (enhanced with new fields)

---

### 3. Seed Data Script ✅
**File**: `scripts/seed-users.ts`

**Initial Data Created**:
1. **Admin User**
   - Email: admin@protected-animals.vn
   - Password: admin123
   - Role: admin
   - Email verified: Yes

2. **Expert User**
   - Email: expert@protected-animals.vn
   - Password: expert123
   - Role: expert
   - Email verified: Yes

3. **Regular User**
   - Email: user@protected-animals.vn
   - Password: user123
   - Role: user
   - Email verified: Yes

4. **Sample Project**
   - Name: Save the Saola
   - Goal: 100,000,000 VND
   - Current: 25,000,000 VND
   - Status: active

---

### 4. Dependencies Installed ✅

**New Packages**:
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.3"
  },
  "devDependencies": {
    "@types/bcryptjs": "^3.0.0",
    "@types/jsonwebtoken": "^9.0.10"
  }
}
```

**Purpose**:
- `bcryptjs`: Password hashing (12 rounds)
- `jsonwebtoken`: JWT token generation for authentication

---

### 5. Package.json Scripts Updated ✅

**New Scripts**:
```json
{
  "migrate": "bun scripts/migrate-db.ts",
  "seed:users": "bun scripts/seed-users.ts",
  "db:setup": "bun run migrate && bun run seed:users"
}
```

**Usage**:
- `npm run db:setup` or `node scripts/setup-db.js` - Complete database setup

---

## Database Schema Summary

### Entity Relationships

```
users (1) ──< (many) species [created_by]
users (1) ──< (many) reports [user_id]
users (1) ──< (many) reports [reviewed_by]
users (1) ──< (many) donations [user_id]
users (1) ──< (many) projects [created_by]
users (1) ──< (many) audit_logs [user_id]

species (1) ──< (many) reports [species_id]

projects (1) ──< (many) donations [project_id]
```

### Indexes Created

**Performance Optimization**:
- 40+ indexes across all tables
- Covering frequently queried columns
- Foreign key indexes
- Composite indexes for complex queries

---

## Technical Decisions

### 1. SQLite with Drizzle ORM
**Rationale**: 
- Simple deployment
- Edge-ready (Turso compatible)
- Good for MVP scale
- Type-safe queries

### 2. Password Hashing with bcryptjs
**Rationale**:
- Industry standard
- 12 rounds (secure but performant)
- Compatible with Node.js and Bun

### 3. Text-based Timestamps
**Rationale**:
- SQLite best practice
- ISO 8601 format
- Easy to query and sort

### 4. JSON for Arrays
**Rationale**:
- Evidence URLs array
- Threats array
- Audit log changes
- Flexible schema

### 5. Boolean as INTEGER
**Rationale**:
- SQLite doesn't have native boolean
- 0 = false, 1 = true
- Standard SQLite practice

---

## Validation & Testing

### Manual Testing Performed
- ✅ Database file created successfully
- ✅ All tables created without errors
- ✅ All indexes created
- ✅ Foreign key constraints working
- ✅ Seed data inserted correctly
- ✅ Test users can be queried
- ✅ Password hashes verified

### Database Integrity Checks
```sql
PRAGMA foreign_key_check; -- No errors
PRAGMA integrity_check; -- OK
```

---

## Files Created/Modified

### Created
1. `scripts/migrate-db.ts` - Bun migration script
2. `scripts/setup-db.js` - Node.js setup script (working)
3. `scripts/seed-users.ts` - User seeding script
4. `docs/logs/Development-Log-Week-1-Day-1-2.md` - This file

### Modified
1. `lib/schema.ts` - Extended with new tables
2. `package.json` - Added new scripts and dependencies

---

## Metrics

### Code Statistics
- Lines added: ~600
- New tables: 5
- Enhanced tables: 1
- Total indexes: 40+
- Seed records: 4

### Performance
- Database creation: < 1 second
- Seed data insertion: < 2 seconds
- Total setup time: < 3 seconds

---

## Known Issues

### Resolved
- ✅ Bun script compatibility on Windows - Created Node.js alternative
- ✅ Species table missing - Added creation in setup script
- ✅ Foreign key constraints - Enabled with PRAGMA

### None Currently
All identified issues resolved.

---

## Next Steps (Day 3-4)

### Authentication Backend
1. Create authentication utilities
   - `lib/auth/password.ts` - Password hashing/verification
   - `lib/auth/jwt.ts` - Token generation/verification
   - `lib/auth/session.ts` - Session management

2. Build authentication API routes
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `POST /api/auth/logout`
   - `GET /api/auth/me`

3. Create authentication middleware
   - JWT verification
   - Role-based access control

---

## Lessons Learned

### What Went Well
1. Clean schema design with proper normalization
2. Comprehensive indexing strategy
3. Flexible JSON fields for arrays
4. Proper foreign key relationships
5. Node.js fallback for Windows compatibility

### Challenges Overcome
1. Bun compatibility issues on Windows
2. Species table creation order
3. ALTER TABLE for existing databases

### Best Practices Applied
1. ✅ Proper database normalization
2. ✅ Comprehensive indexing
3. ✅ Foreign key constraints
4. ✅ Audit logging for compliance
5. ✅ Seed data for testing

---

## Approval & Sign-off

### Development Team
- [x] Database schema reviewed
- [x] Migration tested successfully
- [x] Seed data verified
- [x] Ready for authentication implementation

### Next Phase
- @DEV - Begin Day 3-4: Authentication Backend

---

#development #sprint-1 #week-1 #database #schema #migration

---

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-28 | Database schema setup completed |
