import GeometryType from "ol/geom/GeometryType";
import View from "ol/View";
import { IBaseLayerConfig, IVectorLayerConfig } from "../types/types";
import { lineStyle, pointStyle, polyStyle, selectedStyle } from "./MapStyles";

const baseLayerArr: string[] = [
    'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
];

export const cartoDark: string = baseLayerArr[0];
export const cartoLight: string = baseLayerArr[1];
export const cartoVoyager: string = baseLayerArr[2];
export const mapCenter: number[] = [870770.6262, 5919283.4704];
export const mapZoom: number = 7;
export const maxZoom: number = 16;
export const minZoom: number = 7;
export const rotationStatus: boolean = false;
export const view = new View({
    center: mapCenter,
    zoom: mapZoom,
    maxZoom: maxZoom,
    minZoom: minZoom,
    enableRotation: rotationStatus,
})

export const baseLayerConfig: IBaseLayerConfig[] = [
    {
        url: cartoVoyager, title: "CartoDB Voyager", visible: true
    },
    {
        url: cartoLight, title: "CartoDB Light", visible: false
    },
]

// legend
export const vectorLayerConfig: IVectorLayerConfig[] = [
    {
        title: "Point", type: GeometryType.POINT, style: pointStyle, url: 'http://192.168.2.117:9003/api/points'
    },
    {
        title: "LineString", type: GeometryType.LINE_STRING, style: lineStyle, url: 'http://192.168.2.117:9003/api/lines'
    },
    {
        title: "Other", type: GeometryType.LINE_STRING, style: selectedStyle
    },
    {
        title: "Polygon", type: GeometryType.POLYGON, style: polyStyle, url: 'http://192.168.2.117:9003/api/polys',
    },
]

