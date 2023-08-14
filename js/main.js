const floorsVal = document.getElementById('floorsVal');
// const liftsVal = document.getElementById('liftsVal');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const display = document.getElementById('display');
const allLvl = document.getElementById('allLevelsDiv');
let flVal, lftVal = 2;
let flArr = [];
let floorLevel;
let lftArr = [];

floorsVal.addEventListener('input',(e) => {
  return flVal = (e.target.value);
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
  submitBtn.style.display = 'none';
  backBtn.style.display = 'block';
})

backBtn.addEventListener('click',()=>{
  allLvl.replaceChildren();
  backBtn.style.display = 'none';
  submitBtn.style.display = 'block';
  floorsVal.value = '';
})

function createFloors(arr){
  arr.forEach((level)=>{
    floorLevel = document.createElement('div');
    floorLevel.setAttribute("id","levelDivMain");
    allLvl.appendChild(floorLevel);
    
    let levelTitle = document.createElement('div');
    levelTitle.setAttribute("id","levelTitle");
    levelTitle.textContent = ("Floor "+ level);
    floorLevel.appendChild(levelTitle);

    let buttonBoard = document.createElement('div');
    buttonBoard.setAttribute("id","buttonBoard");
    floorLevel.appendChild(buttonBoard);

    let buttonUp = document.createElement('button');
    buttonUp.setAttribute("id","buttonUp");
    buttonUp.textContent = "Up";
    if(level < flVal){
      buttonBoard.appendChild(buttonUp);
    }

    let buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.textContent = "Down";
    if(level > 1){
      buttonBoard.appendChild(buttonDown);
    }
  })
}

function createLifts(liftArr){
  liftArr.forEach((lift)=>{
    let liftBox = document.createElement('div');
    liftBox.setAttribute("id","liftBox");
    liftBox.textContent = ("Lift "+ lift);
    display.appendChild(liftBox);
  })
}