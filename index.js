#! /usr/bin/env node
console.log ("test"); 

// import axios from 'axios'; 

// const root = "https://date.nager.at/api/v3/PublicHolidays/";

// async function getApi(year, countryCode){

//    let response = await axios.get(`${root}{${year}}/{${countryCode}}`)
//     console.log (response); 
// }
// getApi(year, countryCode); 

const program = require('commander');

program
    .version('1.0.0')
    .command('klt')
    .description('Take Country Name as parameter')
    .option('short', 'Country Code') 
    .option('year', 'Gives corresponding holidays')
    .parse(process.argv);

console.log(process.argv);

// const year = process.argv[2];
// const countryCode = process.argv[3];
