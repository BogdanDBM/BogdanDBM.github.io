
window.renderStatistics = function(ctx,names,times){
//  names = ['kata150','Im251','You352','Max44'];
 // times = [150,251,352,44];
//  console.log(names);
//  console.log(times);
// console.log('input :' + times);
var gisto = {
  height: 120,
  width: 40,
  padding: 50,
  Mycolor: 'rgba(255,0,0,1)'
}
var max = -1;
var maxIndex = -1;
var getMaxElement = function(arr){
for (i=0;i<arr.length;i++){
var time = arr[i];
if (time > max){
  max = time;
  maxIndex = i;
      }
    }
      return max;
};
console.log('out :' + times);
//'rgba(256,256,256,1.0)';
// ctx.globalAlpha = 0.5;
ctx.fillStyle ='rgba(0, 0, 0, 0.7)';
//ctx.strokeRect(102, 20, 420, 270);
ctx.fillRect(112, 20, 420, 270);
ctx.fillStyle ='rgba(256,256,256,1.0)';
ctx.strokeRect(100, 10, 420, 270);
ctx.fillRect(100, 10, 420, 270);

ctx.fillStyle ='#333';
ctx.font = '14px PT Mono';
ctx.fillText('Ура вы победили!',120,40);
ctx.fillText('Список результатов:',120,60);

  var step = (gisto.height / getMaxElement(times));
//console.log(getMaxElement(times));
console.log('max :' + getMaxElement(times));
var textPositionX = 120;
var textPositionY = 80;
//var max = 220;
ctx.fillText('Худшее время: ' +   max.toFixed(2) + ' У игрока: ' + names[maxIndex], textPositionX, textPositionY);
//time = max;
    var posx = 120;
    var p = names.length;
    var minAlpha = 0.3;
    var maxAlpha = 0.9;
      for (var i=0; i<p;i++,  posx+=gisto.padding){
          ctx.globalAlpha = 1;
          ctx.fillStyle ='#333';
          ctx.font = '14px PT Mono';
          ctx.fillText(names[i],posx,textPositionY+20);

         if (names[i] == 'Вы'){
          ctx.fillStyle = 'red';
               } else{
            var alphaFill = (Math.floor(((Math.random() * (maxAlpha - minAlpha) + minAlpha))*10)/10);
           // ctx.globalAlpha = alphaFill;
          ctx.fillStyle = 'rgba(30, 30, 195, '+alphaFill+')';
        }
        ctx.fillRect(posx, 280, gisto.width, - times[i]*step);
      }
}

