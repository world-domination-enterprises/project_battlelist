import React from 'react'
import { SpotifyApiContext, Artist } from 'react-spotify-api'

export default function ReactSpotifyTest(props) {
    return (
        <SpotifyApiContext.Provider value={props.token}>
            <Artist name={props.name}>
                {(artist, loading, error) =>
                    artist ? (
                        <div>
                            <h1>{artist.name}</h1>
                            <ul>
                                {artist.genres.map(genre => (
                                <li key={genre}>{genre}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null
                }
            </Artist>
        </SpotifyApiContext.Provider> 
    )
}