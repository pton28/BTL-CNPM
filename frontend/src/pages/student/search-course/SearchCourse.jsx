import './SearchCourse.scss'

const SearchCourse = () => {
    const faculties = [
        { value: 'cntt', name: 'Công nghệ thông tin' },
        { value: 'dtvt', name: 'Điện - Điện tử Viễn thông' },
        { value: 'ck', name: 'Cơ khí' },
        { value: 'xd', name: 'Xây dựng' },
        { value: 'qtkd', name: 'Quản trị kinh doanh' },
        { value: 'kt', name: 'Kinh tế' },
        { value: 'qlcn', name: 'Quản lý công nghiệp' },
        { value: 'hh', name: 'Hóa học' },
        { value: 'mt', name: 'Môi trường' },
        { value: 'nn', name: 'Ngoại ngữ' },
    ]

    const courses = [
        {
            subject: 'Nhập môn Trí tuệ nhân tạo',
            lecturer: 'Lê Thành Sách',
            department: 'Khoa học máy tính',
            mode: 'Online',
            status: 'Đăng ký',
        },
        {
            subject: 'Phân tích và xử lý ngôn ngữ tự nhiên nâng cao',
            lecturer: 'Nguyễn Minh Khôi',
            department: 'Trí tuệ nhân tạo',
            mode: 'Online',
            status: 'Đăng ký',
        },
        {
            subject: 'Học sâu ứng dụng trong thị giác máy tính',
            lecturer: 'Trần Thị Ngọc Hân',
            department: 'Khoa học dữ liệu',
            mode: 'Offline',
            status: 'Đã đăng ký',
        },
        {
            subject: 'Cơ sở dữ liệu và khai phá dữ liệu',
            lecturer: 'Phạm Hoàng Tuấn',
            department: 'Hệ thống thông tin',
            mode: 'Offline',
            status: 'Đăng ký',
        },
        {
            subject: 'Phát triển ứng dụng web với ReactJS',
            lecturer: 'Nguyễn Văn An',
            department: 'Công nghệ phần mềm',
            mode: 'Online',
            status: 'Đăng ký',
        },
        {
            subject: 'Mạng máy tính và truyền thông dữ liệu',
            lecturer: 'Bùi Đức Phước',
            department: 'Mạng máy tính',
            mode: 'Offline',
            status: 'Đăng ký',
        },
        {
            subject: 'Nhập môn lập trình Python cơ bản',
            lecturer: 'Trần Hữu Tín',
            department: 'Công nghệ thông tin',
            mode: 'Online',
            status: 'Đăng ký',
        },
        {
            subject: 'Phát triển phần mềm hướng đối tượng',
            lecturer: 'Nguyễn Hữu Nghĩa',
            department: 'Kỹ thuật phần mềm',
            mode: 'Offline',
            status: 'Đăng ký',
        },
        {
            subject: 'Xử lý ảnh số và thị giác máy tính',
            lecturer: 'Lê Minh Hải',
            department: 'Khoa học máy tính',
            mode: 'Offline',
            status: 'Đăng ký',
        },
        {
            subject: 'Lập trình di động với Flutter và Dart',
            lecturer: 'Phan Ngọc Bảo',
            department: 'Phát triển ứng dụng',
            mode: 'Online',
            status: 'Đăng ký',
        },
        {
            subject: 'Phân tích hệ thống và thiết kế phần mềm',
            lecturer: 'Đỗ Hoàng Tùng',
            department: 'Công nghệ phần mềm',
            mode: 'Offline',
            status: 'Đăng ký',
        },
        {
            subject: 'An toàn và bảo mật thông tin mạng',
            lecturer: 'Võ Ngọc Long',
            department: 'An ninh mạng',
            mode: 'Online',
            status: 'Đăng ký',
        },
        {
            subject: 'Trí tuệ nhân tạo ứng dụng trong giáo dục',
            lecturer: 'Nguyễn Thị Bích Phượng',
            department: 'Trí tuệ nhân tạo',
            mode: 'Offline',
            status: 'Đăng ký',
        },
        {
            subject: 'Phân tích dữ liệu lớn với Hadoop và Spark',
            lecturer: 'Phạm Duy Nam',
            department: 'Khoa học dữ liệu',
            mode: 'Online',
            status: 'Đăng ký',
        },
        {
            subject: 'Thiết kế giao diện người dùng nâng cao',
            lecturer: 'Hoàng Đức Dũng',
            department: 'Thiết kế phần mềm',
            mode: 'Offline',
            status: 'Đăng ký',
        },
        {
            subject: 'Lập trình hướng sự kiện với JavaScript',
            lecturer: 'Lâm Gia Bảo',
            department: 'Công nghệ phần mềm',
            mode: 'Online',
            status: 'Đăng ký',
        },
    ]

    return (
        <div className="search-course-container">
            <div className="filter">
                <h2>Bộ lọc</h2>
                <div className="filter-container">
                    <h3>Khoa</h3>
                    <select>
                        {faculties.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-container">
                    <h3>Giảng viên</h3>
                    <select>
                        {faculties.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-container">
                    <h3>Lĩnh vực</h3>
                    <select>
                        {faculties.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button className={'btn-login'}>Tìm kiếm</button>
            </div>

            <div className="list-container">
                <input
                    type={'text'}
                    placeholder={'Tìm kiếm khóa học'}
                    className={'search-course-input'}
                />
                <h2>Tất cả các khóa học</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Môn học</th>
                            <th>Giảng viên</th>
                            <th>Bộ môn</th>
                            <th>Hình thức</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((item, index) => (
                            <tr key={index}>
                                <td>{item.subject}</td>
                                <td>{item.lecturer}</td>
                                <td>{item.department}</td>
                                <td>{item.mode}</td>
                                <td>
                                    <span
                                        className={
                                            item.status === 'Đã đăng ký'
                                                ? 'status-badge registered'
                                                : 'status-badge register'
                                        }
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchCourse
