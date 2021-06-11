function asincronaA() {
  let i = 1;
  while (i < 10) {
   setTimeout(function(){
     console.log('asincrona_A '+i);
   },(i*1000))            
    i++;                                 
  }                                  
}
asincronaA();

/*
Cada segundo imprime "asincrona_A 10":
'asincrona_A 10'
'asincrona_A 10'
'asincrona_A 10'
'asincrona_A 10'
'asincrona_A 10'
'asincrona_A 10'
'asincrona_A 10'
'asincrona_A 10'
'asincrona_A 10'
*/


function asincronaB() {
  let i = 1;
  while (i < 10) {
   (function(j){
     setTimeout(function() {
        console.log('asincrona_B '+j);
     }, j*1000);
   })(i)          
  i++;                                   
  }                                  
}
asincronaB();
/*
Cada segundo imprime "asincrona_B n":
'asincrona_B 1'
'asincrona_B 2'
'asincrona_B 3'
'asincrona_B 4'
'asincrona_B 5'
'asincrona_B 6'
'asincrona_B 7'
'asincrona_B 8'
'asincrona_B 9'*/

function asincronaC() {
  let i = 1;
  while (i < 10) {
    let j = i;
   setTimeout(function(){
     console.log('asincrona_C '+j);
   },(j*1000))            
    i++;                                  
  }                                  
}
asincronaC();

/*
Cada segundo imprime "asincrona_C n":
'asincrona_C 1'
'asincrona_C 2'
'asincrona_C 3'
'asincrona_C 4'
'asincrona_C 5'
'asincrona_C 6'
'asincrona_C 7'
'asincrona_C 8'
'asincrona_C 9'*/