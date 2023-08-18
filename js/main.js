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
    console.log(liftBox.clientHeight/16);  
    
    let lift = document.createElement('div');
    lift.setAttribute("class","lift");
    lift.setAttribute("id",`${"lift"+lft.lftId}`);
    lift.textContent = ("Lift "+lft.lftId);
    liftBox.appendChild(lift);
  })
  
}

function getData(toFloor) {
  calledAt.push(toFloor);
  assignLift(calledAt);
}

function assignLift(arr){
  // let tempId = (`${"lift"+toFloor}`);
  // console.log("tempId",tempId);
  // var lift = document.getElementById(`${tempId}`); 
  // let height = (lift.clientHeight);
  for(let c=0; c<1; c++){
  lftArr.map(q=>{
    if(q.headedFrom !== arr[0]){
      if(q.free === true){
          console.log(arr[0],q.lftId)
          moveLift(arr[0],q.lftId)
        };
      }
      else{
        console.log("else mein:-",q,"&","arr[0]",arr[0]);
      }
    })
  }
}

// function calledAtFloor(floor){
//   console.log(lftArr);
//   var liftBox = document.getElementById('liftBox'); 
//   let height = (liftBox.clientHeight/16)/5;
//   lftArr.map(z => {
//     if( height === z.lftId === floor){
//       // console.log("matching id's :",z.lftId,"&",floor)
//       if(z.free === true){
//         for (var a=0; a<1; a++){
//           return z.free = false;
//         }
//         console.log(z.free);
//       }
//     }
//   })
//   moveLift(floor);
// }

function moveLift(toFloor,lftId){ 
  let tempId = `${'liftBox'+lftId}`;
  var liftBox = document.getElementById(tempId);
  console.log("clientHeight",(liftBox.clientHeight/16)/5);
  let height = (liftBox.clientHeight/16)/5;
  console.log("height",height,"manjil",toFloor);
  let time;
  lftArr.map(q=>{
    if(toFloor === q.headedFrom){
      console.log("lift hai yaha, iss floor pe -> ",toFloor)
    }else{
      console.log("lift bulwao bhai yaha",toFloor);
    }
      q.headedFrom = height;
      q.headedTo = toFloor;
      console.log("headedFrom:",q.headedFrom,"  headedTo:",toFloor);
      var t1 = (q.headedFrom - q.headedTo);
      if(t1 < 0){
        t1=t1*(-1);
      }
      time=t1;
      setTimeout(()=>{
        let moveMargin = (toFloor)*5;
        console.log("moveMargin",moveMargin, "time",(time*2));
        liftBox.style.height = `${moveMargin}rem`;
        liftBox.style.transition = `height ${(time)*2}s linear`;
      },1000);
  })
}
