function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    if (reverse === str) {
        return true;        
    } else {
        return false;
    }
}

function convertDateToStr(date) {
    var dateStr = {day: '', month:'', year:''};

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = dateStr.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats (date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllDateTypes(date) {
    var listOfPalindromes = getAllDateFormats(date);

    var checkList = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            checkList = true;
            break;
        }
    }

    return checkList; 
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 4 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 2) {
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        }
     else {
        if (day > 28) {
            day = 1;
            month = month + 1;
        }
     }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateTypes(nextDate);
        if(isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

var dateInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var result = document.querySelector("#result");

function clickHandler() {
    var bdayStr = dateInput.value;

    if (bdayStr != '') {
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateTypes(date);
        if (isPalindrome) {
            result.innerText = 'Yay! Your Birthday Is A Palindrome!!'
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, and you missed it by just ${ctr} days!` 
        }

    }
}

showBtn.addEventListener('click', clickHandler);