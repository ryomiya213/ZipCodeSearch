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
      zipCodeData.forEach(address => {
        if (address.zipCode === zipCode) {
          addressList.push(address);
        }
      });
      if (addressList.length === 0) {
        addressElement.innerHTML = "みつかりませんでした"
      } else {
        addressList.forEach(address => {
          switch (true) {
            case address.Street.endsWith('以下に掲載がない場合'):
              addressElement.innerHTML += `住所: ${address.Prefecture} ${address.City} 以下に掲載がない地域` + '<br>';
              zipCodeData.forEach(masterData => {
                if (address.City === masterData.City && address.zipCode !== masterData.zipCode) {
                  addressElement.innerHTML += ` ${masterData.Street}`;
                }
              });
              addressElement.innerHTML += '<br>';
              break;
            case address.Street.endsWith('の次に番地がくる場合'):
              addressElement.innerHTML += `住所: ${address.Prefecture} ${address.City} 次に番地がくる地域` + '<br>';
              break;
            case address.Street.endsWith('一円'):
              addressElement.innerHTML += `住所: ${address.Prefecture} ${address.City}` + '<br>';
              break;
            default:
              addressElement.innerHTML += `住所: ${address.Prefecture} ${address.City} ${address.Street}` + '<br>';
          }
        });
      }

    } else {
      addressElement.innerHTML = "7桁の数字で入力してください"
    }
    
  });
}


App();