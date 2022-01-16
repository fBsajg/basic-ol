
import React, { useState } from 'react';
import { IMapSidebarProps, TSelectableTabs } from '../types/types';
import Sidebar from './Sidebar';
import Tab from './Tab';
import fbsajg from '../img/fBsajg.png'
import Attributes from './Attributes';
import { MapControls } from '../utils/MapUtils';
import { Control } from 'ol/control';
import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import { Interaction } from 'ol/interaction';
import { DrawEvent } from 'ol/interaction/Draw';
import Feature, { FeatureLike } from 'ol/Feature';

let listener = []
const MapSidebar = (props: IMapSidebarProps): JSX.Element => {

    const {
        map,
    } = props

    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState<TSelectableTabs>('home');
    const [selectedFeature, setSelectedFeature] = useState<Feature>(new Feature());
    const [data, setData] = useState<null | any[]>(null);

    function onClose() {
        setCollapsed(true);
        //@ts-ignore
        setSelected(undefined);
    }
    function onOpen(id: string) {
        setCollapsed(false)
        //@ts-ignore
        setSelected(id)
    };

    function onSelect() {
        // add code to do stuff on select start and select end
    }

    function onDraw() {
        // add code to do stuff on select start and select end
    }

    let prevSelected: Feature[] = [];
    let controls: Interaction[] = [];


    function drawEnd(draw: Interaction) {
        //@ts-ignore
        draw.on("drawend", function (e: DrawEvent) {
            setCollapsed(false);
            setSelected("output");
            let drawnFeature = e.feature as Feature;
            e.feature.setGeometryName("geometry");
            prevSelected.unshift(drawnFeature);
            // setData(prevSelected[0]);
            prevSelected = [];
        });
    }

    if (listener.length === 0) {
        if (map) {
            const bar = MapControls.createBar(map, onSelect, onDraw);
            const switcher = MapControls.createSwitcher();
            map.addControl(switcher);
            map.addControl(bar);
            listener.push("listening");
            let nested: Control[] = bar.getControls();
            let ctrlbar = nested[0] as Bar
            let toggles = ctrlbar.getControls() as Toggle[];
            for (let toggle of toggles) {
                let interaction = toggle.getInteraction();
                if (controls.length < 2) {
                    controls.push(interaction);
                }
            }
            let [select, draw] = controls;
            drawEnd(draw)

            map.on('click', function (event: any) {
                const status = MapControls.getStatus(bar);
                if (status) {
                    map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                        if (feature) {
                            let data = Object.entries(feature.getProperties())
                            let castedFeature: Feature = feature as Feature;
                            prevSelected.unshift(castedFeature);
                            setSelectedFeature(castedFeature);
                            setCollapsed(false);
                            setSelected("output");
                            setData(data);
                        }
                    });
                }
            });
        }
    }


    return (
        <>
            <Sidebar
                id='sidebar'
                collapsed={collapsed}
                selected={selected}
                onClose={onClose}
                //@ts-ignore
                doOpen={onOpen}
            >
                <Tab
                    id='home'
                    header='Home'
                    faIcon='fa fa-home'
                >
                    <p>Put explanations here above your custom logo.</p>
                    <img src={fbsajg} alt="myLogo" />
                    <div className="legendTarget" />
                </Tab>

                <Tab
                    id='legend'
                    header='Legend & LayerControl'
                    faIcon='fa fa-map'
                />

                <Tab
                    id='output'
                    header='Output'
                    faIcon='fa fa-database'
                >

                    <Attributes
                        data={data}
                        feature={selectedFeature}
                    />

                </Tab>

                <Tab
                    id='settings'
                    header='Settings'
                    faIcon='fa fa-cogs'
                    anchor='bottom'
                >
                    <p>Edit settings</p>

                </Tab>
            </Sidebar>
        </>
    )
}

export default MapSidebar;