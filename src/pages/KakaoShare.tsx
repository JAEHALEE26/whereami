// KakaoShare.tsx
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

interface KakaoShareProps {
  coordinates: { lat: Number; lng: Number };
  address: String;
}

export default function KakaoShare(props: KakaoShareProps): JSX.Element {
  useEffect(() => {
    kakaoButton();
  }, []);

  const kakaoButton = (): void => {
    if (window.Kakao) {
      const kakao: any = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init("02e378dc5fe3f9f70502c61ad46e5379");
      }

      kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "location",
        address: props.address || "",
        content: {
          title: props.address || "",
          description: "내 위치 전송입니다.",
          imageUrl:
            "https://maps.google.com/maps?q=${props.coordinates.lat}+${props.coordinates.lng}&hl=es&z=14&amp;output=embed",
          link: {
            mobileWebUrl:
              "https://maps.google.com/maps?q=${props.coordinates.lat}+${props.coordinates.lng}&hl=es&z=14&amp;output=embed",
            webUrl:
              "https://maps.google.com/maps?q=${props.coordinates.lat}+${props.coordinates.lng}&hl=es&z=14&amp;output=embed",
          },
        },
        buttons: [
          {
            title: "구글맵으로 보기",
            link: {
              mobileWebUrl:
                "https://maps.google.com/maps?q=${props.coordinates.lat}+${props.coordinates.lng}&hl=es&z=14&amp;output=embed",
              webUrl:
                "https://maps.google.com/maps?q=${props.coordinates.lat}+${props.coordinates.lng}&hl=es&z=14&amp;output=embed",
            },
          },
        ],
      });
    }
  };

  if (!props.address) {
    return (
      <button
        id="kakaotalk-sharing-btn"
        style={{
          padding: "10px 20px",
          marginLeft: "3%",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
        }}
        disabled
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      id="kakaotalk-sharing-btn"
      style={{
        padding: "10px 20px",
        marginLeft: "3%",
        backgroundColor: "#4caf50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
      }}
    >
      카카오톡 공유
    </button>
  );
}
