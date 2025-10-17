const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayLabel = document.querySelector("label[for='day']");
const monthLabel = document.querySelector("label[for='month']");
const yearLabel = document.querySelector("label[for='year']");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

let spans = document.querySelectorAll(".age-result h3 span");
const button = document.querySelector("button");

function validateInput(input, label, errorElement, min, max) {
    const value = Number(input.value.trim());

    if (input.value.trim() === "") {
        label.classList.add("error");
        input.style.border = "1px solid #ff5959";
        errorElement.textContent = "This field is required";
        errorElement.style.display = "block";
        return false;
    } else if (isNaN(value) || value < min || value > max) {
        label.classList.add("error");
        input.style.border = "1px solid #ff5959";
        errorElement.textContent = `Must be a valid value (${min}-${max})`;
        errorElement.style.display = "block";
        return false;
    } else {
        label.classList.remove("error");
        input.style.border = "1px solid #ccc";
        errorElement.style.display = "none";
        return true;
    }
}

function isValidDate(y, m, d) {
    const date = new Date(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
    );
}

button.addEventListener("click", () => {
    const dayValid = validateInput(dayInput, dayLabel, dayError, 1, 31);
    const monthValid = validateInput(monthInput, monthLabel, monthError, 1, 12);
    const yearValid = validateInput(yearInput, yearLabel, yearError, 1800, new Date().getFullYear());

    if (!dayValid || !monthValid || !yearValid) return;

    const day = Number(dayInput.value);
    const month = Number(monthInput.value);
    const year = Number(yearInput.value);

    if (!isValidDate(year, month, day)) {
        dayLabel.classList.add("error");
        dayInput.style.border = "1px solid #ff5959";
        dayError.textContent = "Must be a valid date";
        dayError.style.display = "block";
        return;
    }
    const birthDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays += prevMonthDays;
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    spans[0].textContent = ageYears;
    spans[1].textContent = ageMonths;
    spans[2].textContent = ageDays;
});

