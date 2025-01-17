import React, { useEffect } from 'react';
const {kakao}=window;

const ResultMapRander = ({placeData}) => {
    const mapRandersPlaceData=[...placeData];

    useEffect(()=>{
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(0,0), // 지도의 중심좌표
                level: 3, // 지도의 확대 레벨
            };  
        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption);
        var linePath=[];
        var bounds=new kakao.maps.LatLngBounds();// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다

        var marker,i;
        for(i=0; i<mapRandersPlaceData.length; i++){
            const {place_name, x, y}=mapRandersPlaceData[i];
            const WGS84=new kakao.maps.LatLng(y,x);
            const WTM= WGS84.toCoords();
            var temp;//장소이름 임시저장

            if(mapRandersPlaceData[i-1]===undefined){
                temp='';
            }else{
                temp=mapRandersPlaceData[i-1].place_name;
            };

            linePath.push(WGS84);

            marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: WGS84, // 마커를 표시할 위치
                title : place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다 
                clickable:true
            });
            marker.setMap(map);
            bounds.extend(linePath[i]);// LatLngBounds 객체에 좌표를 추가합니다

            // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var iwContent = `<div style="padding:8px;white-space:nowrap;">${i+1} : ${place_name}<br><a href="https://map.kakao.com/?map_type=TYPE_MAP&target=transit&rt=${',,'+WTM.La+','+WTM.Ma}&rt1=${temp}&rt2=${place_name}&rtIds=%2C&rtTypes=%2C" style="color:blue" target="_blank">길찾기</a></div>`,
                iwPosition = WGS84, //인포윈도우 표시 위치입니다
                iwRemoveable = true;

            var infowindow = new kakao.maps.InfoWindow({
                position : iwPosition, 
                content : iwContent,
                removable: iwRemoveable
            });
            
            kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
        };

        var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#f2020a', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        polyline.setMap(map);

        function setBounds(){
            // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
            // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
            map.setBounds(bounds);
        };
        setBounds();

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        };

    },[placeData]);

    return (
        <div id="map" style={{width:'100%', height:'500px'}}></div>
    );
};
export default ResultMapRander;