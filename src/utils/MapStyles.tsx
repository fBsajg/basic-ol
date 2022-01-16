import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";

enum BaseColors {
    BLUE = 'rgba(0,60,136,.6)',
    WHITE = 'rgba(255,255,255,.4)',
    GOLD = 'rgba(146,99,28,.6)',
    SELECTED = 'rgba(155, 5, 12, .5)'
}

let pointFill: Fill = new Fill({
    color: BaseColors.WHITE
});

let pointStroke: Stroke = new Stroke({
    color: BaseColors.BLUE,
    width: 2.5
});

let pointImage: CircleStyle = new CircleStyle({
    radius: 7,
    fill: pointFill,
    stroke: pointStroke
});

let polyFill: Fill = new Fill({
    color: BaseColors.WHITE
});

let polyStroke: Stroke = new Stroke({
    color: BaseColors.GOLD,
    width: 4
});

let lineStroke: Stroke = new Stroke({
    color: BaseColors.BLUE,
    width: 4
});

let selectedStroke = new Stroke({
    color: BaseColors.SELECTED,
    width: 4
});


// default line style
export const lineStyle = new Style({
    stroke: lineStroke
})

//default selected style
export const selectedStyle = new Style({
    stroke: selectedStroke
})


// default poly style
export const polyStyle = new Style({
    stroke: polyStroke,
    fill: polyFill,
})

// default point style
export const pointStyle = new Style({
    image: pointImage
})

