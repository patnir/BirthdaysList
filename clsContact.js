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

Contact.prototype.formatDateMonthDay = function () { // array
    var dateParts = this.birthDate.split("/");
    var formattedString = "";
    if (parseInt(dateParts[1]) === 1) {
        formattedString += "Jan ";
    }
    else if (parseInt(dateParts[1]) === 2) {
        formattedString += "Feb ";
    }
    else if (parseInt(dateParts[1]) === 3) {
        formattedString += "Mar ";
    }
    else if (parseInt(dateParts[1]) === 4) {
        formattedString += "Apr ";
    }
    else if (parseInt(dateParts[1]) === 5) {
        formattedString += "May ";
    }
    else if (parseInt(dateParts[1]) === 6) {
        formattedString += "Jun ";
    }
    else if (parseInt(dateParts[1]) === 7) {
        formattedString += "Jul ";
    }
    else if (parseInt(dateParts[1]) === 8) {
        formattedString += "Aug ";
    }
    else if (parseInt(dateParts[1]) === 9) {
        formattedString += "Sep ";
    }
    else if (parseInt(dateParts[1]) === 10) {
        formattedString += "Oct ";
    }
    else if (parseInt(dateParts[1]) === 11) {
        formattedString += "Nov ";
    }
    else if (parseInt(dateParts[1]) === 12) {
        formattedString += "Dec ";
    }

    formattedString += dateParts[2];
    
    return formattedString;
}

Contact.prototype.isBirthdayToday = function() {
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