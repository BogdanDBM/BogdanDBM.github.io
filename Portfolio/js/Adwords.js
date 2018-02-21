var banersObj = {
  b1: '<object data="https://bannera.com.ua/2017/ztinfo/Toyota/Toyota_corola_300x250.html" width="300" height="250"></object>',
  b2: '<object data="https://bannera.com.ua/2017/upwork/FNA/FNA_300x250.html" width="300" height="250"></object>',
  b3: '<object data="https://bannera.com.ua/2017/ztinfo/home/300x250/Home_300x250.html" width="300" height="250"></object>'
};
var bannerMas = [];
for(key in banersObj){
  bannerMas.push(key);
  //console.log(key);
}
console.log(bannerMas);

var bannerList = document.querySelector('.bannerList');

for (var i = 0;i<=2;i++){
  var element = document.createElement('li');
element.innerHTML = banersObj[bannerMas[i]];
bannerList.appendChild(element);
}

