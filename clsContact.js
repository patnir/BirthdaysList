/// <reference path="index.html">

function Contact(name, birthDate, phoneNumber) {
    this.name = name;
    this.birthDate = birthDate;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.checkPrint = function () {
    alert(this.name + this.birthDate + this.phoneNumber);
}