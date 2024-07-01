
/**
 * 레벨 2 단계 
 * 객체 표기법으로 변경해보기 
 */
window.addEventListener('load', () => {
    // 회원가입 객체 정의
    const SignUp = {
        // 변수 선언 및 초기화
        inputs: document.querySelectorAll(".inputs"),
        checkIdBtn: document.getElementById("checkIdBtn"),
        signUpBtn: document.getElementById("signUpBtn"),
        today: new Date(),
        // 논리 연산자(||)의 특성 : 단락 평가(short-circuit evaluation)
        // 첫 번째 피연산자가 true로 평가되면 그 값을 반환하고, 그렇지 않으면 두 번째 피연산자의 값을 반환합니다
        userInfo: JSON.parse(localStorage.getItem("userList")) || [],
        
        // 초기화 함수
        init() {
            this.bindEvents();
        },
        // 아이디 중복 확인 함수
        checkDuplicateId() {
            const username = this.inputs[0].value.trim();
            console.log("username", username);

            if (username === "") {
                alert("아이디를 입력하세요!");
                this.inputs[0].focus();
                return;
            }
			
		    // some() 함수: 배열의 요소 중 하나라도 조건을 만족하면 true를 반환, 아니면 false
            let isDuplicateId = this.userInfo.some(user => user.username === username);

            if (isDuplicateId) {
                alert("중복된 아이디 입니다.");
                this.inputs[0].focus();
            } else {
                alert("사용 가능한 아이디입니다.");
                this.inputs[0].readOnly = true;
                this.inputs[0].style.backgroundColor = "yellow";
            }
        },

        // 회원가입 함수
        registerUser() {
            const username = this.inputs[0];
            const nickname = this.inputs[1];
            const password = this.inputs[2];
            const confirmPassword = this.inputs[3];

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

            if (confirmPassword.value.trim() === "") {
                alert("비밀번호를 확인해주세요!");
                confirmPassword.focus();
                return;
            }

            if (password.value !== confirmPassword.value) {
                alert("비밀번호가 일치하지 않습니다. 확인해주세요!");
                password.focus();
                return;
            }

            const newUser = {
                username: username.value,
                nickname: nickname.value,
                password: password.value,
                today: `${this.today.getFullYear()}.${this.today.getMonth() + 1}.${this.today.getDate()}`
            };

            this.userInfo.push(newUser);
            localStorage.setItem("userList", JSON.stringify(this.userInfo));
            alert("회원가입이 완료되었습니다!");
            window.location.href = "signin.html";
        },

        // 이벤트 바인딩 함수
        bindEvents() {
			// 화살표 함수 안에서는 this 사용 권장 
			// this.checkDuplicateId() 객체 내부의 메서드 호출
            this.checkIdBtn.addEventListener('click', () => this.checkDuplicateId());
            this.signUpBtn.addEventListener('click', () => this.registerUser());
        }
    };

    // 객체 초기화
    SignUp.init();
});
