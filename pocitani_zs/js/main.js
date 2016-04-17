/* -------------------------------- 

PLÁN:

- čísla do 100 u +-, u /* do 10, s tím, že č2 musím být menší než č1
- určíme matematické operace
- vygenerujeme dvě čísla podle požadavků
- vypočteme výsledek
- zaneseme do view
- porovnáme
- znovu vygenerujeme


-------------------------------- */

/* -------------------------------- 

Main function

-------------------------------- */

function generateTasks(signs, count) {

  // helper function
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // base vars
  var operators = signs.split('');
  // remove previous tasks
  tasks = [];

  for (i = 0; i < count; i++) {
    var result;
    var nums;

    // random operators chose from available operators
    var randomOperator = operators[getRandomInt(0, operators.length - 1)];

    // generate nums depending on the operator
    if (randomOperator == '*') {
      nums = [getRandomInt(2, 10), getRandomInt(2, 10)];
      result = nums[0] * nums[1];
    } 

    else if (randomOperator == '/') {

    }

    else if (randomOperator == '+') {
      nums = [getRandomInt(1, 50), getRandomInt(1, 50)];
      result = nums[0] + nums[1]; 
    }

    else if (randomOperator == '-') {
      nums = [getRandomInt(1, 50), getRandomInt(1, 50)];
      // ensure result will not be negative
      while (nums[0] < nums[1]) {
        nums = [getRandomInt(1, 50), getRandomInt(1, 50)];
      }
      result = nums[0] - nums[1];
    }

    tasks.push({
      firstNum: nums[0],
      secondNum: nums[1],
      operator: randomOperator,
      expectedResult: result 
    })
  }
  return tasks;
}



/* -------------------------------- 

Usage

-------------------------------- */
// create empty array
var tasks = [];

// call function with operators and number of tasks
generateTasks('*-+', 5);


console.log(tasks);