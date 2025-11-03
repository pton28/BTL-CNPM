import './HistoryAppointment.scss'

import tatca from '@/assets/student/history/tatca.svg'
import dadienra from '@/assets/student/history/dadienra.svg'
import giangvien from '@/assets/student/history/giangvien.svg'
import hinhthuc from '@/assets/student/history/hinhthuc.svg'
import sapdienra from '@/assets/student/history/sapdienra.svg'
import {useState} from "react";
import HistoryAppointmentStudent from "@/components/student/history/HistoryAppointmentStudent.jsx";


const HistoryAppointment = () => {
    const [history, setHistory] = useState('all')
    return (
        <div className="history-container">
            <div className="tab">
                <ul>
                    <li
                        onClick={() => setHistory("all")}
                        className={history === "all" ? "active" : ""}
                    >
                        <img src={tatca} alt="tatca"/>
                        Tất cả
                    </li>

                    <li
                        onClick={() => setHistory("upcoming")}
                        className={history === "upcoming" ? "active" : ""}
                    >
                        <img src={sapdienra} alt="sapdienra"/>
                        Sắp diễn ra
                    </li>

                    <li
                        onClick={() => setHistory("past")}
                        className={history === "past" ? "active" : ""}
                    >
                        <img src={dadienra} alt="dadienra"/>
                        Đã diễn ra
                    </li>

                    <li
                        onClick={() => setHistory("teacher")}
                        className={history === "teacher" ? "active" : ""}
                    >
                        <img src={giangvien} alt="gv"/>
                        Phân loại theo Giảng viên
                    </li>

                    <li
                        onClick={() => setHistory("type")}
                        className={history === "type" ? "active" : ""}
                    >
                        <img src={hinhthuc} alt="hinhthuc"/>
                        Phân loại theo gì đó
                    </li>
                </ul>
            </div>
                <HistoryAppointmentStudent history={history} />
        </div>
    )
}

export default HistoryAppointment