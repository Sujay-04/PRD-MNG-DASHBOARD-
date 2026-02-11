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

function todoLogic(){
    
var todoForm = document.querySelector('.addTask form');
var todoInput =document.querySelector('.addTask form input');
var todoDetails = document.querySelector('.addTask form textarea');
var newTask = document.querySelector('.allTask');

todoForm.addEventListener('submit',(e)=>{
    e.preventDefault();
   if (todoInput.value === "") {
        alert("Please enter a task!");
        return; 
    }
    var newDiv = document.createElement('div');
    newDiv.classList.add('task');
    newDiv.innerHTML = `
    <h3>${todoInput.value}</h3>
    <button>Mark as Completed</button>`;
    newTask.appendChild(newDiv);
    var newBtn = newDiv.querySelector('button');
    var newtsk = newDiv.querySelector('h3');
    newBtn.addEventListener('click', () => {
        console.log("cd");
        newBtn.innerHTML="Completed";
        newBtn.style.backgroundColor="green";
        newtsk.style.textDecoration="line-through";
        setTimeout(() => {
            newDiv.remove();
        }, 2000);
        
    });
   
    todoInput.value='';
    todoDetails.value='';
})
}
todoLogic()