const LIMITS = 8

/**
 * GAME TABLE
 * defined properties that will be used in the logic
 */
const gameData = {
    player: [{
                id: 0,
                questionAnswers: [],
            }],
    score: 0,
    question: null,
    isMounted: false,
    questionNum: 0,
    index: 0,
    results: null,
}

// shortchut to access the player data
const player = [...gameData.player]

/**
 * 
 * @returns fetch question data and update the object: gameData
 */
const fetchQuestionsData = () => {    
    let xhttp = new XMLHttpRequest();
    let fetchQuestion
    let currentQuestion
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try{                
                fetchQuestion = JSON.parse(xhttp.responseText)
                currentQuestion = fetchQuestion.questions.map(question => {
                     if(question.question_type === "truefalse") {
                         return {...question, possible_answers: [
                            {
                            a_id:1,
                            caption: "TRUE"
                            },
                            {
                            a_id:2,
                            caption: "FALSE"
                            },
                        ], correct_answer: 2,
                    }
                     } else {
                         return question
                     }
                })
                
                gameData.question = currentQuestion
        } catch(err) {
                console.log('Error to fetch', err)
            }
        }
    }
    xhttp.open("GET", "https://proto.io/en/jobs/candidate-exercise/quiz.json")
    xhttp.send()

    if(!gameData.isMounted) {startGameComponent()}
}

/**
 * 
 * @returns fetch results data and update the object: results
 */
 const fetchResultsData = () => {    
    let xhttp = new XMLHttpRequest();
    let quizResult
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try{
                quizResult = JSON.parse(xhttp.responseText)
                
                gameData.results = quizResult.results
        } catch(err) {
                console.log('Error to fetch', err)
            }
        }
    }
    xhttp.open("GET", "https://proto.io/en/jobs/candidate-exercise/result.json")
    xhttp.send()
}

// start the GAME / start to fetch data
if(gameData.index === 0) {
    fetchQuestionsData()
    fetchResultsData()
}

//start the game
function startGameComponent() {
    const home = document.getElementById('box')
    const startPage = document.createElement("div")
    startPage.id = "home"
    startPage.setAttribute("class", "pb-4 text-center")
    startPage.innerHTML = 
        `<button id="start-game" class="relative pointer inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-black rounded-full group-hover:w-56 group-hover:h-56 "></span>
            <span class="absolute inset-0 w-full h-full -mt-1 shadow-xl rounded-lg bg-black text-white bg-gradient-to-b hover:from-yellow-400 hover:via-red-500 hover:to-pink-400"></span>
            <span class="relative">START</span>
        </button>
         `
    home.appendChild(startPage)
    gameStarter()
}

function gameStarter() {
    document.getElementById("start-game").addEventListener('click', () => {
        dashboardMount()
        ++gameData.questionNum
        gameData.player[gameData.index].id = gameData.questionNum
        questionMount(gameData.question[gameData.index])
        controlsMount()
        gameData.isMounted = true
    })
    
}

// build dashboard
function dashboardMount() {
    const startPage = document.getElementById("home")

    let questionSpace = document.createElement("div")
    questionSpace.setAttribute("class", "justify-center text-black overflow-hidden overflow-ellipsis")
        questionSpace.id = "space-game"
        
    startPage.replaceWith(questionSpace)
}

