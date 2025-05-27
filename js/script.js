'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const metricTab = document.getElementById('metric-tab');
  const imperialTab = document.getElementById('imperial-tab');
  const metricContent = document.getElementById('metric-content');
  const imperialContent = document.getElementById('imperial-content');
  const bmiForm = document.getElementById('bmi-form');
  const resultSection = document.getElementById('result');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCategory = document.getElementById('bmi-category');
  const bmiMessage = document.getElementById('bmi-message');

  const weightKg = document.getElementById('weight-kg');
  const heightCm = document.getElementById('height-cm');
  const weightLb = document.getElementById('weight-lb');
  const heightFt = document.getElementById('height-ft');
  const heightIn = document.getElementById('height-in');

  const weightKgError = document.getElementById('weight-kg-error');
  const heightCmError = document.getElementById('height-cm-error');
  const weightLbError = document.getElementById('weight-lb-error');
  const heightFtError = document.getElementById('height-ft-error');
  const heightInError = document.getElementById('height-in-error');

  // Set initial required attributes based on default tab
  weightKg.setAttribute('required', '');
  heightCm.setAttribute('required', '');
  weightLb.removeAttribute('required');
  heightFt.removeAttribute('required');
  heightIn.removeAttribute('required');

  let activeUnit = 'metric';

  function hideAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');

    errorMessages.forEach((error) => error.classList.remove('show'));
  }

  function switchTab(unit) {
    activeUnit = unit;

    if (unit === 'metric') {
      metricTab.classList.add('active');
      imperialTab.classList.remove('active');
      metricTab.setAttribute('aria-selected', 'true');
      imperialTab.setAttribute('aria-selected', 'false');
      metricContent.style.display = 'block';
      imperialContent.style.display = 'none';

      weightKg.setAttribute('required', '');
      heightCm.setAttribute('required', '');
      weightLb.removeAttribute('required');
      heightFt.removeAttribute('required');
      heightIn.removeAttribute('required');
    } else {
      imperialTab.classList.add('active');
      metricTab.classList.remove('active');
      imperialTab.setAttribute('aria-selected', 'true');
      metricTab.setAttribute('aria-selected', 'false');
      imperialContent.style.display = 'block';
      metricContent.style.display = 'none';

      weightKg.removeAttribute('required');
      heightCm.removeAttribute('required');
      weightLb.setAttribute('required', '');
      heightFt.setAttribute('required', '');
      heightIn.setAttribute('required', '');
    }

    bmiForm.reset();
    resultSection.classList.remove('show');
    hideAllErrors();
  }

  function validateForm() {
    hideAllErrors();

    let isValid = true;

    if (activeUnit === 'metric') {
      if (!weightKg.value || weightKg.value < 20 || weightKg.value > 300) {
        weightKgError.classList.add('show');
        isValid = false;
      }

      if (!heightCm.value || heightCm.value < 50 || heightCm.value > 250) {
        heightCmError.classList.add('show');
        isValid = false;
      }
    } else {
      if (!weightLb.value || weightLb.value < 40 || weightLb.value > 700) {
        weightLbError.classList.add('show');
        isValid = false;
      }

      if (!heightFt.value || heightFt.value < 1 || heightFt.value > 8) {
        heightFtError.classList.add('show');
        isValid = false;
      }

      if (heightIn.value === '' || heightIn.value < 0 || heightIn.value > 11) {
        heightInError.classList.add('show');
        isValid = false;
      }
    }

    return isValid;
  }

  function displayResult(bmi) {
    // Round to 1 decimal place
    const roundedBMI = Math.round(bmi * 10) / 10;
    bmiValue.textContent = roundedBMI.toFixed(1);

    let category;
    let message;

    if (bmi < 18.5) {
      category = 'Underweight';
      message =
        'Your BMI indicates that you may be underweight. Consider consulting with a healthcare professional.';
    } else if (bmi < 25) {
      category = 'Normal weight';
      message =
        'Your BMI indicates that you have a healthy weight for your height.';
    } else if (bmi < 30) {
      category = 'Overweight';
      message =
        'Your BMI indicates that you may be overweight. Consider consulting with a healthcare professional.';
    } else {
      category = 'Obesity';
      message =
        'Your BMI indicates obesity. It is recommended to consult with a healthcare professional.';
    }

    bmiCategory.textContent = category;
    bmiMessage.textContent = message;

    resultSection.classList.add('show');
  }

  function calculateBMI() {
    let bmi;

    if (activeUnit === 'metric') {
      const weight = parseFloat(weightKg.value);
      const height = parseFloat(heightCm.value) / 100;

      bmi = weight / (height * height);
    } else {
      const weight = parseFloat(weightLb.value);
      const heightInches =
        parseFloat(heightFt.value) * 12 + parseFloat(heightIn.value);

      bmi = (weight * 703) / (heightInches * heightInches);
    }

    displayResult(bmi);
  }

  // EVENT LISTENERS
  metricTab.addEventListener('click', () => {
    switchTab('metric');
  });

  imperialTab.addEventListener('click', () => {
    switchTab('imperial');
  });

  bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      calculateBMI();
    }
  });
});
