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
let reachedLift = [];
let liftsAt = [];
let floorLevel, buttonUp, buttonDown, currentLift, time;
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
      liftAt : 1,
      headedTo: 1,
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
  wipLift.splice(0,wipLift.length);
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
  calledAt.push(toFloor);
  managingArrays(calledAt);
}

function managingArrays(calledAt){
  let liftIsHere = lftArr.find(lift => lift.liftAt === calledAt[0]);
  console.log("liftIsHere :: ",liftIsHere);
  if(liftIsHere){
    alert("Lift exists at the floor");
  }else{
    assignLift(lftArr[0],calledAt[0]);
  }
  // let temp = liftIsHere.find(lift => lift.liftAt === calledAt[0])
  // if(temp){
  //   console.log("number ek",temp);
  // }
}
      
function assignLift(lift,toFloor){
  let currentLift = lift;
  let liftBoxId = `${'liftBox'+currentLift.lftId}`;
  var liftBox = document.getElementById(liftBoxId);
  let height = (liftBox.clientHeight/16)/5;
  
  currentLift.liftAt = height;
  var t1 = (currentLift.liftAt - currentLift.headedTo);
  if(t1 < 0){
    t1=t1*(-1);
  }
  time=t1;
  console.log("after chnages to lift Data:",currentLift);
  
  let liftDoorId = `${'liftDoor'+currentLift.lftId}`;
  var liftDoor = document.getElementById(liftDoorId);
  let width = (liftDoor.clientWidth/16);
  
  doorMovement(width,liftDoor); 
  console.log("free status after door movement",currentLift.free);
  
  if(currentLift.free === false){
    setTimeout(()=>{
      let moveMargin = (toFloor)*5;
      liftBox.style.height = `${moveMargin}rem`;
      liftBox.style.transition = `height ${(time)*2}s linear`;
      setTimeout(()=>{
        doorMovement(width,liftDoor);
        lift.free = true;
        lift.liftAt = currentLift.headedTo;
        lift.headedTo = 0;
        console.log("lift data on reaching destination",lift);
        // calledAt.shift();
        // wipLift.shift();
        // console.log("finally wiplIft aisa hai",wipLift)
      },time*2*1000);
    },3500);
  }   
}

function doorMovement(width,door){
  setTimeout(()=>{
    if(width > 0.5){
      door.style.width = width = `${0.5}rem`;
      door.style.transition = `width 2.5s ease`;
      width = width.slice(0,-3);
      return width;
    }
  },1000)
  setTimeout(()=>{
    if(width = 0.5){
      door.style.width = width = `${2.5}rem`;
      door.style.transition = `width 2.5s ease`;
      width = width.slice(0,-3);
      return width;
    }
  },2500)
}