// build questions
function questionMount(question) {
    const questionCopy = {...question}
    const element = document.createElement('div')
    element.id = "form"
    let options = element.innerHTML = 
        questionCopy.possible_answers.map(option => 
                `<input key="${option.a_id}" id="${option.a_id}" type="checkbox" name="${option.caption}" class="hidden" />
                    <label id="l-i-${option.a_id}" for="${option.a_id}" class="text-black md:pl-20 lg:pl-40 cursor-pointer">
                        <span id="s-i-${option.a_id}" class="w-4 h-4 mt-2 inline-block mr-2 rounded-full border border-black flex-no-shrink"></span>
                        ${option.caption}
                    </label>` 
        ).join('')

    const startSpace = document.getElementById("space-game")
    let titleSpace = document.createElement("div")
        titleSpace.id = "question-game"
        titleSpace.setAttribute("class", "flex flex-col text-center items-center justify-center align-middle")
        
        titleSpace.innerHTML = 
            `<div id="card-header" class="w-3/4 rounded-md shadow-xl bg-white pb-4 mb-4">
                <img id="img-bg" src="${questionCopy.img}" alt="" class="rounded-t-lg opacity-75 h-60 w-full object-cover"/>
                
                <div id="question" class="px-5 py-5">
                    <p id="p-${questionCopy.q_id}" class="text-center text-black leading-loose text-xl semibold overflow-hidden overflow-ellipsis px-4">
                        ${questionCopy.title}
                    </p>
                </div>
                <div id="values" class="flex py-2 flex-col pl-4 justify-start text-black text-justify">
                ${options}
                </div>    
                <button name="next" id="next-game" 
                        class="py-2 px-4 mt-5 bg-blue-500 rounded-lg text-white font-semibold hover:opacity-75 hover:bg-green-500 transform -translate-y-2 hover:scale-90" >
                        NEXT
                    <i class="fas fa-forward fa-lg pl-2"></i>
                    </button>
            </div>
            `

     if(!gameData.isMounted) {
        startSpace.appendChild(titleSpace)
        document.getElementById("next-game").addEventListener("click", nextQuestionHandler)
        const inputs = document.querySelectorAll("input")
        inputs.forEach(e => {
            e.addEventListener('input', selectOptionHandler)
        })
    } else {
        let oldTitle = document.getElementById("question-game")
        oldTitle.replaceWith(titleSpace)
        document.getElementById("next-game").addEventListener("click", nextQuestionHandler)
        const inputs = document.querySelectorAll("input")
        inputs.forEach(e => {
            e.addEventListener('input', selectOptionHandler)
        })
    }
}

// build control and score
function controlsMount() {
    // buttonFabric("next")
    scoreCreator()           
}

function scoreCreator() {
    const header = document.getElementById("header-area")
    const score = document.createElement("nav")
    score.id = "header-area"
    score.innerHTML = 
        `<div id="score" class="flex flex-wrap items-center content-center justify-center ml-4 mr-4 mb-4 sm:w-full">
            <div class="mt-2 pr-4"> 
                <div class="w-40 h-12 md:w-96 lg:w-96 border-2 border-solid border-green-700 bg-white rounded-xl border-separate" id="progressBar">
                    <div id="progress" style="width: 0%" class="h-full bg-green-700 float-left"></div>
                </div>
            </div>
            <div class="content-around text-yellow-500 mt-2 p-4 place-items-end">
                <p class="text-center text-2xl">Score</p>
                    <p id="score-text" class="text-center text-4xl">0</p> 
                    </div>
                </div> 
        </div>`
        
        
    header.replaceWith(score)
}

/**
 selected answer from options by question id, if answer is clicked .
 change the css of the selected item and push or filter to/from gameData object
*/                                      
function selectOptionHandler(event) {
    if(!event || event === null) {
        alert('Please, choose again')
        return
    }
    const id = Number(event.target.id)
    const found = gameData.player[gameData.index].questionAnswers.some(e => e.id === id)
    const clickedAllowed = canContinue(found)
    let span = document.getElementById(`s-i-${id}`)
    let label = document.getElementById(`l-i-${id}`)

    if(clickedAllowed) {
        if(!found) {
            document.getElementById(id).checked = true        
            span.setAttribute("class", "w-4 h-4 mt-2 bg-blue-300 inline-block mr-2 rounded-full border border-blue-600 flex-no-shrink")
            label.setAttribute("class", "text-blue-700 extrabold md:pl-20 lg:pl-40 cursor-pointer")
    
            return gameData.player[gameData.index].questionAnswers.push({
                id,
                name: event.target.name
            })
        } 
        if(found) {
            document.getElementById(id).checked = false
            span.setAttribute("class", "w-4 h-4 mt-2 inline-block mr-2 rounded-full border border-black flex-no-shrink")
            label.setAttribute("class", "text-black md:pl-20 lg:pl-40 cursor-pointer")
            gameData.player[gameData.index].questionAnswers = gameData.player[gameData.index].questionAnswers.filter(item => item.id !== id)

            return gameData.player[gameData.index]
        }
    }
    return alert("Please select just one option")
}


