
const readline = require("readline")
const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const studentArray = []

function askQuestion(query) {
    return new Promise(resolve => {
        r.question(query, answer => {

            resolve(answer);
        });
    });
}

async function AskStudentDetails() {
    const name = await askQuestion("What's your name? ");
    const cls = await askQuestion("What's your class? ");
    const age = await askQuestion("What's your age? ");

    const student = {
        name: name,
        age: age,
        class: cls

    };

    studentArray.push(student);
    return student;

}

async function main() {

    let numberofstudents = await askQuestion("number of students  ")
    numberofstudents = parseInt(numberofstudents)

    for (i = 0; i < numberofstudents; i++) {
        const student = await AskStudentDetails();

        console.log(`student number ${i + 1}`, student)

    }
    console.log(studentArray)

    studentArray.forEach(details => {

        console.log("student name is ", details.name, " in class ", details.class, "and is ", details.age, "years old")

    });
    r.close();
}


main();