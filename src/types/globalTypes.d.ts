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

declare module "framer-motion/dist/framer-motion" {
  export * from "framer-motion";
}
