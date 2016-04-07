// From book 2, ch. 5
/* MONEY QUOTE: "Closure is when a function can remember and access its lexical
scope even when it's invoked outside its lexical scope." */


/* Modules require two characteristics:
1) outer wrapping function being invoked, to create the enclosing scope
2) return value of the wrapping function must include reference to at least one
inner function that then has closure over the private inner scope of the wrapper. */

// Revealing Module
function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log( something );
    }

    function doAnother() {
        console.log( another.join( " ! " ) );
    }

    return { //returns an object (which can be thought of as a public API)
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = CoolModule(); //can be called multiple times, each time creating a new module instance

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3




//same base module, only IIFE
var foo = (function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log( something );
    }

    function doAnother() {
        console.log( another.join( " ! " ) );
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})(); //invoked immediately, only used once

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3




// slight variation, returning public API
var foo = (function CoolModule(id) {
    function change() {
        // modifying the public API
        publicAPI.identify = identify2;
    }

    function identify1() {
        console.log( id );
    }

    function identify2() {
        console.log( id.toUpperCase() );
    }

    var publicAPI = {
        change: change,
        identify: identify1
    };

    return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
