import { sqliteTable, text, integer, index, real } from 'drizzle-orm/sqlite-core';

// ============================================
// USER MANAGEMENT TABLES
// ============================================

// Users table - Main user accounts
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name'),
  role: text('role', { enum: ['user', 'expert', 'admin'] }).notNull().default('user'),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  verificationToken: text('verification_token'),
  resetToken: text('reset_token'),
  resetTokenExpires: text('reset_token_expires'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  lastLogin: text('last_login'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for users
export const usersEmailIndex = index('users_email_idx').on(users.email);
export const usersRoleIndex = index('users_role_idx').on(users.role);
export const usersVerificationTokenIndex = index('users_verification_token_idx').on(users.verificationToken);
export const usersResetTokenIndex = index('users_reset_token_idx').on(users.resetToken);

// ============================================
// WILDLIFE CRIME REPORTING TABLES
// ============================================

// Reports table - Wildlife crime reports
export const reports = sqliteTable('reports', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  speciesId: integer('species_id').references(() => species.id),
  reportType: text('report_type', { 
    enum: ['sighting', 'illegal_activity', 'injured_animal', 'habitat_destruction', 'trafficking', 'other'] 
  }).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  locationName: text('location_name'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  incidentDate: text('incident_date'),
  evidenceUrls: text('evidence_urls'), // JSON array of file URLs
  isAnonymous: integer('is_anonymous', { mode: 'boolean' }).notNull().default(false),
  status: text('status', { 
    enum: ['pending', 'reviewing', 'verified', 'resolved', 'rejected'] 
  }).notNull().default('pending'),
  priority: text('priority', { 
    enum: ['low', 'medium', 'high', 'critical'] 
  }).notNull().default('medium'),
  reviewedBy: integer('reviewed_by').references(() => users.id),
  reviewedAt: text('reviewed_at'),
  reviewNotes: text('review_notes'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for reports
export const reportsUserIdIndex = index('reports_user_id_idx').on(reports.userId);
export const reportsSpeciesIdIndex = index('reports_species_id_idx').on(reports.speciesId);
export const reportsStatusIndex = index('reports_status_idx').on(reports.status);
export const reportsPriorityIndex = index('reports_priority_idx').on(reports.priority);
export const reportsCreatedAtIndex = index('reports_created_at_idx').on(reports.createdAt);

// ============================================
// DONATION & PROJECT TABLES
// ============================================

// Projects table - Conservation projects
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  goalAmount: real('goal_amount').notNull(),
  currentAmount: real('current_amount').notNull().default(0),
  startDate: text('start_date'),
  endDate: text('end_date'),
  status: text('status', { enum: ['active', 'completed', 'cancelled'] }).notNull().default('active'),
  imageUrl: text('image_url'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for projects
export const projectsStatusIndex = index('projects_status_idx').on(projects.status);
export const projectsCreatedByIndex = index('projects_created_by_idx').on(projects.createdBy);

// Donations table - User donations
export const donations = sqliteTable('donations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  projectId: integer('project_id').references(() => projects.id),
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('VND'),
  paymentMethod: text('payment_method', { 
    enum: ['card', 'bank_transfer', 'momo', 'zalopay', 'vnpay'] 
  }),
  paymentStatus: text('payment_status', { 
    enum: ['pending', 'completed', 'failed', 'refunded'] 
  }).notNull().default('pending'),
  transactionId: text('transaction_id').unique(),
  receiptUrl: text('receipt_url'),
  donorName: text('donor_name'),
  donorEmail: text('donor_email'),
  isAnonymous: integer('is_anonymous', { mode: 'boolean' }).notNull().default(false),
  message: text('message'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for donations
export const donationsUserIdIndex = index('donations_user_id_idx').on(donations.userId);
export const donationsProjectIdIndex = index('donations_project_id_idx').on(donations.projectId);
export const donationsStatusIndex = index('donations_status_idx').on(donations.paymentStatus);
export const donationsTransactionIdIndex = index('donations_transaction_id_idx').on(donations.transactionId);

// ============================================
// AUDIT & COMPLIANCE TABLES
// ============================================

// Audit logs table - Track all important actions
export const auditLogs = sqliteTable('audit_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(), // e.g., 'user.login', 'report.create', 'species.update'
  entityType: text('entity_type'), // e.g., 'user', 'report', 'species'
  entityId: integer('entity_id'),
  changes: text('changes'), // JSON object with before/after values
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for audit logs
export const auditLogsUserIdIndex = index('audit_logs_user_id_idx').on(auditLogs.userId);
export const auditLogsActionIndex = index('audit_logs_action_idx').on(auditLogs.action);
export const auditLogsEntityIndex = index('audit_logs_entity_idx').on(auditLogs.entityType, auditLogs.entityId);
export const auditLogsCreatedAtIndex = index('audit_logs_created_at_idx').on(auditLogs.createdAt);

// ============================================
// SPECIES TABLE
// ============================================

// Species table
// Species table
export const species = sqliteTable('species', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  scientificName: text('scientific_name').notNull(),
  vietnameseName: text('vietnamese_name'),
  category: text('category', { 
    enum: ['mammal', 'bird', 'reptile', 'amphibian', 'fish', 'invertebrate', 'plant'] 
  }),
  conservationStatus: text('conservation_status', {
    enum: ['EX', 'EW', 'CR', 'EN', 'VU', 'NT', 'LC', 'DD']
  }).notNull(),
  protectionLevel: text('protection_level', {
    enum: ['IA', 'IB', 'IIA', 'IIB'] // Vietnam Decree 32
  }),
  population: integer('population'),
  populationTrend: text('population_trend', {
    enum: ['increasing', 'stable', 'decreasing', 'unknown']
  }),
  habitat: text('habitat'),
  distribution: text('distribution'), // Geographic distribution in Vietnam
  threats: text('threats'), // JSON array
  description: text('description'),
  imageUrl: text('image_url'),
  region: text('region'),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for species
export const speciesRegionIndex = index('species_region_idx').on(species.region);
export const speciesStatusIndex = index('species_status_idx').on(species.conservationStatus);
export const speciesNameIndex = index('species_name_idx').on(species.name);
export const speciesScientificNameIndex = index('species_scientific_name_idx').on(species.scientificName);
export const speciesCategoryIndex = index('species_category_idx').on(species.category);
export const speciesProtectionLevelIndex = index('species_protection_level_idx').on(species.protectionLevel);
export const speciesFeaturedIndex = index('species_featured_idx').on(species.featured);
export const speciesCreatedByIndex = index('species_created_by_idx').on(species.createdBy);

// ============================================
// BLOG & CONTENT TABLES
// ============================================

// Blog posts table
export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  excerpt: text('excerpt'),
  coverImage: text('cover_image'),
  publishedAt: text('published_at'),
  author: text('author'),
  description: text('description'),
  image: text('image'),
  date: text('date'),
  readingTime: integer('reading_time'),
  tags: text('tags'), // JSON string
});

// Indexes for blog posts
export const blogPostsSlugIndex = index('blog_posts_slug_idx').on(blogPosts.slug);
export const blogPostsDateIndex = index('blog_posts_date_idx').on(blogPosts.date);

// Admin users table
export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('admin'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for admin users
export const adminUsersEmailIndex = index('admin_users_email_idx').on(adminUsers.email);

// Settings table
export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value'),
});

// Indexes for settings
export const settingsKeyIndex = index('settings_key_idx').on(settings.key);

// Team members table
export const teamMembers = sqliteTable('team_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  role: text('role'),
  bio: text('bio'),
  imageUrl: text('image_url'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for team members
export const teamMembersNameIndex = index('team_members_name_idx').on(teamMembers.name);