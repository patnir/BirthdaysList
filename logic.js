/// <reference path="index.html">
var gContactList;
var gToFocus;
var gShowContactsVisible;

function body_load() {
    btnNavAddContact.onmousedown = btnNavAddContact_onmousedown;
    btnNavShowContacts.onmousedown = btnNavShowContacts_onmousedown;
    btnAdd.onmousedown = btnAdd_onmousedown;
    btnErrorMessageOK.onmousedown = btnErrorMessageOK_onmousedown;
    txtPhoneNumber.onfocus = txtPhoneNumber_onfocus;
    txtPhoneNumber.onblur = txtPhoneNumber_onblur;

    window.onresize = window_onresize;

    errorMessageMain.style.visibility = 'hidden';
    
    restoreStateFromLocalStorage('contacts');
    gShowContactsVisible = true;

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
    btnAdd.style.width = (window.innerWidth - 120).toString() + "px";

    var reference = (window.innerHeight - 89 - 96 - 35) / 5
    txtName.style.top = (reference).toString() + "px";
    txtBirthDate.style.top = (2 * reference + 30).toString() + "px";
    txtPhoneNumber.style.top = (3 * reference + 30 * 2).toString() + "px";
    btnAdd.style.top = (4 * reference + 30 * 3).toString() + "px";

    errorMessageMain.style.width = window.innerWidth.toString() + "px";
    errorMessageMain.style.height = window.innerHeight.toString() + "px";
    errorMessageBody.style.top = ((window.innerHeight - 100 - 44) / 2).toString() + "px";
    errorMessageBody.style.left = ((window.innerWidth - 100) / 2).toString() + "px";

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

function btnNavAddContact_onmousedown() {
    showInformation.style.left = (-1 * window.innerWidth).toString() + "px";
    inputInformation.style.left = "0px";
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

function btnAdd_onmousedown() {
    if (validateInput() === false) {
        return;
    }

    convertToPhoneNumber();

    var entry = new Contact(txtName.value.trim(), txtBirthDate.value.trim(), txtPhoneNumber.value.trim());
    gContactList.push(entry);
    addToLocalStorage(entry);
}

function addToLocalStorage(entry) {
    var contactsSerialized = localStorage.getItem('contacts');
    if (contactsSerialized === null) {
        contactsSerialized = "";
    }
    contactsSerialized += entry.Serialize() + "\n";

    localStorage.contacts = contactsSerialized;
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

function validateInput() {
    var nameErrorMessage = "Enter a valid name.";
    var birthDateErrorMessage = "Enter a valid birth date in the following format: YYYY/MM/DD";
    var phoneNumberErrorMessage = "Enter a 10 digit phone number";

    // check Name
    if (txtName.value.trim().length === 0
        || txtName.value.includes('\n') === true
        || txtName.value.includes('\t') === true) {
        gToFocus = 0;
        showErrorMessage(nameErrorMessage, txtName);
        return false;
    }
    // check Birth Date. Make a date parse function check for feb, leap year, etc
    birthDateParts = txtBirthDate.value.trim().split("/");
    // alert(birthDateParts);
    if (birthDateParts.length != 3) {
        gToFocus = 1;
        showErrorMessage(birthDateErrorMessage, txtBirthDate);
        return false;
    }
    if (checkIfStringIsNumber(birthDateParts[0]) === false 
        || parseInt(birthDateParts[0]) < 0
        || parseInt(birthDateParts[0]) > 9999) {
        gToFocus = 1;
        showErrorMessage(birthDateErrorMessage, txtBirthDate);
        return false;
    }
    else if (checkIfStringIsNumber(birthDateParts[1]) === false 
        || parseInt(birthDateParts[1]) < 0
        || parseInt(birthDateParts[1]) > 12) {
        gToFocus = 1;
        showErrorMessage(birthDateErrorMessage, txtBirthDate);
        return false;
    }
    else if (checkIfStringIsNumber(birthDateParts[2]) === false
        || parseInt(birthDateParts[2]) < 0
        || parseInt(birthDateParts[2]) > 31) {
        gToFocus = 1;
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
    if (gContactList.length === 0) {
        return;
    }
    while (showContactList.hasChildNodes()) {
        showContactList.removeChild(showContactList.lastChild);
    }
    for (var i = 0; i < gContactList.length; i++) {
        var dateToday = new Date();

        var contactDiv = document.createElement('div');
        contactDiv.id = "showContact";
        contactDiv.style.width = (window.innerWidth - 40).toString();
        contactDiv.ContactIndex = i;
        contactDiv.onclick = contactDiv_onclick;

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

        var formattedBirthDate = gContactList[i].formatDateMonthDay();

        if (gContactList[i].isBirthdayToday() === true) {
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

function contactDiv_onclick() {
    gContactList.splice(this.ContactIndex, 1);
    displayAllContacts();
}

function formatLongName(longName) {
    nameParts = longName.split(" ");
    if (nameParts[0].length > 20) {
        return nameParts[0].substring(0, 17) + "...";
    }

    return nameParts[0] + " " + nameParts[1].substring(0, 1) + ".";
}