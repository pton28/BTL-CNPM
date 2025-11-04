import './ListAppointment.scss'
import {useState} from "react";
import CourseComponent from "@/components/student/courseDetail/course/courseComponent.jsx";
import EvaluateComponent from "@/components/student/courseDetail/evaluate/evaluateComponent.jsx";
import DetailComponent from "@/components/student/courseDetail/detail/detailComponent.jsx";
import Unauthorized from "@/pages/common/unauthorized/Unauthorized.jsx";

/*
* Status:   Khoa hoc --> 1
*           Danh gia --> 2
*           Chi tiet --> 3
* */
const ListAppointment = () => {
    const [status, setStatus] = useState('evaluate')
    const mapStatus = () => {
        if(status === 'course') return <CourseComponent />
        else if(status === 'evaluate') return <EvaluateComponent />
        else if(status === 'detail') return <DetailComponent />
        else return <Unauthorized />
    }
    return (
        <div className="list-appointment-container">
            <div className='box'>
                <h1>Kỹ năng Chuyên nghiệp cho Kỹ sư (CO2001)_PHẠM MINH TUẤN (CQ_HK251) [L03]</h1>
                <div className='button-container'>
                    <button
                        className={status === 'course' ? 'active' : ''}
                        onClick={() => setStatus('course')}>
                            Khóa học
                    </button>
                    <button
                        className={status === 'evaluate' ? 'active' : ''}
                        onClick={() => setStatus('evaluate')}>
                            Đánh giá
                    </button>
                    <button
                        className={status === 'detail' ? 'active' : ''}
                        onClick={() => setStatus('detail')}>
                            Chi tiết
                    </button>
                </div>
                {mapStatus()}
            </div>

        </div>
    )
}

export default ListAppointment