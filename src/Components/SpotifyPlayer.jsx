import React, { useEffect } from 'react'

import axios from 'axios';

import Tracks from '../SpotifyData'

export default function SpotifyPlayer() {
    return (
        <div>
            <Tracks />
        </div>
    )
}
