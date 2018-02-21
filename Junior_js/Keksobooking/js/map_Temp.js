
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

// Значення генарація
var nameTitle = title[getRandom(title.length-1,0,AvailableNumber)];

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
