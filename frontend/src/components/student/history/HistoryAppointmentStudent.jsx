import './HistoryAppointmentStudent.scss'

const HistoryAppointmentStudent = (props) => {
    let history = props.history || 'all'


    return (
        <div className="list-history-container">

            <h1>Danh sách tất cả khóa học của bạn theo {history}</h1>

            <table className="course-table">
                <thead>
                <tr>
                    <th>Tên khóa học</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Số lượng buổi</th>
                    <th>Tiến độ</th>
                    <th>Giảng viên</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Xử lý ngôn ngữ tự nhiên</td>
                    <td>22/06/2025</td>
                    <td>Chưa hoàn thành</td>
                    <td>10</td>
                    <td>80%</td>
                    <td>Lê Thành Sách</td>
                </tr>
                <tr>
                    <td>Xử lý ngôn ngữ tự nhiên</td>
                    <td>22/06/2025</td>
                    <td>22/09/2025</td>
                    <td>10</td>
                    <td>50%</td>
                    <td>Lê Thành Sách</td>
                </tr>
                <tr>
                    <td>Xử lý ngôn ngữ tự nhiên</td>
                    <td>22/06/2025</td>
                    <td>Chưa hoàn thành</td>
                    <td>10</td>
                    <td>30%</td>
                    <td>Lê Thành Sách</td>
                </tr>
                <tr>
                    <td>Xử lý ngôn ngữ tự nhiên</td>
                    <td>22/06/2025</td>
                    <td>Chưa hoàn thành</td>
                    <td>10</td>
                    <td>10%</td>
                    <td>Lê Thành Sách</td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default HistoryAppointmentStudent