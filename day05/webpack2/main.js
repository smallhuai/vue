window.onload=function () {
    const test=require("./test");
    const itemTxt=require("./item1")
  // require("./index.css");
    require("./test1.scss");
    document.querySelector(".box1").style.height="200px"
    document.querySelector(".box1").style.width="200px"
    
    console.log(document.getElementById("app"));
    document.getElementById("app").innerHTML="hellow"+test+itemTxt
    console.log( document.querySelector(".box1"));
}