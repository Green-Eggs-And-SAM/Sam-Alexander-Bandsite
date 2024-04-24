import BandSiteApi from './band-site-api.js';
const api = new BandSiteApi('473e656b-a5a8-4cdf-8ca9-019edb1b076e');

console.log('here');
console.log(api.getComments());
// console.log(api.getComments().data);

// let comments = [
//     {
//         name: 'Victor Pinto',
//         timestamp: '11/02/2023',
//         comment:
//             'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
//     },
//     {
//         name: 'Christina Cabrera',
//         timestamp: '10/28/2023',
//         comment:
//             'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
//     },
//     {
//         name: 'Isaac Tadesse',
//         timestamp: '10/20/2023',
//         comment:
//             "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//     },
// ];

// class userComment {
//     constructor(name, comment) {
//         this.name = name;
//         this.timestamp = getTodaysDate();
//         console.log(this.timestamp);
//         this.comment = comment;
//     }
// }

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
    console.log(comments);
    comments.forEach((comment) =>
        commentList.append(createNewComment(comment))
    );
}

function createNewComment(commentData) {
    // console.log(commentData);
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
    // console.log(entireComment.innerHTML);
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
        undefined,
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
inputForm.addEventListener('submit', (event) => {
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
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.name);
        // console.log(event.target.classList);
        event.target.userName.classList.remove(
            'comments-section__submission-form--error'
        );
        event.target.userComment.classList.remove(
            'comments-section__submission-form--error'
        );
    }
    let newComment = new userComment(
        event.target.userName.value,
        event.target.userComment.value
    );
    comments.unshift(newComment);
    //clear text fields
    event.target.userName.value = '';
    event.target.userComment.value = '';

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
