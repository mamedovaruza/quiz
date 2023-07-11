import { useState } from "react"
import { Input, Select } from "semantic-ui-react"
import useQuestionsContext from "../hooks/use-questions"

function SelectBar() {
	const [selectedAmount, setSelectedAmount] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedDifficulty, setSelectedDifficulty] = useState('')
	const [selectedType, setSelectedType] = useState('')

	const { categoriesList, difficultiesList, typesList, fetchQuestions, fetchShowScore, fetchScore, fetchQuestionCount, fetchAlert } = useQuestionsContext()

	const handleCreateClick = () => {
		fetchQuestions(selectedAmount, selectedCategory, selectedDifficulty, selectedType)
		fetchShowScore(false)
		fetchAlert(false)
	}

	const handleResetClick = () => {
		fetchQuestions()
		fetchShowScore(false)
		fetchScore(0)
		fetchQuestionCount(0)
		fetchAlert(true)
	}
	return (
		<div>
			<div className="ui divided items">
				<Input
					type="number"
					className="item"
					placeholder="Number of Questions"
					value={selectedAmount}
					onChange={(e, data) => setSelectedAmount(data.value)}
				/>
				<Select
					search
					className="item"
					placeholder="Select Category"
					value={selectedCategory}
					options={categoriesList}
					onChange={(e, data) => setSelectedCategory(data.value)}
				/>
				<Select
					search
					className="item"
					placeholder="Select Difficulty"
					value={selectedDifficulty}
					options={difficultiesList}
					onChange={(e, data) => setSelectedDifficulty(data.value)}
				/>
				<Select
					search
					className="item"
					placeholder="Select Type"
					value={selectedType}
					options={typesList}
					onChange={(e, data) => setSelectedType(data.value)}
				/>
			</div>
			<div className="flex flex-row justify-between m-3">
				<button className="ui button" onClick={handleCreateClick}>Creat Quizz</button>
				<button className="ui button" onClick={handleResetClick}>Reset Quizz</button>
			</div>
		</div>
	)
}

export default SelectBar