
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

// добавляємо список з li
function getFeatures(arr){
 // console.log('input : ' + arr);
  var count = arr.length-1;
  var featureList = '';
  //console.log(count);

  for(var i=0;i<=count;i++){
    featureList += '<li class="feature feature--' + arr[i] + '"></li>';
   // console.log(featureList);
  }
  return featureList;
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
var HEIGHT_IMAGE = -62;
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
      address: 'location.x' + ', ' + 'location.y',
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
      x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
      y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
}
var ads = {};
for(var i=0;i<NUMBER_OF_ADVERTS; i++) {
ads[i] =  getRandomAdvert()
}



map.classList.remove('map--faded');

////  Добавили іконки
var iconShow = function(){
for (var i = 0; i < NUMBER_OF_ADVERTS; i++) {
 //   console.log(ads[i]);
  var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  mapPin.querySelector('img').src = ads[i].author.avatar;
  mapPin.style.left = ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
  mapPin.style.top = ads[i].location.y - HEIGHT_IMAGE + 'px';
//  console.log(mapPin);
  fragment.appendChild(mapPin);
}
mapPins.appendChild(fragment);
}
////

var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

var mapCardShow = function(){
mapCard.querySelector('.card__title').textContent = ads[0].offer.title;
//console.log(ads[0].offer.location.x);
mapCard.querySelector('.card__adress').textContent = 'location.x :' + ads[0].location.x + ', ' + 'location.y :' + ads[0].location.y;//ads[0].offer.address;
mapCard.querySelector('.popup__price').innerHTML = ads[0].offer.price + '&#x20bd;/ночь';
mapCard.querySelector('.card__type').textContent = typeOffer[ads[0].offer.type];
//console.log(typeOffer[ads[0].offer.type]);
mapCard.querySelector('.card__rooms').textContent = ads[0].offer.rooms + ' для ' + ads[0].offer.guests + '  гостей';
mapCard.querySelector('.card_checkin').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
//console.log(ads[0].offer.features);
mapCard.querySelector('.popup__features').innerHTML = getFeatures(ads[0].offer.features);
//console.log(ads[0].offer.features);// повернули масив елементів.
mapCard.querySelector('.popup__features + p').textContent = ads[0].offer.description;
mapCard.querySelector('.popup__avatar').src = ads[0].author.avatar;
map.appendChild(mapCard);
}
// START LESS $





map.classList.add('map--faded');

//mapPin.classList.add('map--faded');

var formAct = document.querySelector('.map__filters');
formAct.classList.add('notice__form--disabled');
var mapFiltersForm =document.querySelectorAll('.map__filter');
//console.log(bb.length);
for (var i=0;i<=mapFiltersForm.length-1;i++){
  mapFiltersForm[i].setAttribute('disabled', true)
}

var MainPin = document.querySelector('.map__pin--main');
MainPin.addEventListener('click',function(){
  iconShow();
  mapCardShow();
  map.classList.remove('map--faded');
  formAct.classList.remove('notice__form--disabled');
  for (var i=0;i<=mapFiltersForm.length-1;i++){
  mapFiltersForm[i].removeAttribute('disabled', true);
}
 console.log('Click');
})

/*
mapPins.addEventListener('click', function(){
 map.classList.remove('map--faded');
 console.log('Click');
});
*/

//bb.setAttribute('disabled', true);
//formAct.setAttribute('disabled', true);
//var formas = document.querySelector('.notice__header');
//formas.classList.add('notice__form--disabled');
//formas.setAttribute('disabled', true);











