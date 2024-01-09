const express = require('express')
const multer = require('multer')
const uuid = require('uuid')
const app = express()

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const {originalname} = file;
        cb(null, `${uuid}-${originalname}` )
    }
})

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype.split("/")[0] === 'image/png'){
//         cb(null, true)
//     } else {
//         cb(new Error("the file is not correct"))
//     }
// }

 const upload = multer({
    storage,
   //  fileFilter,
     limits: { fileSize: 1000000000, files: 2}
})
 app.post('/upload', upload.array('image'), (req, res) => {
     res.json({status: 'success'})
 })

app.listen(3000, () => console.log('listening on port 3000'))