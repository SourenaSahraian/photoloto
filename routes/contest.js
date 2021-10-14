const routes = require('express').Router();
const UserModel = require('../models/userModel');
const ContestModel = require('../models/contestModel');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const keys = require('../config/dev');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

const s3 = new AWS.S3({
    accessKeyId: keys.aws.accessKeyId,
    secretAccessKey: keys.aws.secretAccessKey
});

//1 .create a contest

//2.delete a contest , availble to Admins only

//3. photo submission - if a paid user , proceed to submit a photo

//4. lock & archive a contest - could be done automatic , contest becomes read only

//5. as a user see all current and previous submissions 


routes.get('/greetings', (req, res, next) => {
    // just a simple test for testing ingress
    res.send('hail king Soorena');
})

routes.get('/', (req, res, next) => {
    // just a simple test for testing ingress
    res.send('hail king Soorena');
})


routes.post('/', async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    const contest = new ContestModel({
        title,
        description: description,
        startDate,
        endDate,
    });
    const result = await contest.save();
    res.status(201).send('a new contest was created :' + result);

})

routes.get('/upload', currentUser, requireAuth, (req, res) => {
    const userId = req.user.googleId ;
    const key = `${userId}/${uuidv4()}.jpeg`;

    s3.getSignedUrl('putObject', {
        Bucket: 'photo-loto-bucket',
        ContentType: 'image/jpeg',
        Key: key
    }, (err, url) => {
        res.status(200).send({key, url});
    });
});

routes.post('/addSubmision', async (req, res) => {
    // const { contestId, photoUrl, userId } = req.body
    // const userSubmission = {
    //     photoUrl: photoUrl,
    //     user: userId
    // }
    // const contest = await ContestModel.findById(contestId);
    // contest?.userSubmissions?.push(userSubmission)
    // const result = await contest.save();
    // res.send('a new submission was added to the contest :' + result);

    //for testing
     res.status(201).send('a new submission was added to the contest');

})

routes.get('/findAll/user/:userId', async (req, res) => {
    //for one user find all submissions. 
    const result = await ContestModel.find({
        'userSubmissions.user': mongoose.Types.ObjectId(req.params.userId)
    })

    res.status(200).send('a new contest was created :' + result[0].userSubmissions);

})



module.exports = routes;