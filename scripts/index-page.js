import BandSiteApi from './band-site-api.js';
const api = new BandSiteApi('473e656b-a5a8-4cdf-8ca9-019edb1b076e');

class newComment {
    constructor(name, comment) {
        this.name = name;
        this.comment = comment;
    }
}

const commentList = document.getElementById('array-of-all-comments');
displayAllComments(); // display default comments

function removeAllComments() {
    while (commentList.firstChild) {
        commentList.firstChild.remove();
    }
}

async function displayAllComments() {
    removeAllComments();

    const comments = await api.getComments();
    comments.forEach((comment) =>
        commentList.append(createNewComment(comment))
    );
}

//create HTML and add CSS classes to the data
function createNewComment(commentData) {
    //make parent container
    let entireComment = createNewElement(
        'article',
        'comments-section__user-comment',
        undefined
    );
    entireComment.classList.add('comments-section__dividing-line');

    //make grey icon
    let icon = createNewElement(
        'div',
        'comments-section__user-icon',
        undefined
    );
    let iconContainer = createNewElement(
        'div',
        'comments-section__user',
        undefined
    );
    iconContainer.appendChild(icon);
    entireComment.appendChild(iconContainer);

    //make comment body
    let body = createCommentBody(commentData);
    entireComment.appendChild(body);
    return entireComment;
}

//create all the divs, subheaders and text.
function createCommentBody(commentData) {
    let container = createNewElement(
        'section',
        'comments-section__user-comment--container',
        undefined
    );
    let header = createCommentHeader(commentData);
    container.appendChild(header);
    let newCommentBody = createNewElement('p', undefined, commentData.comment);
    container.appendChild(newCommentBody);
    return container;
}

function createCommentHeader(commentData) {
    let header = document.createElement('div');
    header.classList.add('comments-section__user-comment--name-date-row');
    let newname = createNewElement('h5', undefined, commentData.name);
    header.appendChild(newname);
    let newDate = createNewElement(
        'p',
        'comments-section__user-comment--date',
        getTodaysDate(commentData.timestamp)
    );
    header.appendChild(newDate);
    return header;
}

//make code more DRY by feeding in tag, classes and content text and return an element.
function createNewElement(tag, classes, contentText) {
    if (tag == undefined) console.log("ERROR Tag can't be null");
    let newEl = document.createElement(tag);
    if (contentText != undefined) newEl.textContent = contentText;
    if (classes != undefined) newEl.classList.add(classes);
    return newEl;
}
// return formatted month/day/year string
// I did not use toLocaleDateString() becuase that method does not add leading 0 for months and days.
function getTodaysDate(timestamp) {
    let today;
    //if there is a timestamp then format timestamp to date.
    if (timestamp) today = new Date(timestamp);
    //otherwise set current day.
    else today = new Date();
    let year = today.getFullYear();
    let month = addZero(today.getMonth() + 1);
    let day = addZero(today.getDate());
    return month + '/' + day + '/' + year;
}

// add leading 0 if month or day is only 1 digit.
function addZero(number) {
    if (number < 10) return '0' + number;
    else return number;
}

let inputForm = document.getElementById('input-form');
inputForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    //check name and comment field both before returning.
    let returnNow = false;
    //check valid input
    if (
        event.target.userName.value == '' ||
        event.target.userName.value == 'Enter your name'
    ) {
        event.target.userName.classList.add(
            'comments-section__submission-form--error'
        );
        returnNow = true;
    }
    if (
        event.target.userComment.value == '' ||
        event.target.userComment.value == 'Add a new comment'
    ) {
        event.target.userComment.classList.add(
            'comments-section__submission-form--error'
        );
        returnNow = true;
    }
    //failstate triggere. end now
    if (returnNow) return;
    //remove red if input is valid.
    else {
        event.target.userName.classList.remove(
            'comments-section__submission-form--error'
        );
        event.target.userComment.classList.remove(
            'comments-section__submission-form--error'
        );
    }
    let newUserComment = new newComment(
        event.target.userName.value,
        event.target.userComment.value
    );

    //clear text fields
    event.target.userName.value = '';
    event.target.userComment.value = '';
    const response = await api.postComment(newUserComment);
    displayAllComments();
});

//clear default text from textbox
let inputName = document.getElementById('input-name');
inputName.addEventListener('click', () => {
    if (inputName.value == 'Enter your name') inputName.value = '';
});
//clear default text from textbox
let inputComment = document.getElementById('input-comment');
inputComment.addEventListener('click', () => {
    if (inputComment.value == 'Add a new comment') inputComment.value = '';
});
