import React from 'react';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        }
        
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({menuOpen: true}, () => {
            document.addEventListener('click', this.closeMenu)
        });
    }

    closeMenu(event) {
        event.preventDefault();

        this.setState({menuOpen: false}, () => {
            document.removeEventListener('click', this.closeMenu)
        })
    }
    
    render(){
        
        return(
            <span className='relatedDropDownMenu'>
                <span  onClick={this.showMenu}>
                    <img className='menuRelatedSongImage' src='/images/menu.png' height='12px' width='14px'></img>
                </span>
            { 
                this.state.menuOpen
                    ? (
                        <div className='relatedDropDownMenuIcon' >
                            <div className='dropDownItemContainer'>
                                <div className='dropDownItemImage'>
                                    {/* <img className='dropDownImage' src='./images/repost.png'  width='18px' height='12px'/> */}
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_repost</title><path d="M2 6v5c0 1.105.902 2 2.009 2h6.987H10l-2-2H4V6h-.5H6L3 3 0 6h2zm4-3h-.996 6.987C13.098 3 14 3.895 14 5v5h-2V5H8L6 3zm10 7h-6l3 3 3-3z" fill="#222" fill-rule="evenodd"/></svg>
                                </div>
                                <div className='dropDownWritten'>{'Repost'}</div>
                            </div>
                            <div className='dropDownItemContainer'>
                                <div className='dropDownItemImage'>
                                    {/* <img src='./images/repost.png' width='18px' height='12px'/> */}
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>share</title><g fill="#222" fill-rule="evenodd"><path d="M12 3C8.032 3 7 4.8 7 7.8c1.642-3 4.157-2.795 5-2.795V3zm0-2v6l3-3-3-3z"/><path d="M14 7v4a2 2 0 0 1-2.009 2H4.01A2.006 2.006 0 0 1 2 11V5a2 2 0 0 1 2.009-2h3.19a5.933 5.933 0 0 0-1.383 2H4v6h8V9l2-2zm-3-2h-.04l.04-.01V5z"/></g></svg>
                                </div >
                                <div className='dropDownWritten'>{'Share'}</div >
                            </div>
                            <div className='dropDownItemContainer'>
                                <div className='dropDownItemImage addToNextUp'>
                                    {/* <img src='./images/repost.png' width='18px' height='12px'/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g fill="none" fill-rule="evenodd"><path d="M0 0h20v20H0z"/><path fill="#222" fill-rule="nonzero" d="M4 9h10v2H4V9zm0 4h10v2H4v-2zm0-8h8v2H4V5zm10-4l4 3-4 3V1z"/></g></svg>
                                </div>
                                <div className='dropDownWritten'>{'Add to Next up'}</div>
                            </div>
                            <div className='dropDownItemContainer'>
                                <div className='dropDownItemImage addToPlaylist'>
                                    {/* <img src='./images/repost.png' width='18px' height='12px'/> */}
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>Group</title><path d="M12 3V1h2v2h2v2h-2v2h-2V5h-2V3h2zM0 3v2h8V3H0zm0 4v2h10V7H0zm0 4v2h10v-2H0z" fill="#222" fill-rule="evenodd"/></svg>
                                </div>
                                <div className='dropDownWritten'>{'Add to playlist'}</div>
                            </div>
                            <div className='dropDownItemContainer lastContainer'>
                                <div className='dropDownItemImage'>
                                    {/* <img src='./images/repost.png' width='18px' height='12px'/> */}
                                    <svg width="18" height="14" viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg"><title>A517BF11-E369-4A74-B88A-688816190F04</title><g fill="none" fill-rule="evenodd"><circle fill="#222" cx="9" cy="7" r="2.5"/><path d="M15.028 12.993A8.473 8.473 0 0 0 17.5 7c0-2.324-.933-4.43-2.445-5.965M12.905 10.873A5.483 5.483 0 0 0 14.5 7a5.482 5.482 0 0 0-1.56-3.838M3.017.963A8.474 8.474 0 0 0 .5 7c0 2.36.962 4.495 2.515 6.036M5.104 3.118A5.483 5.483 0 0 0 3.5 7c0 1.54.633 2.932 1.653 3.93" stroke="#222"/></g></svg>
                                </div>
                                <div className='dropDownWritten'>{'Station'}</div>
                            </div>
                        </div>
                    )
                    : (
                        null
                    )
                }
            </span>
        );
    }

}

export default Menu;