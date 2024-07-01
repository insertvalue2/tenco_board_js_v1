/**
 * 
 */

 // DOM 요소 선택
const inputs = document.querySelectorAll(".inputs");
const checkIdBtn = document.getElementById("checkIdBtn");
const signUpBtn = document.getElementById("signUpBtn");
let userInfo = JSON.parse(localStorage.getItem("userList")) || [];
const today = new Date();

// 아이디 중복 확인 함수
function checkDuplicateId() {
    const username = inputs[0].value.trim();

    if (username === "") {
        alert("아이디를 입력하세요!");
        inputs[0].focus();
        return;
    }

    const isDuplicateId = userInfo.some(function(user) {
        return user.username === username;
    });

    if (isDuplicateId) {
        alert("중복된 아이디 입니다.");
        inputs[0].focus();
    } else {
        alert("사용 가능한 아이디입니다.");
        inputs[0].readOnly = true;
        inputs[0].style.backgroundColor = "yellow";
    }
}

// 회원가입 함수
function registerUser() {
    const username = inputs[0];
    const nickname = inputs[1];
    const password = inputs[2];
    const confirmPassword = inputs[3];

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
        today: today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate()
    };

    userInfo.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userInfo));

    alert("회원가입이 완료되었습니다!");

    window.location.href = "signin.html";
}

// 이벤트 바인딩
checkIdBtn.addEventListener('click', checkDuplicateId);
signUpBtn.addEventListener('click', registerUser);
