# Hướng dẫn đăng nhập Admin

Hệ thống đăng nhập admin đã được đơn giản hóa để sử dụng thông tin đăng nhập từ biến môi trường thay vì Supabase Auth.

## Cấu hình

1. Thêm thông tin đăng nhập vào file `.env.local`:

```
# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin123!
```

Bạn có thể thay đổi tên người dùng và mật khẩu theo ý muốn.

## Cách sử dụng

1. Truy cập trang đăng nhập admin tại `/admin/login`
2. Nhập tên người dùng và mật khẩu đã cấu hình trong biến môi trường
3. Sau khi đăng nhập thành công, bạn sẽ được chuyển hướng đến trang dashboard

## Cách hoạt động

- Hệ thống sử dụng cookie để lưu trữ thông tin đăng nhập
- Cookie có tên là `admin_auth` và có thời hạn 1 ngày
- Middleware sẽ kiểm tra cookie này để bảo vệ các trang admin
- Nếu không có cookie hoặc cookie không hợp lệ, người dùng sẽ được chuyển hướng đến trang đăng nhập

## Đăng xuất

- Để đăng xuất, nhấp vào nút "Log out" ở góc trên bên phải của trang dashboard
- Điều này sẽ xóa cookie đăng nhập và chuyển hướng bạn đến trang đăng nhập

## Bảo mật

- Mật khẩu được lưu trữ trong biến môi trường và không được lưu trữ trong cơ sở dữ liệu
- Cookie đăng nhập chỉ chứa tên người dùng và trạng thái đăng nhập, không chứa mật khẩu
- Middleware bảo vệ tất cả các trang admin khỏi truy cập trái phép

## Tùy chỉnh

Nếu bạn muốn thêm nhiều người dùng admin hoặc vai trò khác nhau, bạn có thể mở rộng hệ thống bằng cách:

1. Thêm một bảng `admin_users` trong cơ sở dữ liệu Supabase
2. Cập nhật `auth-utils.ts` để kiểm tra thông tin đăng nhập từ cơ sở dữ liệu
3. Thêm logic vai trò để kiểm soát quyền truy cập vào các tính năng khác nhau
