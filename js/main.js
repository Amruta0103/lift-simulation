const form = document.getElementById('form');
const floorsVal = document.getElementById('floorsVal');
const liftsVal = document.getElementById('liftsVal');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const display = document.getElementById('display');
const allLevel = document.getElementById('allLevelsDiv');
const allLifts = document.getElementById('allLiftsDiv');
let flVal;
let lftVal;
let flArr = [];
let lftArr = [];
let floorLevel, buttonUp, buttonDown, lift, currentLift, currentFloor;
// let moves = [
//   {
//     liftno: '1',
//     tofloor: '2',
//     status: 'free'| 'occupied',
//   }
// ]
// let liftPosition = [];

floorsVal.addEventListener('input',(e) => {
  flVal = (e.target.value);
})

liftsVal.addEventListener('input',(f) => {
  lftVal = (f.target.value);
})

submitBtn.addEventListener('click',() => {
  for (var i=1; i<= flVal ; i++){
    flArr.push(i);
  }
  for (var i=1; i<= lftVal; i++){
    lftArr.push(i);
  }

  createFloors(flArr);
  createLifts(lftArr);
  flArr.splice(0, flVal);
  lftArr.splice(0,lftVal);
  form.style.display = 'none';
  backBtn.style.display = 'block';
})

backBtn.addEventListener('click',()=>{
  allLevel.replaceChildren();
  allLifts.replaceChildren();
  backBtn.style.display = 'none';
  form.style.display = 'flex';
  liftsVal.value = '';
  floorsVal.value = '';
})

function createFloors(arr){
  arr.forEach((level)=>{
    floorLevel = document.createElement('div');
    floorLevel.setAttribute("id","levelDivMain");
    allLevel.appendChild(floorLevel);
    
    let levelTitle = document.createElement('div');
    levelTitle.setAttribute("id","levelTitle");
    levelTitle.textContent = ("Floor "+ level);
    floorLevel.appendChild(levelTitle);

    let buttonBoard = document.createElement('div');
    buttonBoard.setAttribute("id","buttonBoard");
    floorLevel.appendChild(buttonBoard);

    buttonUp = document.createElement('button');
    buttonUp.setAttribute("id","buttonUp");
    buttonUp.setAttribute("type","button");
    buttonUp.setAttribute("name","Up")
    buttonUp.setAttribute("value",`${level +' ' + buttonUp.name}`)
    buttonUp.textContent = ("Up");
    buttonUp.addEventListener('click',()=>gettingData(level))
    if(level < flVal){
      buttonBoard.appendChild(buttonUp);
    }

    buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.setAttribute("type","button");
    buttonDown.setAttribute("name","Down")
    buttonDown.setAttribute("value",`${level +' ' + buttonDown.name}`)
    buttonDown.addEventListener('click',()=>gettingData(level))
    buttonDown.textContent = ("Down");
    if(level > 1){
      buttonBoard.appendChild(buttonDown);
    }

    // gettingData();
  })
}

function createLifts(liftArr){
  liftArr.forEach((l)=>{
    lift = document.createElement('div');
    lift.setAttribute("id","liftBox");
    lift.setAttribute("free",true);
    lift.textContent = ("Lift "+ l);
    allLifts.appendChild(lift);
  })
}

function gettingData (currentFloor){
  console.log("sore wa?",currentFloor)
  moveLift(currentFloor);
  // lftArr.map((f)=>{
    // traverse through then assign val to first in line and check closest lift floor for movement
  // })
}
function moveLift(toFloor){
  liftBox.style.marginBottom = `${(toFloor-1)*5}rem`;
  liftBox.style.transition = `margin ${(toFloor)*2}s`;
}

// function moveDown(level){
//   buttonDown.addEventListener('click',() => {
//     console.log("clicked",level);
//     liftBox.style.marginBottom = `${(level-1)*5}rem`;
//     liftBox.style.transition = `margin ${(level)*2}s`;
//   })
// }
