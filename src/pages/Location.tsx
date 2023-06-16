import { LoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import Clock from "./Clock";
import KakaoShare from "./KakaoShare";
import { useClock, useCurrentLocation } from "../hooks";

const Location = () => {
  const { coordinates, address, isLoading, fetchCurrentLocation } =
    useCurrentLocation();

  const containerStyle = {
    width: "100%",
    height: "50vh",
    maxWidth: "100%",
    margin: "0 auto",
  };

  const today = useClock();

  if (!isLoading) {
    return (
      <LoadScript googleMapsApiKey="AIzaSyD7qVVLtW__w3qzqW5H4GejMYtTR7OGb5E">
        <div
          className="container"
          style={{ maxWidth: "960px", margin: "0 auto", padding: "20px" }}
        >
          <h1>나는 어디에 있을까?</h1>
          <button
            onClick={fetchCurrentLocation}
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            {isLoading ? "로딩 중..." : "내 위치 가져오기"}
          </button>
          <KakaoShare coordinates={coordinates} address={address} />
          <p id="latitude" style={{ marginBottom: "10px" }}>
            위도: <span>{coordinates.lat}</span>
          </p>
          <p id="longitude" style={{ marginBottom: "10px" }}>
            경도: <span>{coordinates.lng}</span>
          </p>
          <p id="address" style={{ marginBottom: "10px" }}>
            주소: <span>{address}</span>
          </p>
          <Clock today={today} />

          <div style={{ position: "relative", paddingBottom: "50%" }}>
            <GoogleMap
              id="map"
              mapContainerStyle={containerStyle}
              center={coordinates}
              zoom={15}
              options={{
                fullscreenControl: false,
              }}
            >
              <MarkerF position={coordinates} />
            </GoogleMap>
          </div>
        </div>
      </LoadScript>
    );
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyD7qVVLtW__w3qzqW5H4GejMYtTR7OGb5E">
      <div
        className="container"
        style={{ maxWidth: "960px", margin: "0 auto", padding: "20px" }}
      >
        <h1>나는 어디에 있을까?</h1>
        <button
          onClick={fetchCurrentLocation}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        >
          {isLoading ? "로딩 중..." : "내 위치 가져오기"}
        </button>
        <p id="latitude" style={{ marginBottom: "10px" }}>
          위도: <span>{coordinates.lat}</span>
        </p>
        <p id="longitude" style={{ marginBottom: "10px" }}>
          경도: <span>{coordinates.lng}</span>
        </p>
        <p id="address" style={{ marginBottom: "10px" }}>
          주소: <span>{address}</span>
        </p>
        <Clock today={today} />

        <div style={{ position: "relative", paddingBottom: "50%" }}>
          <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
            options={{
              fullscreenControl: false,
            }}
          >
            <MarkerF position={coordinates} />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
};

export default Location;
