export function reverseForIn(obj, f) {
    var arr = [];
    for (var key in obj) {
      // add hasOwnPropertyCheck if needed
      arr.push(key);
    }
    for (var i=arr.length-1; i>=0; i--) {
      f.call(obj, arr[i]);
    }
  }
