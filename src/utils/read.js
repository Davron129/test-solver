const fs = require('fs')

fs.readFile('econ2.txt', 'utf-8', (err, data) => {
    if(err) {
        console.log(err)
        return 
    }
    const dataArr = data.split('\n')
    const result = []

    for(let i = 0; i < 28; i++) {
        let obj = {
            "question": dataArr[i*5 + 0],
            "answers": [
                {
                    "isTrue": true,
                    "answer": dataArr[i*5 + 1],
                },
                {
                    "isTrue": false,
                    "answer": dataArr[i*5 + 2],
                },
                {
                    "isTrue": false,
                    "answer": dataArr[i*5 + 3],
                },
                {
                    "isTrue": false,
                    "answer": dataArr[i*5 + 4],
                },
            ]
        }

        result.push(obj)
    }

    fs.writeFile('eco2.json', JSON.stringify(result, null, 2), (err) => {
        console.log(JSON.stringify(result, null, 2))
        if(err) {
            console.log(err)
            return
        }
    })
})