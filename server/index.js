const express  = require('express');
const bodyparser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');

const PORT = 3131;

var app = express();

app.use(bodyparser());

app.use(express.static(__dirname + '/../client/dist'));

app.use(cors());

app.get('/userinfo', (req, res) => {
    db.query('select user_picture_url, username, followers, username_id, user_location from username_info', (err, data) => {
        if(err){
            console.log('error: USERINFO NOT SELECTED')
        } else{
            console.log('/USERINFO SELECTED FROM DB')
            res.send(data)
        }
    })
    
})


app.get('/songinfo', (req, res) => {
    db.query('select * from song_info', (err, data) => {
        if(err){
            console.log('/SONGINFO NOT SELECTED')
        }else{
            console.log('/SONGINFO SELECTED FROM DB')
            res.send(data)
        }
    })
})

app.get('/likes', (req, res) => {
    db.query('select song_id from song_likes', (err, data) => {
        if(err){
            console.log('error')
        } else{
            // console.log('songid data', data)
            res.send(data)
        }
    })
})

app.get('/solouser', (req, res) => {
    db.query('select * from username_info', (err, data) => {
        if(err){
            console.log('error solo user')
        } else{
            res.send(data)
        }
    })
})

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