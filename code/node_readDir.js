/**
 * node读取某一文件夹下的以.js结尾的文件名
 */

var fs = require('fs');
var localDir = '/58fe/workspace/fcm_pc/data';

var nameArr=[];

function checkSuffixJs(str) {
    var strRegex = "(.js)$"; //用于片扩展名的正则表达式
    var re=new RegExp(strRegex);
    if (re.test(str.toLowerCase())){
        return true;
    } else{
        return false;
    }
}

fs.exists(localDir,function(exists){
    if(!exists){
        console.log("文件或目录不存在!");
        return;
    }
    fs.stat(localDir,function(err,stats){
        if(err){
            console.log("查看文件与目录的信息失败!");
        }
        if(stats.isDirectory()){
            fs.readdir(localDir,function(err,files){
                if(err){
                    console.log("读取文件失败");
                    return;
                }

                files.forEach(function(item,index) {

                    var tmpPath = localDir + '/' + item;
                    fs.stat(tmpPath, function(err1, stats1) {
                        if (err1) {
                            console.log("读取文件失败");
                        } else {
                            if (!stats1.isDirectory() && checkSuffixJs(item)) {
                                var regJs = /.js$/;
                                var fileName=item.replace(regJs,'');
                                var strRegex = "v1$"; //用于片扩展名的正则表达式
                                var re=new RegExp(strRegex);
                                if (!re.test(fileName.toLowerCase())){
                                    nameArr.push("\""+fileName+"\"");
                                }
                            }
                            if(files.length==(index+1)){
                                console.log(nameArr.length+" "+nameArr);
                            }
                        }
                    });
                });
            });
        }
    });
});
