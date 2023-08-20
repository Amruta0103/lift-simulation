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
let calledAt;
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
      liftAt : 0,
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
  console.log("1");
  calledAt = toFloor;
  assignLift(calledAt);
}

function assignLift(toFloor){
  console.log("2");
  wipLift.push(lftArr);
  var currentLift = wipLift[0][0];
  let liftBoxId = `${'liftBox'+currentLift.lftId}`;
  let liftDoorId = `${'liftDoor'+currentLift.lftId}`;
  var liftBox = document.getElementById(liftBoxId);
  var liftDoor = document.getElementById(liftDoorId);
  let height = (liftBox.clientHeight/16)/5;
  let width = (liftDoor.clientWidth/16);

  let liftExists = console.log(wipLift[0].some((x)=>x.liftAt === toFloor));
  if(liftExists === true){
    console.log("3");
    console.log("toFloor",toFloor)
    console.log("line 147",liftExists);
    // return doorMovement(width,liftDoor);
  }else{
    console.log("4");
    console.log("else of line 149");
    setLiftData()
  } 
  
  function setLiftData(){
    console.log("5", currentLift.free);
    currentLift.free = false;
    currentLift.headedTo = toFloor;
    currentLift.liftAt = height;
    var t1 = (currentLift.liftAt - currentLift.headedTo);
    if(t1 < 0){
      t1=t1*(-1);
    }
    time=t1;
    console.log("5.2", currentLift.free);
  }

  doorMovement(width,liftDoor)
  
  setTimeout(()=>{
    console.log("6");
    if(currentLift.free === false){
      let moveMargin = (toFloor)*5;
      liftBox.style.height = `${moveMargin}rem`;
      liftBox.style.transition = `height ${(time)*2}s linear`;
      reachedLift.push(wipLift[0][0]);
      wipLift[0].shift();
      console.log("line 180", reachedLift[0]);
    }
    setTimeout(()=>{
      console.log("7");
      doorMovement(width,liftDoor);
    },time*2*1000);
    setTimeout(()=>{
      console.log("8");
      reachedLift[0].free = true;
      reachedLift[0].liftAt = currentLift.headedTo;
      reachedLift[0].headedTo = 0;
      wipLift[0].push(reachedLift[0]);
      reachedLift.shift();
      console.log("mai yaha hu yaha hu yaha hu yaha",wipLift[0])
    },time*2*1000 + 2000)
  },3500);

}

function doorMovement(width,door){
  console.log("9");
  setTimeout(()=>{
    if(width > 0.5){
      door.style.width = width = `${0.5}rem`;
      door.style.transition = `width 2.5s ease`;
      width = width.slice(0,-3);
      // console.log("open door ki width", width);
      return width;
    }
  },1000)
  setTimeout(()=>{
    // console.log("door width two",width);
    if(width = 0.5){
      door.style.width = width = `${2.5}rem`;
      door.style.transition = `width 2.5s ease`;
      width = width.slice(0,-3);
      return width;
    }
  },2000)
}
