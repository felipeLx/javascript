const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({origin: true});
const Busboy = require('busboy');
const fs = require('fs');

const gcconfig = {
    projectId: 'register-c34a0',
    keyFilename: "register-c34a0-firebase-adminsdk-60ts6.json"
};

const gcs = require('@google-cloud/storage')(gcconfig);

exports.onFileChange = functions.storage.object().onChange(event => {
    const object = event.data;
    const bucket = object.bucket;
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

    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tempdir(), path.basename(filePath));
    const metadata = { contentType: contentType};
    // eslint-disable-next-line consistent-return
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
    res.status(200).json({
        message: 'It worked!'
    });
});