function canContinue(found) {
    const type = gameData.question[gameData.index].question_type
    const nothingSelected = gameData.player[gameData.index].questionAnswers.length === 0

    switch (type) {
        case "multiplechoice-single":
        case "truefalse":
            if(found) return true
            if(!found && nothingSelected) return true
            return false
        case "multiplechoice-multiple":
            return true
        default:
            throw new Error("Type choosed is not allowed: you not canContinue")
    }
}
/**
 * call the next page and change css when reach the limits of the question array
 * call the update score
 * here that update the index from gameData
 */
function nextQuestionHandler() {
    // must update the index before to generate the first question
    const isEmpty = gameData.player[gameData.index].questionAnswers.length
    if(isEmpty === 0) {
        alert('You must select at last one option')
        return
    }

    let isRight = validateAnswerHandler()
    ++gameData.index  // must important part: update the index before to run next question
    let newQuestion = gameData.question[gameData.index]
    
    const questionNum = gameData.questionNum
    gameData.player.push({
        id: gameData.index,
        questionAnswers: [],
    })

    if(questionNum !== LIMITS && !isRight) {
        ++gameData.questionNum
        setTimeout(() => {
            questionMount(newQuestion)
        }, 3000)
    } else if(questionNum !== LIMITS && isRight) {
        ++gameData.questionNum
        questionMount(newQuestion)
        
    } else if(questionNum === LIMITS) {
        setTimeout(() => {
            endGameHandler()
            document.getElementById("header-area").style.display = "none";
        }, 1000)
    }    
}

function validateAnswerHandler() {
    const playerAnswer = gameData.player[gameData.index].questionAnswers
    const rightAnswer = gameData.question[gameData.index].correct_answer
    let isRight = false
    let labelValidation = document.getElementById(`l-i-${rightAnswer}`)
    let spanValidation = document.getElementById(`s-i-${rightAnswer}`)
   
    if(!Array.isArray(rightAnswer)) { 
        if(playerAnswer.length === 1 && playerAnswer[0].id !== rightAnswer) {
            isRight = false
            labelValidation.classList.add("bold", "text-red-500", "bg-red-100")
            spanValidation.classList.add("border-3", "border-red-500", "bg-red-300")

        } else if(playerAnswer.length > 1) {  
            labelValidation.classList.add("bold", "text-red-500", "bg-red-100")
            spanValidation.classList.add("border-3", "border-red-500", "bg-red-300")
            isRight = false
        } else {
            isRight = true
        }
        
    } else if(Array.isArray(rightAnswer)) {
        const answerTotalScore = rightAnswer.reduce((prev, curr) => prev + curr)
        const playerTotalScore = playerAnswer.reduce((prev, curr) => prev.id + curr.id)
        
        if(answerTotalScore !== playerTotalScore) {
            rightAnswer.forEach(el => {
                labelValidation = document.getElementById(`l-i-${el}`)
                spanValidation = document.getElementById(`s-i-${el}`)
                labelValidation.classList.add("bold", "text-red-500", "bg-red-100")
                spanValidation.classList.add("border-3", "border-red-500", "bg-red-300")
                isRight = false
            }) 
        } else if(answerTotalScore === playerTotalScore) {
            isRight = true
        } else {
            isRight = false
        }
    }
    
    scoreUpdate(isRight)
    return isRight
}

function scoreUpdate(canUpdate) {
    if(canUpdate) {
        const score = document.getElementById("score-text")
        let actualPoints = gameData.question[gameData.index].points
        let oldScore = gameData.score

        gameData.score = oldScore + actualPoints 
        score.textContent = gameData.score
        
       const totalAnswersPoints = gameData.question.map(q => q.points).reduce((prev, curr) => prev + curr)
   
        document.getElementById("progress").style.width = `${((gameData.score)/totalAnswersPoints) * 100}%`
    }
}

