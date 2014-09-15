// via http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
     function ab2str(buf) {
       return String.fromCharCode.apply(null, new Uint16Array(buf));
     }
    function str2ab(str) {
       var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
       var bufView = new Uint16Array(buf);
       for (var i=0, strLen=str.length; i<strLen; i++) {
         bufView[i] = str.charCodeAt(i);
       }
       return buf;
     }
   

// https://en.wikipedia.org/wiki/SHA256#Examples_of_SHA-2_variants
var content = str2ab("");
var expected = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
console.log("Expected hex digest:", expected)

crypto.subtle.digest("SHA-256", content).then(function(hash) {
  // hexdigest: ().toString(16) for each
  var hexdigest= "";
  for (var el of hash) {
    hexdigest += (el).toString(16);
  }
  console.log("Hex digest:", hexdigest);
  console.log("equals?", hexdigest===expected)
});
