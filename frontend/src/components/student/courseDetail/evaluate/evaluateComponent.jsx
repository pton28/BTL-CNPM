import './evaluateComponent.scss'

const EvaluateComponent = () => {
    const questions = [
        {
            questionText: "Nhìn chung, mức độ hài lòng của bạn đối với Học phần này? /Overall, how satisfied are you with this course?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Giảng viên có giải thích rõ ràng và dễ hiểu không? /Did the instructor explain clearly and understandably?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Mức độ quan tâm của giảng viên đối với sinh viên như thế nào? /How concerned was the instructor with students?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Chất lượng tài liệu học tập được cung cấp có tốt không? /How good were the study materials provided?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Bạn cảm thấy lớp học có đủ thời gian để tiếp thu kiến thức không? /Did you feel the class had enough time to absorb the knowledge?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Bạn có thích phương pháp giảng dạy của giảng viên không? /Did you like the teaching method of the instructor?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Chương trình học có hợp lý và đầy đủ không? /Was the curriculum reasonable and complete?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Các bài kiểm tra, bài thi có công bằng và hợp lý không? /Were the tests and exams fair and reasonable?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Bạn có cảm thấy thoải mái khi tham gia lớp học không? /Did you feel comfortable participating in the class?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        },
        {
            questionText: "Bạn có sẵn sàng giới thiệu khóa học này cho người khác không? /Would you recommend this course to others?",
            options: ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Không hài lòng', 'Rất không hài lòng'],
            type: 'radio'
        }
    ];

    return (
        <div className="evaluate-appointment-container">
            {questions.map((q, i) => (
                <div className="question" key={i}>
                    <p>{q.questionText}</p>
                    {q.type === 'radio' ? (
                        q.options.map((option, j) => (
                            <label key={j}>
                                <input type="radio" name={`question${i}`} value={option} />
                                {option}
                            </label>
                        ))
                    ) : (
                        <textarea placeholder="Nhập phản hồi của bạn..." />
                    )}
                </div>
            ))}
            <button className="btn-login">Submit</button>
        </div>
    );
}


export default EvaluateComponent
