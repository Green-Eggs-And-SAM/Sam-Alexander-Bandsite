let comments = [
    {
        userName: 'Victor Pinto',
        date: '11/02/2023',
        comment:
            'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
    },
    {
        userName: 'Christina Cabrera',
        date: '10/28/2023',
        comment:
            'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
    },
    {
        userName: 'Isaac Tadesse',
        date: '10/20/2023',
        comment:
            "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    },
];

class userComment {
    constructor(name, comment, timeStamp) {
        this.name = name;
        this.comment = comment;
        this.timeStamp = timeStamp;
    }
}

const commentList = document.getElementById('array-of-all-comments');

commentList.append(createNewComment(comments[0]));
removeAllComments();
console.log();

function submitComment() {}

function removeAllComments() {
    while (commentList.firstChild) {
        commentList.firstChild.remove();
    }
}

function createNewComment(commentData) {
    console.log('HERE');
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
    console.log(entireComment.innerHTML);
    return entireComment;
}

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
    let newUserName = createNewElement('h5', undefined, commentData.userName);
    header.appendChild(newUserName);
    let newDate = createNewElement('p', undefined, commentData.date);
    header.appendChild(newDate);
    return header;
}

function createNewElement(tag, classes, contentText) {
    if (tag == undefined) console.log("ERROR Tag can't be null");
    let newEl = document.createElement(tag);
    if (contentText != undefined) newEl.textContent = contentText;
    if (classes != undefined) newEl.classList.add(classes);
    return newEl;
}
console.log(timestampToDate());
// Assuming timestamp is in milliseconds
function timestampToDate() {
    // Create a new Date object with the timestamp
    let date = new Date();

    // Extract the components of the date
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Month starts at 0, so we add 1
    let day = date.getDate();

    return year + '/' + addZero(month) + '/' + addZero(day);
}

// add leading 0 if month or day is less than 2 digits.
function addZero(number) {
    if (number < 10) return '0' + number;
    else return number;
}
