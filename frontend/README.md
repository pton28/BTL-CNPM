# Lưu ảnh của từng Component
Lưu trong assets


📁 src/
├── 📁 assets/
│   ├── 📄 images/
│   └── 📄 icons/
│
├── 📁 components/
│   ├── 📁 ui/             # (Tùy chọn) Các component nhỏ nhất (Button, Input, Modal)
│   │   ├── 📄 Button.jsx
│   │   └── 📄 Modal.jsx
│   ├── 📁 layout/         # Các component bố cục chung
│   │   ├── 📄 Header.jsx
│   │   ├── 📄 Sidebar.jsx
│   │   └── 📄 MainLayout.jsx
│   └── 📄 Spinner.jsx
│
├── 📁 config/
│   └── 📄 index.js        # (Nơi lưu API_URL, hằng số chung)
│
├── 📁 context/            # (Hoặc store/ nếu dùng Redux/Zustand)
│   └── 📄 AuthContext.jsx
│
├── 📁 features/           # 🚀 NƠI QUAN TRỌNG NHẤT
│   ├── 📁 authentication/
│   │   ├── 📄 LoginForm.jsx
│   │   ├── 📄 RegisterForm.jsx
│   │   └── 📄 useAuth.js      # (Hook/logic riêng cho auth)
│   │
│   ├── 📁 courses/
│   │   ├── 📄 CourseList.jsx
│   │   ├── 📄 CourseCard.jsx
│   │   ├── 📄 CourseDetails.jsx
│   │   ├── 📄 LessonPlayer.jsx
│   │   └── 📄 Quiz.jsx
│   │
│   ├── 📁 dashboard/
│   │   ├── 📁 student/
│   │   │   └── 📄 MyCourses.jsx
│   │   ├── 📁 tutor/
│   │   │   └── 📄 CourseManagement.jsx
│   │   └── 📄 Statistics.jsx│   │
│   └── 📁 admin/
│       ├── 📄 UserTable.jsx
│       └── 📄 ApprovalQueue.jsx
│
├── 📁 hooks/              # Các hooks DÙNG CHUNG
│   ├── 📄 useApi.js
│   └── 📄 useDebounce.js
│
├── 📁 pages/              # Các "trang" để React Router trỏ đến
│   ├── 📄 HomePage.jsx
│   ├── 📄 LoginPage.jsx
│   ├── 📄 CourseDetailPage.jsx
│   ├── 📄 StudentDashboardPage.jsx
│   ├── 📄 TutorDashboardPage.jsx
│   └── 📄 NotFoundPage.jsx
│
├── 📁 routes/
│   ├── 📄 AppRoutes.jsx     # (File định nghĩa tất cả routes)
│   └── 📄 ProtectedRoute.jsx
│
├── 📁 services/ (hoặc api/)
│   ├── 📄 apiClient.js    # (Cấu hình Axios/fetch)
│   ├── 📄 authService.js
│   └── 📄 courseService.js
│
├── 📁 utils/              # Các hàm helper DÙNG CHUNG
│   ├── 📄 formatDate.js
│   └── 📄 validators.js
│
├── 📄 App.jsx             # (Chứa Router Provider, Context Provider)
├── 📄 main.jsx            # (Entry point)
└── 📄 index.css           # (Global styles)