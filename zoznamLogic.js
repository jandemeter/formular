function lenghtCheck() {
    const oneDayRadio = document.getElementById('day')
    const multipleDaysRadio = document.getElementById('days');
    const giveDateLabel = document.getElementById('giveDateLabel');
    const giveDateInput = document.getElementById('giveDate');

    const giveDateErr = document.getElementById('err-giveDate');

    if (oneDayRadio.checked) {
        giveDateLabel.style.display = 'none';
        giveDateInput.style.display = 'none';
        giveDateInput.value = '';
        giveDateErr.innerText = '';

    } else if (multipleDaysRadio.checked) {
        giveDateLabel.style.display = 'block';
        giveDateInput.style.display = 'block';

    }
}
document.getElementById('brand').addEventListener('change', calculatePrice);
document.getElementById('model').addEventListener('change', calculatePrice);
document.getElementById('version').addEventListener('change', calculatePrice);
document.getElementById('takeDate').addEventListener('change', calculatePrice);
document.getElementById('giveDate').addEventListener('change', calculatePrice);

document.getElementById('birthdate').addEventListener('focusout', function() {
    validateIsEmpty('Datum narodenia je povinny', 'birthdate', 'err-birthdate');
});

document.getElementById('takeDate').addEventListener('focusout', function() {
    validateIsEmpty('Datum prevzatia je povinny', 'takeDate', 'err-takeDate');
});

document.getElementById('giveDate').addEventListener('focusout', function() {
    validateIsEmpty('Datum vratenia je povinny', 'giveDate', 'err-giveDate');
});

function numberCounter() {
    const firstnameInput = document.getElementById('firstName');
    const firstnameCounter = document.getElementById('firstNameCounter');

    const surnameInput = document.getElementById('surname');
    const surnameCounter = document.getElementById('surnameCounter')

    // Attach event listener
    firstnameInput.addEventListener('input', function () {
        // Update the counter
        firstnameCounter.textContent = `${firstnameInput.value.length}/20`;
    });

    surnameInput.addEventListener('input', function () {
        // Update the counter
        surnameCounter.textContent = `${surnameInput.value.length}/20`;
    });
}






function displayError(msg, errfieldID, inputID) {
    let err = document.getElementById(errfieldID);
    let input = document.getElementById(inputID);

    err.style.visibility = 'visible';
    err.innerHTML = msg;

    input.style.borderColor = "red";
}

function hideError(errfieldID, inputID) {
    let err = document.getElementById(errfieldID);
    let input = document.getElementById(inputID);

    err.style.visibility = 'hidden';
    err.innerHTML = "";

    input.style.borderColor = "#e1e1e1";
}

function validateIsEmpty(msg, inputID, errfieldID) {
    let inputfield = document.getElementById(inputID);

    if (!inputfield.value) {
        displayError(msg, errfieldID);
    } else if (inputID === 'firstName') {
        if (!/^[a-zA-ZÁáČčĎďÉéÍíĹĺĽľŇňÓóŔŕŘřŠšŤťÚúÝýŽž\s]+$/.test(inputfield.value)) {
            displayError('Meno može obsahovať iba písmená', errfieldID, inputID);
        } else if (inputfield.value.length < 3) {  // Corrected 'lenght' to 'length'
            displayError('Meno musi mat aspon 3 znaky', errfieldID, inputID);
        } else if (inputfield.value.length > 20) {  // Corrected 'lenght' to 'length'
            displayError('Meno musi mat najviac 20 znakov', errfieldID, inputID);
        } else {
            hideError(errfieldID, inputID);
        }
    } else if (inputID === 'surname') {
        if (!/^[a-zA-ZÁáČčĎďÉéÍíĹĺĽľŇňÓóŔŕŘřŠšŤťÚúÝýŽž\s]+$/.test(inputfield.value)) {
            displayError('Priezvisko može obsahovať iba písmená', errfieldID, inputID);
        } else if (inputfield.value.length < 3) {  // Corrected 'lenght' to 'length'
            displayError('Priezvisko musi mat aspon 3 znaky', errfieldID, inputID);
        } else if (inputfield.value.length > 20) {  // Corrected 'lenght' to 'length'
            displayError('Priezvisko musi mat najviac 20 znakov', errfieldID, inputID);
        } else {
            hideError(errfieldID, inputID);
        }
    } else if (inputID === 'email') {
        if (!/^[a-zA-Z0-9.-_+~]{3,}@[a-zA-Z0-9]{1,}\.[a-z]{2,4}$/.test(inputfield.value)) {
            displayError('Zly format.', errfieldID, inputID);
        } else {
            hideError(errfieldID, inputID);
        }
    } else if (inputID === 'telefon') {
        if (!/^[0-9]{9}$/.test(inputfield.value)) {
            displayError('Zly format.', errfieldID, inputID);
        } else {
            hideError(errfieldID, inputID);
        }
    } else if (inputID === 'takeDate') {
        hideError(errfieldID, inputID);
    } else {
        hideError(errfieldID, inputID);
    }

}



