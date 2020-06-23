import React from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from 'react-leaflet';
import { latLng } from 'leaflet';
import { List } from 'antd';

import './Map.css';

function Map({ data, height }) {
  const currentCoords = [data.latitude, data.longitude];
  const listData = [
    {
      title: 'IP Address',
      description: data.ip,
    },
    {
      title: 'Country',
      description: data.country,
    },
    {
      title: 'Region',
      description: data.region ?? 'Unknown',
    },
    {
      title: 'City',
      description: data.city ?? 'Unknown',
    },
    {
      title: 'Organization',
      description: data.organization,
    },
  ];

  const bounds = latLng(currentCoords).toBounds(data.accuracy * 1000 * 2);

  return (
    <div className="mapContainer" style={{ height }}>
      <LeafletMap
        className="map"
        center={currentCoords}
        bounds={bounds}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={currentCoords}>
          <Popup className="map__popup">
            <List
              dataSource={listData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Popup>
        </Marker>

        <Circle center={currentCoords} radius={data.accuracy * 1000} />
      </LeafletMap>
    </div>
  );
}

export default Map;
