
import { Feature, Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import { baseLayerConfig, cartoLight, cartoVoyager, vectorLayerConfig, view } from './MapConfig';
import { Control, defaults as defaultControls, ScaleLine, Zoom } from 'ol/control';
import VectorSource from 'ol/source/Vector';
import Geojson from 'ol/format/GeoJSON'
import { bbox } from 'ol/loadingstrategy'
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Legend from 'ol-ext/legend/Legend';
import LegendControl from 'ol-ext/control/Legend'
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import { IVectorLayerConfig } from '../types/types';
import GeometryType from 'ol/geom/GeometryType';
import Select from 'ol/interaction/Select';
import Toggle from 'ol-ext/control/Toggle';
import Bar from 'ol-ext/control/Bar';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import LayerGroup from 'ol/layer/Group';
import Draw from 'ol/interaction/Draw';

export class MapUtils {
    static createBaseLayer(url: string, title: string, visible: boolean) {
        const xyzURL: string = url;
        const baseSource: XYZSource = new XYZSource({
            url: xyzURL
        });
        const baseLayer: TileLayer = new TileLayer({
            //@ts-ignore
            baseLayer: true,
            visible: visible,
            title: title,
            source: baseSource
        });

        return baseLayer;
    }

    static createMap() {
        let baseLayers: TileLayer[] = [];
        for (let i of baseLayerConfig) {
            let layer = this.createBaseLayer(i.url, i.title, i.visible)
            baseLayers.push(layer)
        }
        const baseLayerGroup: LayerGroup = new LayerGroup({
            //@ts-ignore
            title: "Base Layers",
            openInLayerSwitcher: true,
            layers: baseLayers
        });
        const map: Map = new Map({
            target: 'map',
            controls: defaultControls().extend(this.addControls()),
            layers: [baseLayerGroup],
            view: view
        });
        this.addVectorLayers(map, vectorLayerConfig)
        return map;
    }

    static createVectorSource(url: string) {
        let source: VectorSource = new VectorSource({
            format: new Geojson(),
            loader: function () {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        let features: any = source.getFormat().readFeatures(data);
                        source.addFeatures(features)
                    })
                    .catch(err => console.log(err))
            },
            strategy: bbox
        })
        return source
    }

    static createVectorLayer(url: string, style: Style, title: string) {
        let vector: VectorLayer = new VectorLayer({
            //@ts-ignore
            title: title,
            source: this.createVectorSource(url),
            style: style
        });
        return vector
    }

    private static addVectorLayers(map: Map, vectorLayerConfig: IVectorLayerConfig[]) {
        for (let item of vectorLayerConfig) {
            if (item.url) {
                let vectorLayer = this.createVectorLayer(item.url, item.style, item.title)
                map.addLayer(vectorLayer)
            }
        }
    }

    private static addControls() {
        let scale: ScaleLine = this.createScale();
        let legend: LegendControl = this.createLegend();
        let zoom: Zoom = this.createZoom()
        let controlArr: Control[] = [scale, legend, zoom]
        return controlArr
    }

    static createLegend(): LegendControl {
        let legend: Legend = new Legend({
            className: "myLegend",
            title: "Title of legend",
        });
        this.setLegendContent(legend, vectorLayerConfig);

        let legendCtrl: LegendControl = new LegendControl({
            className: "legendCtrl",
            title: "",
            legend: legend,
            collapsed: false,
            target: "legend"
        });
        return legendCtrl
    }

    static createZoom(): Zoom {
        let zoom: Zoom = new Zoom({
            target: "map",
            className: 'custom-zoom'
        });
        return zoom
    }

    static createScale() {
        let scale = new ScaleLine({
            target: "map",
            className: "ol-scale-line"
        })
        return scale;
    }


    private static setLegendContent(legend: Legend, config: IVectorLayerConfig[]) {
        for (let item of config) {
            if (item.type === GeometryType.LINE_STRING || item.type === GeometryType.MULTI_LINE_STRING) {
                let l = new Feature(new LineString([]));
                l.setStyle(item.style)
                legend.addItem({
                    title: item.title, feature: l
                })
            }
            if (item.type === GeometryType.POLYGON || item.type === GeometryType.MULTI_POLYGON) {
                let p = new Feature(new Polygon([[]]));
                p.setStyle(item.style)
                legend.addItem({
                    title: item.title, feature: p
                })
            }
            if (item.type === GeometryType.POINT || item.type === GeometryType.MULTI_POINT) {
                let j = new Feature(new Point([]));
                j.setStyle(item.style)
                legend.addItem({
                    title: item.title, feature: j
                })


            }
        }
    }

}

export class MapControls {

    static select: Select = new Select();
    static drawSource: VectorSource = new VectorSource({});
    static draw: Draw = new Draw({
        type: GeometryType.POINT,
        source: MapControls.drawSource
    });

    static createSelect(map: Map, onSelect: any): Toggle {

        let selectCtrl: Toggle = new Toggle(
            {
                html: '<i class="fa fa-hand-pointer-o"></i>',
                className: "custom-ol-select",
                title: "Select",
                interaction: this.select,
                active: false,
                onToggle: function (active) {
                    active ? MapControls.select.setActive(true) : MapControls.select.setActive(false);
                    onSelect()
                }
            });
        selectCtrl.setTarget("map");
        return selectCtrl;
    }

    static createDraw(map: Map, onDraw: any) {
        let drawLayer = new VectorLayer({ 
            source: this.drawSource,  
            //@ts-ignore
            displayInLayerSwitcher: false,
        });
        let drawCtrl: Toggle = new Toggle(
            {
                html: '<i class="fa fa-map-marker" ></i>',
                className: "custom-ol-draw",
                title: 'Point',
                active: false,
                interaction: this.draw,
                onToggle: function (active) {
                    MapControls.drawSource.clear()
                    active ? MapControls.draw.setActive(true) : MapControls.draw.setActive(false);
                    onDraw()
                }
            });
        map.addLayer(drawLayer);
        drawCtrl.setTarget("map");
        return drawCtrl
    }

    private static onSelect() {
        console.log("clicked Select")
    }

    private static onDraw() {
        console.log("clicked Draw")
    }

    static createBar(map: Map, onSelect: any, onDraw: any) {
        let ctrlBar = new Bar({
            className: "ctrlBar",
        });
        let nested = new Bar({ toggleOne: true, group: true, });
        ctrlBar.addControl(nested)
        nested.addControl(this.createSelect(map, onSelect));
        nested.addControl(this.createDraw(map, onDraw))
        ctrlBar.setTarget("map");
        ctrlBar.setPosition("top-right");
        return ctrlBar;
    }

    static getStatus(ctrlBar: Bar) {
        let firstControl = ctrlBar.getControls()[0] as Bar;
        let toggle = firstControl.getControls()[0] as Toggle;
        return toggle.getActive()
    }

    static createSwitcher() {
        let switcher = new LayerSwitcher({
            //@ts-ignore
            target: 'legend',
        });
        return switcher;
    }


}
