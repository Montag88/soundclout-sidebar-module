import React from 'react';
import { resolvePreset } from '@babel/core';
import { timingSafeEqual } from 'crypto';
import axios from 'axios';
import Menu from './Menu.jsx'
import RelatedSongName from './RelatedSongName.jsx'


class RelatedTracks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            songInformation: props.song,
            playImage: false
        }

    this.postLike = this.postLike.bind(this);
    this.clickChangePlayImage = this.clickChangePlayImage.bind(this)
    }


    clickChangePlayImage () {
        if(this.state.playImage === false){
            this.setState({playImage: true})
        } else {
            this.setState({playImage: false})
        }
    }

    postLike (songId, usernameId, likes) {
            var value = {songId, usernameId, likes};
            axios.post('http://localhost:3131/likePost', value)
                .then( (data) => {
                    // console.log('Like Posted')
                    var updatedLikes = value.likes + 1;
                    // console.log('updated likes: ', updatedLikes)
                    var songInfoArray = this.state.songInformation;
                    // console.log('songInfoArray: ', songInfoArray)
                    songInfoArray.likes = updatedLikes
                    
                    this.setState({songInformation: songInfoArray}, ()=>{
                        // console.log('new state array: ', this.state.songInformation)
                    })
                    console.log('Posted Data: ', data.data)
                })
        }

    render(){
        // console.log('props in RelatedTracks: ', this.props)
        return(
            <li className='singleTrackContainer'>
                <div className='singleTrackInformation'>
                    <span className='relatedTrackPicHolder'>
                        <span className='rtImageBox' onClick={this.clickChangePlayImage}>
                            <img className='rtImage' src={'http://localhost:3131/' + this.state.songInformation.song_picture_url} height="50px" width="50px" />
                            { !this.state.playImage
                            ? (<img className='rtImageOverlay' src='http://localhost:3131/images/playoverlay.png' heigth='30px' width='30px' />
                            )
                            :
                            (
                                <img className='rtImageOverlay' src='http://localhost:3131/images/pauseOverlay.png' heigth='30px' width='30px' />
                            )
                            } 
                        </span>
                    </span>
                    <span className='trackArtistSongInfo'>
                        <div className='artistSongName'>
                            <div className='relatedArtistNameBox'>
                                {/* <div className='relatedArtistName'>{this.state.songInformation.username}</div> */}

                                <RelatedSongName username={this.state.songInformation.username} />

                            </div>
                            <div className='relatedSongNameBox'>
                                <div className='relatedSongName'>{this.state.songInformation.title}</div>
                                <div className='relatedMenuOptions'>
                                    <span className='likeRelatedSong'>
                                        <img className='likeRelatedSongBlackHeart' src='http://localhost:3131/images/blackheart.png' height='12px' width='12px' onClick={() => {this.postLike(this.state.songInformation.song_id, this.state.songInformation.username_id, this.state.songInformation.likes)}}></img>
                                    </span>
                                    <Menu />
                                </div>
                            </div>
                            <ul className='relatedTrackIconList'>
                                <li className='relatedlist'>
                                    <span className='relatedPlayContainer'>
                                        <span className='relatedPlayIcon'>
                                            {/* <img src='/images/triangledark.png' height='12px' width='15px'></img> */}
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_play 4</title><path d="M4 13V3l9 5-9 5z" fill="#999" fill-rule="evenodd"/></svg>
                                        </span>
                                        <span className='relatedTimesPlayed'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.times_played}</div>
                                        </span>
                                    </span>
                                </li>
                                <li className='relatedlist'>
                                    <span className='relatedLikesContainer'>
                                        <span className='relatedLikesIcon'>
                                            {/* <img src='/images/heart.png'></img> */}
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_likes_grey</title><path d="M10.805 3c-2.02 0-2.804 2.345-2.804 2.345S7.213 3 5.196 3C3.494 3 1.748 4.096 2.03 6.514c.344 2.953 5.725 6.479 5.963 6.487.238.008 5.738-3.722 5.988-6.5C14.188 4.201 12.507 3 10.805 3z" fill="#999" fill-rule="evenodd"/></svg>
                                        </span>
                                        <span className='relatedLikes'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.likes}</div>
                                        </span>
                                    </span>
                                </li>
                                <li className='relatedlist'>
                                    <span className='relatedRepostsContainer'>
                                        <span className='relatedRepostsIcon'>
                                            {/* <img src='/images/repost.png' height='11px' width='14px'></img> */}
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_repost</title><path d="M2 6v5c0 1.105.902 2 2.009 2h6.987H10l-2-2H4V6h-.5H6L3 3 0 6h2zm4-3h-.996 6.987C13.098 3 14 3.895 14 5v5h-2V5H8L6 3zm10 7h-6l3 3 3-3z" fill="#999" fill-rule="evenodd"/></svg>
                                        </span>
                                        <span className='relatedReposts'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.reposts}</div>
                                        </span>
                                    </span>
                                </li>
                                <li className='relatedlist'>
                                    <span className='relatedcommentsContainer'>
                                        <span className='relatedCommentsIcon'>
                                            {/* <img src='/images/comments.png' height='12px' width='12px'></img> */}
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_comment</title><path d="M5 3c-1.105 0-2 .887-2 2.006v2.988C3 9.102 3.887 10 5 10h6c1.105 0 2-.887 2-2.006V5.006A1.998 1.998 0 0 0 11 3H5zm0 7v3l3-3H5z" fill="#999" fill-rule="evenodd"/></svg>
                                        </span>
                                        <span className='relatedComments'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.comments}</div>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </span>
                </div>
            </li>
        )
    }
};

export default RelatedTracks;