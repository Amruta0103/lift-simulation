const floorsVal = document.getElementById('floorsVal');
// const liftsVal = document.getElementById('liftsVal');
const submitBtn = document.getElementById('submitBtn');
const display = document.getElementById('display');
const allLvl = document.getElementById('allLevelsDiv');

let flVal;
// let lftVal ;
let flArr = [];
// let lftArr = [];

floorsVal.addEventListener('input',(e) => {
  flVal = (e.target.value);
})

// liftsVal.addEventListener('input',(e) => {
//   lftVal = (e.target.value);
// })

submitBtn.addEventListener('click',() => {
  for (var i=1; i<= flVal ; i++){
    flArr.push(i);
  }
  // for (var i=1; i<= lftVal ; i++){
  //   lftArr.push(i);
  // }
  display.innerText = (flArr)
  flArr.forEach((i)=>{
    let item = document.createElement('div');
    item.textContent = i;
    item.setAttribute("id","levelDivMain")
    allLvl.appendChild(item);
  });
  flArr.splice(0, flVal);
  console.log(flArr);
  // lftArr.splice(0,lftVal);
})