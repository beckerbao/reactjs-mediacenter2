# Yêu Cầu Tính Năng và Kỹ Thuật cho Media Management

## 1. Yêu Cầu Tính Năng

### Tính năng Media Management (Cập nhật thêm):

- **Tìm kiếm và quản lý tệp media**:
  - Người dùng có thể tìm kiếm tệp media đã tải lên bằng cách nhập từ khóa trong ô tìm kiếm.
  - Danh sách media phải hiển thị tất cả các tệp đã tải lên, với các thông tin cơ bản như tên, loại tệp, kích thước và hình ảnh thu nhỏ (nếu có).

- **Tạo Folder**:
  - Người dùng có thể tạo folder mới trong **Media Management**.
  - Khi tạo folder, folder này sẽ xuất hiện trong danh sách bên trái (hoặc bên dưới nếu có phân chia theo cây).

- **Đổi tên Folder**:
  - Người dùng có thể click chuột phải vào folder và chọn **"Đổi tên"** để thay đổi tên folder.
  - Tên folder sẽ được cập nhật ngay lập tức trong UI.

- **Xoá Folder**:
  - Người dùng có thể xoá folder bằng cách click chuột phải vào folder và chọn **"Xoá"**.
  - Nếu folder có tệp con bên trong, sẽ có cảnh báo để người dùng xác nhận trước khi xoá.

- **Đổi tên File**:
  - Người dùng có thể click chuột phải vào tệp và chọn **"Đổi tên"** để thay đổi tên tệp.
  - Sau khi đổi tên, tệp sẽ được cập nhật trong UI.

- **Xoá File**:
  - Người dùng có thể xoá tệp bằng cách click chuột phải vào tệp và chọn **"Xoá"**.
  - Khi tệp bị xoá, nó sẽ biến mất khỏi danh sách media.

- **Context Menu (Menu chuột phải)**:
  - Khi người dùng click chuột phải vào một **tệp** hoặc **folder**, một **context menu** sẽ xuất hiện với các lựa chọn như **Đổi tên**, **Xoá**.
  - Context menu giúp người dùng dễ dàng thao tác mà không cần phải sử dụng các nút giao diện chính.

- **Hiển thị thumbnail cho tệp media**:
  - Hiển thị ảnh thu nhỏ của tệp media (ví dụ, ảnh, video) trong danh sách.

- **Công cụ lọc và tìm kiếm**:
  - Người dùng có thể lọc media đã tải lên bằng tên tệp hoặc các thuộc tính khác như loại tệp, kích thước.

- **Double click**:
  - Double click vào folder sẽ vào folder con
  - Có navigator để quay lại các thư mục trước đó
- **Folder**:
  - Cho phép tạo nhiều folder ở nhiều cấp

### Các tính năng khác:
- **UI/UX**:
  - Giao diện thân thiện, dễ sử dụng với các button rõ ràng cho thao tác tạo folder, tải lên, đổi tên và xoá.
  - Hiển thị thông báo cho người dùng về trạng thái tải lên (thành công, lỗi, hoặc thiếu tệp).
  
- **Lỗi và Xử lý**:
  - Thông báo lỗi nếu người dùng chưa chọn tệp để tải lên.
  - Thông báo thành công khi tải lên tệp thành công.

### Mock Data:
- **Sử dụng Mock Data** để demo các tính năng khi chưa kết nối với backend. Mock data sẽ bao gồm:
  - Các folder giả lập.
  - Các tệp media với tên, loại, kích thước, và hình ảnh thu nhỏ.

### Hiệu suất (Performance):
- **Xử lý nhiều file/folder**: 
  - Cần tối ưu hiệu suất khi có nhiều file và folder. Sử dụng **virtualization** (giống như **react-window** hoặc **react-virtualized**) để chỉ render các phần tử đang hiển thị trên màn hình.
  - Các thao tác như tải lên hoặc xóa tệp cần phải được tối ưu để không làm ảnh hưởng đến hiệu suất khi có nhiều tệp.

## 2. Yêu Cầu Kỹ Thuật

