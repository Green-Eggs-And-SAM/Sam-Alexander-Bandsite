const shows = [
    {
        date: 'Mon Sept 09 2024',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA',
    },
    {
        date: 'Tue Sept 17 2024',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA',
    },
    {
        date: 'Sat Oct 12 2024',
        venue: 'View Lounge',
        location: 'San Francisco, CA',
    },
    {
        date: 'Sat Nov 16 2024',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA',
    },
    {
        date: 'Fri Nov 29 2024',
        venue: 'Moscow Center',
        location: 'San Francisco, CA',
    },
    {
        date: 'Wed Dec 18 2024',
        venue: 'Press Club',
        location: 'San Francisco, CA',
    },
];

function displayShows() {
    shows.forEach((show) => insertShowHere.append(createShowCard(show)));
}

//create a complete card for each show
function createShowCard(showToAdd) {
    let show = document.createElement('article');
    show.addEventListener('click', clicked);

    //make a date subheader and text pair
    let newDateInfo = createInfoDiv('DATE', showToAdd.date, true);
    show.appendChild(newDateInfo);

    //make a venue pair
    let newVenueInfo = createInfoDiv('VENUE', showToAdd.venue, false);
    show.appendChild(newVenueInfo);

    //make a location pair
    let newLocationInfo = createInfoDiv('LOCATION', showToAdd.location, false);
    show.appendChild(newLocationInfo);
    show.classList.add('shows__card');

    let newButton = createButton();

    show.appendChild(newButton);
    return show;
}

function createButton() {
    let newButton = document.createElement('button');
    newButton.classList.add('shows__get-tix-button');

    let newButtonText = document.createElement('h5');
    newButtonText.textContent = 'BUY TICKETS';
    newButtonText.classList.add('shows__get-tix-button--text');
    newButton.appendChild(newButtonText);

    return newButton;
}

//a pair of both subheader and text body.
function createInfoDiv(subheaderText, bodyText, isBold) {
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('shows__card--info');

    let subheader = createNewTextElement(
        'p',
        'shows__card--subheader',
        subheaderText
    );
    infoDiv.appendChild(subheader);

    let text = createNewTextElement('h5', 'shows__card--text', bodyText);
    if (isBold) text.classList.add('bold-text');

    infoDiv.appendChild(text);

    return infoDiv;
}

//return a text element complete with tag, class and text
function createNewTextElement(tag, classes, contentText) {
    let newEl = document.createElement(tag);

    if (contentText != undefined) {
        newEl.textContent = contentText;
    }

    if (classes != undefined) {
        newEl.classList.add(classes);
    }

    return newEl;
}

function clicked(event) {
    //find the grandparent node containing the class shows card.
    //user may have clicked on the either the grandparent, parent or child element
    //keep checking parent elements until the correct element is found.
    let parent = event.target.parentNode;
    let grandParent = parent.parentNode;

    //user clicked on shows__card grandparent
    if (event.target.classList.contains('shows__card')) {
        highlight(event.target);
    }
    //user clicked on child of shows__card. check parent
    else if (parent.classList.contains('shows__card')) {
        highlight(parent);
    }
    //user clicked on grandchild of shows__card. check grandparent
    else if (grandParent.classList.contains('shows__card')) {
        highlight(grandParent);
    }
}

//highlihgt current clicked show. remove highlight on previous clicked show.
function highlight(showsCard) {
    //remove the previous highlight and replace with the current highlighted show.
    if (highlightedShow != undefined)
        highlightedShow.classList.remove('selected');
    highlightedShow = showsCard;
    //highlight show
    showsCard.classList.add('selected');
}

//store the current element that is highlighted.
let highlightedShow = undefined;
const insertShowHere = document.getElementById('list-of-shows');
displayShows();
