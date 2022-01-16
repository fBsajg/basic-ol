import { Map, } from 'ol';
import Feature  from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import { Style } from 'ol/style';

export interface IMapProps {
}

export interface IMapState {
    map: Map | null,
}

export interface ISidebarProps {
    id: string,
    collapsed?: boolean,
    position?: TSidebarPosition,
    selected?: string | undefined,
    closeIcon?: TIcons,
    onClose?: () => void,
    doOpen?: (id: string | undefined) => void,
    children?: any,
    anchor?: string,
}

export interface IMapSidebarProps {
    map: Map | null,
}

export interface ITabProps {
    id: string,
    header: string,
    faIcon: TIcons,
    anchor?: TTabPosition,
    disabled?: boolean,
    onClose?: () => void,
    closeIcon?: TIcons,
    position?: TSidebarPosition,
    active?: boolean,
    children?: any,
}

export interface IAttributeProps {
    data: any[] | null
    feature: Feature | null
}

export interface IVectorLayerConfig {
    title: string,
    type: GeometryType
    style: Style,
    url?: string,
}

export interface IBaseLayerConfig {
    url: string,
    title: string,
    visible: boolean
}


//types
export type TSidebarPosition = 'left' | 'right';
export type TTabPosition = 'top' | 'bottom';
export type TIcons = string | JSX.Element | Element;
export type TSelectableTabs = undefined | 'home' | 'user-infos'  | 'output' //continue


