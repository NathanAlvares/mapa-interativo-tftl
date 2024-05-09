let map;
const legend = document.querySelector(".map-legend");

const mapBounds = {
    north: -21.01147241837678,
    south: -21.29771854911285,
    west: -48.93018084111609,
    east: -47.53236284795203,
}

const mapProps = {
    center: {
        lat: -21.186,
        lng: -47.724
    },
    restriction: {
        latLngBounds: mapBounds,
        strictBounds: false,
    },
    zoom: 12,
    minZoom: 11.7,
    disableDefaultUI: true,
    styles: [{
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [{
                "color": "#b9b9bd"
            }]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#babbbf"
                },
                {
                    "saturation": "-72"
                },
                {
                    "lightness": "3"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "all",
            "stylers": [{
                "color": "#d5d7a4"
            }]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "all",
            "stylers": [{
                "color": "#7d8f56"
            }]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [{
                "color": "#7d8f56"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "all",
            "stylers": [{
                    "color": "#a9ac70"
                },
                {
                    "lightness": "15"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#ad6f6c"
                },
                {
                    "saturation": "0"
                },
                {
                    "lightness": "15"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "saturation": "20"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "lightness": "30"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "lightness": "50"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                    "color": "#90bdca"
                },
                {
                    "lightness": "10"
                }
            ]
        }
    ]
}

function createTalesButton() {
    const controlButton = document.createElement("button");
    // Set CSS for the control.
    controlButton.style.margin = "10px"
    controlButton.style.backgroundImage = "url('/assets/LogoTales.png')"
    controlButton.style.backgroundSize = "100%"
    controlButton.style.width = "300px"
    controlButton.style.height = "53px"
    controlButton.style.border = "none";
    controlButton.style.backgroundColor = "rgba(0,0,0,0)";
    controlButton.style.cursor = "pointer";
    // controlButton.style.borderRadius = "3px";
    // controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    // controlButton.style.lineHeight = "38px";
    // controlButton.style.margin = "8px 0 22px";
    // controlButton.style.padding = "0 5px";
    // controlButton.style.textAlign = "center";
    // controlButton.textContent = "Center Map";
    // controlButton.title = "Click to recenter the map";
    controlButton.type = "button";
    // Setup the click event listeners: simply set the map to Chicago.
    controlButton.addEventListener("click", () => {
        legend.classList.toggle("disabled")
    });
    return controlButton;
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), mapProps);
    drawCircle();
    drawLines();

    // Create the DIV to hold the control.
    const centerControlDiv = document.createElement("div");
    // Create the control.
    const centerControl = createTalesButton(map);
    // Append the control to the DIV.
    centerControlDiv.appendChild(centerControl);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(legend);
    
    // showClickedCoordinates();
}

function drawLines() {
    const lines = [
        lineCoordinates1 = [
            { lat: -21.131289226375387, lng: -47.61913042607703 },
            { lat: -20.955054683444235, lng: -47.32867937627234 },
        ],
        lineCoordinates2 = [
            { lat: -21.133311819263618, lng: -47.61749177679832 },
            { lat: -21.011552542045507, lng: -47.41786443301641 },
        ]
    ];

    for (let i = 0; i < lines.length; i++) {
        
        const flightPath = new google.maps.Polyline({
            path: lines[i],
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        flightPath.setMap(map);
    }
}

function showClickedCoordinates() {
    let infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(map, 'click', (mapsMouseEvent) => {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng
        });

        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
        console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
    });
}

function drawCircle() {
    var reactorOutterCircle = new google.maps.Circle({
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#FFFFFF",
        fillOpacity: 0,
        map: map,
        center: {
            lat: -21.200,
            lng: -47.689
        },
        radius: 10500,
        clickable: false
    });
    var reactorInnercircle = new google.maps.Circle({
        strokeColor: "#b59b47",
        strokeOpacity: 0.5,
        strokeWeight: 15,
        fillColor: "#FFFFFF",
        fillOpacity: 0,
        map: map,
        center: {
            lat: -21.200,
            lng: -47.689
        },
        radius: 9580,
        clickable: false
    });


}

initMap();