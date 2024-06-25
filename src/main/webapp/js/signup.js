/**
 * 
 */
 const inputs = document.querySelectorAll(".inputs");
 const [checkIdBtn, signUpBtn] = document.querySelectorAll("button");
 
 console.log("object : " + inputs);
 for (let i = 0; i < inputs.length; i++) {
    console.log(`object[${i}]:`, inputs[i]);
    console.log(`typeOf:`,  inputs[i]);
}
 console.log("size : " + inputs.length);
 
 // 로컬 스토리지에서 사용자 목록을 가져옴
const userInfo = JSON.parse(localStorage.getItem("userList")) || [];

// 중복 확인용 변수
let isDuplicateId = false;

// 현재 날짜 객체 생성
const today = new Date();


// 아이디 중복 확인 버튼 클릭 이벤트
checkIdBtn.onclick = () => {
    const username = inputs[0].value.trim();

    if (username === "") {
        alert("아이디를 입력하세요!");
        inputs[0].focus();
        return;
    }

    isDuplicateId = userInfo.some(user => user.username === username);

    if (isDuplicateId) {
        alert("중복된 아이디 입니다.");
        inputs[0].focus();
    } else {
        alert("사용 가능한 아이디입니다.");
        inputs[0].readOnly = true;
        inputs[0].style.backgroundColor = "yellow";
    }
}

// 회원가입 버튼 클릭 이벤트
signUpBtn.onclick = () => {
    const [username, nickname, password, confirmPassword] = inputs;

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

    // 사용자 정보 객체 생성
    const newUser = {
        username: username.value,
        nickname: nickname.value,
        password: password.value,
        today: `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`
    };

    // 사용자 목록에 새 사용자 추가
    userInfo.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userInfo));

    alert("회원가입이 완료되었습니다!");

    // 로그인 페이지로 이동
    window.location.href = "signin.html";
}
