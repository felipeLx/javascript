const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({origin: true});
const Busboy = require('busboy');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');
 
const storage = new Storage({
    keyFilename: "register-c34a0-firebase-adminsdk-60ts6-a1fcd1debf.json"
});


// const gcs = require('@google-cloud/storage')(storage);

exports.onFileChange = functions.storage.object().onArchive(event => {
    const object = event.data;
    const bucket = object.bucket;

    async function createBucket() {
        await storage.createBucket(bucket);
        console.log(`Bucket ${bucketName} created.`);
    }

    createBucket().catch(console.error);
    const contentType = object.contentType;
    const filePath = object.name;
    console.log('file change detected, function execution started');
    
    if(object.resourceState === 'not_exists') {
        console.log('we deleted a file, exit...');
        return;
    }

    if(path.basename(filePath).startsWith('resized-')) {
        console.log('we already renamed that file!');
        return;
    }

    const destBucket = storage.createBucket(bucket);
    const tmpFilePath = path.join(os.tempdir(), path.basename(filePath));
    const metadata = { contentType: contentType};
    
    return destBucket
        .file(filePath)
        .download({
            destination: tmpFilePath
        })
        .then(() => {
            return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]);
        })
        .then(() => {
            return destBucket.upload(tmpFilePath, {
                destination: 'resized-' + path.basename(filePath),
                metadata: metadata
            });
        });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
    if(req.method !== 'POST') {
        return res.status(500).json({
            message: 'Not allowed!'
        });
    }
    const busboy = new Busboy({headers: req.headers});
    let uploadData = null;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const filepath = path.join(os.tmpdir(), filename);
        uploadData = { file: filepath, type: mimetype};
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        const bucket = gcs.bucket('register-c34a0.appspot.com')
        bucket.upload(uploadData.file, {
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: uploadData.file
                }
            }
        })
        .then(() => {
            
            res.status(200).json({
                message: 'It worked!'
            });
        })
        .catch(err => {
            err.status(500).json({
                error: err
            });
        });
    });
    busboy.end(req.rawBody);
    });
});