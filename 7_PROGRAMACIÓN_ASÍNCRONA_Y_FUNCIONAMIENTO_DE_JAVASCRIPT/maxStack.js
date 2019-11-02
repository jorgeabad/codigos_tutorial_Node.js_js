
function maxCallStack() {
        try {
            return 1 + maxCallStack();
        } catch (e) {
            // Desbordamiento de la pila de llamadas
            return 1;
        }
    }
console.log(maxCallStack());

/*
function foo(){
  return 1 +foo();

}
console.log(foo());*/
