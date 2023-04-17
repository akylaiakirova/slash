// эта функция для обработки номера карты
function formatCardNumber(input) {
  let cardNumber = input.value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "");
  let formattedCardNumber = "";
  for (let i = 0; i < cardNumber.length; i++) {
    if (i % 4 == 0 && i > 0) {
      formattedCardNumber += " ";
    }
    formattedCardNumber += cardNumber[i];
  }
  input.value = formattedCardNumber;
}
// а эта для месяца, если первое число не равно нулю либо единицы автоматически приравниваем ее к нулю
function formatMonth(input) {
  let month = input.value;
  let formattedMonth = month.replace(/\D/g, "").substring(0, 2);
  if (formattedMonth.length === 2) {
    let firstDigit = parseInt(formattedMonth.charAt(0));
    let secondDigit = parseInt(formattedMonth.charAt(1));
    if (firstDigit !== 0 && firstDigit !== 1) {
      formattedMonth = "0" + secondDigit;
    } else if (firstDigit === 1 && secondDigit > 2) {
      formattedMonth = "12";
    }
  }
  input.value = formattedMonth;
}
//это для года и тут первое число всегда будет 2, поскольку мы живем в 202_г
function formatYear(input) {
  let year = input.value;
  let formattedYear = year.replace(/\D/g, "").substring(0, 2);
  if (formattedYear.length === 2) {
    let firstDigit = parseInt(formattedYear.charAt(0));
    if (firstDigit !== 2) {
      formattedYear = "2" + formattedYear.charAt(1);
    }
  }
  input.value = formattedYear;
}
//для имени
function formatName(input) {
  let holderName = input.value;
  let filteredName = holderName.replace(/[^A-Za-z]/g, "");
  input.value = filteredName;
}
//для cvc
function formatCvc(input) {
  let cvc = input.value;
  let filteredCvc = cvc.replace(/[^0-9]/gi, "").substring(0, 3);
  input.value = filteredCvc;
}

const prevButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const skipButton = document.getElementById("skip");
const radios = document.querySelectorAll('input[name="step"]');
let currentStep = 0;
function backBtn(currentStep) {
  if (currentStep == 0) {
    prevButton.classList.add("disable");
    prevButton.disabled = true;
  } else {
    prevButton.classList.remove("disable");
    prevButton.disabled = false;
  }
}
radios.forEach((radio) => {
  radio.addEventListener("change", function () {
    backBtn(this.id.slice(5, 6) - 1);
  });
});
backBtn(currentStep);
prevButton.addEventListener("click", function () {
  currentStep = (currentStep - 1 + radios.length) % radios.length;
  radios[currentStep].checked = true;
  backBtn(currentStep);
});
nextButton.addEventListener("click", function () {
  currentStep = (currentStep + 1) % radios.length;
  radios[currentStep].checked = true;
  backBtn(currentStep);
  if (currentStep == radios.length - 1) {
    nextButton.style.display = "none";
  }
});
skipButton.addEventListener("click", function () {
  currentStep = radios.length - 1;
  radios[currentStep].checked = true;
  backBtn(currentStep);
});

const tooltip = document.querySelector('.tooltip');
const tooltipOn = document.querySelector('.tooltip__on');
const tooltipOff = document.querySelector('.tooltip__off')
tooltipOn.addEventListener('click', function() {
  tooltip.style.display = 'block';
});
tooltipOff.addEventListener('click', function() {
  tooltip.style.display = 'none';
});