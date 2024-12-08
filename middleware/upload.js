const multer = require('multer');
const path = require('path');
const fs = require('fs');


const checkUploadsDir = () => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir); 
    }
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        checkUploadsDir(); 
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
});


function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;
