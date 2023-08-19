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
    liftBox.appendChild(lift);
    
    let liftDoor = document.createElement('div');
    liftDoor.setAttribute("class","liftDoor");
    liftDoor.setAttribute("id",`${"liftDoor"+lft.lftId}`);
    liftDoor.innerText = ("Lift "+lft.lftId);
    lift.appendChild(liftDoor);
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
  wipLift.push(lftArr);
  var currentLift = wipLift[0][0]; 
  let liftBoxId = `${'liftBox'+currentLift.lftId}`;
  let liftDoorId = `${'liftDoor'+currentLift.lftId}`;
  var liftBox = document.getElementById(liftBoxId);
  var liftDoor = document.getElementById(liftDoorId);
  let height = (liftBox.clientHeight/16)/5;
  currentLift.free = false;
  currentLift.headedTo = arr[0];
  currentLift.headedFrom = height;
  var t1 = (currentLift.headedFrom - currentLift.headedTo);
  if(t1 < 0){
    t1=t1*(-1);
  }
  time=t1;
  console.log("door width",liftDoor.clientWidth/16);
  if(liftDoor.clientWidth/16 > 0){
    console.log("door is closed");
    liftDoor.style.width = `${0.5}rem`;
    liftDoor.style.transition = `width 1s ease 1s`;
      console.log("door is open");
      liftDoor.style.width = `${2.5}rem`;
      liftDoor.style.transition = `width 1s ease 1s`;
  }
  setTimeout(()=>{
    let moveMargin = (arr[0])*5;
    liftBox.style.height = `${moveMargin}rem`;
    liftBox.style.transition = `height ${(time)*2}s linear`;
  },2000);
  wipLift[0].shift()
  console.log(wipLift[0]);
}
