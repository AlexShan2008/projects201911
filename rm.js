let fs = require('fs');
let path = require('path');
let rimraf = require('rimraf');
let current = process.cwd();
fs.readdirSync(current).forEach(file=>{
      let child = path.join(current,file,'node_modules');
      try{
	  let stat = fs.statSync(child);
	      if(stat.isDirectory()){
	         rimraf(child,fs,(err)=>{if(err){console.error(err)}else{console.error(child)}});
	      }
      }catch(e){
      	  }
    
  });