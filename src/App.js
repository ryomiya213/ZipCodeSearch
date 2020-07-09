'use strict';

async function App() {
  const zipCodeJSON = await fetch('https://ryomiya213.github.io/ZipCodeSearch/src/zipCode.json');
  const zipCodeData = await zipCodeJSON.json();

  const zipCodeForm = document.querySelector('#zipCodeForm');
  const zipCodeInputElement = document.querySelector('#zipCode');

  zipCodeForm.addEventListener(('submit'), (event) => {
    event.preventDefault();
    zipCodeForm.nextElementSibling.remove();
    const zipCode = zipCodeInputElement.value;
    if (/\d{7}/.test(zipCode)) {
      const addressList = [];
      zipCodeData.forEach(address => {
        if (address.zipCode === zipCode) {
          addressList.push(address);
        }
      });
      zipCodeForm.after(makeAdressHTML(addressList, zipCodeData));
    } else {
      zipCodeForm.after(makeErrorHTML('7桁の数字で入力してください'));
    }
    
  });
}

/**
 * 住所を表示するHTML要素を作成する。
 * @param {Array} addressList 表示したい住所の一覧
 * @param {Array} zipCodeData 全ての郵便番号の一覧
 * @returns {HTMLElement}
 */
function makeAdressHTML(addressList, zipCodeData) {
  const addressElement = document.createElement('div');
  addressElement.classList.add('address');
  let addressHTML = '';
  if (addressList.length === 0) {
    const PElement = document.createElement('p');
    PElement.innerHTML = "みつかりませんでした";
    addressElement.appendChild(PElement);
  } else {
    addressList.forEach(address => {
      const PElement = document.createElement('p');
      switch (true) {
        case address.Street.endsWith('以下に掲載がない場合'):
          PElement.innerHTML = `住所: ${address.Prefecture} ${address.City} 以下に掲載がない地域`;
          const noIncludesElement = document.createElement('div');
          noIncludesElement.classList.add('noIncludes');
          zipCodeData.forEach(masterData => {
            if (address.City === masterData.City && address.zipCode !== masterData.zipCode) {
              noIncludesElement.innerHTML += ` ${masterData.Street}`;
            }
          });
          PElement.appendChild(noIncludesElement);
          break;
        case address.Street.endsWith('の次に番地がくる場合'):
          PElement.innerHTML = `住所: ${address.Prefecture} ${address.City} 次に番地がくる地域`
          break;
        case address.Street.endsWith('一円'):
          PElement.innerHTML = `住所: ${address.Prefecture} ${address.City}`
          break;
        default:
          PElement.innerHTML = `住所: ${address.Prefecture} ${address.City} ${address.Street}`;
      }
      addressElement.appendChild(PElement);
    });
  }
  return addressElement;
}

/**
 * エラーを表示するHTML要素を作成する
 * @param {String} error エラー内容
 */
function makeErrorHTML (error) {
  const errorElement = document.createElement('p');
  errorElement.innerHTML = error;
  return errorElement;
}


App();