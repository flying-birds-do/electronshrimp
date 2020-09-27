const path = require('path');
const fs = require('fs');
const musicListData = [];
const musicImgData = [];
const pathname = __dirname + "/assets/music/";
const pathnameImg = __dirname + "/assets/images/";
fs.readdir(pathname, (err,files) =>{
    for(let i =0;i<files.length;i++) {
        fs.stat(path.join(pathname,files[i]),(err,data)=>{
            if(data.isFile()) {
                musicListData.push(files[i])
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



export  const music = {
    musicListData,
    musicImgData
}  