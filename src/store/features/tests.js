import { createSlice } from "@reduxjs/toolkit";
const tests = require('../../utils/test.json')

const getRandAnswers = (answers) => {
    const result = []

    while(result.length !== 4) {
        let rand = parseInt(Math.random() * 4)

        if(!result.includes(rand)) {
            result.push(rand)
        }
    }

    return result.map(el => answers[el])
}

const getRandomOrder = (arr) => {
    const result = []
    
    while(result.length !== 25) {
        let rand = parseInt(Math.random() * arr.length)

        if(!result.includes(rand)) {
            result.push(rand)
        }
    }

    console.log(result)
    console.log(new Set(result))

    return result.map(el => ({
            question: arr[el].question,
            isChecked: null,
            answers: getRandAnswers(arr[el].answers),
            trueIndex: null
        }))
}

const initialState = {
    data: getRandomOrder(tests),
    finishedCount: 0,
}

export const testsSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        checkTest: (state, action) => {
            console.log(action.payload);
            state.data = state.data.map((el, index) => {
                // console.log(index === action.payload.testNumber)
                if(action.payload.answerNumber !== null && index === action.payload.testNumber) {
                    console.log("true");
                    return {
                        ...el,
                        isChecked: action.payload.answerNumber,
                        trueIndex: el.answers.map(answer => answer.isTrue).indexOf(true)
                    }
                }
                return el
            })
            if(action.payload.answerNumber !== null) {
                state.finishedCount = state.finishedCount + 1
            }
        },
    }
})

export const { checkTest } = testsSlice.actions

export default testsSlice.reducer