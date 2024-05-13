
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const backupRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/${req.userId}`);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });


backupRouter.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        res.status(200).send('File uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while uploading the file.');
    }
});

backupRouter.get('/list-uploaded-files', (req, res) => {
    let uploaded_files = [];

    fs.readdir(`uploads/${req.userId}`, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        console.log('Files in the root directory:');
        files.forEach(file => {
            uploaded_files.push(file)
        });
        res.json(uploaded_files);
    });
})

backupRouter.get('/download', (req, res) => {
    const file = `uploads/${req.userId}/${req.body.fileName}`;

    fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        res.download(file, (err) => {
            if (err) {
                res.status(500).send('Error downloading file');
            }
        });
    });
});

backupRouter.delete("/delete-file", (req, res) => {
    const file = `uploads/${req.userId}/${req.body.fileName}`;
    console.log(file)
    fs.unlink(file, (err) => {
        if (err) {
            res.status(500).send("Failed to delete file");
            return;
        }
        res.status(200).send("file deleted");
    });
})

backupRouter.delete("/delete-all", (req, res) => {
    const dir_path = `uploads/${req.userId}/`;
    fs.rmdir(dir_path, { recursive: true }, (err) => {
        if (err) {
            res.status(500).send("Failed to delete files");
            return;
        }
        fs.mkdirSync(dir_path)
        res.status(200).send("files deleted");
    });

})


backupRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));
module.exports = backupRouter;
