import React, {useState} from 'react'
import { fetchQuizQuestions } from './API'
// components
import QuestionCard  from "./components/QuestionCard"
// types
import { QuestionState, Difficulty } from './API'
// styles
// import {GlobalStyle} from './App.styles';
export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}
const TOTAL_QUESTIONS = 10




const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () =>{
    setLoading(true)
    setGameOver(false)
    
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    ) 

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      // user answers
      const answer = e.currentTarget.value
      // check correct answer
      const correct = questions[number].correct_answer === answer
      // add score if the answer is the correct answer
      if(correct) setScore((score) => score + 1);
      
      // save answer in the array for user ansewrs
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }
  
  const nextQuestion = () =>{
    // move on the next question as long as it's not at the last aquestion
    const nextQuestion = number + 1

    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  
  return (
    <>
    <div className="App row">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <div className="col s12 m12 l12 starrt-btn btn">
        <button className="start " onClick={startTrivia}>
          Start
        </button>
      </div>
      ) : null}

      {!gameOver ? (<p className="score">Score: {score}</p>) : null}
      
      {loading ? <p>Loading Questions ...</p> : null}

      {!loading && !gameOver &&(
          <QuestionCard
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          questions={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1? (
        <div className="col s12 m12 l12 next-btn btn orange">
          <button className="next" onClick={nextQuestion}>Next Question</button>
        </div>
        ) : null}


       
    </div>
    //@ts-ignore
    <style jsx>{`
      
        html {
          height: 100vh;
          width: 100vw;
          
        }

        body {
          display: flex;
          justify-content: center;
          margin: 0;
          padding: 0 20px;
          background-image: url('/imgs/tabitha-turner.jpg');
          background-size: cover;
          background-repeat: no-repeat;

        }

        * {
          box-sizing: border-box;
          font-family: 'Catamaran', sans-serif;
        }
         button{
          width: 200px;
          background-color: rgba(0, 0, 0, 0);
          border: none;
        }
      
      `}</style>
    </>
  )
}

export default App
