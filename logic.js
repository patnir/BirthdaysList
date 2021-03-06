﻿/// <reference path="index.html">

var gContactList;
var gShowContactsVisible;
var gContactToDelete;

function body_load() {
    btnNavAddContact.onmousedown = btnNavAddContact_onmousedown;
    btnNavShowContacts.onmousedown = btnNavShowContacts_onmousedown;
    addNewContact.onmousedown = addNewContact_onmousedown;
    addNewContact.onmouseup = addNewContact_onmouseup;
    addNewContact.ontouchstart = addNewContact_onmousedown;
    addNewContact.ontouchend = addNewContact_onmouseup;
    btnErrorMessageOK.onmousedown = btnErrorMessageOK_onmousedown;

    btnDeleteMessageOK.onmousedown = btnDeleteMessageOK_onmousedown;
    btnDeleteMessageCancel.onmousedown = btnDeleteMessageCancel_onmousedown;

    txtPhoneNumber.onfocus = txtPhoneNumber_onfocus;
    txtPhoneNumber.onblur = txtPhoneNumber_onblur;

    window.onresize = window_onresize;

    errorMessageMain.style.visibility = 'hidden';
    deleteMessageMain.style.visibility = 'hidden';

    restoreStateFromLocalStorage('contacts');
    gShowContactsVisible = true;

    addSwipeEvent(showInformation, movePanels);
    addSwipeEvent(inputInformation, movePanels);

    window_onresize();
}

function window_onresize() {
    divMain.style.width = window.innerWidth.toString() + "px";
    divMain.style.height = window.innerHeight.toString() + "px";
    navbar.style.width = window.innerWidth.toString() + "px";
    heading.style.width = window.innerWidth.toString() + "px";
   
    showContactList.style.height = (window.innerHeight - 40 - 89).toString() + "px";
    showContactList.style.width = (window.innerWidth - 40).toString() + "px";

    txtName.style.width = (window.innerWidth - 80).toString() + "px";
    txtBirthDate.style.width = (window.innerWidth - 80).toString() + "px";
    txtPhoneNumber.style.width = (window.innerWidth - 80).toString() + "px";
    addNewContact.style.width = (window.innerWidth - 120).toString() + "px";

    var reference = (window.innerHeight - 89 - 96 - 35) / 5
    txtName.style.top = (reference).toString() + "px";
    txtBirthDate.style.top = (2 * reference + 30).toString() + "px";
    txtPhoneNumber.style.top = (3 * reference + 30 * 2).toString() + "px";
    addNewContact.style.top = (4 * reference + 30 * 3).toString() + "px";

    errorMessageMain.style.width = window.innerWidth.toString() + "px";
    errorMessageMain.style.height = window.innerHeight.toString() + "px";
    errorMessageBody.style.top = ((window.innerHeight - 200 + 88) / 2).toString() + "px";
    errorMessageBody.style.left = ((window.innerWidth - 200) / 2).toString() + "px";

    deleteMessageMain.style.width = window.innerWidth.toString() + "px";
    deleteMessageMain.style.height = window.innerHeight.toString() + "px";
    deleteMessageBody.style.top = ((window.innerHeight - 200 + 88) / 2).toString() + "px";
    deleteMessageBody.style.left = ((window.innerWidth - 200) / 2).toString() + "px";

    if (gShowContactsVisible === true) {
        btnNavShowContacts_onmousedown();
    }
    else {
        btnNavAddContact_onmousedown();
    }

    showInformation.style.width = window.innerWidth.toString() + "px";
    showInformation.style.height = (window.innerHeight - 89).toString() + "px";
    inputInformation.style.width = window.innerWidth.toString() + "px";
    inputInformation.style.height = (window.innerHeight - 89).toString() + "px";
}

function movePanels(check) {
    if (check === 1) {
        btnNavAddContact_onmousedown();
    }
    else {
        btnNavShowContacts_onmousedown();
    }
}

function btnNavAddContact_onmousedown() {
    inputInformation.style.left = "0px";
    showInformation.style.left = (-1 * window.innerWidth).toString() + "px";
    btnNavAddContact.style.color = "#FFFFFF";
    btnNavAddContact.style.backgroundColor = "#00e6ac";
    btnNavShowContacts.style.color = "#00e6ac";
    btnNavShowContacts.style.backgroundColor = "#FFFFFF";
    btnNavAddContact.style.width = (3 * window.innerWidth / 4).toString() + "px";
    btnNavShowContacts.style.width = (1 * window.innerWidth / 4).toString() + "px";
    gShowContactsVisible = false;
}

