let optionsButtons = document.querySelectorAll(".option-button"); //forEach()で順番に取り出せる
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive"
];

// 初期化
const intializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => { //'check'リスナー要素の状態が変更された時に発動する
        modifyText(button.id, false, button.value); //button.valueは変更された値を返す
        // console.log(button.value);
    });
});

linkButton.addEventListener("click", () => {
    //引数に指定した内容をポップアップ(プロンプト)で出す
    // userLinkにポップアップに入力した文字列が入る
    let userLink = prompt("Enter a URL?");

    // /で始まり/でお話文は正規表現リテラル
    // iは正規表現の大文字を小文字を区別しないことを意味する
    // .text()は指定した文字列が正規表現にマッチするかを判断する。
    // マッチしたらtrueを、そうでない場合はfalseを返す
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink); //
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// needsRemovalでtrueが設定されたボタンはどれかのボタンが.activeクラスを持つときはそれ以外のボタンが.activeクラスを持てないように制御するため
// 言い換えると、両立できなボタンのどれかひとつだけを選択状態にする(.activeクラスを持たせる)ことを可能にするため
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) { //ボタンが既に.activeクラスを持っているか判別する
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active"); //.activeクラスを追加
                }
            } else {
                button.classList.toggle("active"); //toggle()は引数のクラスを持っていればクラスが削除され持っていなければ追加される
            }
        });
    });
};

// activeクラスを削除するアロー関数
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active"); //.activeクラスを削除
    });
};

window.onload = intializer();