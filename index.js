//https://github.com/broderickhyman/ao-bin-dumps/blob/master/formatted/items.txt


//ClientID
//667247632896-917pdp6n1i60lvlrp5gltu6o2bt0ilb2.apps.googleusercontent.com
//Client Secret
//FDQZWZtmG0SjfZRXXC-pNx4e
//API key
//AIzaSyB9D8iwaPEH1ZBlCjZrKPv2IvqFovDC894
var ffmpeg = require('ffmpeg');
const {Client,RichEmbed,Util} = require('discord.js');
const Request = require("request");
const fetch = require('node-fetch');
const { prefix, token,gat}=require('./config.json');
const PREFIX = '%';
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const moment = require('moment');
const client = new Client();

const youtube = new YouTube(gat);

const queue = new Map();


client.once('ready',()=>{
  console.log(`aehooo ${client.user.tag}`)
});

//CLOTH, LEATHER, PLATE
var tiers = ["4","5","6","7","8"];
var tiersc = ["2","3","4","5","6","7","8"];
var offs = ["SHIELD","SHIELD_HELL","SPIKEDSHIELD_MORGANA","TOWERSHIELD_UNDEAD","BOOK","ORB_MORGANA","DEMONSKULL_HELL","TOTEM_KEEPER","TORCH","HORN_KEEPER","JESTERCANE_HELL","LAMP_UNDEAD"];
var setsCoi = ["CLOTH","LEATHER","PLATE"];
var setT = ["ARMOR","SHOES","HEAD"];
var setN = ["1","2","3"];
var capasN = ["","ITEM_DEMON","ITEM_KEEPER","ITEM_HERETIC","ITEM_UNDEAD","ITEM_MORGANA","ITEM_FW_BRIDGEWATCH","ITEM_FW_FORTSTERLING","ITEM_FW_LYMHURST","ITEM_FW_THETFORD"];
var melees = ["MAIN_DAGGER","2H_DAGGERPAIR","2H_CLAWPAIR","MAIN_RAPIER_MORGANA","2H_IRONGAUNTLETS_HELL","2H_DUALSICKLE_UNDEAD","MAIN SPEAR","2H_SPEAR","2H_GLAIVE","MAIN_SPEAR_KEEPER","2H_HARPOON_HELL","2H_TRIDENT_UNDEAD","MAIN_AXE","2H_AXE","2H_HALBERD","2H_HALBERD_MORGANA","2H_SCYTHE_HELL","2H_DUALAXE_KEEPER","MAIN_SWORD","2H_CLAYMORE","2H_DUALSWORD","MAIN_SCIMITAR_MORGANA","2H_CLEAVER_HELL","2H_DUALSCIMITAR_UNDEAD","QUARTERSTAFF","IRONCLADSTAFF","DOUBLEBLADESTAFF","COMBATSTAFF_MORGANA","TWINSCYTHE_HELL","ROCKSTAFF_KEEPER","MAIN_HAMMER","2H_POLEHAMMER","2H_HAMMER","2H_HAMMER_UNDEAD","2H_DUALHAMMER_HELL","2H_RAM_KEEPER","MAIN_MACE","2H_MACE","2H_FLAIL","MAIN_ROCKMACE_KEEPER","MAIN_MACE_HELL","2H_MACE_MORGANA"];
var rangeds = ["2H_BOW","2H_WARBOW","2H_LONGBOW","2H_LONGBOW_UNDEAD","2H_BOW_HELL","2H_BOW_KEEPER","2H_CROSSBOW","2H_CROSSBOWLARGE","MAIN_1HCROSSBOW","2H_REPEATINGCROSSBOW_UNDEAD","2H_DUALCROSSBOW_HELL","2H_CROSSBOWLARGE_MORGANA"];
var magic = ["MAIN_CURSEDSTAFF","2H_CURSEDSTAFF","2H_DEMONICSTAFF","MAIN_CURSEDSTAFF_UNDEAD","2H_SKULLORB_HELL","2H_CURSEDSTAFF_MORGANA","MAIN_FIRESTAFF","2H_FIRESTAFF","2H_INFERNOSTAFF","MAIN_FIRESTAFF_KEEPER","2H_FIRESTAFF_HELL","2H_INFERNOSTAFF_MORGANA","MAIN_FROSTSTAFF","2H_FROSTSTAFF","2H_GLACIALSTAFF","MAIN_FROSTSTAFF_KEEPER","2H_ICEGAUNTLETS_HELL","ICECRYSTAL_UNDEAD","MAIN_ARCANESTAFF","2H_ARCANESTAFF","2H_ENIGMATICSTAFF","MAIN_ARCANESTAFF_UNDEAD","2H_ARCANESTAFF_HELL","2H_ENIGMATICORB_MORGANA","MAIN_HOLYSTAFF","2H_HOLYSTAFF","2H_DIVINESTAFF","MAIN_HOLYSTAFF_MORGANA","2H_HOLYSTAFF_HELL","2H_HOLYSTAFF_UNDEAD","MAIN_NATURESTAFF","2H_NATURESTAFF","2H_WILDSTAFF","MAIN_NATURESTAFF_KEEPER","2H_NATURESTAFF_HELL","2H_NATURESTAFF_KEEPER"];
var enchants = ['','@1','@2','@3'];
var itens = new Array();
var taxa=0.97;
var anao=100;

