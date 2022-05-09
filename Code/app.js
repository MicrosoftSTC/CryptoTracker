// DOM Elements
alert(
  "As the CoinLayer API, is paid, this app only utilizes the free parts! Therefore, you can only get the values of today & yesterday, in US dollars.. I apologize for inconvinience."
);
const slide0 = document.querySelector(".slide0");
const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const convTitle = document.querySelector("#convTitle");
const step0btn = document.querySelector(".step0");
const cpcur = document.querySelector("#cryptocurId");
const cur = document.querySelector("#curId");
const currentConv = document.querySelector(".todayRate");
const yesterdayConv = document.querySelector(".yesterdayRate");
const percentage = document.querySelector("#percentage");
const themeSelector = document.querySelector("#themeselect");
const colorSelector = document.querySelector("#colsel");
var r = document.querySelector(":root");
const step2btn = document.querySelector(".step2");
const step3btn = document.querySelector(".step3");
let nowSlide = 0;
// Date Conversion
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}
// Slide Function
function currentSlide(n) {
  switch (n) {
    case 0:
      break;
    case 1:
      slide0.classList.add("hidden");
      setTimeout(() => {
        slide0.classList.add("hideLayer");
        slide1.classList.remove("hidden");
        slide1.classList.remove("hideLayer");
      }, 500);
      nowSlide = 1;

      break;
    case 2:
      if (slide0.classList.contains("hideLayer")) {
        slide1.classList.add("hidden");
        setTimeout(() => {
          slide1.classList.add("hideLayer");
          slide2.classList.remove("hidden");
          slide2.classList.remove("hideLayer");
        }, 500);
      } else {
        slide0.classList.add("hidden");
        setTimeout(() => {
          slide0.classList.add("hideLayer");
          slide2.classList.remove("hidden");
          slide2.classList.remove("hideLayer");
        }, 500);
      }
      break;
  }
  step2btn.addEventListener("click", function () {
    switch (colorSelector.selectedIndex) {
      case 0:
        r.style.setProperty("--theme-color", "#E2241A");
        break;
      case 1:
        r.style.setProperty("--theme-color", "#2279F3");
        break;
      case 2:
        r.style.setProperty("--theme-color", "#F17D52");

        break;
      case 3:
        r.style.setProperty("--theme-color", "#DD2BB2");
        break;
    }
    if (nowSlide == 0) {
      slide2.classList.add("hidden");
      setTimeout(() => {
        slide2.classList.add("hideLayer");
        slide0.classList.remove("hidden");
        slide0.classList.remove("hideLayer");
      }, 500);
    } else if (nowSlide == 1) {
      slide2.classList.add("hidden");
      setTimeout(() => {
        slide2.classList.add("hideLayer");
        slide1.classList.remove("hidden");
        slide1.classList.remove("hideLayer");
      }, 500);
    }
  });
}
step0btn.onclick = () => {
  currentSlide(1);
  let cryptCur = cpcur.selectedIndex;
  let cryptoCurText;
  let curText;
  let realCur = cur.selectedIndex;

  switch (cryptCur) {
    case 0:
      cryptoCurText = "Bitcoin";
      break;
    case 1:
      cryptoCurText = "Ethereum";
      break;
    case 2:
      cryptoCurText = "Litecoin";
      break;
  }
  switch (realCur) {
    case 0:
      curText = "Euro";
      break;
    case 1:
      curText = "Dollars";
      break;
    case 2:
      curText = "Czech Crowns";
      break;
  }
  // API Fetch
  convTitle.innerText = `${cryptoCurText} > ${curText}`;
  let url = `http://api.coinlayer.com/api/live?access_key=YOURAPIKEY&symbols=BTC,ETH,LTC`;
  fetch(url)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      switch (cryptCur) {
        case 0:
          currentConv.innerText = `1 BTC = ${data.rates.BTC.toLocaleString()} USD`;
          let currentBTC = data.rates.BTC;
          break;
        case 1:
          currentConv.innerText = `1 ETH = ${data.rates.ETH.toLocaleString()} USD`;
          let currentETH = data.rates.ETH;
          break;
        case 2:
          currentConv.innerText = `1 LTC = ${data.rates.LTC.toLocaleString()} USD`;
          let currentLTC = data.rates.LTC;
          break;
      }
      let selectedCurrency;
      switch (cryptCur) {
        case 0:
          selectedCurrency = "Bitcoin";
          break;
        case 1:
          selectedCurrency = "Ethereum";
          break;
        case 2:
          selectedCurrency = "Litecoin";
          break;
      }
      let selectedValue;
      switch (cryptCur) {
        case 0:
          selectedValue = data.rates.BTC.toLocaleString();
          break;
        case 1:
          selectedValue = data.rates.ETH.toLocaleString();
          break;
        case 2:
          selectedValue = data.rates.LTC.toLocaleString();
          break;
      }
      const report = `Hello, and welcome to Cryptoreport! I will now present to you, in the form of speech, an overview of what happened, in the world of cryptocurrencies, over the course of yesterday! As you have chosen ${selectedCurrency}, it seems that today it's value is at ${selectedValue} US dollars! So it may not be the best time to invest..`;
      step3btn.addEventListener("click", () => {
        if (speechSynthesis.speaking) {
          alert("Wait until the report is finished, then try again!");
        } else {
          playReport(report);
        }
      });
      function playReport(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.5;
        speechSynthesis.speak(utterance);
      }
    });
  // History API Fetch
  let url2 = `http://api.coinlayer.com/api/${formatDate(
    yesterday
  )}?access_key=YOURAPIKEY&symbols=BTC,ETH,LTC`;
  fetch(url2)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data1) {
      switch (cryptCur) {
        case 0:
          yesterdayConv.innerText = `1 BTC = ${data1.rates.BTC.toLocaleString()} USD`;

          break;
        case 1:
          yesterdayConv.innerText = `1 ETH = ${data1.rates.ETH.toLocaleString()} USD`;

          break;
        case 2:
          yesterdayConv.innerText = `1 LTC = ${data1.rates.LTC.toLocaleString()} USD`;

          break;
      }
    });
};
