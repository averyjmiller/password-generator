var generateBtn = document.querySelector("#generate");

function getPasswordOptions() {

  // Variable to store length of password from user input
  var length = parseInt(
    prompt('How many characters would you like your password to contain?'),
    10
  );

  // Conditional statement to check if password length is a number. Prompts end if this evaluates false
  if (Number.isNaN(length)) {
    alert('Password length must be provided as a number');
    return null;
  } 

  // Conditional statment to check if password length is at least 8 characters and no more than 128 characters. Promps end if this is false
  if (length < 8 || length > 128) {
    alert('Password length must be at least 8 characters and no more than 128 characters');
    return null;
  }

  // Variable to store boolean regarding the inclusion of lower case characters
  var hasLowerCaseCharacters = confirm(
    'Click OK to confirm including lower case characters.'
  );

  // Variable to store boolean regarding the inclusion of upper case characters
  var hasUpperCaseCharacters = confirm(
    'Click OK to confirm including upper case characters.'
  );

  // Variable to store boolean regarding the inclusion of numeric characters
  var hasNumericCharacters = confirm(
    'Click OK to confirm including numeric characters.'
  );

  // Variable to store boolean regarding the inclusion of special characters
  var hasSpecialCharacters = confirm(
    'Click OK to confirm including special characters.'
  );

  // Verifies that at least one character type is selected
  if (!hasLowerCaseCharacters && !hasUpperCaseCharacters && !hasNumericCharacters && !hasSpecialCharacters) {
    alert('Password must contain at least one character type. Please try again.');
    return null;
  }

   // Object to store user input
   var passwordOptions = {
    length: length,
    hasLowerCaseCharacters: hasLowerCaseCharacters,
    hasUpperCaseCharacters: hasUpperCaseCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasSpecialCharacters: hasSpecialCharacters
   }

   return passwordOptions;
}



// Function for getting a random element from an array(all instances of arr will be replaced by an ACTUAL VALUE when we do our callback.)
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
}

// Function to generate password with user input
function generatePassword() {

  var options = getPasswordOptions();
  // Variable to store password as it's being concatenated
  var result = [];

  // Array to store types of characters to include in password
  var possibleCharacters = [];

  // Array to contain one of each type of chosen character to ensure each will be used
  var guaranteedCharacters = [];

  var lowerCaseCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var upperCaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var specialCharacters = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Check if an options object exists, if not exit the function
  if (!options) return null;

   // Conditional statement that adds array of special characters into array of possible characters based on user input
  // Push new random special character to guaranteedCharacters
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

   // Conditional statement that adds array of numeric characters into array of possible characters based on user input
  // Push new random numeric character to guaranteedCharacters
  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

   // Conditional statement that adds array of upper case characters into array of possible characters based on user input
  // Push new random upper case character to guaranteedCharacters
  if (options.hasUpperCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCaseCharacters);
    guaranteedCharacters.push(getRandom(upperCaseCharacters));
  }

   // Conditional statement that adds array of lower case characters into array of possible characters based on user input
  // Push new random lower case character to guaranteedCharacters
  if (options.hasLowerCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCaseCharacters);
    guaranteedCharacters.push(getRandom(lowerCaseCharacters));
  }

  // Loops through the guaranteedCharacters array to randomly push each element into the result array. When an element is pushed it is removed so there are no repeats
  // This makes sure that the desired character types are all present in the final password
  for (i = guaranteedCharacters.length; i > 0; --i) {
    var randomCharacter = getRandom(guaranteedCharacters);

    result.push(randomCharacter);

    // 'indexOf' and 'splice' lines of code are provided by https://sentry.io/answers/remove-specific-item-from-array/
    index = guaranteedCharacters.indexOf(randomCharacter);
    guaranteedCharacters.splice(index, 1);
  }

  var difference = options.length - result.length;

  // Random elements in the possibleCharacters array are pushed to the result array until it reaches the desired password length
  for (i = 0; i < difference; ++i) {
    result.push(getRandom(possibleCharacters));
  }

    // Transform the result into a string and pass into writePassword
    return result.join('');
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
