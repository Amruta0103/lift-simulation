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
// let moves = [
//   {
//     liftno: '1',
//     tofloor: '2',
//     status: 'free'| 'occupied',
//   }
// ]
// let liftPosition = [];

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

  lftArr.map(x=>{
    x = {
      title : x,
      free : true,
      currentFloor : 0
    }
    liftArr.push(x);
  })
  console.log("line 55",liftArr);

  createFloors(flArr);
  createLifts(liftArr);
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
    levelTitle.textContent = ("Floor "+ level);
    floorLevel.appendChild(levelTitle);

    let buttonBoard = document.createElement('div');
    buttonBoard.setAttribute("id","buttonBoard");
    floorLevel.appendChild(buttonBoard);

    buttonUp = document.createElement('button');
    buttonUp.setAttribute("id","buttonUp");
    buttonUp.setAttribute("type","button");
    buttonUp.setAttribute("name","Up")
    buttonUp.setAttribute("value",`${level +' ' + buttonUp.name}`)
    buttonUp.textContent = ("Up");
    buttonUp.addEventListener('click',()=>gettingData(level))
    if(level < flVal){
      buttonBoard.appendChild(buttonUp);
    }

    buttonDown = document.createElement('button');
    buttonDown.setAttribute("id","buttonDown");
    buttonDown.setAttribute("type","button");
    buttonDown.setAttribute("name","Down");
    buttonDown.setAttribute("value",`${level +' ' + buttonDown.name}`)
    buttonDown.addEventListener('click',()=>gettingData(level))
    buttonDown.textContent = ("Down");
    if(level > 1){
      buttonBoard.appendChild(buttonDown);
    }

    // gettingData();
  })
}

function createLifts(tempArr){
  tempArr.forEach((l)=>{
    let lift = document.createElement('div');
    lift.setAttribute("id","liftBox");
    lift.textContent = ("Lift "+ l.title);
    allLifts.appendChild(lift);
  })
}

function gettingData (toFloor){
  // console.log(toFloor);
  // console.log(lift.style.marginBottom);
  moveLift(toFloor);
}

function moveLift(toFloor){
  liftBox = document.getElementById('liftBox'); 
  cFlr = parseInt(liftBox.style.marginBottom.slice(0,-3))/5;
  if(cFlr === NaN){
    cFlr = 0;
  }
  console.log("currentFloor:",cFlr,"  headedTo:",toFloor);
  let t1 = cFlr - (toFloor*5);
  t1 = t1/5;
  if ( t1 < 0){
    t1 = t1*(-1)
  }
  let newTime = (cFlr-toFloor);
  if(newTime<0){
    newTime = newTime*(-1)
  }
  console.log("time",newTime);
  setTimeout(()=>{
    liftArr.map(x=>x.currentFloor = toFloor);
    console.log(liftArr);
    let moveMargin = (toFloor-1)*5;
    console.log("moveMargin",moveMargin, "timeNow",(moveMargin/5)*2);
    liftBox.style.marginBottom = `${moveMargin}rem`;
    liftBox.style.transition = `margin ${newTime*2}s`;
},1000);
}

// function moveDown(level){
//   buttonDown.addEventListener('click',() => {
//     console.log("clicked",level);
//     liftBox.style.marginBottom = `${(level-1)*5}rem`;
//     liftBox.style.transition = `margin ${(level)*2}s`;
//   })
// }
