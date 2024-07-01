/*
	레벨 1 단계  - js 파일을 하나에 class 문서 파일로 생각해보자. 
	// 변수 선언 및 초기화 
	// 함수 선언 1 
	// 함수 선언 2(이벤트 리스너 등록 및 이벤트 핸들러 처리) 
	// 이벤트 리스너 함수 실행 확인
	// 전체 DOMContentLoaded 이벤트 처리 하기 
*/
document.addEventListener('DOMContentLoaded', () => {
	// DOM 요소 선택 
	const inputs = document.querySelectorAll(".inputs");
	const checkIdBtn = document.getElementById("checkIdBtn");
	const signUpBtn = document.getElementById("signUpBtn");
	const today = new Date();
	
	// todo 삭제 예정
	console.log("inputs", inputs);
	console.log("inputs[0]", inputs[0]);
	console.log("checkIdBtn", checkIdBtn);
	console.log("signUpBtn", signUpBtn);
	console.log("today", today);
	
	
	// 로컬 스토리지에서 사용자 정보를 가져오는 함수
	function getUserInfo() {
	    // 1. 로컬 스토리지에서 "userList"라는 키에 저장된 데이터를 가져옵니다.
	    let userListString = localStorage.getItem("userList");
	
	    // 2. 가져온 데이터가 null인지 확인합니다.
	    if (userListString === null) {
	        // 3. 데이터가 null이면 userInfo에 빈 배열을 할당합니다.
	        return [];
	    } else {
	        // 4. 데이터가 null이 아니면 JSON 문자열을 JavaScript 객체로 변환합니다.
	        return JSON.parse(userListString);
	    }
	}
	
	
	// todo 삭제 예정 -  테스트 
	// 로컬 스토리지에 데이터가 있는 경우
	localStorage.setItem("userList", JSON.stringify([{ username: "tenco" }]));
	// 로컬 스토리지에 삭제 
	localStorage.removeItem("userList");
	
	// todo 삭제 예정
	let userInfo = getUserInfo();
	console.log("userInfo", userInfo);
	
	// 함수 설계 1 -  아이디 중복 확인 함수
	function checkDuplicateId() {
		const username = inputs[0].value.trim();
		console.log("username", username);
		
		if(username === "") {
			alert("아이디를 입력하세요");
			inputs[0].focus();
			return;  
		}
		
		// 중복 아이디 여부를 확인하는 변수
	    let isDuplicateId = false;	
	    
	     // userInfo 배열을 순회하며 중복된 아이디가 있는지 확인
	    for (let i = 0; i < userInfo.length; i++) {
	        if (userInfo[i].username === username) {
	            isDuplicateId = true;
	            break;
	        }
	    }
	    
	    // 중복 아이디 여부에 따른 처리
	    if (isDuplicateId) {
	        alert("중복된 아이디 입니다.");
	        inputs[0].focus();
	    } else {
	        alert("사용 가능한 아이디입니다.");
	        inputs[0].readOnly = true;
	        inputs[0].style.backgroundColor = "yellow";
	    }
	}
	
	
	// 함수 설계 2 -  회원 가입 함수
	
	// 회원가입 함수
	function registerUser() {
	    
	    const username = inputs[0];
	    const nickname = inputs[1];
	    const password = inputs[2];
	    const confirmPassword = inputs[3];
		
		// 스크립트 유효성 검사 	
	  	if (!username.readOnly) {
	        alert("아이디 중복확인을 해주세요!");
	        username.focus();
	        return;
	    }   
	    
	    if (nickname.value.trim() === "") {
	        alert("닉네임을 입력해주세요!");
	        nickname.focus();
	        return;
	    }
		
		if (password.value.trim() === "") {
	        alert("비밀번호를 입력해주세요!");
	        password.focus();
	        return;
	    }
	    
	    if (password.value !== confirmPassword.value) {
	        alert("비밀번호가 일치하지 않습니다. 확인해주세요!");
	        password.focus();
	        return;
	    }
	    
	  	// 새로운 사용자 객체 생성
	    const newUser = {
	        username: username.value,
	        nickname: nickname.value,
	        password: password.value,
	        today: today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate()
	    };
	     // 새로운 사용자 정보를 userInfo 배열에 추가
	    userInfo.push(newUser);
	    // userInfo 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
	    localStorage.setItem("userList", JSON.stringify(userInfo));
	    alert("회원가입이 완료되었습니다!"); // 회원가입 완료 메시지 표시
	    
	    // 로그인 페이지로 이동
	    window.location.href = "signin.html";
	}
	
	// 이벤트 바인딩 함수
	function bindEvents() {
	    checkIdBtn.addEventListener('click', checkDuplicateId);
	    signUpBtn.addEventListener('click', registerUser);
	}
	
	// 함수 호출
	bindEvents();

});

