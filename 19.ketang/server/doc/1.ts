var validator = require('validator');

let result = validator.isEmail('foo@bar.com'); //=> true
console.log(result);

