window.ethParser = require("eth-url-parser");
const encode = require("nodejs-base64-encode");
let paramFields = [];
const BASE_URL = "https://ttlink.site";
window.addNewParam = function () {
  const ts = Date.now();

  const newKeyField = document.createElement("input");
  newKeyField.type = "text";
  newKeyField.name = `key_${ts}`;
  newKeyField.id = newKeyField.name;
  newKeyField.placeholder = "Key";
  newKeyField.classList.add("field");
  newKeyField.classList.add("short-field");

  const newValField = document.createElement("input");
  newValField.type = "text";
  newValField.name = `val_${ts}`;
  newValField.id = newValField.name;
  newValField.placeholder = "Value";
  newValField.class = "field short-field";
  newValField.classList.add("field");
  newValField.classList.add("short-field");

  const row = document.createElement("p");
  row.classList.add("param-row");
  row.appendChild(newKeyField);
  row.appendChild(newValField);

  paramFields.push(ts);

  document.getElementById("params-container").appendChild(row);
};

function renderUrl(url) {
  document.getElementById("url").href = url;
  document.getElementById("url").innerText = url;
  const baseImgUrl =
    "http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${DATA}&qzone=1&margin=0&size=250x250&ecc=L";
  const qrCodeUrl = baseImgUrl.replace("${DATA}", escape(url));

  if (document.getElementById("qr-wrapper").firstElementChild) {
    const img = document.getElementById("qr-wrapper").firstElementChild;
    img.src = qrCodeUrl;
  } else {
    const img = document.createElement("img");
    img.src = qrCodeUrl;
    document.getElementById("qr-wrapper").appendChild(img);
  }
}

window.generateDappUrl = function () {
  const dapp_url = document.getElementById("dapp_url").value.trim();
  if (dapp_url.search("https://") !== -1) {
    const base64 = encode.encode(dapp_url, "base64");
    const url = `${BASE_URL}/${base64}`;

    renderUrl(url);
  } else {
    alert("The url needs to start with https://");
  }
};
