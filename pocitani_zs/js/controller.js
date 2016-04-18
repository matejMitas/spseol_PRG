mathApp.service("getTasks", function(){

  this.generate = function(signs, count) {

    // create empty array
    var tasks = [];

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
        nums = [getRandomInt(1, 100), getRandomInt(1, 10)];
        // ensure result will not be negative
        while (nums[0] < nums[1]) {
          nums = [getRandomInt(1, 100), getRandomInt(1, 10)];
        }
        result = nums[0] / nums[1];
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

  
  return this;

});