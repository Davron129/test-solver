const fs = require('fs')
const data = require('./macroeconomics.json')

const result = []

for(let i = 0; i < 200; i++) {
    let obj = {
        [data[i].question]: data[i].answers[0].answer
    }

    result.push(obj)
}
// navigator.clipboard.write(result)

fs.writeFile('ready.json', JSON.stringify(result), (err) => {
    console.log(JSON.stringify(result, null, 2))
    if(err) {
        console.log(err)
        return
    }
})