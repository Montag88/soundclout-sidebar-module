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
 
 - GET /tracks/:trackid/relatedtracks
 #### example /tracks/99/relatedtracks
 gets three tracks related to track 99 and information about related tracks (link to track, title, artist, plays, likes, reposts, comments)
 - GET /tracks/:trackid/albums
 #### example /tracks/99/albums
 gets up to three albums that track 99 appears in and info about albums (title, artist, music format, release year)
 - GET /tracks/:trackid/playlists
 #### example /tracks/99/playlists
 gets up to three playlists that track 99 appears in and info about playlists (title, likes, user)
 - GET /tracks/:trackid/likes
 #### example /tracks/99/likes
 gets number of likes of track 99 and also gets up to 9 random users that have liked track 99
 - GET /tracks/:trackid/reposts
 #### example /tracks/99/reposts
 gets number of reposts of track 99 and also gets up to 9 random users that have reposted track 99
 
 - POST /tracks/:trackid/likes
 #### example /tracks/100/likes
 posts a like from current user for track 100
 - POST /tracks/:trackid/reposts
 #### example /tracks/100/reposts
 posts a repost from current user for track 100
 - POST /artists/:artistid/follow
 #### example /artists/150/follow
 posts a follow from current user for artist 150
 - POST /users/:userid/follow
 #### example /users/175/follow
 posts a follow from current user for user 175
 - POST /users/:userid/upnext/play
 #### example /users/199/upnext/play
 adds song to up next playlist of current user (user 199) as current track
 - POST /users/:userid/upnext/next
 #### example /users/199/upnext/next
 adds song to up next playlist of current user (user 199) as next track
 - POST /users/:userid/playlists/:playlistid
 #### example /users/199/playlists/10
 adds song to playlist 10 of current user (user 199)
 
 - DELETE /tracks/:trackid/likes
 #### example /tracks/100/likes
 delets a like from current user for track 100
 - DELETE /tracks/:trackid/reposts
 #### example /tracks/100/reposts
 deletes a repost from current user for track 100
 - DELETE /artists/:artistid/follow
 #### example /artists/150/follow
 deletes a follow from current user for artist 150
 - DELETE /users/:userid/follow
 #### example /users/175/follow
 deletes a follow from current user for user 175

 - PUT /tracks/:tracksid/genre
 #### example /tracks/135/genre
 updates song genre


### Requirements

 - Node 8.15.0
 - Nvm 6.4.1
 - etc.
 
### Development
```ah
  npm install -g webpack
  npm install
```
