// Book 5, ch3: PROMISES

//first example
function add(xPromise, yPromise) {
    // `Promise.all([ .. ])` takes an array of promises,
    // and returns a new promise that waits on them
    // all to finish
    return Promise.all( [xPromise, yPromise] )

    // when that promise is resolved, let's take the
    // received `X` and `Y` values and add them together.
    .then( function(values){
        // `values` is an array of the messages from the
        // previously resolved promises
        return values[0] + values[1];
    } );
}

// `fetchX()` and `fetchY()` return promises for
// their respective values, which may be ready
// *now* or *later*.
add( fetchX(), fetchY() )

// we get a promise back for the sum of those
// two numbers.
// now we chain-call `then(..)` to wait for the
// resolution of that returned promise.
//success passes first, error second
.then(
  function(sum){
    console.log( sum ); // that was easier!
  },
  // rejection handler
  function(err) {
      console.error( err ); // bummer!
  }
);


// "Promises are an easily repeatable mechanism for encapsulating and composing future values."


p.then( function(){
    p.then( function(){
        console.log( "C" );
    } );
    console.log( "A" );
} );
p.then( function(){
    console.log( "B" );
} );
// A B C


// Promises can have, at most, one resolution value (fulfillment or rejection).

// Trustable Promise
var p = {
    then: function(cb,errcb) {
        cb( 42 );
        errcb( "evil laugh" );
    }
};
// We can pass either of these versions of p to Promise.resolve(..), and we'll get the normalized, safe result we'd expect:
Promise.resolve( p )
.then(
    function fulfilled(val){
        console.log( val ); // 42
    },
    function rejected(err){
        // never gets here
    }
);

/* Can you write async code in JS without trust? Of course you can.
We JS developers have been coding async with nothing but callbacks for nearly two decades.

But once you start questioning just how much you can trust the mechanisms you build upon to
actually be predictable and reliable, you start to realize callbacks have a pretty shaky trust foundation.

Promises are a pattern that augments callbacks with trustable semantics, so that the behavior is more
reason-able and more reliable. By uninverting the inversion of control of callbacks, we place the control
with a trustable system (Promises) that was designed specifically to bring sanity to our async.
*/


// Chaining
var p = Promise.resolve( 21 );

p
.then( function(v){
    console.log( v );   // 21

    // fulfill the chained promise with value `42`
    return v * 2;
} )
// here's the chained promise
.then( function(v){
    console.log( v );   // 42
} );


// even better:
var p = Promise.resolve( 21 );

p.then( function(v){
    console.log( v );   // 21

    // create a promise to return
    return new Promise( function(resolve,reject){
        // introduce asynchrony!
        setTimeout( function(){
            // fulfill with value `42`
            resolve( v * 2 );
        }, 100 );
    } );
} )
.then( function(v){
    // runs after the 100ms delay in the previous step
    console.log( v );   // 42
} );


// To further the chain illustration, let's generalize a delay-Promise creation
// (without resolution messages) into a utility we can reuse for multiple steps:
function delay(time) {
    return new Promise( function(resolve,reject){
        setTimeout( resolve, time );
    } );
}

delay( 100 ) // step 1
.then( function STEP2(){
    console.log( "step 2 (after 100ms)" );
    return delay( 200 );
} )
.then( function STEP3(){
    console.log( "step 3 (after another 200ms)" );
} )
.then( function STEP4(){
    console.log( "step 4 (next Job)" );
    return delay( 50 );
} )
.then( function STEP5(){
    console.log( "step 5 (after another 50ms)" );
} )
...
