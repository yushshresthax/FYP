const fs = require('fs');

exports.uploadFile = (image) => {
    return new Promise((resolve, reject) => {
        var ext = image.name.split('.').pop();
        const filename = 'uploads/'+ Date.now()+ image.md5+"."+ext;
        const uploadPath = __dirname + '/public/'+filename;
        console.log(image,uploadPath);
        image.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(filename);
            }
        });
        
    })
}

exports.removeFile=(image)=>{
    return new Promise((resolve, reject) => {
        const uploadPath = __dirname + '/public/'+image;
        fs.unlink(uploadPath, (err) => {
            if (err) {
                reject(err);
            }else{
                resolve(true);
            }
        
        });
        
    });



}