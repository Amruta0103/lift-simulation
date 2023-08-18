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
let liftArr = [];
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
    buttonUp.addEventListener('click',()=>gettingData(level.flId))
    buttonUp.textContent = ("Up"+level.flId);
    if(level.flId < flVal){
      buttonBoard.appendChild(buttonUp);
    }

    buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.setAttribute("type","button");
    buttonDown.setAttribute("name","Down");
    buttonDown.setAttribute("value",`${level.flId}`)
    buttonDown.addEventListener('click',()=>gettingData(level.flId))
    buttonDown.textContent = ("Down"+level.flId);
    if(level.flId > 1){
      buttonBoard.appendChild(buttonDown);
    }
  })
}

function createLifts(tempArr){
  tempArr.forEach((lft)=>{
    let lift = document.createElement('div');
    lift.setAttribute("id","liftBox");
    lift.textContent = ("Lift "+lft.lftId);
    allLifts.appendChild(lift);
  })
}

function gettingData (toFloor){
  // console.log("kaunsa floor",toFloor);
  moveLift(toFloor);
}

function moveLift(toFloor){
  liftBox = document.getElementById('liftBox'); 
  let height = parseInt(liftBox.style.height.slice(0,-3));
  console.log("margin",height)
  // if(margin === NaN){
  //   margin = 1
  // };
  let time;
  lftArr.map(q=>{
    q.headedFrom = height/5;
    q.headedTo = toFloor;
    console.log("headedFrom:",q.headedFrom,"  headedTo:",toFloor);
    var t1 = (q.headedFrom - q.headedTo);
    if(t1 < 0){
      t1=t1*(-1);
    }
    time=t1;
  })
  setTimeout(()=>{
    let moveMargin = (toFloor)*5;
    console.log("moveMargin",moveMargin, "time",(time*2));
    liftBox.style.height = `${moveMargin}rem`;
    liftBox.style.transition = `height ${(time)*2}s`;
},1000);
}

// console.log(flArr,"\n",lftArr,"\n",liftArr);

// function moveDown(level){
//   buttonDown.addEventListener('click',() => {
//     console.log("clicked",level);
//     liftBox.style.marginBottom = `${(level-1)*5}rem`;
//     liftBox.style.transition = `margin ${(level)*2}s`;
//   })
// }