function btnNavShowContacts_onmousedown() {
    showInformation.style.left = "0px";
    inputInformation.style.left = window.innerWidth.toString() + "px";
    btnNavAddContact.style.color = "#00e6ac";
    btnNavAddContact.style.backgroundColor = "#FFFFFF";
    btnNavShowContacts.style.color = "#FFFFFF";
    btnNavShowContacts.style.backgroundColor = "#00e6ac";
    btnNavAddContact.style.width = (window.innerWidth / 4).toString() + "px";
    btnNavShowContacts.style.width = (3 * window.innerWidth / 4).toString() + "px";
    gShowContactsVisible = true;
    displayAllContacts();
}


function txtPhoneNumber_onfocus() {
    convertToPhoneNumber();

    var phoneNumberString = txtPhoneNumber.value.trim().split("");

    var unformattedPhoneNumber = "";
    for (var i = 0; i < phoneNumberString.length; i++) {
        if (checkIfStringIsNumber(phoneNumberString[i]) === true) {
            unformattedPhoneNumber += phoneNumberString[i];
        }
    }

    txtPhoneNumber.value = unformattedPhoneNumber;
}

function txtPhoneNumber_onblur() {
    phoneNumberString = txtPhoneNumber.value.trim().split("");

    var totalNumbers = 0;

    for (var i = 0; i < phoneNumberString.length; i++) {
        if (checkIfStringIsNumber(phoneNumberString[i]) === true) {
            totalNumbers += 1;
        }
    }
    if (totalNumbers === 10) {
        convertToPhoneNumber();
    }
}

function convertToPhoneNumber() {
    phoneNumberParts = txtPhoneNumber.value.trim().split("");

    var formattedPhoneNumber = "(";

    var totalAdded = 0;

    for (var i = 0; i < phoneNumberParts.length; i++) {
        if (checkIfStringIsNumber(phoneNumberParts[i]) === true) {
            if (totalAdded <= 2) {
                formattedPhoneNumber += phoneNumberParts[i];
            }
            else if (totalAdded === 3) {
                formattedPhoneNumber += ") " + phoneNumberParts[i];
            }
            else if (totalAdded === 6) {
                formattedPhoneNumber += "-" + phoneNumberParts[i];
            }
            else {
                formattedPhoneNumber += phoneNumberParts[i];
            }
            totalAdded++;
        }
    }

    txtPhoneNumber.value = formattedPhoneNumber;
}

function addNewContact_onmousedown() {
    addNewContact.style.backgroundColor = "#00b386";
    if (validateInput() === false) {
        return;
    }

    convertToPhoneNumber();

    var entry = new Contact(txtName.value.trim(), txtBirthDate.value.trim(), txtPhoneNumber.value.trim());
    gContactList.push(entry);
    addToLocalStorage(entry);
}

function addNewContact_onmouseup() {
    addNewContact.style.backgroundColor = "#00e6ac";
}

function restoreStateFromLocalStorage(key) {
    gContactList = [];

    var contacts = localStorage.getItem(key);
    if (contacts === null) {
        return;
    }
    var contactsList = contacts.split("\n");

    for (var i = 0; i < contactsList.length - 1; i++) {
        var entry = new Contact("", "", "");
        entry.Deserialize(contactsList[i]);
        gContactList.push(entry);
    }
}

function btnErrorMessageOK_onmousedown() {
    errorMessageMain.style.visibility = 'hidden';
    inputInformation.style.pointerEvents = 'all';
    addNewContact.style.backgroundColor = "#00e6ac";
    window.setTimeout(function () {
        errorMessageMain.ObjectToFocus.focus();
    }, 0);
}

function showErrorMessage(message, objectToFocus) {
    errorMessageMain.style.visibility = 'visible';
    inputInformation.style.pointerEvents = 'none';
    errorMessageString.innerHTML = message;

    errorMessageMain.ObjectToFocus = objectToFocus;
}

