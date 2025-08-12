const readline = require("readline")
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

async function main() {
    let forms = [];

    if (fs.existsSync("./forms.json")) {
        const temp = fs.readFileSync("./forms.json");
        if (temp.length == 0) {
            fs.writeFileSync("./forms.json", JSON.stringify([], null, 4))
        }


        forms = require("./forms.json");
    }

    const formAuthor = await askQuestion("Enter form author\n> ");
    const formName = await askQuestion("Enter form name\n> ");

    let numberofquestions = await askQuestion("Enter number of question in form\n> ");
    numberofquestions = parseInt(numberofquestions);

    const questions = []
    for (i = 0; i < numberofquestions; i++) {
        const response = await askQuestion(`(${i + 1}) Enter question\n> `)
        questions.push(response)
    }

    forms.push({ formAuthor, formName: formName, questions: questions })

    fs.writeFileSync("./forms.json", JSON.stringify(forms, null, 4))
    console.clear();
    console.log(`${formName} Form Created`)
    rl.close()
}

main();