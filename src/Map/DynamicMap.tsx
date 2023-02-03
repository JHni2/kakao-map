import { ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { KakaoMapContext } from '../hooks/useMap'

interface DynamicMapProps {
  children: ReactNode
}

export default function DynamicMap(props: DynamicMapProps) {
  const kakaoMapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<kakao.maps.Map>()

  useEffect(() => {
    if (!kakaoMapRef.current) {
      return
    }

    // 지도 생성하는 코드
    const targetPoint = new kakao.maps.LatLng(33.450701, 126.570667)
    const options = {
      center: targetPoint,
      level: 3,
    }

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, options))
  }, [])

  return (
    <>
      <Continaer>
        <Map ref={kakaoMapRef} />
      </Continaer>
      {map ? (
        <KakaoMapContext.Provider value={map}>{props.children}</KakaoMapContext.Provider>
      ) : (
        <div>지도 정보를 가져오는 데 실패했습니다.</div>
      )}
    </>
  )
}

const Continaer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const Map = styled.div`
  position: static;
  width: 100%;
  height: 100%;
`
