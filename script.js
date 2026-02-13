function openPage(){
    var allElem = document.querySelectorAll(".elem");
var allFullElem = document.querySelectorAll(".FullElem");
var backBtn = document.querySelectorAll('.FullElem .back');

allElem.forEach((elem)=>{
    elem.addEventListener('click',()=>{
        allFullElem[elem.id].style.display = "block";
    })
    
})
backBtn.forEach((back)=>{
    back.addEventListener('click',()=>{
        console.log("hu")
        allFullElem[back.id].style.display='none';
    })
})
}
openPage()

function todoLogic() {
    // Select Elements
    var todoForm = document.querySelector('.addTask form');
    var todoInput = document.querySelector('.addTask form input');
    var taskContainer = document.querySelector('.allTask');

    // --- SAVE FUNCTION ---
    function saveTasks() {
        var currentTasks = [];
        // Only grab the text from H3s to save
        var allTaskTitles = taskContainer.querySelectorAll('.task h3');
        allTaskTitles.forEach(title => {
            currentTasks.push(title.innerText);
        });
        localStorage.setItem("myTodoList", JSON.stringify(currentTasks));
    }

    // --- CREATE HTML FUNCTION ---
    function createTaskHTML(text) {
        // 1. Create Div
        var newDiv = document.createElement('div');
        newDiv.classList.add('task');
        newDiv.innerHTML = `
            <h3>${text}</h3>
            <button type="button">Mark as Completed</button>
        `;
        
        // 2. Add to Container
        taskContainer.appendChild(newDiv);

        // 3. Add Button Logic
        var btn = newDiv.querySelector('button');
        var title = newDiv.querySelector('h3');

        btn.addEventListener('click', () => {
            // Visual Styles
            btn.innerText = "Completed";
            btn.style.backgroundColor = "green";
            title.style.textDecoration = "line-through";
            
            // Delete Logic
            setTimeout(() => {
                newDiv.remove(); // Remove from screen
                saveTasks();     // Update storage immediately
            }, 2000);
        });
    }

    // --- LOAD FUNCTION ---
    function loadTasks() {
        // STEP 1: WIPE THE LIST CLEAN (Fixes the "Random Increase" bug)
        taskContainer.innerHTML = ""; 

        // STEP 2: Load data
        var savedData = localStorage.getItem("myTodoList");
        if (savedData) {
            var tasks = JSON.parse(savedData);
            tasks.forEach(taskText => {
                createTaskHTML(taskText);
            });
        }
    }

    // --- ADD TASK LISTENER ---
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload
        
        // Check if input is empty
        if (todoInput.value.trim() === "") {
            alert("Please enter a task!");
            return;
        }

        // Create and Save
        createTaskHTML(todoInput.value);
        saveTasks();

        // Clear Input
        todoInput.value = "";
    });

    // Load tasks when code runs
    loadTasks();
}

todoLogic();

function dailyPlannerLogic(){
    const today = new Date().toDateString();
    const lastSavedDate = localStorage.getItem('plannerDate');
    
    var DayPlanData=JSON.parse(localStorage.getItem('DayPlanData'))|| {};
    if (lastSavedDate !== today) {
        // Yes! It's a new day. Clear the data.
        localStorage.removeItem('DayPlanData');
        localStorage.setItem('plannerDate', today); // Update to today
    }

    
    var dayPlanner = document.querySelector(".day-planner");

var hours = Array.from({length:18},(elem,idx)=>{
    return `${6+idx}:00-${7+idx}:00`;})
let plan='';
hours.forEach((elem,idex)=>{
    var SavedData= DayPlanData[idex]||'';
    plan = plan + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idex}" type="text" placeholder="..." value="${SavedData}">
                </div>`;
})
dayPlanner.innerHTML=plan;
var dayPlannerInput = document.querySelectorAll(".day-planner input");
dayPlannerInput.forEach((elem)=>{
    elem.addEventListener('input',()=>{
        DayPlanData[elem.id] = elem.value;
        localStorage.setItem("DayPlanData",JSON.stringify(DayPlanData));
    })
})

}
dailyPlannerLogic();

function motivationLogic() {
   
    var quoteText = document.querySelector('.quote-text');
    var quoteAuthor = document.querySelector('.quote-author');
    var MotivationCard = document.querySelector('.motivation');
    var Moti = document.querySelector(".motivation-fullpage");
    async function getQuote() {
       
        quoteText.innerText = "Finding wisdom...";
        quoteAuthor.innerText = "";

        try {
           
            var response = await fetch('https://dummyjson.com/quotes/random');
            var data = await response.json();

            quoteText.innerText = `"${data.quote}"`;
            quoteAuthor.innerText = `- ${data.author}`;
        } catch (error) {
            quoteText.innerText = "The only way to do great work is to love what you do.";
            quoteAuthor.innerText = "- Steve Jobs";
        }
    }
    if (MotivationCard){
        MotivationCard.addEventListener('click',()=>{
            getQuote();
            Moti.style.display="flex";
        })
    }
   
}
motivationLogic();