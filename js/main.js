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
let floorLevel, buttonUp, buttonDown, liftBox;

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
  form.style.display = 'block';
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
    buttonUp.textContent = ("Up");
    if(level < flVal){
      buttonBoard.appendChild(buttonUp);
      moveUp(level);
    }

    buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.setAttribute("type","button");
    buttonDown.addEventListener('click',moveDown(level))
    buttonDown.textContent = ("Down");
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
    liftBox.style.transition = `margin ${(level-1)*2}s`;
  })
}

function moveDown(level){
  buttonDown.addEventListener('click',() => {
    console.log("clicked",level);
    liftBox.style.marginBottom = `${(level-1)*5}rem`;
    liftBox.style.transition = `margin ${(level-1)*2}s`;
  })
}