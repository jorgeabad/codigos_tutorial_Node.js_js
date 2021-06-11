//---------------------------------- |->E.L global--->null
//                                   |   f1:function
//                                   |   f2:function
let v = 1;                         //|   v:1
function f1() {//--|->E.L f1-------->|
  console.log(v);//|  (vacio)        |
};//---------------|                 |
function f2() {//------ |->E.L f2--->|
  let v = 2;          //|  v:2       |
  console.log('f2',v);//             |
  f1();               //|            |
};//------------------- |            |
v=10                               //|   v:10
f2();//*                             |
v=7;                               //|   v:7
f2();//**                            |
//---------------------------------- |
/*
f2()//*  imprime:  f2 2
                   10
f2()//** imprime:  f2 2
                   7
*/

//---------------------------------------------------- |->E.L global
function incremento () {//--------|->E.L incremento--->|  incremento:function
    let cnt = 0;//                  |      cnt:0         |  contador:function
    return function() {//--|->E.L-->|                    |  contador2:function
      return cnt++; //     | vacío  |                    |  cnt:5
    };//-------------------|        |                    |
  }//------------------------------ |                    |
  let cnt=5;//                                           |
  let contador = incremento();//cnt=0 E.L incremento     |
  let contador2 = incremento();//cnt=0 E.L incremento''  |
  console.log( contador() ); // 0 E.L incremento         |
  console.log( contador() ); // 1 E.L incremento         |
  console.log( contador() ); // 2 E.L incremento         |
  console.log( contador2() ); // 0 E.L incremento''      |
  //---------------------------------------------------- | 

//---------------------------------------------------- |->E.L global
function incremento2 () {//-------|->E.L incremento2-->|  incremento2:function
    //let cnt_ = 0                   |      vacío         |  contador:function
    return function() {//--|->E.L-->|                    |  contador2:function
      return cnt_++; //     | vacío |                    |  cnt_:5
    };//-------------------|        |                    |
  }//------------------------------ |                    |
  let cnt_=5;//                                          |
  let contador_ = incremento2();//cnt_=0 E.L global      |
  let contador2_ = incremento2();//cnt_=0 E.L global     |
  console.log( contador_() ); // 5 E.L global            |
  console.log( contador_() ); // 6 E.L global            |
  console.log( contador_() ); // 7 E.L global            |
  console.log( contador2_() ); // 8 E.L global           |
  //---------------------------------------------------- |

  function vectorFunciones() {//--------------------------------|->E.LvectorFuciones
    let vector = [];//                                          |   vector:[]
    let i = 0;//                                                |    i:0
    while (i < 10) {//--------------------------|->E.L While--->|
    //                                          | func:function |
      let func = function() {//--|->E.L func--->|               |
        // func -> function      |   vacío      |               |
        console.log(i);//        |              |               |
      };//---------------------- |              |               |
      vector.push(func);//                      |               |
      i++;//                                    |               |
    }//---------------------------------------- |               |    i:10
    return vector;//                                            |
  }//---------------------------------------------------------- |
  let miVector = vectorFunciones();
  console.log(miVector);
  miVector[1](); //10
  miVector[3](); //10

  function vectorFunciones2() {//-------------------------------|->E.LvectorFuciones
    let vector = [];//                                          |   vector:[]
    let i = 0;//                                                |    i:0
    while (i < 10) {//--------------------------|->E.L While--->|
      let j = i;//                              | func:function |
      let func = function() {//--|->E.L func--->| j:i (0..10)   |
        // func -> function      |   vacío      |               |
        console.log(j);//        |              |               |
      };//---------------------- |              |               |
      vector.push(func);//                      |               |
      i++;//                                    |               |
    }//---------------------------------------- |               |    i:10
    return vector;//                                            |
  }//---------------------------------------------------------- |
  let miVector2 = vectorFunciones2();
  console.log(miVector2);
  miVector2[1](); //1
  miVector2[3](); //3

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