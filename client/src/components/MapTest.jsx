/* global kakao */
import React, { useEffect } from 'react'
import { Container } from 'reactstrap'

const markerDatas = [
  { lat: 37.5248133563581, lng: 126.72950461760632 },
  { lat: 37.52660023477295, lng: 126.72568274231172 },
]

export default function MapTest() {
  useEffect(() => {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new window.kakao.maps.LatLng(
          37.5248133563581,
          126.72950461760632
        ),
        level: 7,
      }

    const map = new window.kakao.maps.Map(mapContainer, mapOption)

    // marker 등록 하기
    // let marker = new window.kakao.maps.Marker({
    //   map: map,
    //   position: new window.kakao.maps.LatLng(
    //     37.5248133563581,
    //     126.72950461760632
    //   ),
    // })

    // marker 여러개 등록 하기
    for (let i = 0; i < markerDatas.length; i++) {
      let data = markerDatas[i]
      let marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(data.lat, data.lng),
      })
    }
  }, [])
  return (
    <Container id='map' style={{ width: '100%', height: '500px' }}></Container>
  )
}
