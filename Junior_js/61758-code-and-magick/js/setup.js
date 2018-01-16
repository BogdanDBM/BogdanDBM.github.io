var wizardName = ['Иван','Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black','red', 'blue', 'yellow', 'green'];

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
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similartlistElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var tex = 'peivet'
for (var i=0; i < 4 ; i++){
  var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = namesOfWizzrd();

     wizardElement.querySelector('.wizard-coat').style.fill = coatColor[arrRandom(coatColor)];
     wizardElement.querySelector('.wizard-eyes').style.fill = eyesColor[arrRandom(eyesColor)];
      similartlistElement.appendChild(wizardElement);
//console.log(similartlistElement);
}
