var wizardName = ['Иван','Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black','red', 'blue', 'yellow', 'green'];
// add fireball color;
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5','#e6e848'];

namesOfWizzrd = function () {
//var firstName = ((Math.floor(Math.random() *  ((wizardName.length-1) - 0) + 0)));
//var surName = ((Math.floor(Math.random() *  ((wizardSurname.length-1) - 0) + 0)));
//var b = wizardName[(Math.floor(((Math.random() * ((wizardName.lenght-1) - 0) + minAlpha))*10)/10);] + ' ' + wizardSurname[2];
return wizardName[arrRandom(wizardName)] + ' ' + wizardSurname[arrRandom(wizardSurname)];
}

arrRandom = function (arr) {
  return ((Math.floor(Math.random() *  ((arr.length-1) - 0) + 0)));
}
//console.log(b);
var userDialog = document.querySelector('.setup');
//userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similartlistElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
console.log(similarWizardTemplate);
for (var i=0; i < 4 ; i++){
  var wizardElement = similarWizardTemplate.cloneNode(true);
   wizardElement.querySelector('.setup-similar-label').textContent = namesOfWizzrd();
     wizardElement.querySelector('.wizard-coat').style.fill = coatColor[arrRandom(coatColor)];
     wizardElement.querySelector('.wizard-eyes').style.fill = eyesColor[arrRandom(eyesColor)];
      similartlistElement.appendChild(wizardElement);
//console.log(similartlistElement);
}
// Less 4 Add Event
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupClose = document.querySelector('.setup-close');
var setupOpen = document.querySelector('.setup-open');

var onPopupEscPres = function(evt)  {
 if (evt.keyCode === ESC_KEYCODE){
//  console.log("s");
    closeWindow();
   }
};


 var openWindow = function(){
userDialog.classList.remove('hidden');
document.addEventListener('keydown', onPopupEscPres);
};

var closeWindow = function(){
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown',onPopupEscPres);
}

setupOpen.addEventListener('click', function(){
  openWindow();
});

setupOpen.addEventListener('keydown', function(evt){
   if (evt.keyCode === ENTER_KEYCODE){

    console.log('sds')
    openWindow();
   }
});

setupClose.addEventListener('click', function(){
  closeWindow();
});

setupClose.addEventListener('keydown', function(evt){
  if(evt.keyCode === ENTER_KEYCODE){
    closeWindow();
  }
});

var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var setupFireBallColor = document.querySelector('.setup-fireball-wrap');


var coatColorChange =  function(){
wizardCoat.style.fill = coatColor[arrRandom(coatColor)];
wizardEyes.style.fill = eyesColor[arrRandom(eyesColor)];
}

var btnFillCoat = document.querySelector('.setup-wizard');//.style.fill = coatColor[arrRandom(coatColor)];
btnFillCoat.addEventListener('click', function(){
  coatColorChange();
  //console.log('click');
});

setupFireBallColor.addEventListener('click', function(){
  console.log('hell');
  setupFireBallColor.style.backgroundColor = fireballColor[arrRandom(fireballColor)];
})
