
// map.js
// unique - Для не повторяющихся
'use strict';
var NUMBER_OF_ADVERTS = 8;
//var avatarAvailableNumber = [];

 var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
                    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
                    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
 var address = '{{location.x}}, {{location.y}}'
var price = {
  min: 1000,
  max: 1000000
}; //число, случайная цена от 1000 до 1 000 000
var type = ['flat', 'house', 'bungalo'];
    var typeOffer = {
        flat : 'Квартира',
        bungalo : 'Бунгало',
        house: 'Дом'
        }
var rooms = {
    min: 1,
    max: 5
 }
var totalQuests = {
  min: 1,
  max: 10
}

var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


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

/*
{
"author": {
"avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем. Например 01, 02 и т. д. Адреса изображений не повторяются
},

"offer": {
"title": строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения не должны повторяться.
"address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
"price": число, случайная цена от 1000 до 1 000 000
"type": строка с одним из трех фиксированных значений: flat, house или bungalo
"rooms": число, случайное количество комнат от 1 до 5
"guests": число, случайное количество гостей, которое можно разместить
"checkin": строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
"checkout": строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
"features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
"description": пустая строка,
"photos": пустой массив
},
"location": {
"x": случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
"y": случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
}
}
*/
/*
        var avatar = 'img/avatars/user{{02}}.png';
        var offer = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
                    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
                    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
        var address = '{{location.x}}, {{location.y}}'
        var price = 10000; //число, случайная цена от 1000 до 1 000 000
        var type = ['flat', 'house', 'bungalo'];
        var rooms = [1,2,3,4,5]; //число, случайное количество комнат от 1 до 5
        var guests = 4; // число, случайное количество гостей
        var checkin = ['12:00', '13:00', '14:00'];
        var checkout = ['12:00', '13:00', '14:00'];
        var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
        var description = '';
        var photos =[];
*/
/*
"location": {
"x": случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
"y": случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
*/
//var appart_location = ['450', '300'];
/** Настройки.
 ******************************************************************************/
// }
//var
//var t = document.querySelector('.map--faded');
/*
    function getRandomAdvert() {
      var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде', 'Проклятый старый дом'];
      var TYPES = ['flat', 'house', 'bungalo'];
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
      var number = Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS));

      return {
        author: {
          avatar: 'img/avatars/user' + (number > 9 ? '' : '0') + number + '.png'
        },
        offer: {
          title: getRandomElement(TITLES),
          address: location.x + ', ' + location.y,
          price: Math.round(getRandomNumber(MIN_PRICE, MAX_PRICE)),
          type: getRandomElement(TYPES),
          rooms: Math.round(getRandomNumber(MIN_ROOMS, MAX_ROOMS)),
          guests: Math.round(getRandomNumber(MIN_GUESTS, MAX_GUESTS)),
          checkin: getRandomElement(CHECKIN_TIME),
          checkout: getRandomElement(CHECKOUT_TIME),
          features: getNewArray(FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: Math.round(getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX)),
          y: Math.round(getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX))
        }
      };
    }
*/

var number = getRandom(NUMBER_OF_ADVERTS,1,AvailableNumber);
//console.log(number);
//var bl = getRandom(12,1,AvailableNumber);
//console.log(bl);
 var autorAvatar = 'img/avatars/user' + (number > 9 ? '' : '0') + number + '.png';
//var tt = type[getRandom(2,0)];
//var tt = (type[getRandom(type.length-1,0)]);
//console.log(type[getRandom(type.length-1,0)]);

 // var tt = checkin[getRandom(checkin.length-1,0)];
//console.log(tt);
var t = document.querySelector('.map');
//console.log(t);

var mapPins = document.querySelector('.map__pins');
var mapPinsTemplate = document.querySelector('#advertTemplate').content;
console.log(mapPinsTemplate);

for (var i = 0; i < 4; i++) {
 var cloneMap = mapPinsTemplate.cloneNode(true);
cloneMap.querySelector('.popup__avatar').src = autorAvatar;
cloneMap.querySelector('.card__title').textContent = title[getRandom(title.length-1,0,AvailableNumber)];
cloneMap.querySelector('.card__adress').textContent = getRandom(100,0)+'%' + ',' + getRandom(100,0)+'%';
cloneMap.querySelector('.popup__price').textContent = getRandom(price.max, price.min) + '\u20bd' + '/ночь'; // спецсимвол
cloneMap.querySelector('.card__type').textContent = typeOffer[(type[getRandom(type.length-1,0)])];
cloneMap.querySelector('.card__rooms').textContent = getRandom(rooms.max,rooms.min) + ' комнаты для ' + getRandom(totalQuests.max,totalQuests.min);
cloneMap.querySelector('.card_checkin').textContent = 'Заезд после ' + checkin[getRandom(checkin.length-1,0)] + ', выезд до ' + checkout[getRandom(checkout.length-1,0)];
//cloneMap.querySelector('.popup__features').textConten =




mapPins.appendChild(cloneMap);
}


t.classList.remove('map--faded');
