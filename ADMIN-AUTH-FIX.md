# Sửa lỗi vòng lặp đăng nhập admin

## Vấn đề

Sau khi đăng nhập admin thành công, người dùng bị mắc kẹt trong một vòng lặp chuyển hướng giữa trang dashboard admin và trang chủ.

## Nguyên nhân

Vấn đề xảy ra do sự xung đột giữa hai hệ thống xác thực khác nhau:

1. Hệ thống xác thực cũ sử dụng Supabase Auth (trong `lib/auth.ts`)
2. Hệ thống xác thực mới sử dụng cookie đơn giản (trong `lib/auth-utils.ts`)

Các thành phần khác nhau trong ứng dụng đang sử dụng các hệ thống xác thực khác nhau, dẫn đến tình trạng một hệ thống cho rằng người dùng đã đăng nhập trong khi hệ thống khác cho rằng người dùng chưa đăng nhập.

## Giải pháp

1. Cập nhật tất cả các thành phần để sử dụng cùng một hệ thống xác thực (hệ thống mới trong `lib/auth-utils.ts`)
2. Cập nhật `lib/auth.ts` để chuyển hướng các cuộc gọi đến hệ thống xác thực mới
3. Cập nhật trang đăng xuất để xóa cookie đăng nhập trên cả client và server

## Các file đã được cập nhật

1. `lib/auth.ts` - Cập nhật để sử dụng hệ thống xác thực mới
2. `app/admin/layout.tsx` - Cập nhật để sử dụng hệ thống xác thực mới
3. `components/admin/UserInfo.tsx` - Cập nhật để sử dụng hệ thống xác thực mới
4. `app/admin/logout/page.tsx` - Cập nhật để xóa cookie đăng nhập trên cả client và server
5. `app/admin/logout/actions.ts` - Cập nhật để xóa cookie đăng nhập trên server

## Cách hoạt động

1. Khi người dùng đăng nhập, thông tin đăng nhập được lưu trong cookie `admin_auth`
2. Middleware kiểm tra cookie này để bảo vệ các trang admin
3. Khi người dùng đăng xuất, cookie được xóa trên cả client và server

## Kiểm tra

1. Đăng nhập vào trang admin với thông tin đăng nhập đúng
2. Kiểm tra xem bạn có thể truy cập trang dashboard admin không
3. Đăng xuất và kiểm tra xem bạn có bị chuyển hướng đến trang đăng nhập không
4. Kiểm tra xem bạn có thể truy cập trang dashboard admin sau khi đăng xuất không (bạn không nên có thể)
