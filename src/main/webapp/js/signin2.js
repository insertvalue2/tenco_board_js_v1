// 로그인 객체 정의
const Login = {
    // 변수 선언 및 초기화
    inputs: document.querySelectorAll(".inputs"),
    btn: document.querySelector("button"),
    userList: JSON.parse(localStorage.getItem("userList")),

    // 초기화 함수
    init() {
        this.bindEvents();
    },

    // 이벤트 바인딩 함수
    bindEvents() {
        this.btn.addEventListener('click', () => this.handleLogin());
    },

    // 로그인 처리 함수
    handleLogin() {
        // 아이디 입력 필드가 비어 있는지 확인
        if (this.inputs[0].value.trim() === "") {
            alert("아이디를 입력하세요!");
            this.inputs[0].focus(); // 아이디 입력 필드에 포커스
            return; // 함수 종료
        }

        // 비밀번호 입력 필드가 비어 있는지 확인
        if (this.inputs[1].value.trim() === "") {
            alert("비밀번호를 입력하세요!");
            this.inputs[1].focus(); // 비밀번호 입력 필드에 포커스
            return; // 함수 종료
        }

        // 사용자 목록이 존재하는지 확인
        if (this.userList !== null) {
            // 사용자 목록을 순회하며 입력된 아이디와 일치하는 사용자 찾기
            for (let i = 0; i < this.userList.length; i++) {
                // 아이디가 일치하는지 확인
                if (this.userList[i].username === this.inputs[0].value) {
                    // 비밀번호가 일치하는지 확인
                    if (this.userList[i].password !== this.inputs[1].value) {
                        alert("비밀번호가 틀립니다.");
                        this.inputs[1].focus(); // 비밀번호 입력 필드에 포커스
                        return; // 함수 종료
                    }

                    // 로그인 성공 시, 사용자 정보를 로컬 스토리지에 저장하고 페이지 이동
                    localStorage.setItem("user", i); // 현재 로그인된 사용자 인덱스를 로컬 스토리지에 저장
                    location.href = "http://127.0.0.1:8080/html/board.html"; // 게시판 페이지로 이동
                    return; // 함수 종료
                }
            }

            // 아이디가 사용자 목록에 없는 경우
            alert("사용자 정보를 찾을 수 없습니다.");
        } else {
            // 사용자 목록이 없는 경우
            alert("사용자 정보가 없습니다.");
        }
    }
};

// 객체 초기화
Login.init();
