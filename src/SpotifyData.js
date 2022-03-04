import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

const Tracks = () => {
    const client_id = '97fe33a461604e70aef80545bbc48f94';
    const client_id_secret = '5a4fb7df966c41f8a953a72e7d53e3bc';
    const [token, setToken] = useState('');

    const [currentlyPlaying, setCurrentlyPlaying] = useState('');
    const [artist, setArtist] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const market = 'MX';
    useEffect(() => {

        // Api call for retrieving token
        axios('https://accounts.spotify.com/api/token', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'basic ' + (new Buffer(client_id + ':' + client_id_secret).toString('base64')),
            },
            data: 'grant_type=client_credentials'
        }).then(tokenresponse => {
            console.log(tokenresponse.data.access_token);
            setToken(tokenresponse.data.access_token);

            axios(`https://api.spotify.com/v1/me/player/currently-playing?market=MX`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    'Authorization': "Bearer BQB8OpJdv9RCrb-Yvy2WtNQDGkz4E4QIYMzKjC4pd5WW-BZbcpmMBbtwOjN3zmF1pZpWgS9pS39mJDjbLDTxnEuRPjVO99mfqO_kVDmnvv41b_nI_2528eV3E4IsqHIgmm_V8xQlgNF5RyL96CDqcfrxcEAt93wPgdJBy_Ix",
                }
            }).then(playingResponse => {
                console.log(playingResponse);
                setCurrentlyPlaying(playingResponse.data.item.name.toString());
                setArtist(playingResponse.data.item.artists[0].name.toString());
                setIsLoading(false);
            })
        }).catch(error => console.log(error));
        return () => {

        };
    }, []);

    return (


        <div>
            {isLoading ? <p>Cargando...</p> : <p>Kruby está escuchando {currentlyPlaying} de {artist} ahora mismo.</p>}
        </div>
    )
}

export default Tracks;