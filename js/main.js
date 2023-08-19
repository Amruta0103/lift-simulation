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
let calledAt = [];
let wipLift = [];
let floorLevel, buttonUp, buttonDown, currentLift;
let currentFloor;
let cFlr = 0;

floorsVal.addEventListener('input',(e) => {
  flVal = (e.target.value);
})

liftsVal.addEventListener('input',(f) => {
  lftVal = (f.target.value);
})

submitBtn.addEventListener('click',() => {
  for (var i=0; i< flVal ; i++){
    let j = {
      flId: i+1,
    }
    flArr.push(j);
  }
  console.log("line 30", flArr);

  for (var i=0; i<lftVal; i++){
    let j = {
      lftId:i+1,
      free: true,
      headedFrom : 0,
      headedTo: 0,
    }
    lftArr.push(j);
  }
  console.log("line 41",lftArr);

  createFloors(flArr);
  createLifts(lftArr);
  allLifts.style.height = `${5*flVal}rem`;
  form.style.display = 'none';
  backBtn.style.display = 'block';
})

backBtn.addEventListener('click',()=>{
  allLevel.replaceChildren();
  allLifts.replaceChildren();
  backBtn.style.display = 'none';
  form.style.display = 'flex';
  flArr.splice(0, flVal);
  lftArr.splice(0,lftVal);
  calledAt.splice(0,calledAt.length);
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
    levelTitle.textContent = ("Floor "+ level.flId);
    floorLevel.appendChild(levelTitle);
    
    let buttonBoard = document.createElement('div');
    buttonBoard.setAttribute("id","buttonBoard");
    floorLevel.appendChild(buttonBoard);

    buttonUp = document.createElement('button');
    buttonUp.setAttribute("id","buttonUp");
    buttonUp.setAttribute("type","button");
    buttonUp.setAttribute("name","Up")
    buttonUp.setAttribute("value",`${level.flId}`)
    buttonUp.addEventListener('click',()=>getData(level.flId))
    buttonUp.textContent = ("Up"+level.flId);
    if(level.flId < flVal){
      buttonBoard.appendChild(buttonUp);
    }

    buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.setAttribute("type","button");
    buttonDown.setAttribute("name","Down");
    buttonDown.setAttribute("value",`${level.flId}`)
    buttonDown.addEventListener('click',()=>getData(level.flId))
    buttonDown.textContent = ("Down"+level.flId);
    if(level.flId > 1){
      buttonBoard.appendChild(buttonDown);
    }
  })
}

function createLifts(tempArr){
  tempArr.forEach((lft)=>{
    let liftBox = document.createElement('div');
    liftBox.setAttribute("class","liftBox");
    liftBox.setAttribute("id",`${"liftBox"+lft.lftId}`);
    allLifts.appendChild(liftBox); 
    
    let lift = document.createElement('div');
    lift.setAttribute("class","lift");
    lift.setAttribute("id",`${"lift"+lft.lftId}`);
    lift.textContent = ("Lift "+lft.lftId);
    liftBox.appendChild(lift);
  })
  
}

function getData(toFloor) {
  calledAt.splice(0,calledAt.length);
  if(calledAt.length === 0){
    calledAt.push(toFloor);
  }
  console.log("calledAt",calledAt);
  assignLift(calledAt);
}

function assignLift(arr){
  wipLift.push(lftArr[0]);
  console.log("ye dekh lo pehle",wipLift[0]);
  // if(wipLift[0].free !== true){
  //   wipLift.pop();
  //   console.log(wipLift);
  // }else{
    for(w=0;w<1; w++){
      wipLift[0].free = false;
      wipLift[0].headedTo = arr[0];
      moveLift(arr[0],wipLift[0]);
      wipLift.shift();
    }
  // }
}

function moveLift(toFloor,lft){ 
  let tempId = `${'liftBox'+lft.lftId}`;
  console.log(tempId);
  var liftBox = document.getElementById(tempId);
  let height = (liftBox.clientHeight/16)/5;
  let time;
    console.log("lift bulwao bhai yaha",toFloor);
    lft.headedFrom = height;
    lft.headedTo = toFloor;
    console.log("headedFrom:",lft.headedFrom,"  headedTo:",toFloor);
    var t1 = (lft.headedFrom - lft.headedTo);
    if(t1 < 0){
      t1=t1*(-1);
    }
    time=t1;
    setTimeout(()=>{
      let moveMargin = (toFloor)*5;
      liftBox.style.height = `${moveMargin}rem`;
      liftBox.style.transition = `height ${(time)*2}s linear`;
    },1000);
}
