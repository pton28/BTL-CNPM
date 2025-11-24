import './HistoryAppointmentStudent.scss'

const HistoryAppointmentStudentComponent = props => {
    let history = props.history || 'all'

    /*
     const [data, setData] = useState([])

     const HISTORY_API = {
     all: '/api/history/all',
     upcoming: '/api/history/upcoming',
     completed: '/api/history/completed',
     teacher: '/api/history/teacher'
     }

     useEffect(() => {
         const fetchData = async () => {
             try {
                 const res = await axios.get(HISTORY_API[history])
                 setData(res.data)
             } catch (err) {
                 console.error(err)
             }
         }
         fetchData()
     }, [history])
    */
    return (
        <div className="list-history-container">
            <h2>Danh sách tất cả khóa học của bạn theo {history}</h2>

            <table className="course-table">
                <thead>
                    <tr>
                        <th>Tên khóa học</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Số lượng buổi</th>
                        <th>Tiến độ</th>
                        <th>Giảng viên</th>
                        <th>Hình thức</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Giai tich 1</td>
                        <td>22/06/2025</td>
                        <td>Chưa hoàn thành</td>
                        <td>10</td>
                        <td>80%</td>
                        <td>Lê Thành Sách</td>
                        <td>Offline</td>
                    </tr>
                    <tr>
                        <td>
                            Xử lý ngôn ngữ tự nhiên Xử lý ngôn ngữ tự nhiên gôn ngữ tự nhiên Xử lý
                            ngôn
                        </td>
                        <td>22/06/2025</td>
                        <td>22/09/2025</td>
                        <td>10</td>
                        <td>50%</td>
                        <td>Lê Thành Sách</td>
                        <td>Offline</td>
                    </tr>
                    <tr>
                        <td>Xử lý ngôn ngữ tự nhiên</td>
                        <td>22/06/2025</td>
                        <td>Chưa hoàn thành</td>
                        <td>10</td>
                        <td>30%</td>
                        <td>Lê Thành Sách</td>
                        <td>Offline</td>
                    </tr>
                    <tr>
                        <td>Xử lý ngôn ngữ tự nhiên</td>
                        <td>22/06/2025</td>
                        <td>Chưa hoàn thành</td>
                        <td>10</td>
                        <td>10%</td>
                        <td>Lê Thành Sách Lê Thành Sách</td>
                        <td>Offline</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default HistoryAppointmentStudentComponent