function validateForm() {
    let valid = true;

    // List of IDs of all required fields
    let requiredFields = ["firstName", "surname", "email", "birthdate", "telefon", "takeDate"];
    const multipleDaysRadio = document.getElementById('days');

    if (multipleDaysRadio.checked && !requiredFields.includes("giveDate")) {
        requiredFields.push("giveDate");
    } else if (!multipleDaysRadio.checked && requiredFields.includes("giveDate")) {
        const index = requiredFields.indexOf("giveDate");
        requiredFields.splice(index, 1);
    }

    for (let fieldID of requiredFields) {
        const inputfield = document.getElementById(fieldID);

        // Check if input field is empty
        if (!inputfield.value.trim()) {
            displayError('Toto je povinne', 'err-' + fieldID, fieldID);
            valid = false;
            continue; // Skip the rest of the loop and move to next field
        }

        // Field-specific validations
        switch (fieldID) {
            case 'firstName':
            case 'surname':
                if (!/^[a-zA-ZÁáČčĎďÉéÍíĹĺĽľŇňÓóŔŕŘřŠšŤťÚúÝýŽž\s]+$/.test(inputfield.value)) {
                    displayError((fieldID === 'firstName' ? 'Meno' : 'Priezvisko') + ' može obsahovať iba písmená', 'err-' + fieldID, fieldID);
                    valid = false;
                } else if (inputfield.value.length < 3) {
                    displayError((fieldID === 'firstName' ? 'Meno' : 'Priezvisko') + ' musi mat aspon 3 znaky', 'err-' + fieldID, fieldID);
                    valid = false;
                } else if (inputfield.value.length > 20) {
                    displayError((fieldID === 'firstName' ? 'Meno' : 'Priezvisko') + ' musi mat najviac 20 znakov', 'err-' + fieldID, fieldID);
                    valid = false;
                } else {
                    hideError('err-' + fieldID, fieldID);
                }
                break;
            case 'email':
                if (!/^[a-zA-Z0-9.-_+~]{3,}@[a-zA-Z0-9]{1,}\.[a-z]{2,4}$/.test(inputfield.value)) {
                    displayError('Zly format emailu.', 'err-' + fieldID, fieldID);
                    valid = false;
                } else {
                    hideError('err-' + fieldID, fieldID);
                }
                break;
            case 'telefon':
                if (!/^[0-9]{9}$/.test(inputfield.value)) {
                    displayError('Zly format telefonneho cisla.', 'err-' + fieldID, fieldID);
                    valid = false;
                } else {
                    hideError('err-' + fieldID, fieldID);
                }
                break;
            default:
                hideError('err-' + fieldID, fieldID);
                break;
        }
    }
    if (valid) {
        displaySummary();
    }


    return valid;
}



let birthdate = document.getElementById('birthdate');
birthdate.addEventListener("change", (event) => {
    let bday = new Date(event.target.value); // hodnota input fieldu od pouzivatela cize jeho datum narodenia
    let today = new Date(); //dnesny datum

    let age = today.getFullYear() - bday.getFullYear();
    let month = today.getMonth() - bday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < bday.getDate())) {
        age -= 1;
    }
    let ageinput = document.getElementById('age');
    ageinput.value = age;


});

function otherCheckboxCheck() {
    let checkbox = document.getElementById('other');
    let input = document.getElementById('otherInput');
    if (checkbox.checked) {
        input.style.display = 'block';
    } else {
        input.style.display = 'none';
        input.value = '';
    }
}

const carData = {
    skoda: {
        Octavia: [
            { name: 'Octavia Ambition', price: 60 },
            { name: 'Octavia RS', price: 80 }
        ],
        Superb: [
            { name: 'Superb Comfort', price: 70 },
            { name: 'Superb Laurin & Klement', price: 80 }
        ]
    },
    audi: {
        A3: [
            { name: 'A3 Sportback', price: 60 },
            { name: 'A3 Sedan', price: 50 }
        ],
        A4: [
            { name: 'A4 Avant', price: 50 },
            { name: 'A4 Allroad Quattro', price: 70 }
        ]
    }
};

function setModels() {
    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    const selectedBrand = brandSelect.value;

    // Clear previous options
    modelSelect.innerHTML = '';

    // Add new options
    for (let model in carData[selectedBrand]) {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    }

    // Update versions accordingly
    setVersions();
}

