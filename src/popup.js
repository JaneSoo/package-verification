document.addEventListener("DOMContentLoaded", function () {
  const fetch = require("node-fetch");

  //get packages data from background
  const bg = chrome.extension.getBackgroundPage();

  //url where extension is activated
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

  const spinning = document.getElementById('wait');
  const selectLabel = document.getElementById('select-label-id');
  const selectOptionElement = document.getElementById('packageSelection');
  const verifyBtn = document.getElementById('verifyBtn');
  const imgDiv = document.getElementById('div-img');
  const img = document.createElement('img');
  const caption = document.createElement('p')

  // get package value
  btn.onclick = function(){
    const selectOption = document.getElementById("packageSelection");
    const selectedPackage = selectOption.value;
    selectLabel.hidden = true;
    selectOptionElement.hidden = true;
    verifyBtn.hidden = true;
    spinning.classList.add('loader');
    fetchResult(selectedPackage, currentUrl)
  }

  //fetch package verification result from backend api
  function fetchResult(package, currentUrl) {
    var bodyParams = {package: `${package}`, url: `${currentUrl}`}

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch('http://localhost:3000/requestPackageHash', { 
      method: 'POST', 
      body: JSON.stringify(bodyParams),
      headers: headers
    })
    .then(res => res.json())
    .then(json => {
      if(json.result == true){
        img.setAttribute('src', '../icons/check.png');
        spinning.classList.remove('loader');
        imgDiv.appendChild(img);
        caption.innerText = `The package "${package}" is identical!`;
        imgDiv.appendChild(caption);
        imgDiv.hidden = false;
      }
      else if (json.result == 'Transaction not found!'){
        img.setAttribute('src', '../icons/incorrect.png');
        spinning.classList.remove('loader');
        imgDiv.appendChild(img);
        caption.innerText = `The package "${package}" has not pushed to blockchain yet!`
        imgDiv.appendChild(caption);
        imgDiv.hidden = false;
      }
      else if(json.result == 'Error downloading package'){
        img.setAttribute('src', '../icons/incorrect.png');
        spinning.classList.remove('loader');
        imgDiv.appendChild(img);
        caption.innerText = `Cannot download package "${package}" at the moment.`
        imgDiv.appendChild(caption);
        imgDiv.hidden = false;
      } else {
        img.setAttribute('src', '../icons/incorrect.png');
        spinning.classList.remove('loader');
        imgDiv.appendChild(img);
        caption.innerText = `The package "${package}" is not identical!`
        imgDiv.appendChild(caption);
        imgDiv.hidden = false;
      }
    });
  }
  
}, false)
