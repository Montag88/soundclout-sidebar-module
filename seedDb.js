var db = require('./database/index.js');


var usernameIdData = [
    {
        username_id: 1,
        username: 'Rahim',
        followers: 30,
        user_picture_url: '/images/1.jpeg',
        user_location: 'San Francisco',
        pro_account: 'false'
    },
    {
        username_id: 2,
        username: 'Lily',
        followers: 30,
        user_picture_url: '/images/2.jpeg',
        user_location: 'San Francisco',
        pro_account: 'true'
    },
    {
        username_id: 3,
        username: 'David',
        followers: 30,
        user_picture_url: '/images/3.jpeg',
        user_location: 'San Francisco',
        pro_account: 'false'
    },
    {
        username_id: 4,
        username: 'Aruna',
        followers: 30,
        user_picture_url: '/images/4.jpeg',
        user_location: 'San Francisco',
        pro_account: 'true'
    },
    {
        username_id: 5,
        username: 'Peeja',
        followers: 30,
        user_picture_url: '/images/5.jpeg',
        user_location: 'San Francisco',
        pro_account: 'false'
    },
    {
        username_id: 6,
        username: 'Candy',
        followers: 30,
        user_picture_url: '/images/6.jpg',
        user_location: 'San Francisco',
        pro_account: 'false'
    },
    {
        username_id: 7,
        username: 'Faith',
        followers: 30,
        user_picture_url: '/images/7.jpg',
        user_location: 'San Francisco',
        pro_account: 'false'
    },
    {
        username_id: 8,
        username: 'Pri',
        followers: 32,
        user_picture_url: '/images/8.jpg ',
        user_location: 'San Francisco',
        pro_account: 'true'
    },
    {
        username_id: 9,
        username: 'Jennie',
        followers: 32,
        user_picture_url: '/images/9.jpg',
        user_location: 'San Francisco',
        pro_account: 'false'
    },
    {
        username_id: 10,
        username: 'Maia',
        followers: 32,
        user_picture_url: '/images/10.jpg',
        user_location: 'San Francisco',
        pro_account: 'true'
    }
];

var songInfoDb = [
    {
        song_id: 1,
        title: 'Rahim the Dream',
        username_id: 1,
        times_played: 100,
        reposts: 100,
        comments: 100,
        category: 'Hip-Hop',
        song_picture_url: '/images/1.jpeg'
    },
    {
        song_id: 2,
        title: 'Lily the Beautiful Flower',
        username_id: 2,
        times_played: 500,
        reposts: 500,
        comments: 500,
        category: 'Classic Rock',
        song_picture_url: 'www.lilytheflower.com'
    },
    {
        song_id: 3,
        title: 'David the Beast',
        username_id: 3,
        times_played: 300,
        reposts: 300,
        comments: 300,
        category: 'Alternative',
        song_picture_url: 'www.davidmosher.com'
    },
    {
        song_id: 4,
        title: 'Aruna the Positive',
        username_id: 4,
        times_played: 200,
        reposts: 200,
        comments: 200,
        category: 'Indie Rock',
        song_picture_url: 'www.arunathehost.com'
    },
    {
        song_id: 5,
        title: 'Peeja the Main Man',
        username_id: 5,
        times_played: 1000,
        reposts: 1000,
        comments: 1000,
        category: 'Hip-Hop',
        song_picture_url: '/images/2.jpeg'
    },
    {
        song_id: 6,
        title: 'Candy the Chocolate',
        username_id: 6,
        times_played: 600,
        reposts: 600,
        comments: 600,
        category: 'Indie Rock',
        song_picture_url: 'www.candythechocolate.com'
    },
    {
        song_id: 7,
        title: 'Faith the Faithful',
        username_id: 7,
        times_played: 1100,
        reposts: 1100,
        comments: 1100,
        category: 'Rock and Roll',
        song_picture_url: 'www.faiththefaithful.com'
    },
    {
        song_id: 8,
        title: 'Pri the Sweet',
        username_id: 8,
        times_played: 750,
        reposts: 750,
        comments: 7500,
        category: 'R&B',
        song_picture_url: 'www.prithesweetcom'
    },
    {
        song_id: 9,
        title: 'Jennie the Stern',
        username_id: 9,
        times_played: 750,
        reposts: 750,
        comments: 750,
        category: 'Hip-Hop',
        song_picture_url: '/images/3.jpeg'
    },
    {
        song_id: 10,
        title: 'Maia the Knowledgable',
        username_id: 10,
        times_played: 1000,
        reposts: 1000,
        comments: 100,
        category: 'Alternative',
        song_picture_url: 'www.maiatheknowledagble.com'
    }
];

var songLikesDb = [
    {
        songlike_id: 1,
        song_id: 1,
        username_id: 1
    },
    {
        songlike_id: 2,
        song_id: 2,
        username_id: 2
    },
    {
        songlike_id: 3,
        song_id: 3,
        username_id: 3
    },
    {
        songlike_id: 4,
        song_id: 4,
        username_id: 4
    },
    {
        songlike_id: 5,
        song_id: 5,
        username_id: 5
    },
    {
        songlike_id: 6,
        song_id: 6,
        username_id: 6
    },
    {
        songlike_id: 7,
        song_id: 7,
        username_id: 7
    },
    {
        songlike_id: 8,
        song_id: 8,
        username_id: 8
    },
    {
        songlike_id: 9,
        song_id: 9,
        username_id: 9
    },
    {
        songlike_id: 10,
        song_id: 10,
        username_id: 10
    }

];

for(var i = 0; i<usernameIdData.length; i++){
    var queryString = `insert into username_info(username_id, username, followers, user_picture_url, user_location, pro_account) values ("${usernameIdData[i].username_id}", "${usernameIdData[i].username}", "${usernameIdData[i].followers}", "${usernameIdData[i].user_picture_url}", "${usernameIdData[i].user_location}", "${usernameIdData[i].pro_account}")`;
    db.query(queryString, (err, data) => {
        if(err){
            console.log('error')
        }else {
            console.log('success')
        }
    })
};

for(var i = 0; i<songInfoDb.length; i++){
    var queryString = `insert into song_info(song_id, title, username_id, times_played, reposts, comments, category, song_picture_url) values ("${songInfoDb[i].song_id}", "${songInfoDb[i].title}", "${songInfoDb[i].username_id}", "${songInfoDb[i].times_played}", "${songInfoDb[i].reposts}", "${songInfoDb[i].comments}", "${songInfoDb[i].category}", "${songInfoDb[i].song_picture_url}")`;
    db.query(queryString, (err, data) => {
        if(err){
            console.log('error')
        }else {
            console.log('success')
        }
    })
};

for(var i = 0; i<songLikesDb.length; i++){
    var queryString = `insert into song_likes(songlike_id, song_id, username_id) values ("${songLikesDb[i].songlike_id}", "${songLikesDb[i].song_id}", "${songLikesDb[i].username_id}")`;
    db.query(queryString, (err, data) => {
        if(err){
            console.log('error')
        }else {
            console.log('success')
        }
    })
};