function setVersions() {
    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    const versionSelect = document.getElementById('version');
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;

    // Clear previous options
    versionSelect.innerHTML = '';

    // Add new options
    carData[selectedBrand][selectedModel].forEach(version => {
        const option = document.createElement('option');
        option.value = version.name;  // This will use the name as the value for the option.
        option.textContent = version.name;  // This will display the name for the user to see.
        versionSelect.appendChild(option);
    });
}
window.onload = function () {
    // Nastavenie min dátumu pre takeDate (zajtrajšok)
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let yearTomorrow = tomorrow.getFullYear();
    let monthTomorrow = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
    let dayTomorrow = ("0" + tomorrow.getDate()).slice(-2);

    let minDateTomorrow = `${yearTomorrow}-${monthTomorrow}-${dayTomorrow}`;
    document.getElementById('takeDate').min = minDateTomorrow;

    // Nastavenie max dátumu pre birthdate (dnešný deň mínus 18 rokov)
    let eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    let yearEighteen = eighteenYearsAgo.getFullYear();
    let monthEighteen = ("0" + (eighteenYearsAgo.getMonth() + 1)).slice(-2);
    let dayEighteen = ("0" + eighteenYearsAgo.getDate()).slice(-2);

    let maxDateEighteen = `${yearEighteen}-${monthEighteen}-${dayEighteen}`;
    document.getElementById('birthdate').max = maxDateEighteen;
};


function displaySummary() {
    let summaryContent = document.getElementById("summaryContent");

    summaryContent.innerHTML = "Meno: " + document.getElementById("firstName").value + "<br>"
        + "Priezvisko: " + document.getElementById("surname").value + "<br>"
        + "Email: " + document.getElementById("email").value + "<br>"
        + "Dátum narodenia: " + document.getElementById("birthdate").value + "<br>"
        + "Vek: " + document.getElementById("age").value + "<br>"
        + "Pohlavie: " + document.getElementById("gender").options[document.getElementById("gender").selectedIndex].text + "<br>"
        + "Telefónne číslo: " + document.getElementById("predvolba").value + " " + document.getElementById("telefon").value + "<br>"
        + "Značka auta: " + document.getElementById("brand").options[document.getElementById("brand").selectedIndex].text + "<br>"
        + "Model auta: " + document.getElementById("model").options[document.getElementById("model").selectedIndex].text + "<br>"
        + "Verzia auta: " + document.getElementById("version").options[document.getElementById("version").selectedIndex].text + "<br>"
        + "Dátum prevzatia: " + document.getElementById("takeDate").value + "<br>";

    if (document.getElementById("days").checked) {
        const takeDateValue = document.getElementById('takeDate').value;
        const giveDateValue = document.getElementById('giveDate').value;

        const takeDateObj = new Date(takeDateValue);
        const giveDateObj = new Date(giveDateValue);

        const duration = daysDifference(takeDateObj, giveDateObj);

        summaryContent.innerHTML += "Dátum vrátenia: " + giveDateValue + "<br>";
        summaryContent.innerHTML += "Dĺžka požičiavania: " + duration + " dní<br>";
    }else{
        summaryContent.innerHTML += "Dĺžka požičiavania: Jeden ďeň" + "<br>"
    }

    summaryContent.innerHTML += "Čas prevzatia: " + document.getElementById("casPrevzatia").value + "<br>";

    let carBrandsHome = document.querySelectorAll("input[name=car]:checked");
    let brands = [];
    carBrandsHome.forEach(function (checkbox) {
        brands.push(checkbox.value);
    });

    if (brands.includes("other")) {
        brands[brands.indexOf("other")] = document.getElementById("otherInput").value;
    }

    summaryContent.innerHTML += "Značky áut doma: " + brands.join(", ") + "<br>";

    document.getElementById("summaryModal").style.display = "block";

    const totalPrice = calculatePrice();
    summaryContent.innerHTML += "Cena: " + totalPrice + "€<br>";
}



function submitForm() {
    document.getElementById("formId").submit();
}

function updateGiveDateMin() {
    const takeDateElement = document.getElementById('takeDate');
    const giveDateElement = document.getElementById('giveDate');

    if (takeDateElement.value) {
        const takeDate = new Date(takeDateElement.value);

        // Pridajte jeden deň k dátumu prevzatia
        takeDate.setDate(takeDate.getDate() + 1);

        const nextDay = takeDate.toISOString().split('T')[0];
        giveDateElement.min = nextDay;
    } else {
        giveDateElement.min = ''; // Odstráňte obmedzenie, ak nie je vybraný žiadny dátum prevzatia
    }
}

function daysDifference(date1, date2) {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    const diffInDays = (time2 - time1) / (1000 * 60 * 60 * 24);
    return Math.round(diffInDays);
}

function calculatePrice() {
    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    const versionSelect = document.getElementById('version');
    const takeDateInput = document.getElementById('takeDate');
    const giveDateInput = document.getElementById('giveDate');
    const multipleDaysRadio = document.getElementById('days');

    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const selectedIndex = versionSelect.selectedIndex;
    const pricePerDay = carData[selectedBrand][selectedModel][selectedIndex].price;

    let days = 1; // Predvolená hodnota pre jeden deň

    if (multipleDaysRadio.checked) {
        const takeDate = new Date(takeDateInput.value);
        const giveDate = new Date(giveDateInput.value);
        days = daysDifference(takeDate, giveDate);
    }

    const totalPrice = pricePerDay * days;
    document.getElementById('totalPrice').textContent = totalPrice + "€";
    return totalPrice;
}



// Initial setup
setModels();


