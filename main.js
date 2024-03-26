import {getPromise, postPromise} from "./api.js"
import {renderComments} from "./render.js"
import {initEventListeners, AddComment, answerComment} from "./listeners.js"
import { normalizeComments } from "./helpers.js";
const commentsLoading = document.querySelector('.data-loading');



const inputNameElement = document.querySelector(".add-form-name");
const inputTextElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
// Переносим данные из разметки
export let comments = [];
export function setComments(newComments) {
  comments = newComments;
}
export const fetchPromiseGet = () => {
  getPromise().then((responseData) => {
    // console.log(responseData);

    const appComments = normalizeComments(responseData.comments)
    // получили данные и рендерим их в приложении
    comments = appComments;
    
    //console.log(comments)
    renderComments({comments});
    
  })
};
fetchPromiseGet();
AddComment();



console.log("It works!");

// Чтобы форма отправлялась клавишей Enter
inputTextElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonElement.click();
  }
});
//удаление последнего комментария

const buttonElementDel = document.querySelector(".delete-form-button");

if (buttonElementDel) {
  buttonElementDel.addEventListener("click", () => {
    comments.pop();
    renderComments({comments, initEventListeners, answerComment});
  });
} else {
  console.error("Элемент не найден в DOM");
}
//console.log("It works!");