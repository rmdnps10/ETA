import React, {useEffect} from "react";
import {
    Button,
    ButtonWrapper,
    Icon,
    Label,
    TransportModalBox,
    TransportModalContainer,
} from "./TransportModal";
import homeIcon from "../../assets/images/home.svg";
import {ModalProps} from "./CalendarModal";
import {useRecoilState, useRecoilValue} from "recoil";
import {home_address, home_address_lat, home_address_lng, ready_time} from "../../state/atom.ts";

function HomeModal({isDisplay, setIsDisplay}: ModalProps) {
    const [homeAddress, setHomeAddress] = useRecoilState(home_address);
    const [homeAddressLat, setHomeAddressLat] = useRecoilState(home_address_lat);
    const [homeAddressLng, setHomeAddressLng] = useRecoilState(home_address_lng);
    let address = homeAddress;

    if (!document.querySelector(`script[src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]`)) {
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    }

    const cancelHandler = () => {
        setIsDisplay(false);
    };
    const checkHandler = async () => {
        let geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?" +
            "address=" +
            encodeURI(address) +
            "&region=ko&" +
            `key=${process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY}`

        const cor_response = await fetch(geoUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        const cor = await cor_response.json();
        if (cor.results.length !== 0) {
            let coordinate = cor.results[0].geometry.location;
            localStorage.setItem("home_address_lat", coordinate.lat);
            localStorage.setItem("home_address_lng", coordinate.lng);
            localStorage.setItem("home_address", address);

            setHomeAddressLat(localStorage.getItem("home_address_lat"));
            setHomeAddressLng(localStorage.getItem("home_address_lng"));
            setHomeAddress(localStorage.getItem("home_address"));
        }

        setIsDisplay(false);
    };

    useEffect(() => {
        let element_layer = document.getElementById("layer");
        const closeDaumPostcode = () => {
            // iframe을 넣은 element를 안보이게 한다.
            element_layer.style.display = 'none';
        }
        const sample2_execDaumPostcode = () => {
            new daum.Postcode({
                oncomplete: function (data) {
                    // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    let addr = ''; // 주소 변수
                    let extraAddr = ''; // 참고항목 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                    } else {
                    }
                    console.log(`set home ${addr}`)
                    address = addr;
                    checkHandler();
                },
                width: '100%',
                height: '100%',
                maxSuggestItems: 5
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            // element_layer.style.display = 'block';

            // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
            initLayerPosition();
        }

        const initLayerPosition = () => {
            var width = 300; //우편번호서비스가 들어갈 element의 width
            var height = 400; //우편번호서비스가 들어갈 element의 height
            var borderWidth = 5; //샘플에서 사용하는 border의 두께

            // 위에서 선언한 값들을 실제 element에 넣는다.
            element_layer.style.width = width + 'px';
            element_layer.style.height = height + 'px';
            element_layer.style.border = borderWidth + 'px solid';
            // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
            element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth) + 'px';
            element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth) + 'px';
        }

        if (isDisplay) {
            sample2_execDaumPostcode();
        }
    }, [isDisplay]);
    return (
        <TransportModalBox style={{display: `${isDisplay ? "flex" : "none"}`}}>
            <TransportModalContainer>
                <Icon src={homeIcon}/>
                <Label>집 주소 설정</Label>
                <div id={"layer"}/>
                <ButtonWrapper>
                    <Button onClick={cancelHandler}>취소</Button>
                </ButtonWrapper>
            </TransportModalContainer>
        </TransportModalBox>
    );
}

export default HomeModal;
