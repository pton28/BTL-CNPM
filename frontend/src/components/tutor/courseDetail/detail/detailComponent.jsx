import './detailComponent.scss'
import { useState } from 'react'
import FormChangeSchedule from '@/components/student/formChangeSchedule/formChangeSchedule.jsx'

const DetailComponent = () => {
    const [showFormChangeSchedule, setShowFormChangeSchedule] = useState(false)
    return (
        <div className="detail-appointment-container">
            <h2>Chi tiết các buổi học</h2>

            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Buổi</th>
                        <th>Ngày diễn ra</th>
                        <th>Giờ</th>
                        <th>Địa điểm</th>
                        <th>Trạng thái</th>
                        <th>Nhận xét của giảng viên</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>07/07/2025</td>
                        <td>8:00</td>
                        <td>google.meet.com/dsad-dáds-dasad</td>
                        <td>Đã diễn ra</td>
                        <td>Đóng góp xây dựng bài tốt, có tầm nhìn xa</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>15/07/2025</td>
                        <td>8:00</td>
                        <td>H6-910 Bách Khoa Dĩ An</td>
                        <td>Đã diễn ra</td>
                        <td>Đóng góp xây dựng bài tốt, có tầm nhìn xa</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>25/07/2025</td>
                        <td>16:00</td>
                        <td>H6-910 Bách Khoa Dĩ An</td>
                        <td>Đã diễn ra</td>
                        <td>Đóng góp xây dựng bài tốt, có tầm nhìn xa</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>25/07/2025</td>
                        <td>16:00</td>
                        <td>H6-910 Bách Khoa Dĩ An</td>
                        <td>Đã diễn ra</td>
                        <td>Đóng góp xây dựng bài tốt, có tầm nhìn xa</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>25/07/2025</td>
                        <td>16:00</td>
                        <td>H6-910 Bách Khoa Dĩ An</td>
                        <td>Đã diễn ra</td>
                        <td>Đóng góp xây dựng bài tốt, có tầm nhìn xa</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>02/08/2025</td>
                        <td>8:00</td>
                        <td>Quán Cafe ABC Tầng 2</td>
                        <td>Sắp diễn ra</td>
                        <td>
                            <button
                                className="change-btn"
                                onClick={() => setShowFormChangeSchedule(true)}
                            >
                                Thay đổi thời gian
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {showFormChangeSchedule && (
                <FormChangeSchedule setShowFormChangeSchedule={setShowFormChangeSchedule} />
            )}
        </div>
    )
}

export default DetailComponent
