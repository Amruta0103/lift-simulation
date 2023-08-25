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
let floorLevel, buttonUp, buttonDown, currentLift, time, currentFloor, available, liftIsHere;
let validInp = false;
floorsVal.addEventListener('input',(e) => {
  flVal = parseInt(e.target.value);
  console.log("flVal",flVal)
})

liftsVal.addEventListener('input',(f) => {
  lftVal = parseInt(f.target.value);
  console.log("lftVal",lftVal)
})
function validateInputs(fl,lft){
  console.log("28 ::","fl :",fl,"lft",lft);
  // console.log(parseInt(fl),parseInt(lft));
  if(fl > lft){
    alert("No. of Floors has to be more than no. of Lifts")
  }else{
    console.log("fl:",fl,"lft:",lft);
    validInp = true;
    return floorsVal.value = fl, liftsVal.value = lft;
  }
}
submitBtn.addEventListener('click',() => {
  console.log(validateInputs(floorsVal.value,liftsVal.value));
  if(validInp === true){
    for (var i=0; i< flVal ; i++){
      let j = {
        flId: i+1,
      }
      flArr.push(j);
    }
    for (var i=0; i<lftVal; i++){
      let j = {
        lftId:i+1,
        free: true,
        liftAt : 1,
        headedTo: 1,
      }
      lftArr.push(j);
    } 
    createFloors(flArr);
    createLifts(lftArr);
    allLifts.style.height = `${5*flVal}rem`;
    form.style.display = 'none';
    backBtn.style.display = 'block';
  }else{
    alert("Re-enter input values");
  }
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
  liftsVal.value = Number;
  floorsVal.value = Number;
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
    buttonUp.textContent = ("🔼");
    if(level.flId < flVal){
      buttonBoard.appendChild(buttonUp);
    }

    buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.setAttribute("type","button");
    buttonDown.setAttribute("name","Down");
    buttonDown.setAttribute("value",`${level.flId}`)
    buttonDown.addEventListener('click',()=>getData(level.flId))
    buttonDown.textContent = ("🔽");
    if(level.flId > 1){
      buttonBoard.appendChild(buttonDown);
    }
  })
}

function createLifts(tempArr){
  console.log("123 ::",tempArr.length);
  if(tempArr.length > 20){
    allLifts.style.overflowX = 'auto';
    allLifts.style.overflowY = 'hidden';
    allLifts.style.bottom = '-1rem';
  }
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
    lift.appendChild(liftDoor);
  })
}

function getData(toFloor) {
  calledAt.push(toFloor);
  managingArrays(calledAt);
}

function managingArrays(calledAt){
  console.log("line 130 ::", calledAt);
  wipLift.push(lftArr)
  var toBeAvailable = setInterval(()=>{
    if(wipLift[0].length > 0){
      available = wipLift[0].filter(lift=> lift.free === true);
      console.log(available);
      liftIsHere = available.find(lift => lift.liftAt === calledAt[0]);
      if(liftIsHere){
        alert("Lift exists at the floor",liftIsHere);
      }
      if(calledAt[0] !== calledAt[1]){
        for(a=0; a<calledAt.length; a++){
          let nearestLift = nearestLiftFunc(available,calledAt[a]);
          if(nearestLift){
            nearestLift.free = false;
            nearestLift.headedTo = calledAt[a];
            assignLift(nearestLift,calledAt[0]);
          }
        }
      }
      calledAt.shift()
    }
    clearInterval(toBeAvailable);
  },1000)
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
  
  let liftDoorId = `${'liftDoor'+currentLift.lftId}`;
  var liftDoor = document.getElementById(liftDoorId);
  let width = (liftDoor.clientWidth/16);
  
  doorMovement(width,liftDoor); 
  
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
        wipLift.shift();
      },time*2*1000);
    },4000);
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
      door.style.width = width = `${2}rem`;
      door.style.transition = `width 2.5s ease`;
      width = width.slice(0,-3);
      return width;
    }
  },2500)
}

function nearestLiftFunc(arr, calledAt){
  let nearest = arr[0];
  let minDiff = Math.abs(calledAt - nearest.liftAt);

  for( let i=1; i< arr.length; i++){
    let current = arr[i];
    let currentDif = Math.abs(calledAt - current.liftAt);
    if(currentDif < minDiff){
      nearest = current;
      minDiff = currentDif;
    }
  }
  return nearest;
}