function getData(uri){
  return new Promise((resolve, reject) => {
    request.get(uri, (err, res, body) => {
     if(err || res.statusCode !== 200 ) {
       reject(handleErr(err));
     } else {
       resolve(body);
     }
   });
 });
}

async function impOFF(messag,ti=""){
  var itensOFF = [];
    tiers.forEach(tier =>{
      offs.forEach(off=>{
        itensOFF.push("T".concat(tier,"_","OFF_",off,ti));
      });
    });
    var ids = concatena(itensOFF);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=1");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Offhands ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
    messag.channel.send(embed);
}

async function impSETS(messag,ti=""){
   var itensSET = [];
    for(t of tiers){
      for(se of setsCoi){
        for(tip of setT){
          for(num of setN){
            itensSET.push("T".concat(t,"_",tip,"_",se,"_SET",num,ti));
          }
        }
      }
    }
    var ids = concatena(itensSET);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=1");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    switch(imprime.length){
      case 0:
        imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`SETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
        break;
      case 1:
        if(imprime[0].length==0){
          imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        }
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`SETS ${ti} 1p`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0])
        break;
      case 2:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`SETS ${ti} 2p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
        break;
      case 3:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`SETS ${ti} 3p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])     
            .addField("Parte 3:",imprime[2])      
        break;
      case 4:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`SETS ${ti} 4p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
        break;
    }
    messag.channel.send(embed);
}

async function impCAPAS(messag,ti=""){
  var itensCAPA = [];
    for(t of tiersc){
      for(n of capasN){
        itensCAPA.push("T".concat(t,"_CAPE",n,ti))
      }
    }
    var ids = concatena(itensCAPA);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=1");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Capas ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);

    messag.channel.send(embed);
}

async function impMELEES(messag,ti=""){
  var itensMEL = [];
    for(t of tiers){
      for(me of melees){
        itensMEL.push("T".concat(t,"_",me,ti));
      }
    }
    var ids = concatena(itensMEL);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=1");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    switch(imprime.length){
      case 0:
        imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`SETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
        break;
      case 1:
        if(imprime[0].length==0){
          imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        }
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 1p`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0])
        break;
      case 2:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 2p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
        break;
      case 3:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 3p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])     
            .addField("Parte 3:",imprime[2])      
        break;
      case 4:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 4p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
        break;
      case 5:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 5p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
            .addField("Parte 5:",imprime[4])
        break;
    }
    messag.channel.send(embed);
}

async function impRANG(messag,ti=""){
  var itensMEL = [];
    for(t of tiers){
      for(me of rangeds){
        itensMEL.push("T".concat(t,"_",me,ti));
      }
    }
    var ids = concatena(itensMEL);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=1");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Rangeds ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);

    messag.channel.send(embed);
}

