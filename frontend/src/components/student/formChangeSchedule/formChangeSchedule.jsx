import './formChangeSchedule.scss'
import {useState} from "react";

const FormChangeSchedule = ({setShowFormChangeSchedule}) => {
    // lưu trữ chỉ số hàng được chọn
    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleChoose = (index) => {
        setSelectedIndex(index)
    }

    const rows = [
        {stt: 1, time: "08:00", date: "07/07/2025", place: "H6-910 Bách Khoa Dĩ An"},
        {stt: 2, time: "16:00", date: "25/07/2025", place: "Quán Cafe ABC Tầng 2"},
        {stt: 3, time: "08:00", date: "02/08/2025", place: "google.meet.com/dsad-das-dsad"},
        {stt: 4, time: "15:00", date: "03/08/2025", place: "Phòng họp A101"},
        {stt: 5, time: "09:30", date: "10/08/2025", place: "Online Zoom"},
    ]

    return (
        <div className="form-change-schedule-container">
            <div className='table-wrapper'>
                <table className="info-table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Giờ</th>
                        <th>Thời gian</th>
                        <th>Địa điểm</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.stt}</td>
                            <td>{row.time}</td>
                            <td>{row.date}</td>
                            <td>{row.place}</td>
                            <td
                                onClick={() => handleChoose(index)}
                                className={selectedIndex === index ? "active" : ""}
                            >
                                {selectedIndex === index ? "Đã chọn" : "Chọn"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className='group-button'>
                <button className='btn-close' onClick={() => setShowFormChangeSchedule(false)}>Close</button>
                <button className='btn-save' onClick={() => setShowFormChangeSchedule(false)}>OK</button>
            </div>
        </div>
    )
}

export default FormChangeSchedule
