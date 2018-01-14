window.renderStatistics = function(ctx,names,times){
var gisto = {
  height: 150,
  width: 40,
  padding: 50,
  color: '#1e1ec3',
  Mycolor: 'rgba(255,0,0,1)'
}
//'rgba(256,256,256,1.0)';
// ctx.globalAlpha = 0.5;
ctx.fillStyle ='rgba(0, 0, 0, 0.7)';
//ctx.strokeRect(102, 20, 420, 270);
ctx.fillRect(102, 12, 420, 270);

ctx.fillStyle ='rgba(256,256,256,1.0)';
ctx.strokeRect(100, 10, 420, 270);
ctx.fillRect(100, 10, 420, 270);

ctx.fillStyle ='#333';
ctx.font = '14px PT Mono';
ctx.fillText('Ура вы победили!',120,40);
ctx.fillText('Список результатов:',120,60);

  var percent = times.sort();
 // console.log('sort :' + percent);
  var step = gisto.height / (percent[percent.length-1]);
//console.log('step :' + step);

//var max = 220;
ctx.fillText('Худшее время: ' + percent[1].toFixed(2)*1 + ' У игрока: ' + names[0], 120, 80);
//time = max;
      var posx = 120;
      var p = names.length;
      var minAlpha = 0.3;
      var maxAlpha = 0.9;


      for (var i=0; i<p;i++,  posx+=50){

ctx.globalAlpha = 1;
ctx.fillStyle ='#333';
ctx.font = '14px PT Mono';
ctx.fillText(names[i],posx,100);


         if (names[i] == 'Вы'){
          ctx.globalAlpha = 1;
          ctx.fillStyle = 'red';
         // ctx.fillStyle ='#333';
         // ctx.font = '14px PT Mono';
         // ctx.fillText(names[i],posx,100);
          } else{
            var alphaFill = (Math.floor(((Math.random() * (maxAlpha - minAlpha) + minAlpha))*10)/10);
             ctx.globalAlpha = alphaFill;

          ctx.fillStyle = gisto.color;
        }
        ctx.fillRect(posx, 280, gisto.width, - times[i]*step);
      }
}

