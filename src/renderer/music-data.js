const path = require('path');
const fs = require('fs');
var ID3 = require('id3_reader')
const musicListData = [];
const musicImgData = [];
const musicWordData = [];
let musicContent = '';
const pathname = __dirname + "/assets/music/";
const pathnameImg = __dirname + "/assets/images/";
const pathnameWord = __dirname + "/assets/musicword/";
fs.readdir(pathname, (err,files) =>{
    for(let i =0;i<files.length;i++) {
        fs.stat(path.join(pathname,files[i]),(err,data)=>{
            if(data.isFile()) {
                musicListData.push(files[i])
                ID3.read(path.join(pathname+musicListData[0]), function(err, data) {
  
                    console.log(err, data);
                  
                  })
                // fs.readFile(path.join(pathname+musicListData[0]) ,'binary',function(err,data){
                    
                //     console.log(data)
                //     console.log('=====12211221')
                // });
            }
        })
    }
})
// 图片
fs.readdir(pathnameImg, (err,files) =>{
    for(let i =0;i<files.length;i++) {
        fs.stat(path.join(pathnameImg,files[i]),(err,data)=>{
            if(data.isFile()) {
                musicImgData.push(files[i])
            }
        })
    }
})
// 歌词
fs.readdir(pathnameWord, (err,files) =>{
    for(let i =0;i<files.length;i++) {
        fs.stat(path.join(pathnameWord,files[i]),(err,data)=>{
            if(data.isFile()) {
                musicWordData.push(files[i])
                fs.readFile(path.join(pathnameWord+musicWordData[0]) ,function(err,data){
                        musicContent = data.toString();
                        console.log('=====')
                    });
                
            }
        })
    }
})
        // let path1 = require("@/assets/musicword/" +musicWordData[0]);
        
        
export  const music = {
    musicListData,
    musicImgData,
    musicWordData,
    musicContent
}  