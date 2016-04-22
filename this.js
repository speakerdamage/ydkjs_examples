// Book 3

// 4 'this' binding rules - ch2

// #1: default binding - the call-site is global
function foo() {
  console.log( this.a );
}

var a = 2;

foo(); // 2



// #2: implicit binding - the call-site has a context object
function foo(){
  console.log(this.a);
}

var obj = {
  a: 2,
  foo:foo
};

obj.foo(); // 2
