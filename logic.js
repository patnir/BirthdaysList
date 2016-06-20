/// <reference path="index.html">

function body_load() {
    btnNavAddContact.onmousedown = btnNavAddContact_onmousedown;
    btnNavShowContacts.onmousedown = btnNavShowContacts_onmousedown;
}


function btnNavAddContact_onmousedown() {
    showInformation.style.marginLeft = "0";
    inputInformation.style.marginLeft = "0";
}

function btnNavShowContacts_onmousedown() {
    showInformation.style.marginLeft = "-360px";
    inputInformation.style.marginLeft = "-360px";
}