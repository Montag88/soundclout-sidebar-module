require('newrelic');

const express  = require('express');
const bodyparser = require('body-parser');
// const db = require('../database/index.js');
const cors = require('cors');

const neo = require('../database/neoMethods.js');

const PORT = 3500;

var app = express();
app.use(cors());
app.use(bodyparser());
app.use(express.static(__dirname + '/../client/dist'));

// single get request to get all song info
app.get('/api/tracks', (req, res) => {
    var trackid = Math.floor(Math.random() * 10000000 + 1);
    neo.getTrackInfo(trackid, (err, data) => {
        if(err) {
            // console.log(err);
            res.sendStatus(404);
        }
        res.json(data);
    });
});


// app.get('/userinfo', (req, res) => {
//     db.query('select user_picture_url, username, followers, username_id, user_location from username_info', (err, data) => {
//         if(err){
//             console.log('error: USERINFO NOT SELECTED', err)
//         } else{
//             console.log('/USERINFO SELECTED FROM DB')//
//             res.send(data)
//         }
//     })
    
// })


// app.get('/songinfo', (req, res) => {
//     db.query('select * from song_info', (err, data) => {
//         if(err){
//             console.log('/SONGINFO NOT SELECTED: ', err);
//             res.send('not found')
//         }else{
//             console.log('/SONGINFO SELECTED FROM DB')
//             res.send(data)
//         }
//     })
// })

// app.get('/likes', (req, res) => {
//     db.query('select song_id from song_likes', (err, data) => {
//         if(err){
//             console.log('error')
//         } else{
//             // console.log('songid data', data)
//             res.send(data)
//         }
//     })
// })

// app.get('/solouser', (req, res) => {
//     db.query('select * from username_info', (err, data) => {
//         if(err){
//             console.log('error solo user')
//         } else{
//             res.send(data)
//         }
//     })
// })

app.post('/likePost', (req, res) => {
    // console.log('REQ.BODY', req.body)

    db.query(`insert into song_likes (song_id, username_id) values (${req.body.songId}, ${req.body.usernameId})`, (err, data) => {
        if(err){
            console.log(err)
        }else {
            console.log('LIKE INSERTED INTO DB')
            res.send('done')
        }
    })
})

app.listen(PORT, () => console.log('Express server started on ', PORT));