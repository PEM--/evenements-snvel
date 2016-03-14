// Namespace flatteinng
const { Views, Col } = MainApp;
const { Spinner } = Views;

// Client only
if (Meteor.isClient) {
  // Load GoogleMaps
  Meteor.startup(() => {
    GoogleMaps.load();
    console.log('Google map loaded');
  });

  // Customize GoogleMaps
  Template.BlazeContainerMap.onCreated(() => {
    // this.handle = SD.Structure.dictionary.subAll();
  });
  Template.BlazeContainerMap.helpers({
    mapOptions: () => {
      if (GoogleMaps.loaded()) {
        const program = Template.instance().data.program;
        // Add a marker at the middle of the map which is already centered on the event
        GoogleMaps.ready('map', (map) => {
          $('.SpinnerContainer').velocity('transition.fadeOut');
          $('.googlemapContainer').velocity('transition.fadeIn');
          const marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            // Animate the marker with a bounce effect
            animation: google.maps.Animation.DROP,
            title: program.location,
            icon: {
              url: '/img/pin.svg',
              size: new google.maps.Size(40, 55),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(20, 55)
            }
          });
          // marker.addListener('click', () => {
          //   window.open(this.dict.location.site);
          // });
        });
        return {
          center: new google.maps.LatLng(
            program.lattitude,
            program.longitude),
          zoom: Number(program.zoom),
          scrollwheel: false,
          panControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [
                {
                  saturation: 1
                }, {
                  lightness: 1
                }, {
                  gamma: 1
                }
              ]
            }, {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'on'
                }
              ]
            }, {
              featureType: 'all',
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'on'
                }
              ]
            }, {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [
                {
                  visibility: 'on'
                }
              ]
            }, {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: palette.textColor
                }, {
                  weight: 5.0
                }
              ]
            }, {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: palette.canvasColor
                }
              ]
            }, {
              featureType: 'all',
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [
                {
                  color: palette.canvasColor
                }
              ]
            }, {
              featureType: 'administrative.country',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'administrative.province',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'administrative.province',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'administrative.locality',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'on'
                }, {
                  weight: 3.0
                }
              ]
            }, {
              featureType: 'administrative.locality',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'administrative.neighborhood',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'administrative.neighborhood',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'administrative.land_parcel',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [
                {
                  color: palette.canvasColor
                }
              ]
            }, {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                {
                  color: palette.canvasColor
                }
              ]
            }, {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [
                {
                  color: palette.primary3Color
                }
              ]
            }, {
              featureType: 'road.highway',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: palette.primary2Color
                }, {
                  lightness: 60
                }, {
                  weight: 1.5
                }
              ]
            }, {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: palette.primary2Color
                }
              ]
            }, {
              featureType: 'road.arterial',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: palette.textColor
                }, {
                  lightness: 60
                }, {
                  weight: 0.2
                }
              ]
            }, {
              featureType: 'road.arterial',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: palette.textColor
                }, {
                  weight: 0.2
                }
              ]
            }, {
              featureType: 'road.arterial',
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'road.local',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }, {
              featureType: 'transit',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: palette.textColor
                }, {
                  lightness: 40
                }, {
                  weight: 2.0
                }
              ]
            }, {
              featureType: 'transit',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: palette.textColor
                }
              ]
            }, {
              featureType: 'transit.station.rail',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'on'
                }, {
                  hue: palette.primary2Color
                }
              ]
            }, {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: palette.primary3Color
                }, {
                  lightness: 60
                }
              ]
            }, {
              featureType: 'water',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: palette.primary3Color
                }
              ]
            }
          ]
        };
      }
    }
  });
}

// GoogleMap compoment
class GoogleMap extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne({reference: 'univ2016'}, {
        fields: {location: 1, longitude: 1, lattitude: 1, zoom: 1}
      })
    };
  }
  render() {
    return (
      <div className='googlemap'>
        <Spinner />
        <div ref='googlemapContainer' className='googlemapContainer' />
      </div>
    );
  }
  componentDidMount() {
    this.view = Blaze.renderWithData(
      Template.BlazeContainerMap,
      {program: this.data.program},
      ReactDOM.findDOMNode(this.refs.googlemapContainer)
    );
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
}

Views.GoogleMap = GoogleMap;
