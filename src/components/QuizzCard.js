import useQuestionsContext from "../hooks/use-questions"

function QuizzCard({ questions }) {
	const { showScore, score, alert, questionCount, fetchShowScore, fetchScore, fetchQuestionCount } = useQuestionsContext()

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			fetchScore(score + 1)
		}
		const nextQuestion = questionCount + 1
		if (nextQuestion < questions.length) {
			fetchQuestionCount(nextQuestion)
		} else {
			fetchShowScore(true)
		}
	}
	return (
		<>
			{alert ? (
				<div className="content-center">
					Please, set quizz options for create a quizz
				</div>
			) : (
				<>
					{showScore ? (
						<div className='score-section'>
							You scored {score} out of {questions.length}
						</div>
					) : (
						<>
							<div className="question-section">
								<div className='question-count'>
									<span>Question {questionCount + 1}</span>/{questions.length}
								</div>
								<div className='question-text'>{questions[questionCount]?.['questionText']}</div>
							</div>
							<div className='answer-section'>
								{questions[questionCount]?.['answerOptions'].map((option, index) => (
									<button key={index} className="ui primary button" onClick={() => handleAnswerOptionClick(option.isCorrect)}>
										{option.answerText}
									</button>
								))}
							</div>
						</>
					)}
				</>
			)}
		</>
	)
}

export default QuizzCard