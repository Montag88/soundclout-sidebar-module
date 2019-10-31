# Sidebar-module

To implement the semi-static/dynamic sidebar and playlist component for the SoundClout web application.

## Related Projects

 - https://github.com/3-musicdb.git

### Usage

 - display images/information for tracks in the album
 - display images/information for tracks in playlist
 - display images of account profiles that like the playlist, with a pop-up that includes their information
 - display profiles that have reposted the song
 - site map

### Rest
 - URL: http://localhost:3000/api
 - GET /songs/:songid
 #### example /songs/99
 gets song 99 information (plays, likes, reposts, albums, related tracks, playlists)
 - POST
 - /songs/:songid/likes
 #### example /songs/100/likes
 posts a like for song 100
 - DELETE /songs/:songid/likes
 #### example /songs/200/likes
 deletes a like for song 200
 - PATCH /users/:userid/playlist/songs/:songid
 #### example /users/10/playlist/songs/50
 adds song 50 to current users playlist


### Requirements

 - Node 8.15.0
 - Nvm 6.4.1
 - etc.
 
### Development
```ah
  npm install -g webpack
  npm install
```
