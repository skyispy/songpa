const sign_data = JSON.parse(localStorage.getItem("sign_data"));
const login_data = JSON.parse(sessionStorage.getItem("login_status"));
function mypage(){
    const id = <HTMLElement>document.getElementById("id-text");
    // const id_btn = <HTMLButtonElement>document.getElementById("id-rpl");
    const pw = <HTMLInputElement>document.getElementById("pw-text1");
    const pw_re = <HTMLInputElement>document.getElementById("pw-text2");
    const pw_btn = document.getElementById("pw-rp")
    const name = <HTMLInputElement>document.getElementById("name-text");
    const name_btn = document.getElementById("name-rpl");
    id.innerHTML = login_data.userId
    name.value = login_data.userName;    
    pw_btn.addEventListener("click", () => {
        if(!strongPasswordRe(pw.value)){
            alert("영문 특수문자 포함 8자리 이상 입력해주세요");
            return;
        }
        if(pw.value !== pw_re.value){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if(confirm("정말 변경하시겠습니까?")){
            for(let i = 0; i < sign_data.length ; i++){
                if(login_data.userId === sign_data[i].userId){
                    sign_data[i].userPw = pw.value;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                    login_data.userPw = pw.value;
                    sessionStorage.setItem("login_status", JSON.stringify(login_data));
                    pw.value = "";
                    pw_re.value = "";
                    alert("비밀번호가 변경됐습니다.");
                    return;
                } 
            }
        }
    })
    name_btn.addEventListener("click", () => {
        if(confirm("정말 변경하시겠습니까?")){
            for(let i = 0; i < sign_data.length; i++){
                if(sign_data[i].userName === name.value){
                    alert("이미 있는 닉네임 입니다.");
                    return;
                }
            }
            for(let i = 0; i < sign_data.length; i++) {
                if (login_data.userName === sign_data[i].userName) {
                    login_data.userName = name.value;
                    sessionStorage.setItem("login_status", JSON.stringify(login_data));
                    sign_data[i].userName = name.value;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                    alert("닉네임이 변경됐습니다.")
                }
            }
            location.reload();
        }else{
            return;
        }
    })
}

mypage();

function strongPasswordRe(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

const profileDOM = document.getElementById("profile") as HTMLInputElement;
const imgProfile = document.getElementById("profileImg") as HTMLImageElement;
const createImg = document.createElement("createImg") as HTMLImageElement;
createImg.src;
const profileSave = document.getElementById("imgSave") as HTMLInputElement;
const basicImg = document.getElementById("basicImg") as HTMLInputElement;



// 이미지 값 세이브
function changeProfile(){
    for(let i = 0; i < sign_data.length; i++){
        if(login_data.userId === sign_data[i].userId){
            imgProfile.src = sign_data[i].profileImg 
        }
    }
}
changeProfile();

profileDOM.addEventListener("change", function(e){
    const imgName = JSON.stringify((e.target as HTMLInputElement).files[0].name);
    imgProfile.src = `http://127.0.0.1:5500/src/img/${imgName.split('"').join("")}`;
    profileSave.onclick = function(){
        if(confirm("프로필 사진을 변경하시겠습니까?")){
            for(let i = 0; i < sign_data.length; i++){
                if(login_data.userId === sign_data[i].userId){
                    sign_data[i].profileImg = imgProfile.src;
                    localStorage.setItem("sign_data", JSON.stringify(sign_data));
                }
            }
        } else{
            return;
        }
        
    }
});
basicImg.onclick = function(){
   if(confirm("기본이미지 변경하시겠습니까?")){
        for(let i = 0; i < sign_data.length; i++){
            if(login_data.userId === sign_data[i].userId){
                imgProfile.src = "http://127.0.0.1:5500/src/img/mypageIcon.png";
                sign_data[i].profileImg = imgProfile.src
                localStorage.setItem("sign_data", JSON.stringify(sign_data));
            }
        }
    } else{
        return;
    }
}



