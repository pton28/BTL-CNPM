import './evaluateComponent.scss'

const EvaluateComponent = () => {
    return (
        <div className="evaluate-appointment-container">
            <div className='question'>
                <p>Nhìn chung, mức độ hài lòng của bạn đối với Học phần này? /Overall, how satisfied are you with tức độ hài lòng của bạn đối với Học phần này? /Overall, how satisfiehis course?</p>
                {["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng", "Rất không hài lòng"].map((option, i) => (
                    <label key={i}>
                        <input type="radio" name="satisfaction" value={option} />
                        {option}
                    </label>
                ))}
            </div>

            <div className='question'>
                <p>Nhìn chung, mức độ hài lòng của bạn đối với Học phần này? /Overall, how satisfied are you with this course?</p>
                {["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng", "Rất không hài lòng"].map((option, i) => (
                    <label key={i}>
                        <input type="radio" name="satisfaction" value={option} />
                        {option}
                    </label>
                ))}
            </div>

            <div className='question'>
                <p>Nhìn chung, mức độ hài lòng của bạn đối với Học phần này? /Overall, how satisfied are you with this course?</p>
                <textarea>Default text or placeholder</textarea>
            </div>

            <button className='btn-login'>Submit</button>
        </div>
    )
}

export default EvaluateComponent