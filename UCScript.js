document.addEventListener('DOMContentLoaded', function() {
  const convertBtn = document.querySelector('#converter-form .btn-convert');
  convertBtn.addEventListener('click', function(event) {
    event.preventDefault();
    updateResult(); // Call the updateResult() function here
  });

  function updateResult() {
    let inputValue = Number(document.getElementById("inputValue").value);
    let inputUnit = document.getElementById("inputUnit").value;
    let outputUnit = document.getElementById("outputUnit").value;
    console.log("inputValue:", inputValue);
    console.log("inputUnit:", inputUnit);
    console.log("outputUnit:", outputUnit);
    console.log("updateResult function called");
    let result;

  // Define conversion factors for each unit type
const lengthFactors = {
  m: 1,
  km: 1000,
  ft: 0.3048,
  mi: 1609.34,
};

const weightFactors = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
};

const volumeFactors = {
  ml: 1,
  l: 1000,
  gal: 3785.41,
};

// Define temperature conversion functions
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
  return (fahrenheit + 459.67) * 5/9;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
  return kelvin * 9/5 - 459.67;
}

// Define time conversion factors
const timeFactors = {
  s: 1,
  min: 60,
  h: 3600,
  d: 86400,
};

// Define function to convert units
function convertUnits(inputValue, inputUnit, outputUnit) {
  // Check for valid input value
  if (isNaN(inputValue) || inputValue === '') {
    alert('Please enter a valid number');
    return;
  }

  // Check for valid input and output units
  if (inputUnit === '' || outputUnit === '') {
    alert('Please select units to convert');
    return;
  }

  // Check for same input and output units
  if (inputUnit === outputUnit) {
    alert('Please select different units to convert');
    return;
  }

  // Determine unit type and conversion factor
  let conversionFactor = 0;
  let unitType = '';

  if (inputUnit in lengthFactors && outputUnit in lengthFactors) {
    conversionFactor = lengthFactors[outputUnit] / lengthFactors[inputUnit];
    unitType = 'length';
  } else if (inputUnit in weightFactors && outputUnit in weightFactors) {
    conversionFactor = weightFactors[outputUnit] / weightFactors[inputUnit];
    unitType = 'weight';
  } else if (inputUnit in volumeFactors && outputUnit in volumeFactors) {
    conversionFactor = volumeFactors[outputUnit] / volumeFactors[inputUnit];
    unitType = 'volume';
  } else if (inputUnit === 'c' && outputUnit === 'f') {
    inputValue = parseFloat(inputValue);
    let fahrenheitValue = celsiusToFahrenheit(inputValue);
    result = `${inputValue}°C is ${fahrenheitValue.toFixed(2)}°F`;
  } else if (inputUnit === 'c' && outputUnit === 'k') {
    inputValue = parseFloat(inputValue);
    let kelvinValue = celsiusToKelvin(inputValue);
    result = `${inputValue}°C is ${kelvinValue.toFixed(2)}K`;
  } else if (inputUnit === 'f' && outputUnit === 'c') {
    inputValue = parseFloat(inputValue);
    let celsiusValue = fahrenheitToCelsius(inputValue);
    result = `${inputValue}°F is ${celsiusValue.toFixed(2)}°C`;
  } else if (inputUnit === 'f' && outputUnit === 'c') {
    inputValue = parseFloat(inputValue);
    let kelvinValue = fahrenheitToKelvin(inputValue);
    result = `${inputValue}°F is ${kelvinValue.toFixed(2)}K`;
    } else if (inputUnit === 'k' && outputUnit === 'c') {
    inputValue = parseFloat(inputValue);
    let celsiusValue = kelvinToCelsius(inputValue);
    result = `${inputValue}K is ${celsiusValue.toFixed(2)}°C`;
    } else if (inputUnit === 'k' && outputUnit === 'f') {
    inputValue = parseFloat(inputValue);
    let fahrenheitValue = kelvinToFahrenheit(inputValue);
    result = `${inputValue}K is ${fahrenheitValue.toFixed(2)}°F`;
    } else if (inputUnit in timeFactors && outputUnit in timeFactors) {
    conversionFactor = timeFactors[outputUnit] / timeFactors[inputUnit];
    unitType = 'time';
    } else {
    alert('Cannot convert these units');
    }


     // Calculate the output value
  const outputValue = inputValue * conversionFactor;

  // Update the result element
  const resultElement = document.getElementById("result");
  resultElement.innerText = outputValue.toFixed(2);
   
  }
}
});