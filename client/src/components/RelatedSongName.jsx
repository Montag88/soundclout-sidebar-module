import React from 'react';
import axios from 'axios';

class RelatedSongName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hoverDown: false,
            usernameInfo: {}
        }
        this.showHoverDropDown = this.showHoverDropDown.bind(this);
        this.closeHoverDropDown = this.closeHoverDropDown.bind(this);
    }

    showHoverDropDown(event) {
        event.preventDefault();

        this.setState({hoverDown: true});
    }

    closeHoverDropDown(event) {
        event.preventDefault();

        this.setState({hoverDown: false});
    }

    componentDidMount(){
        axios.get('http://localhost:3131/soloUser')
            .then((data) => {
                console.log(data.data)
                data.data.forEach( (obj) => {
                    if(obj.username === this.props.username){
                        this.setState({usernameInfo: obj});
                    }
                })
            })
            .then(()=>{
                console.log('state usernameInfo in RelatedSongName: ', this.state.usernameInfo)
            })
    }

    render() {
        // console.log('props in RelatedSongName: ', this.props)
        return(

            <div className='relatedArtistName' onMouseEnter={this.showHoverDropDown} onMouseLeave={this.closeHoverDropDown}>{this.props.username}
            
                {
                    this.state.hoverDown
                        ?(
                            <div>
                                <div className='notch' ></div>
                                <div className='relatedNameIconHover'>
                                    <img className= 'roundImage followHover' src={'http://localhost:3131/' + this.state.usernameInfo.user_picture_url} height="70px" width="70px" />
                                    <div className='cardName'>
                                        <div className='followerName relatedFollowerName'  >{this.state.usernameInfo.username}</div>
                                        <span className='followerNumber'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path fill="rgba(153, 153, 153, 0.7)" d="M18.4 18.5l2.5 5 .2.5H28l-2.1-4.3-4.1-1.5v-2.5c1.2-1.1 1.8-3.2 1.8-5.1 0-2.1-2-3.6-3.5-3.6s-3.5 1.6-3.5 3.6c0 1.9.5 4 1.8 5.1v2.5h-.1l.1.3z"/><path fill="#999" d="M17.5 19l-5-1.8v-3c1.4-1.2 2-3.8 2-5.9 0-2.4-2.3-4.3-4-4.3-1.7 0-4 1.8-4 4.3 0 2.2.6 4.7 2 5.9v3l-5 1.8L1 24h19l-2.5-5z"/></svg>
                                            <span className='relatedFollowerNumber' >{this.state.usernameInfo.followers}</span>
                                        </span>
                                        <div className='followerLocation' >{this.state.usernameInfo.user_location}</div>
                                        <button className='followButton relatedfollowButton' >{'Follow'}</button>
                                    </div>
                                </div>
                            </div>
                        )
                        :(
                            null
                        )
                }

            </div>

        );
    }
}

export default RelatedSongName;