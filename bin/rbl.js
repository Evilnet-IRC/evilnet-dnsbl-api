#!/usr/bin/env node
var program = require('commander');
var axios = require('axios');
var AxiosResponse = require('axios');
var colors = require('colors');
const package = require('../package.json')


program
.usage('search <ipaddress>');

program.command('search <ipaddress>').description(`Search for IP Address in the EvilNET RBL`).alias('s')
.action((ipaddress)=> {
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    // String with IP address
    const str = `${ipaddress}`;
    
    const ValidatedIP = regexExp.test(str); // true
     if(ValidatedIP === true) {
        console.log("Check for you IP Address Validation...".green);
        console.log("Is a valid IP Address.".yellow);
        const EvilNET = async () => {
             axios.get(`https://api.evilnet.org/rbl/ip/${ipaddress}`)
            .then((rblResults) => { // Show results
                console.log(
                   '', '\n',
                   'Your IP Address got a Match Result in https://dnsbl.evilnet.org | rbl.evilnet.org \n\n'.red,
                   'ID: '.blue ,rblResults.data.id,'\n',
                   'IP Address: '.blue  ,rblResults.data.ipaddress,'\n',
                   'Date Add: '.blue ,rblResults.data.dateadded,'\n',
                   'Reported by: '.blue ,rblResults.data.reportedby,'\n',
                   'Class: '.blue , '[',rblResults.data.iptype,']', rblResults.data.attacknotes,'\n',
                   'Email: '.blue ,rblResults.data.email,'\n',
                   'Location: '.blue ,rblResults.data.location,'\n',
                   '', '\n',
                   'Request Removal:'.red + ' https://dnsbl.evilnet.org/request-removal\n',
                   '', '\n');
            }).catch(function(error) {
               // Get Error
               console.log(`${error.response.data.Message}`.green);
           });
  
        }  
        EvilNET();
     }
     if(ValidatedIP === false) {
        console.log("This is not a valid IPV4 Address. Please Insert a valid IP Address.")
     }
});

// Web IP Search
program.command('web').description(`IP Seach Web Form`).alias('w').action(()=> { console.log("\nIP Seach:".blue + " https://dnsbl.evilnet.org/ip-search\n")});
// Web Request Removal
program.command('request').description(`Request Removal Web Form`).alias('r').action(()=> { console.log("\nRequest Removal:".blue + " https://dnsbl.evilnet.org/request-removal\n")});
// Web Contact US
program.command('contact').description(`Contact US Web Form`).alias('c').action(()=> { console.log("\nContact:".blue + " https://dnsbl.evilnet.org/contact\n")});
program.command('doc').description(`API DOC`).alias('d').action(()=> { console.log("\nAPI DOC:".blue + " https://github.com/Evilnet-IRC/EvilNET-API-Doc\n")});
// EvilNET DNSBL - Version
program.version(package.version);
// EvilNET ARGV
program.parse(process.argv);

