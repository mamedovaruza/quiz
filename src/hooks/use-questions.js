import { useContext } from "react";
import QuestionsContext from "../context/questions";

function useQuestionsContext() {
	return useContext(QuestionsContext)
}

export default useQuestionsContext