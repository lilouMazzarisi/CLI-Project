#! /usr/bin/env node
import axios from 'axios';
import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';
import {getCode, getName} from 'country-list'; 

const HolidaysAPIurl = "https://date.nager.at/api/v3/PublicHolidays/";

const fetchAllHolidays = async (year,countryCode) =>{
    const response = await axios.get(`${HolidaysAPIurl}${year}/${countryCode}`)
    // console.log(response);
    return response.data;
}

//PUT "HOLIDAYS" BEFORE DATA 
function callText(){
    return console.log(figlet.textSync('Holidays', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }));
}





//LOADING SPINNER 
const spinner = ora('Loading \n \n').start()
spinner.color = 'blue';
spinner.interval; 

async function Holidaysloop(year,countryCode){

    const HolidaysData = await fetchAllHolidays(year,countryCode);
    spinner.succeed('The holidays for the current year are : \n')
    for (const holiday of HolidaysData) {
        let name = chalk.yellow(holiday.name);
        let date = chalk.blue(holiday.date);  
        let localName = chalk.magenta(holiday.localName); 
        let display = date + ": " + name.padEnd(38) + " aka ".padEnd(8) + localName
        console.log(display); 
    }
}
   
// console.log(fetchAllHolidays(year,countryCode));

const displayHolidays = async () => {
    try{
        let countryCode = getCode(process.argv[2]); 
        const currentYear = new Date().getFullYear();
        callText();
        
        if(process.argv.length === 3){
            Holidaysloop(currentYear,countryCode);            
        }else{
            let givenYear = process.argv[3]; 
            Holidaysloop(givenYear,countryCode);
        }
    }
    catch(error){
        spinner.fail('There was an issue with your input');
    }
}

displayHolidays();



