import React from 'react';
import Popup from 'reactjs-popup'

function onFollow(username) {
    alert(`${username} has been followed`)
}

function onClickFollowers() {
    alert('Followers has been clicked')
}

function Card(props) {
    return(
        <div className='card'>
            <img className= 'roundImage followHover' src={'http://ec2-18-224-181-241.us-east-2.compute.amazonaws.com:3131/' + props.picture.user_picture_url} height="70px" width="70px" onClick={() => props.clickProfile(props.picture.username)}/>
            <div className='cardName'>
                <div className='followerName' onClick={() => props.clickProfile(props.picture.username)}>{props.picture.username}</div>
                <div className='followerNumber'>
                    <span className='svgFollowersImage'>
                        <svg className='svgImageFollowers' xmlns="http://www.w3.org/2000/svg" width='12' height='12'><path fill="rgba(153, 153, 153, 0.7)" d="M18.4 18.5l2.5 5 .2.5H28l-2.1-4.3-4.1-1.5v-2.5c1.2-1.1 1.8-3.2 1.8-5.1 0-2.1-2-3.6-3.5-3.6s-3.5 1.6-3.5 3.6c0 1.9.5 4 1.8 5.1v2.5h-.1l.1.3z"/><path fill="#999" d="M17.5 19l-5-1.8v-3c1.4-1.2 2-3.8 2-5.9 0-2.4-2.3-4.3-4-4.3-1.7 0-4 1.8-4 4.3 0 2.2.6 4.7 2 5.9v3l-5 1.8L1 24h19l-2.5-5z"/></svg>                    
                    </span>
                    <span onClick={() => onClickFollowers()}>{props.picture.followers}</span>
                </div>
                <button className='followButton' onClick={() => onFollow(props.picture.username)}>{'Follow'}</button>
            </div>
        </div>
    )
}

function Namelist(props) {
    return(
        <Popup className='popup'
            trigger ={<li className='pppics' onClick={() => props.clickProfile(props.picture.username)}>
                <img className= 'roundImage' src={'http://ec2-18-224-181-241.us-east-2.compute.amazonaws.com:3131/' + props.picture.user_picture_url} height="40px" width="40px"/>
            </li>}
            position='bottom center'
            on='hover'
            >
                <Card picture={props.picture} clickProfile={props.clickProfile}/>
            </Popup>
    )
}




export default Namelist;