function endGameHandler() {
    const resultProps = [...gameData.results]
    const newCheck =  resultProps.map(res => res.minpoints)
    const score = gameData.score
    const answers = gameData.question.map(q => q.points).reduce((prev, curr) => prev + curr)
    const resultGame = Math.floor((score / answers) * 100)

    if(resultGame >= newCheck[2]) {
        let {title, message, img} = resultProps[2]
        endGameComponent(title, message, img)

    } else if(resultGame < newCheck[2] && resultGame >= newCheck[1]) {
        let {title, message, img} = resultProps[1]
        endGameComponent(title, message, img)

    } else {
        let {title, message, img} = resultProps[0]
        endGameComponent(title, message, img)
    }

}

function endGameComponent(title, message, img) {
    const score = gameData.score
    const answers = gameData.question.map(q => q.points).reduce((prev, curr) => prev + curr)
    const resultGame = `${(score / answers) * 100} %`
    
    const resultData = document.createElement("div")
    resultData.setAttribute("class","flex flex-col text-center pb-4 mb-4 items-center justify-center align-middle")
    resultData.innerHTML =
        `
        <div id="card-header" class="w-3/4 rounded-md shadow-xl bg-white pb-4 mb-4">
            <img id="img-bg" src="${img}" alt="" class="rounded-t-lg opacity-50 h-60 w-full object-cover"/>
            <div id="question" class="px-2 py-2">
                <p class="text-center text-black leading-loose text-xl semibold overflow-hidden overflow-ellipsis px-4">
                    ${title}
                </p>
                <h1>${resultGame}<h1>
                <p class="text-center text-black leading-light semibold py-4 px-4">
                    ${message}
                </p>
            </div>
        </div>
        `
    document.querySelector("#header").childNodes.hidden
    const gameBoard = document.getElementById("question-game")
    gameBoard.replaceWith(resultData)

    setTimeout(() => {
        return buttonFabric("restart")
    }, 3000);
}

// fabric of buttons
function buttonFabric(type) {
    let form = document.getElementById("control")
    let button = document.createElement("div")
    
    switch (type) {
        case "next":
            button.id = "next-game"
            button.setAttribute("class", "absolute")
            button.innerHTML = 
            `<button name="next" id="next-game" 
                class="py-2 px-4 mt-5 bg-blue-600 rounded-lg text-white font-semibold hover:bg-green-600" >
                NEXT
                <i class="fas fa-forward fa-lg pl-2"></i>
            </button>
            `
            form.appendChild(button)
            button.addEventListener("click", nextQuestionHandler)
            return button   
        
        case "submit":
            const old = document.getElementById("next-game")
            button.id = "submit"
            button.setAttribute("class", "text-center justify-center") // 
            button.innerHTML = 
            `<buton name="submit" id="submit-game" class="py-2 px-4 font-bold rounded-xl bg-gray-300 w-40 h-40 cursor-pointer transition duration-500 ease-in-out text-white bg-black transform hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"><i class="fas fa-paper-plane fa-lg pr-2"></i>SUBMIT<button>`
    
            form.replaceChild(button, old)
            document.getElementById("submit-game").addEventListener("click", endGameHandler)
            return button
        
        case "restart":
            button.id = "restart"
            button.innerHTML = 
            `<button id="restart-game" class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-700 rounded-lg group">
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 hover:w-56 group-hover:h-56 bg-gradient-to-b from-transparent via-blue-300 to-blue-700"></span>
                <span class="relative pointer">RESTART</span>
            </button>
            `
            // border border-white rounded-md transition duration-150 ease-in-out bg-white text-black hover:bg-black hover:text-white transform hover:-translate-y-1 hover:scale-70
            const gameArea = document.getElementById("question")
            gameArea.append(button)
            button.addEventListener("click", () => {
                gameData.index = 0
                gameData.player = [{}]
                gameData.question = null
                gameData.score = 0
                gameData.index = 0
                window.location.href = "https://felipelx.github.io/test-game/"
            })
            
            return button
        default:
            throw new Error(`Type informed not match with options: ${type}`)
    }
}