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

Contact.prototype.FormatDateMonthDay = function () { // array
    var dateParts = this.birthDate.split("/");
    var formattedString = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    formattedString += months[dateParts[1] - 1] + " " + dateParts[2];
    
    return formattedString;
}

Contact.prototype.IsBirthdayToday = function() {
    var dateParts = this.birthDate.split("/");
    var dateToday = new Date();

    var todaysDate = dateToday.getDate();
    var todaysMonth = dateToday.getMonth() + 1;

    if (todaysDate === parseInt(dateParts[2])
        && todaysMonth === parseInt(dateParts[1])) {
        return true;
    }
    return false;
}