const express = require('express');
const dotenv = require('dotenv');
const multer = require ('multer');
const path = require ('path');

dotenv.config();
const app =express();

//*****   storage *******/
//cb :> call back
const storage = multer.diskStorage({
    destination: './upload',
    filename:  (req, file, cb) => {

        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)

    }})

//*** uploader ***//

  const upload = multer({
      storage,
        limits:{filSize: 1024 * 1024 * 5},
        fileFilter:(req, file, cb)=>{
            const acceptedFormats = /jpg|png|gif|jpeg/ ;
            const fileExt = acceptedFormats.test(path.extname(file.originalname).toLowerCase())
            const fileMime = acceptedFormats.test(file.mimetype)

            if (fileExt && fileMime){
                cb(null, true)
            }else{
                cb ('invalid image type', false)
            }

        }

    }).single('image')

    app.post('/upload', (req, res)=>{
        upload(req, res, (err)=>{
            if(err){
                return res.json({msg:"Image could not be uploaded", error: err})
            }
            //res.json(req.file);
          upload (req.file, {
                effect : "overlay",
                overlay :"image-1632084268883.png",
                radius : "max",
                width : 150,
                height : 150,
                opacity : 100,
                crop : "scale"
            })
                res.json(req.file);

        })

    })






const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log( `Server running on port ${port} `)
});