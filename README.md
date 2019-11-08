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

### CRUD API
URL: http://localhost:3000/api
All data types will be JSON.
 
`GET /tracks/:trackid` gets related tracks, albums, playlists, likes, and reposts of track.

- example: /tracks/99

##### Parameters
   
| Name             | Type          | Description                                                            |
| :--------------- | :-----------: | :--------------------------------------------------------------------- |
| `track_id`       | `integer`     | *Required.* Track identifier.                                          |

##### Response
   
| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_info`     | `OBJ`       | Track title, length, release date, comments, and plays.                                   |
| `related_tracks` | `OBJ`       | Three tracks related to current track and information about related tracks.               |
| `albums`         | `OBJ`       | Up to three albums that current track appears in and info about albums.                   | 
| `playlists`      | `OBJ`       | Up to three playlists that current track appears in and info about playlists.             |
| `likes`          | `OBJ`       | Number of likes of current track and up to nine users that have liked current track.      |
| `reposts`        | `OBJ`       | Number of reposts of current track and up to nine users that have reposted current track. |

`POST /tracks/:trackid/likes` posts a like from current user for track
 
- example:  /tracks/100/likes

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`POST /tracks/:trackid/reposts` posts a repost from current user for track
 
- example:  /tracks/100/reposts

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`POST /artists/:artistid/follow` posts a follow from current user for artist
 
- example:  /artists/100/follow

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `artist_id`      | `integer`   | *Required.* Artist identifier.                                                            |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`POST /users/:followid/follow` posts a follow from current user for user
 
- example:  /users/100/follow

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `follow_id`      | `integer`   | *Required.* User to be followed identifier.                                               |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`POST /users/:userid/upnext/play` adds song to up next playlist of current user as current track
 
- example:  /users/199/upnext/play

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`POST /users/:userid/upnext/` adds song to up next playlist of current user
 
- example:  /users/199/upnext/

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`POST /users/:userid/playlists/:playlistid` adds track to playlist of current user
 
- example:  /users/199/playlists/10

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `playlist_id`    | `integer`   | *Required.* Playlist identifier.                                                          |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`DELETE /tracks/:trackid/likes` deletes a like from current user for track
 
- example:  /tracks/100/likes

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`DELETE /tracks/:trackid/reposts` deletes a repost from current user for track
 
- example:  /tracks/100/reposts

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`DELETE /artists/:artistid/follow` deletes a follow from current user for artist
 
- example:  /artists/150/follow

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `artist_id`      | `integer`   | *Required.* Artist identifier.                                                           |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`DELETE /users/:followid/follow` deletes a follow from current user for user
 
- example:  /users/150/follow

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `follow_id`      | `integer`   | *Required.* User to be followed identifier.                                               |
| `user_id`        | `integer`   | *Required.* User identifier.                                                              |

`PUT /tracks/:tracksid/genre` updates song genre
 
- example:  /tracks/135/genre

##### BODY

| Name             | Type        | Description                                                                               |
| :--------------- | :---------: | :---------------------------------------------------------------------------------------- |
| `track_id`       | `integer`   | *Required.* Track identifier.                                                             |
| `genre`          | `string`    | *Required.* User identifier.                                                              |


### Requirements

 - Node 8.15.0
 - Nvm 6.4.1
 - etc.
 
### Development
```ah
  npm install -g webpack
  npm install
```