async function impMAGI(messag,ti=""){
  var itensMEL = [];
    for(t of tiers){
      for(me of magic){
        itensMEL.push("T".concat(t,"_",me,ti));
      }
    }
    var ids = concatena(itensMEL);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=1");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    switch(imprime.length){
      case 0:
        imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Magics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
        break;
      case 1:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Magics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
        break;
      case 2:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Magics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
        break;
      case 3:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Magics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])     
            .addField("Parte 3:",imprime[2])      
        break;
      case 4:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`(o leo eh bobo) Magics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
        break;
       case 5:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`Magics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
            .addField("Parte 5:",imprime[4])
        break; 
    }
    messag.channel.send(embed);
}

async function gimpOFF(messag,ti=""){
  var itensOFF = [];
    tiers.forEach(tier =>{
      offs.forEach(off=>{
        itensOFF.push("T".concat(tier,"_","OFF_",off,ti));
      });
    });
    var ids = concatena(itensOFF);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=2");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gOffhands ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
    messag.channel.send(embed);
}

async function gimpSETS(messag,ti=""){
   var itensSET = [];
    for(t of tiers){
      for(se of setsCoi){
        for(tip of setT){
          for(num of setN){
            itensSET.push("T".concat(t,"_",tip,"_",se,"_SET",num,ti));
          }
        }
      }
    }
    var ids = concatena(itensSET);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=2");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    switch(imprime.length){
      case 0:
        imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gSETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
        break;
      case 1:
        if(imprime[0].length==0){
          imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        }
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gSETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0])
        break;
      case 2:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gSETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
        break;
      case 3:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gSETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])     
            .addField("Parte 3:",imprime[2])      
        break;
      case 4:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gSETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
        break;
    }
    messag.channel.send(embed);
}

async function gimpCAPAS(messag,ti=""){
  var itensCAPA = [];
    for(t of tiersc){
      for(n of capasN){
        itensCAPA.push("T".concat(t,"_CAPE",n,ti))
      }
    }
    var ids = concatena(itensCAPA);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=2");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gCapas ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);

    messag.channel.send(embed);
}

async function gimpMELEES(messag,ti=""){
  var itensMEL = [];
    for(t of tiers){
      for(me of melees){
        itensMEL.push("T".concat(t,"_",me,ti));
      }
    }
    var ids = concatena(itensMEL);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=2");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    switch(imprime.length){
      case 0:
        imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`SETS ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
        break;
      case 1:
        if(imprime[0].length==0){
          imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        }
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 1p`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0])
        break;
      case 2:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 2p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
        break;
      case 3:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 3p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])     
            .addField("Parte 3:",imprime[2])      
        break;
      case 4:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 4p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
        break;
      case 5:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`MELEES ${ti} 5p`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])      
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
            .addField("Parte 5:",imprime[4])
        break;
    }
    messag.channel.send(embed);
}

async function gimpRANG(messag,ti=""){
  var itensMEL = [];
    for(t of tiers){
      for(me of rangeds){
        itensMEL.push("T".concat(t,"_",me,ti));
      }
    }
    var ids = concatena(itensMEL);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=2");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    if(imprime[0].length==0){
      imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
    }
    var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gRangeds ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);

    messag.channel.send(embed);
}

