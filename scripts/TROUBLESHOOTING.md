# Troubleshooting Supabase Seed Script

## Common Errors and Solutions

If you're encountering issues with the seed script, here are some common problems and solutions:

## Permission Denied for Schema Public

**Error message:**
```
Error creating species table: {
  code: '42501',
  details: null,
  hint: null,
  message: 'permission denied for schema public'
}
```

**Solution:**
This error occurs because your Supabase user doesn't have permission to create tables. You need to:

1. Run the SQL setup script in the Supabase dashboard first:
   - Log in to your Supabase dashboard
   - Go to the SQL Editor
   - Copy the contents of `scripts/supabase-setup.sql`
   - Paste it into the SQL Editor and run the query

2. Then run the seed script:
   ```bash
   pnpm seed
   ```

## Supabase.query is not a function

**Error message:**
```
Error seeding database: TypeError: supabase.query is not a function
```

**Solution:**
The Supabase JavaScript client doesn't have a direct `query` method. We've updated the seed script to use the correct methods. Make sure you're using the latest version of the seed script:

```bash
pnpm seed
```

## Missing Unique Constraint for ON CONFLICT

**Error message:**
```
Error inserting species Amur Leopard: there is no unique or exclusion constraint matching the ON CONFLICT specification
```

**Solution:**
This error occurs because the `upsert` method is trying to use the `name` column as a unique constraint, but there's no unique constraint defined on that column. You need to:

1. Run the updated SQL setup script in the Supabase dashboard, which adds the UNIQUE constraint to the name column:
   - Log in to your Supabase dashboard
   - Go to the SQL Editor
   - Copy the contents of `scripts/supabase-setup.sql`
   - Paste it into the SQL Editor and run the query

2. Or manually add the unique constraint:
   ```sql
   ALTER TABLE public.species ADD CONSTRAINT species_name_key UNIQUE (name);
   ```

3. Or use the updated seed script that uses `insert` instead of `upsert` and deletes existing records first:
   ```bash
   pnpm seed
   ```

## Tables Don't Exist

**Error message:**
```
Error checking species table: relation "species" does not exist
```

**Solution:**
This error occurs because you haven't created the tables yet. You need to:

1. Run the SQL setup script in the Supabase dashboard first:
   - Log in to your Supabase dashboard
   - Go to the SQL Editor
   - Copy the contents of `scripts/supabase-setup.sql`
   - Paste it into the SQL Editor and run the query

2. Then run the seed script:
   ```bash
   pnpm seed
   ```

## Environment Variables Not Set

**Error message:**
```
Supabase URL: undefined
Supabase Key (first 5 chars): undefined
Error: Supabase URL or key is missing. Make sure you have a .env.local file with the correct values.
```

**Solution:**
This error occurs because your environment variables are not set correctly. You need to:

1. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase project URL and anon key.

3. Make sure the `.env.local` file is in the root directory of your project.

## Row Level Security (RLS) Policies

**Error message:**
```
Error inserting blog post The Silent Crisis: Understanding Biodiversity Loss: new row violates row-level security policy for table "blog_posts"
```

**Solution:**
This error occurs because your Supabase project has Row Level Security (RLS) enabled, but the policies are not set up correctly. You need to:

1. Run the SQL setup script in the Supabase dashboard, which includes the RLS policies:
   - Log in to your Supabase dashboard
   - Go to the SQL Editor
   - Copy the contents of `scripts/supabase-setup.sql`
   - Paste it into the SQL Editor and run the query

2. Or manually set up the RLS policies in the Supabase dashboard:
   - Go to the Authentication > Policies section
   - For each table (species and blog_posts), add policies that allow the service role to perform all operations

3. Or temporarily disable RLS for seeding (remember to enable it back after):
   ```sql
   ALTER TABLE public.species DISABLE ROW LEVEL SECURITY;
   ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;
   ```

   After seeding, re-enable RLS:
   ```sql
   ALTER TABLE public.species ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
   ```

## Network Issues

**Error message:**
```
Error: Failed to fetch
```

**Solution:**
This error can occur due to network issues or if your Supabase project is not accessible. You need to:

1. Check your internet connection
2. Make sure your Supabase project is up and running
3. Verify that the URL and key in your `.env.local` file are correct

## Still Having Issues?

If you're still encountering issues after trying these solutions, you can:

1. Check the Supabase logs in the dashboard for more detailed error messages
2. Try running the seed script with more verbose logging:
   ```bash
   NODE_DEBUG=http,https pnpm seed
   ```
3. Contact Supabase support if you believe there's an issue with your Supabase project
