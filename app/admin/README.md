# Protected Animals CMS

This is a simple Content Management System (CMS) for the Protected Animals website. It allows administrators to manage species, blog posts, team members, and website settings.

## Features

- **Authentication**: Secure login for administrators
- **Dashboard**: Overview of website content and statistics
- **Species Management**: Add, edit, and delete endangered species
- **Blog Management**: Create, edit, and publish blog posts
- **Team Management**: Manage team member profiles
- **Settings**: Configure website settings and social media links

## Setup Instructions

### 1. Database Setup

Before using the CMS, you need to set up the necessary database tables and create an admin user:

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Run the following SQL scripts in order:
   - `scripts/supabase-setup.sql` (Main database setup)
   - `scripts/admin-setup.sql` (Admin users and settings tables)
   - `scripts/team-setup.sql` (Team members table)

### 2. Create the First Admin User

After running the setup scripts, create your first admin user:

1. In the Supabase SQL Editor, run:
   ```sql
   SELECT create_first_admin('your-email@example.com', 'your-secure-password');
   ```
   Replace `your-email@example.com` and `your-secure-password` with your actual email and a secure password.

2. You should see a success message: "First admin user created successfully."

### 3. Accessing the CMS

1. Navigate to `/admin/login` on your website
2. Log in with the email and password you created in step 2
3. You'll be redirected to the admin dashboard

## Usage

### Managing Species

1. Go to the "Species" section in the sidebar
2. View all species in the table
3. Click "Add New Species" to create a new species
4. Click "Edit" on any row to modify an existing species
5. Click "Delete" to remove a species (requires confirmation)

### Managing Blog Posts

1. Go to the "Blog Posts" section in the sidebar
2. View all blog posts in the table
3. Click "Create New Post" to write a new blog post
4. Click "Edit" on any row to modify an existing post
5. Click "Delete" to remove a post (requires confirmation)

### Managing Team Members

1. Go to the "Team Members" section in the sidebar
2. View all team members in the table
3. Click "Add Team Member" to add a new team member
4. Click "Edit" on any row to modify an existing team member
5. Click "Delete" to remove a team member (requires confirmation)

### Configuring Settings

1. Go to the "Settings" section in the sidebar
2. Update the website title, description, contact email, and social media links
3. Click "Save Settings" to apply the changes

## Security

- The CMS is protected by authentication and authorization
- Only users in the `admin_users` table can access the CMS
- Row Level Security (RLS) policies ensure data can only be modified by authorized users
- Passwords are securely hashed and stored in Supabase Auth

## Troubleshooting

If you encounter any issues:

1. Check that all SQL scripts have been run successfully
2. Verify that your admin user was created correctly
3. Ensure your Supabase URL and anon key are correctly set in `.env.local`
4. Check the browser console for any JavaScript errors
