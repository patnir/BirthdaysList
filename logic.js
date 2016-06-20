/// <reference path="index.html">
var gContactList;

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

}

function btnAdd_onmousedown() {
    if (validateInput() === false) {
        return;
    }

    var entry = new Contact(txtName.value.trim(), txtBirthDate.value.trim(), txtPhoneNumber.value.trim());
    gContactList.push(entry);
}

function btnErrorMessageOK_onmousedown() {
    errorMessageMain.style.visibility = 'hidden';
    inputInformation.style.pointerEvents = 'all';
}

function showErrorMessage(message) {
    errorMessageMain.style.visibility = 'visible';
    inputInformation.style.pointerEvents = 'none';
    errorMessageString.innerHTML = message;
}

function validateInput() {
    var nameErrorMessage = "Enter a name.";
    var birthDateErrorMessage = "Enter a valid birth date in the following format: YYYY/MM/DD";
    var phoneNumberErrorMessage = "Enter a 7 digit phone number";

    // check Name
    if (txtName.value.trim().length === 0) {
        showErrorMessage(nameErrorMessage);
        txtName.focus();
        return false;
    }

    // check Birth Date
    birthDateParts = txtBirthDate.value.trim().split("/");
    // alert(birthDateParts);
    if (birthDateParts.length != 3) {
        showErrorMessage(birthDateErrorMessage);
        txtName.focus();
        return false;
    }
    if (checkIfStringIsNumber(birthDateParts[0]) === false 
        || parseInt(birthDateParts[0]) < 0
        || parseInt(birthDateParts[0]) > 9999) {
        showErrorMessage(birthDateErrorMessage);
        txtName.focus();
        return false;
    }
    else if (checkIfStringIsNumber(birthDateParts[1]) === false 
        || parseInt(birthDateParts[1]) < 0
        || parseInt(birthDateParts[1]) > 12) {
        showErrorMessage(birthDateErrorMessage);
        txtName.focus();
        return false;
    }
    else if (checkIfStringIsNumber(birthDateParts[2]) === false
        || parseInt(birthDateParts[2]) < 0
        || parseInt(birthDateParts[2]) > 31) {
        showErrorMessage(birthDateErrorMessage);
        txtName.focus();
        return false;
    }

    // check number
    phoneNumberString = txtPhoneNumber.value;
    if (phoneNumberString.length != 10) {
        showErrorMessage(phoneNumberErrorMessage);
        txtName.focus();
        return false;
    }
    if (checkIfStringIsNumber(phoneNumberString) === false) {
        showErrorMessage(phoneNumberErrorMessage);
        txtName.focus();
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
        contactNameLabel.innerHTML = gContactList[i].name;

        var contactBirthDateLabel = document.createElement('label');
        contactBirthDateLabel.id = "showContactBirthDate";
        contactBirthDateLabel.innerHTML = gContactList[i].formatDateMonthDay();

        var contactPhoneNumberLabel = document.createElement('label');
        contactPhoneNumberLabel.id = "showContactPhoneNumber";
        contactPhoneNumberLabel.innerHTML = gContactList[i].phoneNumber;

        contactDiv.appendChild(contactNameLabel);
        contactDiv.appendChild(contactBirthDateLabel);
        contactDiv.appendChild(contactPhoneNumberLabel);

        showContactList.appendChild(contactDiv);
    }
}