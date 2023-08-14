const floorsVal = document.getElementById('floorsVal');
// const liftsVal = document.getElementById('liftsVal');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const display = document.getElementById('display');
const allLevel = document.getElementById('allLevelsDiv');
const allLifts = document.getElementById('allLiftsDiv');
let flVal, lftVal=1;
let flArr = [];
let lftArr = [];
let floorLevel, buttonUp, liftBox;

floorsVal.addEventListener('input',(e) => {
  return flVal = (e.target.value);
})

submitBtn.addEventListener('click',() => {
  for (var i=1; i<= flVal ; i++){
    flArr.push(i);
  }
  lftVal = 1;
  for (var i=1; i<= lftVal; i++){
    lftArr.push(i);
  }
  createFloors(flArr);
  createLifts(lftArr);
  flArr.splice(0, flVal);
  lftArr.splice(0,lftVal);
  submitBtn.style.display = 'none';
  backBtn.style.display = 'block';
})

backBtn.addEventListener('click',()=>{
  allLevel.replaceChildren();
  allLifts.replaceChildren();
  backBtn.style.display = 'none';
  submitBtn.style.display = 'block';
  lftVal = '';
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
    buttonUp.textContent = ("Up "+level);
    if(level < flVal){
      buttonBoard.appendChild(buttonUp);
      moveUp(level);
    }

    let buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.textContent = ("Down"+level);
    buttonDown.setAttribute("type","button");
    if(level > 1){
      buttonBoard.appendChild(buttonDown);
    }
  })
}

function createLifts(liftArr){
  liftArr.forEach((lift)=>{
    liftBox = document.createElement('div');
    liftBox.setAttribute("id","liftBox");
    liftBox.textContent = ("Lift "+ lift);
    allLifts.appendChild(liftBox);
  })
}

function moveUp(level){
  buttonUp.addEventListener('click',() => {
    console.log("clicked",level);
    liftBox.style.marginBottom = `${(level-1)*5}rem`;

  })
}