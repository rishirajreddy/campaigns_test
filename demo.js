const {format} = require('date-fns');
let date = format(new Date(), "dd LLLL");
console.log(date.substring(0, 6));