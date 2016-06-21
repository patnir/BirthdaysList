/// <reference path="index.html">
var gContactList;
var gToFocus;

function body_load() {
    btnNavAddContact.onmousedown = btnNavAddContact_onmousedown;
    btnNavShowContacts.onmousedown = btnNavShowContacts_onmousedown;
    btnAdd.onmousedown = btnAdd_onmousedown;
    btnErrorMessageOK.onmousedown = btnErrorMessageOK_onmousedown;

    errorMessageMain.style.visibility = 'hidden';
    
    gContactList = [];

    displayAllContacts();
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
                formattedPhoneNumber += ")" + phoneNumberParts[i];
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
}

function btnErrorMessageOK_onmousedown() {
    errorMessageMain.style.visibility = 'hidden';
    inputInformation.style.pointerEvents = 'all';

    if (gToFocus === 0) {
        window.setTimeout(function () {
            txtName.focus();
        }, 0);
    } 
    else if (gToFocus === 1) {
        window.setTimeout(function () {
            txtBirthDate.focus();
        }, 0);
    }
    else if (gToFocus === 2) {
        window.setTimeout(function () {
            txtPhoneNumber.focus();
        }, 0);
    }
}

function showErrorMessage(message) {
    errorMessageMain.style.visibility = 'visible';
    inputInformation.style.pointerEvents = 'none';
    errorMessageString.innerHTML = message;
}

function validateInput() {
    var nameErrorMessage = "Enter a name.";
    var birthDateErrorMessage = "Enter a valid birth date in the following format: YYYY/MM/DD";
    var phoneNumberErrorMessage = "Enter a 10 digit phone number";

    // check Name
    if (txtName.value.trim().length === 0) {
        gToFocus = 0;
        showErrorMessage(nameErrorMessage);
        return false;
    }

    // check Birth Date
    birthDateParts = txtBirthDate.value.trim().split("/");
    // alert(birthDateParts);
    if (birthDateParts.length != 3) {
        gToFocus = 1;
        showErrorMessage(birthDateErrorMessage);
        return false;
    }
    if (checkIfStringIsNumber(birthDateParts[0]) === false 
        || parseInt(birthDateParts[0]) < 0
        || parseInt(birthDateParts[0]) > 9999) {
        gToFocus = 1;
        showErrorMessage(birthDateErrorMessage);
        return false;
    }
    else if (checkIfStringIsNumber(birthDateParts[1]) === false 
        || parseInt(birthDateParts[1]) < 0
        || parseInt(birthDateParts[1]) > 12) {
        gToFocus = 1;
        showErrorMessage(birthDateErrorMessage);
        return false;
    }
    else if (checkIfStringIsNumber(birthDateParts[2]) === false
        || parseInt(birthDateParts[2]) < 0
        || parseInt(birthDateParts[2]) > 31) {
        gToFocus = 1;
        showErrorMessage(birthDateErrorMessage);
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
        gToFocus = 2;
        showErrorMessage(phoneNumberErrorMessage);
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

function btnNavAddContact_onmousedown() {
    showInformation.style.marginLeft = "-360px";
    inputInformation.style.marginLeft = "-360px";
}

function btnNavShowContacts_onmousedown() {
    showInformation.style.marginLeft = "0px";
    inputInformation.style.marginLeft = "0px";
    displayAllContacts();
}

function displayAllContacts() {
    if (gContactList.length === 0) {
        return;
    }
    while (showContactList.hasChildNodes()) {
        showContactList.removeChild(showContactList.lastChild);
    }
    for (var i = 0; i < gContactList.length; i++) {
        var contactDiv = document.createElement('div');
        contactDiv.id = "showContact";

        var contactNameLabel = document.createElement('label');
        contactNameLabel.id = "showContactName";
        var nameTop = 50 * i + 5;
        contactNameLabel.style.top = nameTop.toString() + "px";
        contactNameLabel.innerHTML = gContactList[i].name;

        var contactPhoneNumberLabel = document.createElement('label');
        contactPhoneNumberLabel.id = "showContactPhoneNumber";
        var phoneNumberTop = 50 * i + 28;
        contactPhoneNumberLabel.style.top = phoneNumberTop.toString() + "px";
        contactPhoneNumberLabel.innerHTML = gContactList[i].phoneNumber;

        var contactBirthDateLabel = document.createElement('label');
        contactBirthDateLabel.id = "showContactBirthDate";
        var birthDateTop = 50 * i + 15;
        contactBirthDateLabel.style.top = birthDateTop.toString() + "px";
        contactBirthDateLabel.innerHTML = gContactList[i].formatDateMonthDay();

        contactDiv.appendChild(contactNameLabel);
        contactDiv.appendChild(contactPhoneNumberLabel);
        contactDiv.appendChild(contactBirthDateLabel);

        showContactList.appendChild(contactDiv);
    }
}