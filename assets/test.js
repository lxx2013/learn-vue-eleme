function hash(str, caseSensitive) {
  str = str.toString()
  if (!caseSensitive) {
    str = str.toLowerCase();
  }
  // 1315423911=b'1001110011001111100011010100111'
  var hash = 1315423911, i, ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }
  return (hash & 0x7FFFFFFF) % 900;
}

String.prototype.hashCode = function (caseSensitive) {
  var str = caseSensitive ? this : this.toLowerCase();
  // 1315423911=b'1001110011001111100011010100111'
  var hash = 1315423911, i, ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }
  return (hash & 0x7FFFFFFF);
};


var b = {}
for (var i = 0; i < 900; i++) {
  b[i.toString().hashCode() % 900] = i;
}
console.log(Object.keys(b).length);