function tryParseDate(dateString) {
    birthDateParts = txtBirthDate.value.trim().split("/");
    if (birthDateParts.length != 3) {
        return false;
    }
    if (checkIfStringIsNumber(birthDateParts[0]) === false
        || checkIfStringIsNumber(birthDateParts[1]) === false
        || checkIfStringIsNumber(birthDateParts[2]) === false) {
        return false;
    }

    var year = parseInt(birthDateParts[0]);
    var month = parseInt(birthDateParts[1]);
    var day = parseInt(birthDateParts[2]);

    if (year < 1 || year > 9999
        || month < 1 || month > 12
        || day < 1 || day > 31) {
        return false;
    }

    // check leap year

    var isLeapYear = false;
    if (year % 4 === 0
        && !(year % 100 === 0 && year % 400 != 0)) {
        isLeapYear = true;
    }
    if (isLeapYear === false && month === 2 && day > 28) {
        return false;
    }
    if (isLeapYear === true && month === 2 && day > 29) {
        return false;
    }

    if ((month === 1 
        || month === 3
        || month === 5
        || month === 7
        || month === 8
        || month === 10
        || month === 12) && day > 31) {
        return false;
    }
    else if (day > 30) {
        return false;
    }

    return true;
}

function validateInput() {
    var nameErrorMessage = "Enter a valid name.";
    var birthDateErrorMessage = "Enter a valid birth date in the following format: YYYY/MM/DD";
    var phoneNumberErrorMessage = "Enter a 10 digit phone number";

    // check Name

    if (txtName.value.trim().length === 0
        || txtName.value.includes('\n') === true
        || txtName.value.includes('\t') === true) {
        showErrorMessage(nameErrorMessage, txtName);
        return false;
    }

    // check Birth Date. Make a date parse function check for feb, leap year, etc

    if (tryParseDate(txtBirthDate.value.trim()) === false) {
        showErrorMessage(birthDateErrorMessage, txtBirthDate);
        return false;
    }

    // check number
    phoneNumberString = txtPhoneNumber.value.trim().split("");

    var totalNumbers = 0;

    for (var i = 0; i < phoneNumberString.length; i++) {
        if (checkIfStringIsNumber(phoneNumberString[i]) === true) {
            totalNumbers += 1;
        }
    }
    if (totalNumbers != 10) {
        showErrorMessage(phoneNumberErrorMessage, txtPhoneNumber);
        return false;
    }
}

function checkIfStringIsNumber(numberString) {
    var checkDigits = numberString.split("");
    if (checkDigits.length === 0) {
        return false;
    }
    var checkNumbers = new RegExp('[0-9]');

    for (var i = 0; i < checkDigits.length; i++) {
        if (checkNumbers.test(checkDigits[i]) === false) {
            return false;
        }
    }
    return true;
}

function displayAllContacts() {
    while (showContactList.hasChildNodes()) {
        showContactList.removeChild(showContactList.lastChild);
    }
    if (gContactList.length === 0) {

        return;
    }
    for (var i = 0; i < gContactList.length; i++) {
        var dateToday = new Date();

        var contactDiv = document.createElement('div');
        contactDiv.id = "showContact";
        contactDiv.style.width = (window.innerWidth - 40).toString();
        contactDiv.ContactIndex = i;
        // contactDiv.onclick = contactDiv_onclick;
        addLongPressEvent(contactDiv, contactDiv_onclick);

        var contactNameLabel = document.createElement('label');
        contactNameLabel.id = "showContactName";
        var nameTop = 50 * i + 5;
        contactNameLabel.style.top = nameTop.toString() + "px";

        var formattedName = gContactList[i].name;

        if (formattedName.length > 20) {
            formattedName = formatLongName(formattedName);
        }
        contactNameLabel.innerHTML = formattedName;

        var contactPhoneNumberLabel = document.createElement('label');
        contactPhoneNumberLabel.id = "showContactPhoneNumber";
        var phoneNumberTop = 50 * i + 28;
        contactPhoneNumberLabel.style.top = phoneNumberTop.toString() + "px";
        contactPhoneNumberLabel.innerHTML = gContactList[i].phoneNumber;

        var contactBirthDateLabel = document.createElement('label');
        contactBirthDateLabel.id = "showContactBirthDate";
        var birthDateTop = 50 * i + 15;
        contactBirthDateLabel.style.top = birthDateTop.toString() + "px";

        var formattedBirthDate = gContactList[i].FormatDateMonthDay();

        if (gContactList[i].IsBirthdayToday() === true) {
            formattedBirthDate = "Birthday!!";
            contactBirthDateLabel.style.color = "#FF0000";
        }

        contactBirthDateLabel.innerHTML = formattedBirthDate;

        contactDiv.appendChild(contactNameLabel);
        contactDiv.appendChild(contactPhoneNumberLabel);
        contactDiv.appendChild(contactBirthDateLabel);

        showContactList.appendChild(contactDiv);
    }
}

