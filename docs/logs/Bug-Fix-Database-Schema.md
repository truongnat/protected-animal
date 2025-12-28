# Bug Fix - Database Schema Mismatch

## Date: 2025-12-28
## Status: ✅ Fixed

---

## Issue Reported

### Error Messages
```
Login error: INTERNAL_ERROR - An error occurred during login

Error fetching all species: [SqliteError: no such column: "vietnamese_name" 
- should this be a string literal in single-quotes?]
```

---

## Root Cause

**Schema Mismatch**: The database was created with the old schema before we added new columns to the species table:
- `vietnamese_name`
- `category`
- `protection_level`
- `population_trend`
- `distribution`
- `threats`
- `featured`
- `created_by`
- `updated_at`

The code was trying to query these columns, but they didn't exist in the database.

---

## Solution

### 1. Database Reset
Deleted old database and recreated with new schema:
```bash
Remove-Item ./data/protected-animals.db
node scripts/setup-db.js
```

### 2. Created Species Seed Script
**File**: `scripts/seed-species.js`

**Features**:
- Seeds 8 Vietnamese endangered species
- Includes all new schema fields
- Vietnamese names
- Protection levels (Decree 32)
- Population trends
- Threat data (JSON)
- Featured flag

**Species Seeded**:
1. Saola (Sao la) - CR, IB
2. Indochinese Tiger (Hổ Đông Dương) - EN, IB
3. Asian Elephant (Voi châu Á) - EN, IB
4. Red-shanked Douc (Voọc chà vá chân nâu) - EN, IB
5. Sunda Pangolin (Tê tê Java) - CR, IB
6. Hawksbill Turtle (Rùa biển) - CR, IB
7. Tonkin Snub-nosed Monkey - CR, IB
8. Sun Bear (Gấu chó) - VU, IB

### 3. Updated Package.json Scripts
```json
{
  "seed:species": "node scripts/seed-species.js",
  "db:setup": "node scripts/setup-db.js && node scripts/seed-species.js",
  "db:reset": "node -e \"require('fs').unlinkSync('./data/protected-animals.db')\" && npm run db:setup"
}
```

---

## Database Schema (Final)

### Users Table
```sql
- id, email, password_hash, full_name
- role (user/expert/admin)
- email_verified, verification_token
- reset_token, reset_token_expires
- is_active, last_login
- created_at, updated_at
```

### Species Table (Updated)
```sql
- id, name, scientific_name, vietnamese_name
- category (mammal/bird/reptile/etc)
- conservation_status (CR/EN/VU/NT/LC/DD)
- protection_level (IA/IB/IIA/IIB - Decree 32)
- population, population_trend
- habitat, distribution
- threats (JSON array)
- description, image_url, region
- featured (boolean)
- created_by (FK to users)
- created_at, updated_at
```

### Other Tables
- reports
- projects
- donations
- audit_logs

---

## Testing Performed

### Database
- ✅ All tables created successfully
- ✅ All columns present
- ✅ Indexes created
- ✅ Foreign keys working

### Users
- ✅ 3 test users created
- ✅ Passwords hashed correctly
- ✅ Roles assigned

### Species
- ✅ 8 species seeded
- ✅ All fields populated
- ✅ Vietnamese names present
- ✅ Protection levels set
- ✅ Featured flag working

### Authentication
- ✅ Login works with test credentials
- ✅ User menu displays
- ✅ Role badges show correctly

### Species Display
- ✅ Species list loads
- ✅ Species cards display
- ✅ No database errors

---

## Commands for Future Use

### Reset Database (Clean Start)
```bash
npm run db:reset
```

### Setup Database (First Time)
```bash
npm run db:setup
```

### Seed Species Only
```bash
npm run seed:species
```

### Manual Steps
```bash
# Delete database
Remove-Item ./data/protected-animals.db

# Create tables and seed users
node scripts/setup-db.js

# Seed species
node scripts/seed-species.js
```

---

## Files Created/Modified

### Created
1. `scripts/seed-species.js` - Species seeding script
2. `docs/logs/Bug-Fix-Database-Schema.md` - This file

### Modified
3. `package.json` - Added new scripts

---

## Prevention

### For Future Schema Changes
1. Always delete old database when schema changes
2. Run `npm run db:reset` after schema updates
3. Update seed scripts to match new schema
4. Test with fresh database before committing

### Documentation
- Document schema changes in migration logs
- Update README with database setup instructions
- Keep seed scripts in sync with schema

---

## Verification Steps

1. ✅ Database file exists: `./data/protected-animals.db`
2. ✅ Users table has 3 users
3. ✅ Species table has 8 species
4. ✅ All columns present in species table
5. ✅ Login works with test credentials
6. ✅ Species page loads without errors
7. ✅ No console errors

---

## Status: ✅ RESOLVED

Database schema is now correct and fully seeded. Application is ready for use.

### Latest Update (2025-12-28)
- ✅ Database verified: All tables present with correct schema
- ✅ 3 users seeded (admin, expert, user)
- ✅ 8 species seeded with full data
- ✅ Dev server restarted on port 3001
- ✅ Database path configured: `./data/protected-animals.db`
- ✅ Ready for testing

---

## Test Credentials

```
Admin:  admin@protected-animals.vn / admin123
Expert: expert@protected-animals.vn / expert123
User:   user@protected-animals.vn / user123
```

---

#bugfix #database #schema #migration
