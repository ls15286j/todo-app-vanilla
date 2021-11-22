import "./styles.css";

const incompleteList = document.getElementById("incomplete-list");
const completeList = document.getElementById("complete-list");

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  addIncompleteTODO(inputText);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

// 指定のリストから、指定の要素を削除する
const deleteFromList = (listElem, target) => {
  listElem.removeChild(target);
};

// 未完了リストに、TODOを追加する関数
const addIncompleteTODO = (text) => {
  // liタグ生成
  const li = document.createElement("li");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグ生成
  const p = document.createElement("p");
  p.className = "item-topic";
  p.innerText = text;

  // 完了ボタン生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 完了ボタンが押されたら、そのTODOを完了リストに移動する
    const removeTarget = completeButton.parentNode.parentNode;
    const div = completeButton.parentNode;
    const p = div.firstElementChild;

    // 戻すボタン
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      const backTarget = backButton.parentNode.parentNode;
      // 完了リストから、TODOを削除
      deleteFromList(completeList, backTarget);
      // TODOの内容を取得
      text = backButton.previousSibling.innerText;
      // 未完了TODOに追加
      addIncompleteTODO(text);
    });

    // divタグから、子要素を取り除く
    div.textContent = null;

    // divタグに新たな子要素を追加
    div.appendChild(p);
    div.appendChild(backButton);

    completeList.appendChild(removeTarget);
  });

  // 削除ボタン生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)の親タグ(li)を未完了リストから削除
    const deleteTarget = deleteButton.parentNode.parentNode;
    deleteFromList(incompleteList, deleteTarget);
  });

  // divタグ配下に、子要素を配置
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // liタグ配下に、divを配置
  li.appendChild(div);

  // 未完了リストに追加
  incompleteList.appendChild(li);
};
