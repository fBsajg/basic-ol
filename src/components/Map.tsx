
import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import 'ol-ext/dist/ol-ext.css'
import { IMapProps, IMapState } from '../types/types';
import { MapUtils } from '../utils/MapUtils';
import MapSidebar from './MapSidebar';

const Basemap = (props: IMapProps) => {
    //@ts-ignore
    const [map, setMap] = useState<IMapState>(null);

    useEffect(() => {
        const basemap = MapUtils.createMap();
        setMap(basemap);
    }, []);

    return (
        <>
            <div id='map' className='map'></div>
            <MapSidebar
                map={map}
            />
        </>
    )
}

export default Basemap;