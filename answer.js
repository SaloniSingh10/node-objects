const forms = require("./forms.json");
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
    let formResponses = [];

    if (fs.existsSync("./answers.json")) {
        const temp = fs.readFileSync("./answers.json");
        if (temp.length == 0) {
            fs.writeFileSync("./answers.json", JSON.stringify([], null, 4))
        }

        formResponses = require("./answers.json");
    }

    const username = await askQuestion("Enter your name\n> ")

    console.log("Available forms: ");
    forms.forEach((form, index) => console.log(`${index + 1}) ${form.formName}`));

    const formPicked = await askQuestion("Enter number of the form\n> ")

    const form = forms[parseInt(formPicked) - 1];
    if (!form) {
        console.log("Invalid form number");
        rl.close();
        return;
    }
    const questions = form.questions


    const formResponse = {
        username: username,
        formName: form.formName,
        responses: []
    };

    for (const question of questions) {
        const answer = await askQuestion(`${question}\n> `);
        formResponse.responses.push({ question, answer });
    }

    formResponses.push(formResponse);
    fs.writeFileSync("./answers.json", JSON.stringify(formResponses, null, 4))

    console.clear();
    console.log("Thank you for your response!");
    rl.close();
}

main();
