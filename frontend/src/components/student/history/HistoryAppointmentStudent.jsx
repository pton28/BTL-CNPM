import { useEffect, useState } from 'react'
import './HistoryAppointmentStudent.scss'
import { useFetchListAppointmentByStudent } from '@/services/fetchAPI/useFetchListAppointmentByStudent'
import { useFetchStudentSlot } from '@/services/fetchAPI/useFetchStudentSlot'

const HistoryAppointmentStudentComponent = (props) => {
    console.log('props', props.history)
    const history = props.history || 'all' // Sửa tên biến từ histry thành history

    const [refresh, setRefresh] = useState(false)
    const { data: listAppointment, loading } = useFetchListAppointmentByStudent(refresh)

    const [appointmentFilter, setAppointmentFilter] = useState([])
    const [countById, setCountById] = useState({})

    useEffect(() => {
        if (loading) return

        const newCount = {}

        setCountById(newCount)
        console.log('id', newCount)

        // Lọc danh sách cuộc hẹn theo trạng thái (history)
        if (history === 'all') setAppointmentFilter(listAppointment)
        else setAppointmentFilter(listAppointment.filter(appt => appt.status === history))
    }, [history, listAppointment, loading]) // Đảm bảo history, listAppointment, loading được theo dõi

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <div className="list-history-container">
            <h2>Danh sách tất cả khóa học của bạn theo {history}</h2>

            <table className="course-table">
                <thead>
                    <tr>
                        <th>Tên khóa học</th>
                        <th>Ngày bắt đầu</th>
                        {/* <th>Ngày kết thúc</th> */}
                        <th>Số lượng buổi</th>
                        <th>Tiến độ</th>
                        <th>Giảng viên</th>
                        <th>Hình thức</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && appointmentFilter?.length > 0 &&
                        appointmentFilter.map((appt) => (
                            <tr key={appt._id}>
                                <td>{appt.meeting_id.title_meeting}</td>
                                {/* <td>{formatDate(appt.data_signup)}</td> */}
                                <td>{formatDate(appt.meeting_id.date_of_event)}</td>
                                <td>{appt.meeting_id.session_count}</td>
                                <td>{(countById[appt.meeting_id._id] / appt.meeting_id.session_count) * 100 || 0}%</td>
                                <td>{appt.tutorName}</td>
                                <td>{appt.status}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}


export default HistoryAppointmentStudentComponent