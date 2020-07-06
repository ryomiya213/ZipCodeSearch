'use strict';

async function App() {
  const zipCodeJSON = await fetch('./src/zipCode.json');
  const zipCodeData = await zipCodeJSON.json();

  const zipCodeForm = document.querySelector('#zipCodeForm');
  const zipCodeInputElement = document.querySelector('#zipCode');
  const addressElement = document.querySelector('#address');

  zipCodeForm.addEventListener(('submit'), (event) => {
    event.preventDefault();
    const zipCode = zipCodeInputElement.value;
    if (/\d{7}/.test(zipCode)) {
      zipCodeData.forEach(value => {
        if (value.zipCode === zipCode) {
          addressElement.innerHTML = `住所: ${value.Prefecture} ${value.City} ${value.Street}`
        } else {
          addressElement.innerHTML = "見つかりませんでした"
        }
      });
    } else {
      addressElement.innerHTML = "7桁の数字で入力してください"
    }
    
  });
}


App();