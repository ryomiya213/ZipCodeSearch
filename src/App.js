'use strict';

async function App() {
  const zipCodeJSON = await fetch('https://ryomiya213.github.io/ZipCodeSearch/src/zipCode.json');
  const zipCodeData = await zipCodeJSON.json();

  const zipCodeForm = document.querySelector('#zipCodeForm');
  const zipCodeInputElement = document.querySelector('#zipCode');
  const addressElement = document.querySelector('#address');

  zipCodeForm.addEventListener(('submit'), (event) => {
    event.preventDefault();
    addressElement.innerHTML = '';
    const zipCode = zipCodeInputElement.value;
    if (/\d{7}/.test(zipCode)) {
      const addressList = [];
      zipCodeData.forEach(value => {
        if (value.zipCode === zipCode) {
          addressList.push(`住所: ${value.Prefecture} ${value.City} ${value.Street}`);
        }
      });
      if (addressList.length === 0) {
        addressElement.innerHTML = "みつかりませんでした"
      } else {
        addressList.forEach(address => {
          addressElement.innerHTML += address + '<br>';
        });
      }

    } else {
      addressElement.innerHTML = "7桁の数字で入力してください"
    }
    
  });
}


App();