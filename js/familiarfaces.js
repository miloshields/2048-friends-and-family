// declare the styleSheet as a global so that a new one
// is not created every time addColor is called
let styleSheet;
document.getElementsByClassName("game-container")[0].style.display = "none";
const imageData = 
{
    "9284":
        [
        
            "1IAqNwrCzD_L-7S_BAplpNj_7YSveIYGY",
            "1B7MiTrB8dDG_3GWxzjVGaQDRRk7UcWjm",
            "1GoRqw3gQqP4Q6wV-7oAvhXZC7PeNt0mx",
            "1_k3huovwuTovyGKeu_Ey_vsDT4yXkWS_",
            "1UCxFEP2K9KVdOoanQnIkQ9SXJ2wQXY_a",
            "1TqxAk21M0YVAqpivx3S8BpVKRpvUKwNO",
            "1Y2gD0ov53HX04Qf1xq8F-XLssF06dEWH",
            "1L2pWQptVbtfYHClca2Z2wTprQq3oFfDX",
            "1VyNXfC2h5uS9Psv4gMu65pWtYUALJXKW",
            "14MIPdrFU-FQJCvu4hrNb4ce7vJIZrqzl",
            "1nZo3NT5gs7duX-KtEWKIR5VWnKlfpi_r"
        ],
    "1985":
        [
            "1QrBKquKQJQXhG9YaSORvBcprZeT8wKQs",
            "1HwG8iZsqJLsip-Btfc3pCQUtYEoplL40",
            "1gxs6XD3-cB9OqDGt3qQ13adU8X8y8GsV",
            "1QX0vYAG6HLp9NKoWjaxbFkrb4aG1-FPF",
            "10HezV3GSvPxDRKNpiNSV5hiJx8Ztgqto",
            "1JpgOu8Waf3T1AaLlZcfywhd_kFQur1lY",
            "1UAwOOROhlyA0asF9ok83seNLP0XPQkiz",
            "1kJazss_M2YEUNI-mwHeehcT_9yoNJQ0k",
            "1iSGXZ9IffJajbeP2QUdXErs5vcbF1byC",
            "1lyxEbfSNsb35Wy9vHGnhsFvdLbWGx6rw",
            "1D6bB1VCO7Y73zahn6sQH3HJfXbM6jIF2"
        ],
    "2021":
        [
            "14y3D3Kry2LH_2wLCUa67NKBSM7FFYCxF",
            "1bgK5VyTMqRtMqyhbUSD11ciMLz7xI2ud",
            "1NyaBBRigVnqYkauy_T4AE4X8qvih7-AO",
            "1DNNK_m1IbazrIJ3AZlUjutAOcxTItTHY",
            "15B9rEXkegWvmOj-jeUjRumWiBxd8JZhf",
            "1zJISi8m6VdogTkbtmy4aNeie0Gp2MU5K",
            "195QtV8eYUrpRCEXMXpm4DhWM0hPg1Tn2"





        ]
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function loadGame(gameCode) {
    if (!styleSheet) {
        console.log("Style sheet didn't exist yet, trying to make it.")
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        styleSheet = styleElement.sheet;
    }
    else{
        console.log("Style sheet exists, trying to clear it.")
        // clear previous background rules, so that new nonconflicting rules can be added
        while(styleSheet.cssRules.length > 0) {
            styleSheet.deleteRule(0);
        }
    }
    styleIndex = document.styleSheets.length - 1;
    console.log("Index for our stylesheet is "+styleIndex)

    imageData[gameCode].forEach((imageID, index) => {
        num = Math.pow(2, index+1);
        className = `.tile.tile-${num} .tile-inner`;
        
        changeBackground(className, getGoogleDriveURL(imageID, 400, 400), styleIndex);
    })
    document.getElementsByClassName("game-container")[0].style.display = "block";
}
function getGoogleDriveURL(id, width, height) {
    return `https://drive.google.com/thumbnail?id=${id}&sz=w${width || 200}-h${height || 200}`;
}
function changeBackground(selector, url, sheetIndex){
    document.styleSheets[sheetIndex].insertRule(
        `${selector}{ background-image: url(${url}) !important}`
    );
}


var gameButton = document.getElementById("game-code-button");
gameButton.onclick = () => {
    var gameCode = document.getElementById("game-code-text").value;
    if(gameCode in imageData) {
        setCookie("gameCode",gameCode,7);
        loadGame(gameCode);
    }
    else alert("That's not a valid game code! Sorry!")
}

let gameCode = getCookie("gameCode");
if (gameCode != "" && (gameCode in imageData)) {
    loadGame(gameCode)
}