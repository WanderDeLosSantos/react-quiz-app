import React, {useState, useEffect  } from "react";
// types
import { AnswerObject } from '../App'
type Props = {
    questions: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({ 
    questions, 
    answers, 
    callback,
    userAnswer,
    questionNum, 
    totalQuestions
}) =>{
    return(

    <div>
        <p className="number">
            Question: {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: questions }}></p>
        <div>
            {answers.map(answer =>(
                <div key={answer}>
                    <div className="col s12 m12 l12 next-btn btn">
                        <button className="" disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer}} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>

)}

export default QuestionCard;