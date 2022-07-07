import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkTest } from '../../store/features/tests'
import Result from './Result'

import Styles from './Test.module.css'

const Test = () => {
    const dispatch = useDispatch()
    const questions = useSelector((state) => state.test.data)
    const finishedCount = useSelector((state) => state.test.finishedCount)

    const [ testNum, setTestNum ] = useState(0)
    const [ checkAnswer, setCheckedAnswer ] = useState(null)
    const [ isFinished, setIsFinished ] = useState(false)

    const handleNumberClick = (num) => {
        setTestNum(num)
    }

    const handleRefresh = () => {
        window.location.reload()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(questions[testNum].isChecked === null) {
            dispatch(checkTest({ testNumber: testNum, answerNumber: checkAnswer }))
        }

        if(questions[testNum].isChecked === null) {
            setCheckedAnswer(null)
        } else {
            setCheckedAnswer(questions[testNum].isChecked)
        }

        if(testNum < questions.length - 1) 
            setTestNum(testNum + 1)
    }

    useEffect(() => {
        if(finishedCount === 25) {
            let res = questions.filter(el => el.isChecked === el.trueIndex).length
            if(localStorage.getItem("results")) {
                let results = localStorage.getItem("results").split(",")
                results.push(res)
                localStorage.setItem("results", results)
            } else {
                localStorage.setItem("results", [res])
            }

            setIsFinished(true)
        }
        // eslint-disable-next-line
    }, [finishedCount])

    return (
        <div className={Styles.test__wrapper}>
            <div className={Styles.test__container}>
                <div className={Styles.header}>
                    {/* <button>Asosiy sahifa</button> */}
                    <span></span>
                    <button onClick={handleRefresh}>Boshqa test</button>
                </div>
                {
                    questions
                        ? (
                            <>
                                <div className={Styles.test__header}>
                                    <div className={Styles.number__wrapper}>
                                        {
                                            questions.map((test, index) => (
                                                <span 
                                                    key={test.question + index} 
                                                    onClick={() => handleNumberClick(index)}
                                                    className={`${Styles.test__num} ${index === testNum ? Styles.active : ''} ${(test.isChecked !== null && test.isChecked === test.trueIndex) ? Styles.true : ''  } ${(test.isChecked !== null && test.isChecked !== test.trueIndex) ? Styles.false : ''  } `}>
                                                    { index + 1 }
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={Styles.test__body}>
                                    <div className={Styles.question}>
                                        <span>
                                            { testNum + 1 }.  <span dangerouslySetInnerHTML={{ __html: questions[testNum]?.question }}></span>
                                        </span>
                                    </div>
                                    <form className={Styles.answers} onSubmit={handleSubmit}>
                                        {
                                            questions[testNum]?.answers.map((el, index) => (
                                                <label 
                                                    className={`${Styles.answer} ${questions[testNum].isChecked === index ? Styles.checked : ''} ${(questions[testNum].isChecked !== null && questions[testNum].trueIndex === index) ? Styles.true : ''}  `} 
                                                    key={el.answer}
                                                    >
                                                    {
                                                        questions[testNum].isChecked === null && (
                                                            <input 
                                                                type="radio" 
                                                                name="answer" 
                                                                value={el.answer} 
                                                                hidden 
                                                                defaultChecked={questions[testNum].isChecked !== null ? true : false}
                                                                onChange={(e) => {
                                                                    if(e.target.checked) {
                                                                        setCheckedAnswer(index)
                                                                    }
                                                                }}
                                                            />
                                                        )
                                                    }
                                                    <div>{ index + 1 }. <span dangerouslySetInnerHTML={{ __html: el.answer }}></span> </div>
                                                </label>
                                            ))
                                        }
                                        <button>
                                            { 
                                                checkAnswer === null 
                                                    ? "Keyingisi" 
                                                    : questions.filter(el => el.isChecked !== null)
                                                        ? "Tekshirish"
                                                        : "Yakunlash" 
                                            }
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <h3>Loading...</h3>
                        )
                }
            </div>
            {
                isFinished && <Result trueCount={questions.filter(el => el.isChecked !== null && el.isChecked === el.trueIndex).length} />
            }
        </div>
    )
}

export default Test