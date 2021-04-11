document.addEventListener("DOMContentLoaded", function () {
  const fetch = require("node-fetch");

  //get packages data from background
  const bg = chrome.extension.getBackgroundPage();

  const currentUrl = bg.currentUrl;

  //create select option to list packages
  const selectList = document.createElement("select");
  selectList.id = "packageSelection";
  document.body.appendChild(selectList);

  for (let i = 0; i < bg.packages.length; i++) {
    var option = document.createElement("option");
    option.value = bg.packages[i];
    option.text = bg.packages[i];
    selectList.appendChild(option);
  }

  //create verify button
  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Verify Package";
  btn.id = "verifyBtn";
  document.body.appendChild(btn);

  // get package value
  btn.onclick = function(){
    const selectOption = document.getElementById("packageSelection");
    const selectedPackage = selectOption.value;
    fetchResult(selectedPackage, currentUrl)
  }

  //fetch package verification result from backend api
  function fetchResult(package, currentUrl) {
    var result;
    var bodyParams = {package: `${package}`, url: `${currentUrl}`}

    fetch('http://localhost:3000/requestPackageHash', { 
      method: 'POST', 
      body: JSON.stringify(bodyParams),
      headers: { 'Content-Type': 'application/json' } 
    })
    .then(res => res.json())
    .then(json => alert(JSON.stringify(json)));
  }
  
}, false)
