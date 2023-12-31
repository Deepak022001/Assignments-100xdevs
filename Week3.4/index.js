function StringCalculate(str) {
    const calculate = (a, b, operator) => {
      switch (operator) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return Math.floor(a / b); // Integer division without decimals
        case '**':
          return Math.pow(a, b);
        default:
          return 0;
      }
    };
  
    const precedence = (operator) => {
      if (operator === '**') return 3;
      if (operator === '*' || operator === '/') return 2;
      if (operator === '+' || operator === '-') return 1;
      return 0;
    };
  
    const tokens = str.match(/\d+|\*\*|[+\-*/()]/g) || [];
  
    const stackOperands = [];
    const stackOperators = [];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.match(/\d+/)) {
        stackOperands.push(parseInt(token, 10));
      } else if (token === '(') {
        stackOperators.push(token);
      } else if (token === ')') {
        while (stackOperators.length && stackOperators[stackOperators.length - 1] !== '(') {
          const op = stackOperators.pop();
          const operand2 = stackOperands.pop();
          const operand1 = stackOperands.pop();
          stackOperands.push(calculate(operand1, operand2, op));
        }
        stackOperators.pop(); // Pop '('
      } else {
        while (
          stackOperators.length &&
          precedence(token) <= precedence(stackOperators[stackOperators.length - 1])
        ) {
          const op = stackOperators.pop();
          const operand2 = stackOperands.pop();
          const operand1 = stackOperands.pop();
          stackOperands.push(calculate(operand1, operand2, op));
        }
        stackOperators.push(token);
      }
    }
  
    while (stackOperators.length) {
      const op = stackOperators.pop();
      const operand2 = stackOperands.pop();
      const operand1 = stackOperands.pop();
      stackOperands.push(calculate(operand1, operand2, op));
    }
  
    return stackOperands[0] || 0;
  }
  
  // // Test cases
  // console.log(StringCalculate("6*(4/2)+3*1")); // Output: 15
  // console.log(StringCalculate("100*2**4"));   // Output: 1600
  
console.log(StringCalculate(readline()));