
window.onload = init;

//Final version of the code

//attibution control

const attributionControl = new ol.control.Attribution({
    collapsible: true
})

function init() {


    //the base map(OSM)
    const map = new ol.Map({
        view: new ol.View({
            center: ol.proj.fromLonLat([13.06, 47.78869], 'EPSG:3857'),
            zoom: 15,
            projection: 'EPSG:3857'

        }),
        target: 'js-map',
        controls: ol.control.defaults({ attribution: false }).extend([attributionControl])//attribution
    })
    //osm standard

    //the standard OSM map
    const openStreetMapStd = new ol.layer.Tile({
        source: new ol.source.OSM(),

        visible: true,
        title: "OSMStandard"
    })
    //the road map
    const openStreetMapHuman = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: "AuFl_43vyH1X2NCMAn1wqV4eTJsrrvxZB4p4e30OjJEDGGjJKdrgZrYAGXvgtTIB",
            imagerySet: 'Road'//,Aerial,Road, CanvasDark/Gray, OrdnanceSurvey
        }),
        visible: false,
        title: 'OSMHumantarian'
    })
    // the aerieal map
    const bingMaps = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: "AuFl_43vyH1X2NCMAn1wqV4eTJsrrvxZB4p4e30OjJEDGGjJKdrgZrYAGXvgtTIB",
            imagerySet: 'AerialWithLabels'//,Aerial,Road, CanvasDark/Gray, OrdnanceSurvey
        }),
        visible: false,
        title: "BingMaps"
    })


    const layerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStd, openStreetMapHuman, bingMaps
        ]
    })
    map.addLayer(layerGroup)
    //layer switcher
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
    //console.log(baseLayerElements);

    for (let baseLayerElement of baseLayerElements) {
        baseLayerElement.addEventListener('change', function () {
            let baseLayerElementValue = this.value;
            layerGroup.getLayers().forEach(function (element, index, array) {
                let layerName = element.get('title');
                element.setVisible(layerName === baseLayerElementValue)
            })
        })
    }
    //style for point and line
    var pointStyles = {
        "ScenicView": new ol.style.Style({
            image: new ol.style.Circle({
                radius: 15,
                fill: new ol.style.Fill({ color: 'red' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 1 })
            })
        }),
        "HistoryMeetsArt": new ol.style.Style({
            image: new ol.style.Circle({
                radius: 15,
                fill: new ol.style.Fill({ color: 'orange' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 1 })
            })
        }),
        "ExperienceLikeALocal": new ol.style.Style({
            image: new ol.style.Circle({
                radius: 15,
                fill: new ol.style.Fill({ color: 'green' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 1 })
            })
        }),
        "CoffeeAndDrinks": new ol.style.Style({
            image: new ol.style.Circle({
                radius: 15,
                fill: new ol.style.Fill({ color: 'Aqua' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 1 })
            })
        })
    };
    var lineStyles = {
        "ScenicView": new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'coral',
                width: 6
            })
        }),
        "HistoryMeetsArt": new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'chocolate',
                width: 6
            })
        }),
        "ExperienceLikeALocal": new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'chartreuse',
                width: 6
            })
        }),
        "CoffeeAndDrinks": new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'darkSlateBlue',
                width: 6
            })
        })
    };

    const Sonata = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './OpenLayer_webMap/data/ASM_Sonata.geojson',
            format: new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857'
            }),
        }),
        visible: false,
        title: "ScenicView",
        style: function (feature) {
            var layerName = Sonata.get('title')
            if (feature.getGeometry().getType() === 'Point') {
                return pointStyles[layerName];
            } else if (feature.getGeometry().getType() === 'MultiLineString') {
                return lineStyles[layerName];
            }
        }
    })

    const Requiem = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './OpenLayer_webMap/data/ASM_Requiem.geojson',
            format: new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857'
            }),
        }),
        visible: false,
        title: "HistoryMeetsArt",
        style: function (feature) {
            var layerName = Requiem.get('title')
            if (feature.getGeometry().getType() === 'Point') {
                return pointStyles[layerName];
            } else if (feature.getGeometry().getType() === 'MultiLineString') {
                return lineStyles[layerName];
            }
        }
    })

    const Capriccio = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './OpenLayer_webMap/data/ASM_Capriccio.geojson',
            format: new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857'
            }),
        }),
        visible: false,
        title: "ExperienceLikeALocal",
        style: function (feature) {
            var layerName = Capriccio.get('title')
            if (feature.getGeometry().getType() === 'Point') {
                return pointStyles[layerName];
            } else if (feature.getGeometry().getType() === 'MultiLineString') {
                return lineStyles[layerName];
            }
        }
    })

    const Rhapsody = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './OpenLayer_webMap/data/ASM_Rhapsody.geojson',
            format: new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857'
            }),
        }),
        visible: false,
        title: "CoffeeAndDrinks",
        style: function (feature) {
            var layerName = Rhapsody.get('title')
            if (feature.getGeometry().getType() === 'Point') {
                return pointStyles[layerName];
            } else if (feature.getGeometry().getType() === 'MultiLineString' || feature.getGeometry().getType() === 'LineString') {
                return lineStyles[layerName];
            }
        }
    })


    const rasterLayerGroup = new ol.layer.Group({
        layers: [
            Sonata, Requiem, Capriccio, Rhapsody
        ]
    })
    map.addLayer(rasterLayerGroup);

    //raster switcher
    const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]')
    for (let tileRasterLayerElement of tileRasterLayerElements) {
        tileRasterLayerElement.addEventListener('change', function () {
            let tileRasterLayerElementValue = this.value;
            let tileRasterLayer

            rasterLayerGroup.getLayers().forEach(function (element, index, array) {
                if (tileRasterLayerElementValue === element.get('title')) {
                    tileRasterLayer = element;
                }
            })
            this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false);

        })
    }

    //home button setting
    const viewProjection = map.getView().getProjection();

    const trackingButton = document.querySelector('.sidebar > button[type=button]');
    trackingButton.addEventListener('click', function () {
        const geolocation = new ol.Geolocation({
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true
            },
            projection: viewProjection
        })
        geolocation.on('change', function () {

            let currentGeolocation = geolocation.getPosition();
            let LonLatGeolocation = ol.proj.toLonLat(currentGeolocation, viewProjection);

            map.getView().setCenter(currentGeolocation);
            map.getView().setZoom(14)

            sidebarTitle.innerHTML = 'Welcome to Salzburg!'
            sidebarPic.setAttribute('src', './OpenLayer_webMap/data/SBG_images/welcome.jpg')
            sidebarText.innerHTML = ""


            geolocation.setTracking(false)
        })

    })

    //controls:

    const overViewControl = new ol.control.OverviewMap({
        tipLabel: 'Custom Overview Map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ]
    })
    map.addControl(overViewControl)

    //popup:

    const overlayContainer = document.querySelector('.overlay-container')
    const overlayLayer = new ol.Overlay({
        element: overlayContainer
    })
    map.addOverlay(overlayLayer);

    const overlayHour = document.getElementById("amenityOpeningHour");
    const overlayAccess = document.getElementById("amenityAccess");
    const sidebarTitle = document.getElementById("amenityName");
    const sidebarText = document.getElementById("amenityInfo");
    const sidebarPic = document.getElementById("amenityImage")


    map.on('click', function (e) {
        overlayLayer.setPosition(undefined);
        popoverTextLayer.setVisible(false);
        map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
            let clickedFeatureName = feature.get('amenityOpeningHour');
            let clickedFeatureAdditional = feature.get('amenityAccess');
            let itemName = feature.get('amenityName')
            let itemInfo = feature.get('amenityInfo')
           // console.log(clickedFeatureAdditional)
            let clickCoordi = e.coordinate;
            // if (clickedFeatureName && clickedFeatureAdditional != undefined) {

            overlayLayer.setPosition(clickCoordi);
            overlayHour.innerHTML = clickedFeatureName;
            if (feature.getGeometry().getType() === 'Point') {
                overlayAccess.innerHTML = "Amenity Accessibility: " + clickedFeatureAdditional
            } else {
                overlayAccess.innerHTML = clickedFeatureAdditional
            }

            sidebarTitle.innerHTML = itemName
            sidebarText.innerHTML = itemInfo
            if (itemName)
                sidebarPic.setAttribute('src', './OpenLayer_webMap/data/SBG_images/' + itemName + '.jpg')


            //}
        })
        /*  {
              layFilter: function (layerCandicate) {
                  return layerCandicate.get('title') === "GeoJSONImage"
              }


          })*/
    })

    //hover:
    const popoverTextElement = document.getElementById('popover-text');
    const popoverTextLayer = new ol.Overlay({
        element: popoverTextElement,
        positioning: 'bottom-center',
        stopEvent: false
    })
    map.addOverlay(popoverTextLayer);

    map.on('pointermove', function (evt) {
        let isFeatureAtPixel = map.hasFeatureAtPixel(evt.pixel);
        if (isFeatureAtPixel) {
            let featureAtPixel = map.getFeaturesAtPixel(evt.pixel);
            let featureName = featureAtPixel[0].get('amenityName');
            popoverTextLayer.setPosition(evt.coordinate);
            popoverTextElement.innerHTML = featureName;
            map.getViewport().style.cursor = 'pointer';
        } else {
            popoverTextLayer.setPosition(undefined);
            map.getViewport().style.cursor = '';
        }
    })

    //select interaction

    const selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.singleClick,


        style: function (feature) {

            if (feature.getGeometry().getType() === 'Point') {
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 18,
                        fill: new ol.style.Fill({ color: 'deepskyblue' }),
                        stroke: new ol.style.Stroke({ color: 'white', width: 2 })
                    })
                })
            } else if (feature.getGeometry().getType() === 'MultiLineString' || feature.getGeometry().getType() === 'LineString') {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'deepskyblue',
                        width: 12,

                    })
                })
            }
        }
    })
    map.addInteraction(selectInteraction)

    /* //search feature
     var combinedSource = new ol.source.Vector();
     rasterLayerGroup.getLayers().forEach(function(layer) {
         combinedSource.addFeatures(layer.getSource().getFeatures());
     });
 
     var searchLayer = new ol.layer.Vector({
         source: combinedSource
     });
     map.addLayer(searchLayer);
 
     var search = new ol.ext.control.SearchFeature({
         source: searchLayer.getSource(),
         property: 'amenityName'
     });
     console.log(layerGroup)
     map.addControl(search);*/


}
