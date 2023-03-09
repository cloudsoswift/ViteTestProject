import { useEffect } from "react";

declare global {
  interface Window {
    naver: naver.maps.Map;
  }
}

const MapPage = () => {
  useEffect(() => {
    console.log(window.naver);
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
  });
  return <div id="map" className="w-screen h-96 mt-10"></div>;
};

export default MapPage;
