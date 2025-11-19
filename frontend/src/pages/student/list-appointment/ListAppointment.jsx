import './ListAppointment.scss'

import Avt from '@/assets/student/avt.svg'
import { useNavigate } from 'react-router-dom'

const ListAppointment = () => {
    const navigate = useNavigate()
    return (
        <div className="list-appointment-container">
            <div className="header-appointment-container">
                <h2>Danh sách lớp của tôi</h2>
                <button className="btn-border">Lịch học của tôi</button>
            </div>

            <div className="card-list">
                <div className="card-item">
                    <div className="card-item-title">
                        <img src={Avt} alt="avt" />
                        <div className="card-item-info">
                            <p className="name-teacher">Lê Thành sách</p>
                            <p className="major">
                                Lĩnh vực: Toan Xu ly ngon ngu tu ly noan Xu ly ngon ngu tu ly noan
                                Xu ly ngon ngu tu ly n gon ngu
                            </p>
                        </div>
                    </div>
                    <p className="name-course">
                        Xu ly ngon ngu tu ly ngon ngu tuu ngon ngu tu ly ngon ngu tu ngon ngu tu ly
                        ngon ngu tu ly ngon ngu tu nhien
                    </p>
                    <button className="btn-detail" onClick={() => navigate('/list-appointment/1')}>
                        Xem chi tiết
                    </button>
                </div>

                <div className="card-item">
                    <div className="card-item-title">
                        <img src={Avt} alt="avt" />
                        <div className="card-item-info">
                            <p className="name-teacher">Lê Thành sách</p>
                            <p className="major">
                                Lĩnh vực: Toan Xu ly ngon ngu tu ly noan Xu ly ngon ngu tu ly noan
                                Xu ly ngon ngu tu ly n gon ngu
                            </p>
                        </div>
                    </div>
                    <p className="name-course">
                        Xu ly ngon ngu tu ly ngon ngu tuu ngon ngu tu ly ngon ngu tu ngon ngu tu ly
                        ngon ngu tu ly ngon ngu tu nhien
                    </p>
                    <button className="btn-detail">Xem chi tiết</button>
                </div>

                <div className="card-item">
                    <div className="card-item-title">
                        <img src={Avt} alt="avt" />
                        <div className="card-item-info">
                            <p className="name-teacher">Lê Thành sách</p>
                            <p className="major">
                                Lĩnh vực: Toan Xu ly ngon ngu tu ly noan Xu ly ngon ngu tu ly noan
                                Xu ly ngon ngu tu ly n gon ngu
                            </p>
                        </div>
                    </div>
                    <p className="name-course">
                        Xu ly ngon ngu tu ly ngon ngu tuu ngon ngu tu ly ngon ngu tu ngon ngu tu ly
                        ngon ngu tu ly ngon ngu tu nhien
                    </p>
                    <button className="btn-detail">Xem chi tiết</button>
                </div>

                <div className="card-item">
                    <div className="card-item-title">
                        <img src={Avt} alt="avt" />
                        <div className="card-item-info">
                            <p className="name-teacher">Lê Thành sách</p>
                            <p className="major">
                                Lĩnh vực: Toan Xu ly ngon ngu tu ly noan Xu ly ngon ngu tu ly noan
                                Xu ly ngon ngu tu ly n gon ngu
                            </p>
                        </div>
                    </div>
                    <p className="name-course">
                        Xu ly ngon ngu tu ly ngon ngu tuu ngon ngu tu ly ngon ngu tu ngon ngu tu ly
                        ngon ngu tu ly ngon ngu tu nhien
                    </p>
                    <button className="btn-detail">Xem chi tiết</button>
                </div>
                <div className="card-item">
                    <div className="card-item-title">
                        <img src={Avt} alt="avt" />
                        <div className="card-item-info">
                            <p className="name-teacher">Lê Thành sách</p>
                            <p className="major">
                                Lĩnh vực: Toan Xu ly ngon ngu tu ly noan Xu ly ngon ngu tu ly noan
                                Xu ly ngon ngu tu ly n gon ngu
                            </p>
                        </div>
                    </div>
                    <p className="name-course">
                        Xu ly ngon ngu tu ly ngon ngu tuu ngon ngu tu ly ngon ngu tu ngon ngu tu ly
                        ngon ngu tu ly ngon ngu tu nhien
                    </p>
                    <button className="btn-detail">Xem chi tiết</button>
                </div>
            </div>
        </div>
    )
}

export default ListAppointment
