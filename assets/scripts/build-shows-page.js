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

const insertShowHere = document.getElementById('list-of-shows');
displayShows();

function displayShows() {
    shows.forEach((show) => insertShowHere.append(createShowCard(show)));
}

function createShowCard(showToAdd) {
    let show = document.createElement('article');

    let newDateInfo = createInfoDiv('DATE', showToAdd.date, true);
    // console.log(newInfo.innerHTML);
    show.appendChild(newDateInfo);

    let newVenueInfo = createInfoDiv('VENUE', showToAdd.venue, false);
    show.appendChild(newVenueInfo);

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

function createNewTextElement(tag, classes, contentText) {
    let newEl = document.createElement(tag);

    if (contentText != undefined) newEl.textContent = contentText;
    if (classes != undefined) newEl.classList.add(classes);

    return newEl;
}
