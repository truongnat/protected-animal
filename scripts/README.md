# Database Seeding Instructions

This directory contains scripts to set up and seed your Supabase database with sample data for the Protected Animals website.

## Prerequisites

1. You need to have a Supabase project set up
2. You need to have your Supabase URL and anon key

## Setup Steps

### 1. Set up your environment variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase project URL and anon key.

### 2. Set up the database schema

**IMPORTANT: You must complete this step before running the seed script.**

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of `scripts/supabase-setup.sql`
4. Paste it into the SQL Editor and run the query

This will create the necessary tables, functions, and security policies for your application. The seed script assumes these tables already exist and will not attempt to create them.

### 3. Create an admin user

You have two options to create an admin user:

#### Option 1: Using the SQL Editor (recommended for initial setup)

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of the SQL script `scripts/setup-admin-table.sql`
4. Paste it into the SQL Editor and run the query to create the admin_users table
5. Then run the JavaScript script to create the admin user:

```bash
pnpm seed-admin
```

This will create a default admin user with the following credentials:
- Email: admin@example.com
- Password: Admin123!

**IMPORTANT**: Change this password after first login!

### 4. Run the seed script

Run the following command to seed your database with sample data:

```bash
pnpm seed
```

This will populate your database with:
- 10 endangered species with detailed information
- 3 blog posts about conservation topics

## Data Structure

### Species Table

The species table contains the following fields:

- `id`: Unique identifier
- `name`: Common name of the species
- `scientific_name`: Scientific name of the species
- `conservation_status`: Conservation status (e.g., "Critically Endangered")
- `population`: Estimated population size
- `habitat`: Description of the species' habitat
- `description`: Detailed description of the species
- `image_url`: URL to an image of the species
- `region`: Geographic region where the species is found
- `created_at`: Timestamp when the record was created

### Blog Posts Table

The blog posts table contains the following fields:

- `id`: Unique identifier
- `title`: Title of the blog post
- `content`: Content of the blog post in Markdown format
- `author`: Author of the blog post
- `image_url`: URL to a featured image for the blog post
- `published_at`: Date when the blog post was published
- `category`: Category of the blog post
- `tags`: Array of tags for the blog post
- `slug`: URL-friendly version of the title (unique)
- `created_at`: Timestamp when the record was created

### Admin Users Table

The admin_users table contains the following fields:

- `id`: Unique identifier
- `user_id`: Reference to auth.users table
- `email`: Email address of the admin user
- `role`: Role of the admin user (admin or superadmin)
- `created_at`: Timestamp when the record was created

### Profiles Table

The profiles table is required by Supabase Auth and contains the following fields:

- `id`: UUID that references auth.users(id)
- `username`: Username of the user
- `avatar_url`: URL to the user's avatar image
- `full_name`: Full name of the user
- `updated_at`: Timestamp when the record was last updated

## Troubleshooting

If you encounter any issues with the scripts:

### Error about "relation public.profiles does not exist"

Nếu bạn gặp lỗi này, đó là vì Supabase có một trigger tự động chạy khi một user mới được tạo, và trigger này cố gắng thêm dữ liệu vào bảng `public.profiles`. Script `create-admin.sql` đã được cập nhật để tạo bảng này và cấu hình trigger đúng cách.

### Error about "column reference user_id is ambiguous"

Nếu bạn gặp lỗi này, đó là vì có sự mơ hồ giữa biến `user_id` trong PL/pgSQL và cột `user_id` trong bảng `public.admin_users`. Script `create-admin.sql` đã được cập nhật để sử dụng tên biến khác (`admin_user_id`) để tránh xung đột này.

### Cannot login with admin user

Nếu bạn đã tạo admin user nhưng không thể đăng nhập vào web, có thể có vấn đề với cách mật khẩu được mã hóa hoặc lưu trữ. Bạn có thể sử dụng script `create-admin-simple.sql` để tạo lại admin user hoàn toàn mới, hoặc sử dụng script `reset-admin-password.sql` để chỉ đặt lại mật khẩu:

1. Đăng nhập vào Supabase dashboard
2. Vào SQL Editor
3. Sao chép nội dung của file `scripts/reset-admin-password.sql`
4. Dán vào SQL Editor và chạy

Script này sẽ đặt lại mật khẩu cho admin user với email `admin@example.com` thành `Admin123!`.

### Error about "violates foreign key constraint" or "duplicate key value"

Nếu bạn gặp các lỗi liên quan đến khóa ngoại hoặc khóa chính khi chạy script tạo admin user, hãy sử dụng script `create-admin-ultra-simple.sql`. Script này sử dụng cách tiếp cận đơn giản và an toàn hơn để tạo admin user:

1. Xóa dữ liệu từ bảng `admin_users` trước
2. Xóa user từ bảng `auth.users`
3. Tạo một user mới với UUID được kiểm tra để đảm bảo không trùng với bất kỳ ID nào trong bảng `profiles`
4. Thêm dữ liệu vào bảng `profiles` và `admin_users`

Script này được thiết kế đặc biệt để tránh lỗi "duplicate key value violates unique constraint" bằng cách kiểm tra xem UUID mới đã tồn tại trong bảng `profiles` chưa trước khi sử dụng nó.

1. Make sure your environment variables are correctly set
2. Check that you have run the SQL setup script in the Supabase SQL Editor
3. Ensure you have the necessary permissions in your Supabase project
4. Check the console output for specific error messages

For more detailed troubleshooting, see the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) file.
