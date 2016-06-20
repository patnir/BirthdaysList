/// <reference path="index.html">

function Contact(name, birthDate, phoneNumber) {
    this.name = name;
    this.birthDate = birthDate;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.CheckPrint = function () {
    alert(this.name + this.birthDate + this.phoneNumber);
}

Contact.prototype.Serialize = function () {
    return this.name + "\t" + this.birthDate + "\t" + this.phoneNumber;
}

Contact.prototype.Deserialize = function (serializedEntry) {
    var entry = serializedEntry.split("\t");
    this.name = entry[0];
    this.birthDate = entry[1];
    this.phoneNumber = entry[2];
}