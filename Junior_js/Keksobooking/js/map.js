
// map.js
// unique - Для не повторяющихся
'use strict';
var NUMBER_OF_ADVERTS = 8;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapFiltersContainer = map.querySelector('.map__filters-container');

var fragment = document.createDocumentFragment();
//var adverts = getAdverts(NUMBER_OF_ADVERTS);
//var avatarAvailableNumber = [];

//повертаєм випадкове число
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
//повертаєм випадковий елемент масиву
function getRandomElement(array) {
  var randomNumber = Math.round(getRandomNumber(0, array.length - 1));
  return array[randomNumber];
}

// getNewArray - масив
function getNewArray(arr,start){
  var start = start || 0;
  var newArray = [];
  var getRandNumb = getRandomNumber(arr.length-1,start);
    //console.log(getRandNumb);

  for (var i=0;i<getRandNumb;i++){

    var randomIdElemInArr = getRandomNumber(0,arr.length-1);

    if (newArray.indexOf(arr[randomIdElemInArr]) < 0){
        newArray.push(arr[randomIdElemInArr])
  }
  }
  return newArray//newArray;
}




// исходни файлы
 var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
               'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
               'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде', 'Проклятый старый дом'];
  var TYPES = ['flat', 'house', 'bungalo'];

   var typeOffer = {
        flat : 'Квартира',
        bungalo : 'Бунгало',
        house: 'Дом'
        }
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 100;
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 100;
  var LOCATION_Y_MAX = 500;
//  var number = Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS));

var WIDTH_IMAGE = 46;
var HEIGHT_IMAGE = 62;
// получаєм в виді обєкту

//var number = Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS));


function getRandomAdvert() {
  var number = Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS));
      return {
    author: {
     // console.log(number);
      avatar: 'img/avatars/user' + (number > 9 ? '' : '0') + number + '.png'
      //avatar: 'img/avatars/user' + (number > 9 ? '' : '0') + number + '.png'
    },
    offer: {
      title: getRandomElement(TITLES),
      address: location.x + ', ' + location.y,
      price: (Math.round(getRandomNumber(MIN_PRICE, MAX_PRICE))) + '\u20bd' + '/ночь',
      type: getRandomElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: getNewArray(FEATURES),  // 0
      description: '',
      photos: []
    },
    location: {
      x: Math.round(getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX)),
      y: Math.round(getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX))
    }
  };
}
var ads = {};
for(var i=0;i<NUMBER_OF_ADVERTS; i++) {
ads[i] =  getRandomAdvert()
}

map.classList.remove('map--faded');

//var tem = getRandomAdvert();
//mapPins.querySelector('.popup__avatar').src = tem.author.avatar;

//console.log(tem.author.avatar);
//console.log(tem.offer.features);
//console.log(tem.offer.price);
////  Добавили іконки
for (var i = 0; i < NUMBER_OF_ADVERTS; i++) {
    console.log(ads[i]);
  var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  mapPin.querySelector('img').src = ads[i].author.avatar;
  mapPin.style.left = ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
  mapPin.style.top = ads[i].location.y - HEIGHT_IMAGE + 'px';
  console.log(mapPin);
  fragment.appendChild(mapPin);
}
mapPins.appendChild(fragment);

////


var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
mapCard.querySelector('h3').textContent = ads[0].offer.title;
mapCard.querySelector('small').textContent = ads[0].offer.address;
mapCard.querySelector('.popup__price').innerHTML = ads[0].offer.price + '&#x20bd;/ночь';
mapCard.querySelector('.card__type').textContent = typeOffer[ads[0].offer.type];
//console.log(typeOffer[ads[0].offer.type]);
mapCard.querySelector('.card__rooms').textContent = ads[0].offer.rooms + ' для ' + ads[0].offer.guests + '  гостей';
mapCard.querySelector('.card_checkin').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
//mapCard.querySelector('.popup__features').innerHTML = getFeatures(ads[0].offer.features);
mapCard.querySelector('.popup__features + p').textContent = ads[0].offer.description;
mapCard.querySelector('.popup__avatar').src = ads[0].author.avatar;
map.appendChild(mapCard);


//ads.length;
/*
for (i = 0; i < 8; i++) {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  mapPin.querySelector('img').src = ads[i].author.avatar;
}

*/
/*
for (var i = 0; i < 3; i++) {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  mapPin.querySelector('img').src = tem.author.avatar;
  mapPin.style.left = ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
  mapPin.style.top = ads[i].location.y - HEIGHT_IMAGE + 'px';
  fragment.appendChild(mapPin);
}
mapPins.appendChild(fragment);
*/




















/*
var AvailableNumber = [];
function getRandom(max, min, unique){
  max = max;
  min = min || 0;

  if (unique) {
  return unikal(max, min);
  } else{
  return (Math.round(Math.random() * (max -min) + min));
}
}
function unikal(max,min){
 var temp = AvailableNumber;
  var randomNymber =  (Math.round(Math.random() * (max -min) + min));

  if (temp.indexOf(randomNymber)<0){
   AvailableNumber.push(randomNymber);
  // console.log("arr +" + avatarAvailableNumber);
   return randomNymber;
 }
   return unikal(max,min);
    }

// Значення генарація
var nameTitle = title[getRandom(title.length-1,0,AvailableNumber)];


var number = getRandom(NUMBER_OF_ADVERTS,1,AvailableNumber);
var autorAvatar = 'img/avatars/user' + (number > 9 ? '' : '0') + number + '.png';

var t = document.querySelector('.map');
//console.log(t);

var mapPins = document.querySelector('.map__pins');
var mapPinsTemplate = document.querySelector('#advertTemplate').content;
console.log(mapPinsTemplate);
//console.log(features[getRandom(features.length-1,0)]);
var an = [];
var rand = getRandom(features.length-1,1);
function asn(){
return getRandom(features.length-1,0,an);
}

var fearuresNameS = features[asn()];
for (var i = 0; i < 6; i++) {
 var cloneMap = mapPinsTemplate.cloneNode(true);
cloneMap.querySelector('.popup__avatar').src = autorAvatar;
//cloneMap.querySelector('.card__title').textContent = title[getRandom(title.length-1,0,AvailableNumber)];
cloneMap.querySelector('.card__title').textContent = nameTitle;
cloneMap.querySelector('.card__adress').textContent = getRandom(100,0)+'%' + ',' + getRandom(100,0)+'%';
cloneMap.querySelector('.popup__price').textContent = getRandom(price.max, price.min) + '\u20bd' + '/ночь'; // спецсимвол
cloneMap.querySelector('.card__type').textContent = typeOffer[(type[getRandom(type.length-1,0)])];
cloneMap.querySelector('.card__rooms').textContent = getRandom(rooms.max,rooms.min) + ' комнаты для ' + getRandom(totalQuests.max,totalQuests.min);
cloneMap.querySelector('.card_checkin').textContent = 'Заезд после ' + checkin[getRandom(checkin.length-1,0)] + ', выезд до ' + checkout[getRandom(checkout.length-1,0)];

//console.log('rand =' + rand);
//var fearuresNameS = asn();
console.log('rd =' + fearuresNameS);



mapPins.appendChild(cloneMap);
}


t.classList.remove('map--faded');
*/
