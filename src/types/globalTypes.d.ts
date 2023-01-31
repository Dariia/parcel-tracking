interface GoogleInterfaceProps {
  maps: {
    Circle: google.maps.Circle;
    Map: google.maps.Map;
    Marker: google.maps.Marker;
  }
}

declare global {
  interface Window {
    google: GoogleInterfaceProps;
  }
}
