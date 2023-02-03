import { ReactNode, useEffect, useState } from 'react'

const KAKAO_MAP_SCRIPT_ID = 'kakao-map-script'
const KAKAO_MAP_APP_KEY = process.env.KAKAO_MAP_KEY

interface KakaoMapScriptLoaderProps {
  children: ReactNode
}

const KakaoMapScriptLoader = (props: KakaoMapScriptLoaderProps) => {
  const [mapScriptLoaded, setmMpScriptLoaded] = useState(false)

  useEffect(() => {
    const mapScipt = document.getElementById(KAKAO_MAP_SCRIPT_ID)

    if (mapScipt && !window.kakao) {
      return
    }

    const script = document.createElement('script')
    script.id = KAKAO_MAP_SCRIPT_ID
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => {
        setmMpScriptLoaded(true)
      })
    }
    script.onerror = () => {
      setmMpScriptLoaded(false)
    }

    document.getElementById('root')?.appendChild(script)
  }, [])

  return <>{mapScriptLoaded ? props.children : <div>지도를 가져오는 중입니다.</div>}</>
}

export default KakaoMapScriptLoader
