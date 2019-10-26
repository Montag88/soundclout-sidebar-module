import React from 'react';
import axios from 'axios';
import Namelist from './Namelist.jsx';
import RelatedTracks from './RelatedTracks.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPictures: [],
            likes: 0,
            likeWord: 'likes',
            songInformation: []


        }
        this.onClickLikes = this.onClickLikes.bind(this);
        this.onClickProfiles = this.onClickProfiles.bind(this);
        this.countRelatedTracksLikes = this.countRelatedTracksLikes.bind(this);

    }

    componentDidMount () {
        axios.get('http://ec2-18-224-181-241.us-east-2.compute.amazonaws.com:3131/userinfo')
            .then( (data) => {
                var array = [];
                for(var i = 0; i<=8; i++){
                    array.push(data.data[i])
                }
                this.setState({userPictures: array}, () =>{
                    console.log('state user pictures: ', this.state.userPictures)
                })
                
            })

            axios.get('http://ec2-18-224-181-241.us-east-2.compute.amazonaws.com:3131/songinfo')
                .then( (data) => {
                    var array = [];
                    data.data.forEach( (songInfoObj) => {
                        if(songInfoObj.category === 'Hip-Hop'){
                            array.push(songInfoObj)
                        }
                    })
                    this.setState({songInformation: array}, () => {
                        // console.log('STATE SONG INFO: ', this.state.songInformation)
                    })
                })
                .then(axios.get('http://ec2-18-224-181-241.us-east-2.compute.amazonaws.com:3131//likes')
                    .then ( (data) => {
                        var count = 0
                        data.data.forEach( (songObj) => {
                            if(songObj.song_id === 1){
                                count++
                            }
                        })
                        this.setState({likes: count})
                        if(count === 1) {
                            this.setState({likeWord: 'like'})
                        }
                        // console.log(this.state.likes)
                        
                        var stateSongInfo = this.state.songInformation;
                        stateSongInfo.forEach( (songInfoObj) => {
                            this.countRelatedTracksLikes(data, songInfoObj)
                        })
                        this.setState({songInformation: stateSongInfo}, () => {

                            console.log('This.state.songInfomation: ', this.state.songInformation)
                        })
                    }))
                    .then(axios.get('http://ec2-18-224-181-241.us-east-2.compute.amazonaws.com:3131/userinfo')
                        .then( (data) => {
                            console.log('USERINFO: ', data.data)
                            var stateSongInfo = this.state.songInformation
                            stateSongInfo.forEach( (songObj) => {
                                data.data.forEach( (dataObj) =>{
                                    if(songObj.username_id === dataObj.username_id){
                                        songObj.username = dataObj.username
                                    }
                                })
                            })
                            console.log('STATE SONGINFO: ', stateSongInfo)
                            this.setState({songInformation: stateSongInfo})
                        })
                    )
        

    };


    countRelatedTracksLikes (data, songInfoObj) {
        var count = 0
        data.data.forEach( (songObj) => {
            if(songObj.song_id === songInfoObj.song_id){
                count++
            }
        })
        songInfoObj['likes'] = count;
    }

    onClickLikes () {
        alert('View all likes has been clicked')
    }

    onClickProfiles (username) {
        alert(`${username} has been clicked`)
    }


    render () {
        return (
            <div className='relatedTrackBlockContainer'>
            <div className='relatedTracksBlock'>
                <div className='header'>
                    <div className='iconWords'>
                        <div className='trackIcon' >
                            {/* <img className='waveformImage' src='/images/waveform.png' /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path fill="#999" d="M5 12h2v4H5zM21 12h2v4h-2zM17 10h2v8h-2zM9 8h2v12H9zM13 5h2v18h-2z"/></svg>
                        </div>
                        <div className='relatedTracksWritten'>{'Related tracks'}</div>
                    </div>
                    <div className='tracksViewall'>{'View all'}</div>
                </div>
                <div className='relatedTracksContainerWithPad'>
                    <div className='relatedTracksContainer'>
                        <ul className='relatedTracksContainer uLRelatedTracks'>
                            {this.state.songInformation.map( (songInformationObj) => {
                                return(
                                <RelatedTracks song={songInformationObj} />
                                )
                            })
                            }
                        </ul>
                    </div>

                </div>
            </div>
            <div className='likeBlock'>
                <div className='header' >
                    <div onClick={this.onClickLikes} className='likeHeader'>
                        <span className='heartLikeBundle'>
                            <span className='heart'>
                                {/* <img src='/images/heart.png'></img> */}
                                <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_likes_grey</title><path d="M10.805 3c-2.02 0-2.804 2.345-2.804 2.345S7.213 3 5.196 3C3.494 3 1.748 4.096 2.03 6.514c.344 2.953 5.725 6.479 5.963 6.487.238.008 5.738-3.722 5.988-6.5C14.188 4.201 12.507 3 10.805 3z" fill="#999" fill-rule="evenodd"/></svg>                            </span>
                            <span className='likeNumber'>{`${this.state.likes} ${this.state.likeWord}`}</span>
                        </span>
                        <span className='likeHeader viewAllLikes'>{'View all'}</span>
                    </div>
                    <div className='likeContainer'>
                        <ul className='profilePicture'>
                                {
                                this.state.userPictures.map( (pictureObj) => {
                                    return(
                                    <Namelist picture={pictureObj} clickProfile={this.onClickProfiles}/>                        )
                                })}
                        </ul>
                    </div> 
                </div>
            </div>
            </div>
        )
    }
}

export default App; 