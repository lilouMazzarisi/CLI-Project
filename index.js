#! /usr/bin/env node
import axios from 'axios';
import chalk from 'chalk';
import {getCode, getName} from 'country-list'; 

const HolidaysAPIurl = "https://date.nager.at/api/v3/PublicHolidays/";

const fetchAllHolidays = async (year,countryCode) =>{
    const response = await axios.get(`${HolidaysAPIurl}${year}/${countryCode}`)
    // console.log(response);
    return response.data;
}

console.log (chalk.green('test')); 
// TRANSFORM SECOND ARGUMENT TO COUNTRY CODE


async function Holidaysloop(year,countryCode){

    const HolidaysData = await fetchAllHolidays(year,countryCode);
    for (const holiday of HolidaysData) {
        let name = holiday.name;
        let date = holiday.date;   
        let display = date + ":" + name
        console.log(display); 
    }
}
   
// console.log(fetchAllHolidays(year,countryCode));

const displayHolidays = async () => {
    try{
        let countryCode = getCode(process.argv[2]); 
        const currentYear = new Date().getFullYear();
        if(process.argv.length === 3){
            
            Holidaysloop(currentYear,countryCode);
            
        }else{
            let givenYear = process.argv[3]; 
            Holidaysloop(givenYear,countryCode);
        }
    
        // console.log(HolidaysData.length);
        // return(HolidaysData.name + HolidaysData.date);
    }
    catch(error){
                console.log("NOOO");
    }
}

displayHolidays();

