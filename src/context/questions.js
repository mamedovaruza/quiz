import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";

const QuestionsContext = createContext()

function Provider({ children }) {
	const [categories, setCategories] = useState([])
	const [question, setQuestion] = useState([])
	const [showScore, setShowScore] = useState(false)
	const [alert, setAlert] = useState(true)
	const [score, setScore] = useState(0)
	const [questionCount, setQuestionCount] = useState(0)
	
	const categoriesList = categories.map((category) => ({
		value: category.id, text: category.name
	}))

	const difficultiesList = [
		{ value: "easy", text: "Easy" },
		{ value: "medium", text: "Medium" },
		{ value: "hard", text: "Hard" }
	]

	const typesList = [
		{ value: "multiple", text: "Multiple Choice" },
		{ value: "boolean", text: "True / False" }
	]

	const fetchQuestions = useCallback(async (amount, category, difficulty, type) => {
		const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
		setQuestion(response.data.results)
	}, [])

	const fetchShowScore = (boolean) => {
		setShowScore(boolean)
	}

	const fetchScore = (number) => {
		setScore(number)
	}

	const fetchQuestionCount = (number) => {
		setQuestionCount(number)
	}

	const fetchAlert = (boolean) => {
		setAlert(boolean)
	}

	useEffect(() => {
		axios.get('https://opentdb.com/api_category.php')
			.then((res) => {
				setCategories(res.data.trivia_categories)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const valueToShare = {
		categoriesList,
		difficultiesList,
		typesList,
		question,
		showScore,
		score,
		alert,
		questionCount,
		fetchAlert,
		fetchQuestionCount,
		fetchScore,
		fetchShowScore,
		fetchQuestions
	}

	return (
		<QuestionsContext.Provider value={valueToShare}>
			{children}
		</QuestionsContext.Provider>
	)
}

export { Provider }
export default QuestionsContext