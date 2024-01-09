 require("dotenv").config()
const express = require('express')
const multer = require('multer')
const { s3Uploadv2, s3Uploadv3 } = require("./s3Service")
const app = express()

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === "image"){
        cb(null, true)
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}

 const upload = multer({
    storage,
    fileFilter,
     // limits: { fileSize: 10000000, files: 2}
})

// uploading with aws s3 version 2
//  app.post('/upload', upload.array('image'), async(req, res) => {
//    try{
//     const results = await s3Uploadv2(req.files)
//     console.log(results)
//     res.json({status: 'success'})
//    } catch (err) {
//     res.json({status: 'failed to upload image', })
//      console.log(err)
//    }
//  })

// uploading with aws s3 wersion 3
app.post('/upload', upload.array('image'), async(req, res) => {
    try{
     const results = await s3Uploadv3(req.files)
     console.log(results)
     res.json({status: 'success'})
    } catch (err) {
     res.json({status: 'failed to upload image', })
      console.log(err)
    }
  })

 app.use((error, req, res, next) => {
    if(error instanceof multer.MulterError) {
        if (error.code == "LIMIT_FILE_SIZE") {
          return  res.json({message: 'file size too big'})
        }
        if(error.code == "LIMIT_FILE_COUNT"){
          return  res.json({message: 'file limit reached'}) 
        }
        if(error.code == "LIMIT_UNEXPECTED_FILE"){
            return  res.json({message: 'file MUST be of image type'}) 
          }
    }
 })

app.listen(3000, () => console.log('listening on port 3000'))




// UPLOADING IMAGES TO NODE SERVER USING MULTER


// const upload = multer({dest: 'uploads/'})
// app.post('/upload', upload.array('image'), (req, res) => {
//     res.json({status: 'success'})
// })

// multiple fields upload
// const upload = multer({dest: 'uploads/'})
// const multiUpload = upload.fields([{name: "avatar", maxCount: 1},
//  {name: "resume", maxCount: 1}])
// app.post('/upload', upload.array('image'), (req, res) => {
//     res.json({status: 'success'})
// })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         const {originalname} = file;
//         cb(null, `${uuid}-${originalname}` )
//     }
// })