function btnDeleteMessageCancel_onmousedown() {
    deleteMessageMain.style.visibility = 'hidden';
    showInformation.style.pointerEvents = 'all';
}

function btnDeleteMessageOK_onmousedown() {
    deleteMessageMain.style.visibility = 'hidden';
    showInformation.style.pointerEvents = 'all';
    deleteContact();
}

function showDeleteMessage() {
    deleteMessageMain.style.visibility = 'visible';
    showInformation.style.pointerEvents = 'none';
    deleteMessageString.innerHTML = "Are you sure you would like to delete this Contact?";
}

function deleteContact() {
    if (gContactList.length === 1) {
        gContactList = []
        localStorage.contacts = "";
    }
    else {
        gContactList.splice(gContactToDelete, 1);
    }
    removeFromLocalStorage(gContactToDelete);
    displayAllContacts();
}

function contactDiv_onclick() {
    gContactToDelete = this.ContactIndex;
    showDeleteMessage();
}

function removeFromLocalStorage(contactIndex) {
    var contactsSerialized = localStorage.getItem('contacts');
    if (contactsSerialized === null) {
        return;
    }
    var contactsSplit = contactsSerialized.split('\n');

    var contactsToAdd = "";

    for (var i = 0; i < contactsSplit.length - 1; i++) {
        if (i != contactIndex) {
            contactsToAdd += contactsSplit[i] + "\n";
        }
    }

    localStorage.contacts = contactsToAdd;
}

function addToLocalStorage(entry) {
    var contactsSerialized = localStorage.getItem('contacts');
    if (contactsSerialized === null) {
        contactsSerialized = "";
    }
    contactsSerialized += entry.Serialize() + "\n";

    localStorage.contacts = contactsSerialized;
}

function formatLongName(longName) {
    nameParts = longName.split(" ");
    if (nameParts[0].length > 20) {
        return nameParts[0].substring(0, 17) + "...";
    }

    return nameParts[0] + " " + nameParts[1].substring(0, 1) + ".";
}

function isTouchDevice() {
    return "ontouchstart" in window;
}

function addSwipeEvent(object, eventFunction) {
    object.TouchMoves = 0;
    object.TouchDownX = 0;
    object.TouchDownY = 0;
    object.TouchMoveX = 0;
    object.TouchMoveY = 0;
    object.OnSwipe = eventFunction;

    if (isTouchDevice() === true) {
        object.ontouchstart = swipeStart;
        object.ontouchmove = swipeMove;
        object.ontouchend = swipeEnd;
    }
    else {
        object.onmousedown = swipeStart;
        object.onmousemove = swipeMove;
        object.onmouseup = swipeEnd;
    }

    function swipeStart(event) {
        gSwipeObject = object;

        object.TouchMoves = 0;

        if (isTouchDevice() === true) {
            object.TouchDownX = event.touches[0].clientX;
            object.TouchDownY = event.touches[0].clientY;
        }
        else {
            object.TouchDownX = event.clientX;
            object.TouchDownY = event.clientY;
        }
    }

    function swipeMove(event) {
        object.TouchMoves++;

        if (isTouchDevice() === true) {
            object.TouchMoveX = event.touches[0].clientX;
            object.TouchMoveY = event.touches[0].clientY;
        }
        else {
            object.TouchMoveX = event.clientX;
            object.TouchMoveY = event.clientY;
        }
    }

    function swipeEnd() {
        if (object.TouchMoves < 3
        || gSwipeObject != object
        || Math.abs(object.TouchDownY - object.TouchMoveY) > 100
        || Math.abs(object.TouchDownX - object.TouchMoveX) < 50) {
            return;
        }
        if (object.TouchMoveX < object.TouchDownX) {
            object.OnSwipe(1);
        }
        else {
            object.OnSwipe(-1);
        }
    }
}



function addLongPressEvent(object, eventFunction) {
    
    object.OnLongPress = eventFunction;

    if (isTouchDevice() === true) {
        object.ontouchstart = longPressStart;
        object.ontouchend = longPressEnd;
    }
    else {
        object.onmousedown = longPressStart;
        object.onmouseup = longPressEnd;
    }

    function longPressStart() {
        object.TimeoutID = setTimeout(longPressTimeout, 500);
    }

    function longPressTimeout() {
        object.OnLongPress(object);
    }

    function longPressEnd() {
        clearTimeout(object.TimeoutID);
    }
}
