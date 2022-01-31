module.exports = function check(str, bracketsConfig) {
    const openBrackets = ["(", "[", "{"];
    const bracketsPair = {
        [")"] : "(",
        ["]"] : "[",
        ["}"] : "{"
    }

    let numberOfRules = bracketsConfig.length;

    for (let i=0; i<numberOfRules; i++) {
        if (!openBrackets.includes(bracketsConfig[i][0])) {
            openBrackets.push(bracketsConfig[i][0]);
            if (bracketsConfig[i][0] !== bracketsConfig[i][1]) {
                bracketsPair[bracketsConfig[i][1]] = bracketsConfig[i][0];
            }

        }
    }
    let stack = [];

    for (let i=0; i<str.length; i++) {

        let currentSymbol = str[i];

        if (openBrackets.includes(currentSymbol)) {
            stack.push(currentSymbol);
        } else {
            if (stack.length === 0) {
                return false;
            }

            let topElementOfStack = stack[stack.length-1];

            if (bracketsPair[currentSymbol] === topElementOfStack){
                stack.pop();
            } else {
                return false;
            }
        }

        for (let i=0; i<stack.length; i++) {
            for (let j=0; j<numberOfRules; j++) {
                if ((stack[i] === stack[i+1]) && (stack[i] === bracketsConfig[j][0]) && (stack[i] === bracketsConfig[j][1])) {
                    stack.pop();
                    stack.pop();
                }
            }
        }
    }

    return stack.length === 0;

}
