class WriteSaveManager {
    constructor() {
        this.boardDataList = [];
    }
    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("board_data", JSON.stringify(this.boardDataList));
        }
        else {
            this.boardDataList = JSON.parse(a);
        }
    }
    setLocalStorage(a) {
        this.boardDataList.push(a);
        localStorage.setItem("board_data", JSON.stringify(this.boardDataList));
    }
    save() {
        this.getLocalStorage(localStorage.getItem("board_data"));
        const title = document.querySelector("#title");
        const content = document.querySelector("#content");
        const btnCancel = document.querySelector("#btn_cancel");
        const btnConfirm = document.querySelector("#btn_confirm");
        btnCancel.onclick = () => {
            if (confirm("글 작성을 취소하고 목록으로 돌아가시겠습니까? 작성중인 내용은 저장되지 않습니다.")) {
                location.href = "./board.html";
            }
            else {
                return;
            }
        };
        btnConfirm.onclick = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const writeData = {
                title: title.value,
                content: content.value,
                date: `${year}-${month}-${day}`
            };
            if (confirm("작성을 완료하시겠습니까? 작성중인 내용이 저장됩니다.")) {
                this.setLocalStorage(writeData);
                location.href = "./board.html";
            }
            else {
                return;
            }
        };
    }
}
const writeBoard = new WriteSaveManager;
writeBoard.save();