### Công nghệ sử dụng:
- **Frontend**: 
  - **ReactJS** (với **TypeScript**)
  - **Ant Design**: sử dụng các component giao diện như **Upload**, **Button**, **List**, **Modal**, **Menu**.
  - **React Router v6** cho việc điều hướng giữa các trang.
  - **Vite** làm công cụ build (build tool).

- **Virtualization**: 
  - **react-window** hoặc **react-virtualized**: Dùng để tối ưu hiệu suất khi danh sách media hoặc folder có nhiều item.

- **Backend (Mock)**:
  - **Mock Data**: Sử dụng dữ liệu giả lập để demo, tránh phụ thuộc vào backend cho việc xử lý tệp tin.
  - Sử dụng **localStorage** hoặc **mock API** để lưu trữ các tệp và folder trong quá trình phát triển.

### Technical Requirements:
- **Media Management phải build dưới dạng reusable components**. Các component cần được thiết kế sao cho dễ dàng tái sử dụng trong các phần khác của ứng dụng. Ví dụ:
  - **UploadMedia**: Component xử lý việc tải lên tệp.
  - **FolderList**: Component quản lý danh sách các folder.
  - **FileList**: Component quản lý danh sách các tệp trong folder.
  - **ContextMenu**: Component cho phép thao tác với menu chuột phải (đổi tên, xóa).

- **Cấu trúc thư mục**: Các file cần được tổ chức rõ ràng để dễ dàng tái sử dụng, mở rộng và bảo trì mã nguồn.

### Công cụ khác:
- **Context Menu**:
  - **Ant Design `Dropdown`** hoặc **`Menu`** để xây dựng context menu khi người dùng click chuột phải vào tệp hoặc folder.

## 3. Các Yêu Cầu Phi Chức Năng (Non-Functional Requirements):

1. **Tối ưu hiệu suất** khi có nhiều tệp và folder.
   - **Virtualization**: Chỉ render các item đang hiển thị trên màn hình khi người dùng cuộn.
   - Sử dụng **React.memo** hoặc **useMemo** để tránh các render lại không cần thiết.
   
2. **Xử lý các trường hợp khi người dùng thao tác với nhiều tệp/folder**:
   - Khi người dùng tải lên nhiều tệp, chắc chắn rằng hệ thống có thể xử lý và cập nhật giao diện một cách mượt mà.
   - Khi người dùng đổi tên hoặc xóa tệp/folder, giao diện cần được cập nhật ngay lập tức mà không gặp phải độ trễ.

3. **Đảm bảo khả năng mở rộng**: 
   - Hệ thống cần dễ dàng mở rộng khi kết nối với backend thực tế (để lưu trữ tệp thực sự).
   
4. **Khả năng tương thích với các trình duyệt khác nhau**:
   - Hệ thống cần phải hoạt động ổn định trên các trình duyệt phổ biến như Chrome, Firefox, Safari.

## 4. Kiểm Tra và Demo Tính Năng
1. **Kiểm tra tính năng Tải lên**: 
   - Đảm bảo người dùng có thể chọn tệp và tải lên các tệp, hiển thị chúng trong danh sách.
   
2. **Kiểm tra tính năng Tạo, Đổi tên, và Xoá Folder**:
   - Đảm bảo rằng người dùng có thể tạo folder, đổi tên folder, và xoá folder thành công.
   
3. **Kiểm tra tính năng Tìm kiếm và Lọc Media**:
   - Đảm bảo rằng người dùng có thể tìm kiếm và lọc media theo tên, loại, hoặc kích thước.

4. **Kiểm tra tính năng Context Menu**:
   - Đảm bảo rằng khi người dùng click chuột phải vào tệp hoặc folder, menu chứa các tùy chọn như **"Đổi tên"**, **"Xoá"** hiển thị đúng.

5. **Kiểm tra Hiệu Suất**:
   - Đảm bảo rằng khi có nhiều tệp và folder, giao diện vẫn mượt mà và không gặp vấn đề về hiệu suất.

6. **Kết quả dành cho**:
    - bên dưới là yêu cầu thực hiện 1 tính năng Media Management. Tôi là người không biết code reactjs do đó hãy hướng dẫn tôi từng bước thực hiện cài đặt cũng như tạo thư mục, chỉnh sửa file ở thư mục nào, file tên gì