import SelectBar from "./components/SelectBar";
import QuizzCard from "./components/QuizzCard"
import useQuestionsContext from "./hooks/use-questions";

function App() {
	const { question } = useQuestionsContext()

	const questions = question.map((datas) => {
		const correct = { answerText: datas.correct_answer, isCorrect: true }
		const incorrect = datas.incorrect_answers

		const answerOption = incorrect.map((data) => {
			return { answerText: data, isCorrect: false }
		})
		answerOption.push(correct)

		return {
			questionText: datas.question,
			answerOptions: answerOption
		}
	})

	return (
		<div>
			<SelectBar />
			<div className="app m-6 mx-auto">
				<QuizzCard questions={questions} />
			</div>
		</div>
	)
}

export default App;
