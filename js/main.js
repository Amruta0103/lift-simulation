const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const display = document.getElementById('display');
const allLevel = document.getElementById('allLevelsDiv');
const allLifts = document.getElementById('allLiftsDiv');
const sibs = document.getElementById("sibs");
var inputs = document.getElementsByClassName('input');

let flVal;
let lftVal;
let flArr = [];
let lftArr = [];
let calledAt = [];
let wipLift = [];
let floorLevel, buttonUp, buttonDown, currentLift, time, currentFloor, available, liftIsHere;
let validInp = false;

function checkInput(flVal,lftVal){
  if(flVal && lftVal ){
    if(1<flVal){
      if(0 < lftVal){
        if(lftVal > 21){
          alert("Max. limit for lifts is 20")
        }else{
          if(lftVal < flVal ){
            return lftVal, flVal, validInp = true;
          }else{
            alert("No. of lifts cannot be more than lifts");
          }
        }
      }else{
        alert("No. of lifts cannot be less than 1");
      }
    }else{
      alert("No. of floors cannot be less than 2");
    }
  }else{
    return alert("Please input the values");
  }
  
}
submitBtn.addEventListener('click',() => {
  let liftsVal = document.querySelector("#liftsVal").value;
  let floorsVal = document.querySelector("#floorsVal").value;
  flVal = parseInt(floorsVal);
  lftVal = parseInt(liftsVal);
  checkInput(flVal,lftVal);
  if(validInp === true){
    for (var i=1; i<=floorsVal ; i++){
      let j = {
        flId: i,
      }
      flArr.push(j);
    }
    for (var i=1; i<=liftsVal; i++){
      let j = {
        lftId:i,
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
  }
})

backBtn.addEventListener('click',()=>{
  allLevel.replaceChildren();
  allLifts.replaceChildren();
  allLifts.style.height = '0rem';
  backBtn.style.display = 'none';
  form.style.display = 'flex';
  document.querySelector("#liftsVal").value = 0;
  document.querySelector("#floorsVal").value = 0;
  flArr = [];
  lftArr = [];
  calledAt = [];
  wipLift = [] ;
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
    liftDoor.innerHTML = ("L-"+lft.lftId);
    lift.appendChild(liftDoor);
  })
  let totalWidth = (allLifts.clientWidth);
  // console.log(tempArr.length*2.5, totalWidth);
}

function getData(toFloor) {
  calledAt.push(toFloor);
  managingArrays(calledAt);
}

function managingArrays(calledAt){
  wipLift.push(lftArr)
  var toBeAvailable = setInterval(()=>{
    available = wipLift[0].filter(lift=> lift.free === true);
    liftIsHere = available.find(lift => lift.liftAt === calledAt[0]);
    if(liftIsHere){
      alert("Lift exists at the floor",liftIsHere);
    }else{
      for(a=0; a<calledAt.length; a++){
        let nearestLift = nearestLiftFunc(available,calledAt[a]);
        if(nearestLift){
          nearestLift.free = false;
          nearestLift.headedTo = calledAt[a];
          assignLift(nearestLift,calledAt[0]);
          calledAt.shift()
        }
      }
    }
    clearInterval(toBeAvailable);
  },1000)
}
      
function assignLift(lift,toFloor){
  let liftBoxId = `${'liftBox'+lift.lftId}`;
  var liftBox = document.getElementById(liftBoxId);
  let height = (liftBox.clientHeight/16)/5;
  let liftDoorId = `${'liftDoor'+lift.lftId}`;
  var liftDoor = document.getElementById(liftDoorId);
  let width = (liftDoor.clientWidth/16);
  
  lift.liftAt = height;
  var t1 = (lift.liftAt - lift.headedTo);
  if(t1 < 0){
    t1=t1*(-1);
  }
  time=t1; 
  
  
  doorMovement(width,liftDoor); 
  
  if(lift.free === false){
    setTimeout(()=>{
      let moveMargin = (toFloor)*5;
      liftBox.style.height = `${moveMargin}rem`;
      liftBox.style.transition = `height ${(time)*2}s linear`;
      setTimeout(()=>{
        doorMovement(width,liftDoor);
        lift.free = true;
        lift.liftAt = toFloor;
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