async function gimpMAGI(messag,ti=""){
  var itensMEL = [];
    for(t of tiers){
      for(me of magic){
        itensMEL.push("T".concat(t,"_",me,ti));
      }
    }
    var ids = concatena(itensMEL);
    var url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market,Caerleon&qualities=2");
    const a=await fetch(url);
    const b = await a.json();
    console.log(b);
    var imprime= await achaLucro(b);
    switch(imprime.length){
      case 0:
        imprime[0] = "Não achei nada dessa vez, perdão pelo vascislow";
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gMagics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Possibilidades:",imprime[0]);
        break;
      case 1:
        if(imprime[0].length==0){
          imprime[0]="mamou"
        }
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gMagics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
        break;
      case 2:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gMagics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
        break;
      case 3:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gMagics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])     
            .addField("Parte 3:",imprime[2])      
        break;
      case 4:
        var embed = new RichEmbed()
            .setColor('#EFFF00')
            .setTitle(`gMagics ${ti}`)
            .setURL('http://xvideos.com')
            .addField("Parte 1:",imprime[0])
            .addField("Parte 2:",imprime[1])           
            .addField("Parte 3:",imprime[2])
            .addField("Parte 4:",imprime[3])
        break;
    }
    messag.channel.send(embed);
}
//ALBION STUFF
client.on('message',async messag=>{
  if(messag.author.bot) return;
  if(messag.content.indexOf(prefix) !== 0) return;
  const args = messag.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  var url;
  if(command == "delete"){
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return messag.reply("Da um valor entre 2 e 100 ai pls");

    const fetched = await messag.channel.fetchMessages({limit: deleteCount});
    messag.channel.bulkDelete(fetched)
      .catch(error => messag.reply(`N deu pra deletar pq: ${error}`));
  }else if(command == "quem"){
    messag.reply("Te pergunto alguma coisa?")
  }else if(command == "offs"){
    impOFF(messag,args);
  }else if(command == "sets"){
    impSETS(messag,args);
  }else if(command == "cato"){
    const {file}=await fetch('https://aws.random.cat/meow').then(response => response.json());

	  messag.channel.send(file);
  }else if(command == "dogo"){
    const {message}=await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());
    console.log(message);
	  messag.channel.send(message);
  }else if(command == "capas"){
    impCAPAS(messag,args); 
  }else if(command == "melees"){
    impMELEES(messag,args);
  }else if(command == "rangeds"){
    impRANG(messag,args);
  }else if(command == "magics"){
    impMAGI(messag,args);
  }else if(command == "goffs"){
    gimpOFF(messag,args);
  }else if(command == "gsets"){
    gimpSETS(messag,args);
  }else if(command == "gcapas"){
    gimpCAPAS(messag,args); 
  }else if(command == "gmelees"){
    gimpMELEES(messag,args);
  }else if(command == "grangeds"){
    gimpRANG(messag,args);
  }else if(command == "gmagics"){
    gimpMAGI(messag,args);
  }else if(command == "tudao"){
    let a = await impSETS(messag);
    let ab = await impMELEES(messag);
    let ac = await impMAGI(messag);
    let ad = await impRANG(messag);
    let ae = await impOFF(messag);
    let af = await impCAPAS(messag);
  }else if(command == "gtudao"){
    let a = await gimpSETS(messag);
    let ab = await gimpMELEES(messag);
    let ac = await gimpMAGI(messag);
    let ad = await gimpRANG(messag);
    let ae = await gimpOFF(messag);
    let af = await gimpCAPAS(messag);
  }else if(command == "taxa"){
    taxa=1-args/100;
    messag.channel.send(`Botei uma taxa de ${args/100} no calculo do lucro`)
  }else if(command == "anao"){
    anao = args;
    messag.channel.send(`Botei um lucro minimo de ${anao} silvers, pq o leo é preguiçoso.`)
  }else if(command == "helmEnchant"){//AINDA NAO ACABEI ESSE COMANDO
    var qtd=24;
    url="https://www.albion-online-data.com/api/v2/stats/prices/T4_RUNE?locations=Caerleon&qualities=1";
    const p=fetch(url);
    const q=p.json();
    var preco=q.sell_price_min;
    var custo=qtd*(preco);
    var enchIt = [];
    for(se of setsCoi){
      for(n of setN){
        enchIt.push("T4_HEAD".concat(se,"_SET"),n,"@1");
      }
    }
    var ids=concatena(enchIt);
    url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Black%20Market&qualities=1");
    const r=await fetch(url);
    const compraBM=await r.json();
    //NO COMPRABM TEM TODOS OS PREÇOS DE COMPRA DO BM DOS @1
    var iT = [];
    for(se of setsCoi){
      for(n of setN){
        enchIt.push("T4_HEAD".concat(se,"_SET"),n);
      }
    }
    var ids=concatena(iT);
    url="https://www.albion-online-data.com/api/v2/stats/prices/".concat(ids,"?locations=Caerleon&qualities=1");
    const s=fetch(url);
    const vendaM=s.json();
    //NO VENDAM TEM TODOS OS PRECOS DE VENDA DO MERCADO DOS @0

  }

});
//MUSIC STUFF
client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('c tem q ta num canal de voz vei');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('N consigo entrar nesse canal ai n, confere minhas permissoes');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('N consigo falar nesse canal ai n, confere minhas permissoes');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** foi pra fila!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Seleção da música:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Dá um valor de 1 a 10 ai.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('Coiso invalido. ajuda ai.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 Achei esses trem n.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('Cê n ta num canal de voz, zé');
		if (!serverQueue) return msg.channel.send('Tem nada q dá pra pular pce n');
		serverQueue.connection.dispatcher.end('Bora de next então!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('Cê nao tá em canal de voz, zé');
		if (!serverQueue) return msg.channel.send('Tem nada pra parar doidão');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Tá parado então');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('cê não tá num canal de voz, zé!');
		if (!serverQueue) return msg.channel.send('cê tá ouvindo coisa q nao existe...');
		if (!args[1]) return msg.channel.send(`O volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Alterou o volume para: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('cê tá ouvindo espirito maluco');
		return msg.channel.send(`🎶 Tá tocando: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('Tem nada na fila');
		return msg.channel.send(`
__**Fila:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Tocando agora:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Pausei esse negoço!');
		}
		return msg.channel.send('Tem nada tocano.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ continuei a musica!');
		}
		return msg.channel.send('cê tá locão, ctz.');
	}

	return undefined;
});

function concatena(items){
  var ids = "";
    for(it of items){
      ids+=it;
      ids+=",";
    }
    var t=ids.length;
    ids=ids.substr(0,t-1);
    return ids;
}

async function achaLucro(b){
  var stringFinal = "",tstringFinal="",t1="",t2="",t3="";
  var i=0;
  var t;
  var now=moment();
  try{
      while(b[i]){
      if(b[i].item_id!=b[i+1].item_id){
        i++;
        continue;
      }
      //console.log(`comparando ${(b[i].buy_price_max*taxa).toFixed(2)} com ${b[i+1].sell_price_min}`)
      if(b[i].buy_price_max*taxa-b[i+1].sell_price_min>=anao){
        console.log(`comparando ${(b[i].buy_price_max*taxa).toFixed(2)} com ${b[i+1].sell_price_min} e viu que deu lucro maior que ${anao}`)
        const dados = await fetch("https://gameinfo.albiononline.com/api/gameinfo/items/".concat(b[i].item_id,"/data"));
        const dadosJ = await dados.json();
        var nome = dadosJ.localizedNames["EN-US"];
        tstringFinal=nome;
        tstringFinal+=" -\t".concat(b[i].city);
        t=now.diff(moment(new Date(b[i].buy_price_min_date)),'minutes');
        tstringFinal+=" (".concat(t," Min)");
        tstringFinal+=":\t";
        tstringFinal+=b[i].buy_price_max;
        tstringFinal+="\t".concat(b[i+1].city);
        t=now.diff(moment(new Date(b[i+1].sell_price_max_date)),'minutes');
        tstringFinal+=" (".concat(t," Min)");
        tstringFinal+=":\t";
        tstringFinal+=b[i+1].sell_price_min;
        tstringFinal+="\tLucro: ";
        tstringFinal+=(b[i].buy_price_max*taxa-b[i+1].sell_price_min).toFixed(2);
        tstringFinal+="\n";
        if(t>9000){
          tstringFinal=nome+" it's over 9000 minutes away.\n"
        }
        if(stringFinal.length+tstringFinal.length<1024){
          stringFinal+=tstringFinal;
        }else if(t1.length==0){
          t1=stringFinal;
          stringFinal=tstringFinal;
        }else if(t2.length==0){
          t2=stringFinal;
          stringFinal=tstringFinal;
        }else if(t3.length==0){
          t3=stringFinal;
          stringFinal=tstringFinal;
        }
      }
      i+=2;
    }
  }catch(error){
    console.log(error);
  }
  //console.log(stringFinal);
  if(t1==""){
    return [stringFinal];
  }else if(t2==""){
    return [t1,stringFinal]
  }else if(t3==""){
    return [t1,t2,stringFinal]
  }else
    return [t1,t2,t3,stringFinal];
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Vai tocar: **${song.title}**`);
}

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`N deu pra joinar o canal: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`N deu pra joinar o canal: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** botada na fila`);
	}
	return undefined;
}




client.login(token);