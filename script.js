let variableObject = {};
let variableType = {};
let variableArr = [];

function submit() {
  let text = document.getElementById("input").value;
  let isNumberRegexp = new RegExp("[-0-9.]");
  let firstCharacterOfVarRegexp = new RegExp("[a-z]", "i");
  if(text[0] && text[0] === 'p' && text[1] && text[1] === 'r' &&
     text[2] && text[2] === 'i' && text[3] && text[3] === 'n' &&
     text[4] && text[4] === 't') {
       let i = 4;
       printStatement(isNumberRegexp, text, i);
  } else if(text[0] && text[0] === 'i' && text[1] && text[1] === 'f') {
    let i = 3; // index two is just a space
    let num1 = "";
    let operator = "";
    let num2 = "";
    let num1AsNum = "";
    let num2AsNum = "";
    let conditionResult = false;
    let isOperatorRegexp = new RegExp("[<>=]");
    while (text[i] && isNumberRegexp.test(text[i])) {
      num1 += text[i];
      i++;
    }
    i++; // this index is just a space
    while (text[i] && isOperatorRegexp.test(text[i])) {
        operator += text[i];
        i++;
    }
    i++;
    while (text[i] && isNumberRegexp.test(text[i])) {
      num2 += text[i];
      i++;
    }
    num1AsNum = parseInt(num1);
    num2AsNum = parseInt(num2);
    if(operator === '<') {
      if(num1AsNum < num2AsNum) {
        conditionResult = true;
      }
    } else if(operator === '>') {
      if(num1AsNum > num2AsNum) {
        conditionResult = true;
      }
    } else if(operator === '==') {
      if(num1AsNum === num2AsNum) {
        conditionResult = true;
      }
    } else if(operator === '<=') {
        if(num1AsNum <= num2AsNum) {
          conditionResult = true;
        }
    } else if(operator === '>=') {
        if(num1AsNum >= num2AsNum) {
            conditionResult = true;
        }
    }
    if(text[i] === ':') {
      i++;
    } else {
      document.getElementById("output").innerHTML = "Invalid conditional"
    }
    if(text[i] === '\n') {
      i++;
    }
    if(text[i] !== ' ') {
      document.getElementById("output").innerHTML = "Invalid statement - needs indentation"
    }
    while(text[i] === ' ') {
      i++;
    }
    if(conditionResult) {
      if(text[i] && text[i] === 'p' && text[i+1] && text[i+1] === 'r' &&
         text[i+2] && text[i+2] === 'i' && text[i+3] && text[i+3] === 'n' &&
         text[i+4] && text[i+4] === 't') {
           i += 4;
           printStatement(isNumberRegexp, text, i);
      }
  }

  } else if(text[0] && firstCharacterOfVarRegexp.test(text[0])) {
  let restOfVarRegexp = new RegExp("[a-z0-9_]", "i");
  let varName = text[0];
  let i = 1;
  while(text[i] && text[i] !== ' ' && text[i] !== '=') {
    if(!restOfVarRegexp.test(text[i])) {
      document.getElementById("output").innerHTML = "Invalid variable name";
      break;
    }
    varName += text[i];
    i++;
  }
  let variableValue = "";
  if(text[i] && text[i] === ' ') {
    i++;
  }
  if(text[i] && text[i] === '=') {
    i++;
    if(text[i] && text[i] === ' ') {
      i++;
    }
    let numberRegex = new RegExp("[-0-9.]");
    if(text[i] && text[i] === 's' && text[i+1] &&
       text[i+1] === 't' && text[i+2] && text[i+2] === 'r') {
       i += 2;
       let number = "";
       if(text[i+1] && text[i+1] === '(') {
         i += 2;
         while(text[i] && numberRegex.test(text[i])) {
           number += text[i];
           i++;
         }
         if(text[i] === ')') {
           variableValue = number;
           variableType[varName] = 'str';
         }
       }
    } else if(text[i] && text[i] === 'i' && text[i+1] &&
       text[i+1] === 'n' && text[i+2] && text[i+2] === 't') {
         i += 2;
         let int = "";
         if(text[i+1] && text[i+1] === '(') {
           i += 2;
           if(text[i] && text[i] === '"') {
             i++;
             while(text[i] && text[i] !== '"') {
               int += text[i];
               i++;
             }
             if(text[i] === '"') {
               variableValue = parseInt(int);
               variableType[varName] = "int";
               i++;
             }
           }
         }
    } else if(text[i] && text[i] == 'f' && text[i+1] && text[i+1] == 'l' &&
       text[i+2] && text[i+2] === 'o' && text[i+3] && text[i+3] === 'a' &&
       text[i+4] && text[i+4] === 't') {
         i += 4;
         let number = "";
         if(text[i+1] && text[i+1] === '(') {
           i += 2;
           while(text[i] && isNumberRegexp.test(text[i])) {
             number += text[i];
             i++;
           }
           if(text[i] === ')') {
             variableValue = parseAFloat(number);
             variableType[varName] = 'float';
           }
         }
    }
    if(text[i] && text[i] === 'j' && text[i+1] && text[i+1] === 's' &&
       text[i+2] && text[i+2] === 'o' && text[i+3] && text[i+3] === 'n' &&
       text[i+4] && text[i+4] === '.' && text[i+5] && text[i+5] === 'l' &&
       text[i+6] && text[i+6] === 'o' && text[i+7] && text[i+7] === 'a' &&
       text[i+8] && text[i+8] === 'd' && text[i+9] && text[i+9] === 's') {
         i += 10;
         if(text[i] && text[i] === '(') {
           let pythonDict = {};
           i++;
           if(text[i] && text[i] === "'") {
             i++;
             if(text[i] && text[i] === "{") {
               i++;
               pythonDict = parseJson(text, i);
               variableArr[0] = pythonDict;
             }
           }
         }
    }
    if(text[i] && text[i] === 'j' && text[i+1] && text[i+1] === 's' &&
       text[i+2] && text[i+2] === 'o' && text[i+3] && text[i+3] === 'n' &&
       text[i+4] && text[i+4] === '.' && text[i+5] && text[i+5] === 'd' &&
       text[i+6] && text[i+6] === "u" && text[i+7] && text[i+7] === "m" &&
       text[i+8] && text[i+8] === "p" && text[i+9] && text[i+9] === "s") {
      let pythonDict = variableArr[1];
      let keys = Object.keys(pythonDict);
      let jsonString = "{";
      jsonString += "\"";
      jsonString += keys[0];
      jsonString += "\": \"";
      jsonString += pythonDict[keys[0]];
      jsonString += "\", \"";
      jsonString += keys[1];
      jsonString += "\": \""
      jsonString += pythonDict[keys[1]];
      jsonString += "\", \"";
      jsonString += keys[2];
      jsonString += "\": \""
      jsonString += pythonDict[keys[2]];
      jsonString += "\"}";
      variableObject[varName] = jsonString;
      variableType[varName] = "str";
    }
    if(text[i] && text[i] === "{") {
      let pythonDict = {};
      i++;
      while(text[i] && text[i] !== "\"") {
        i++;
      }
      i++;
      let key;
      [key, i] = parseKey(text, i);
      i += 3;
      let value;
      [value, i] = parseValue(text, i);
      pythonDict[key] = value;
      i += 2;
      [key, i] = parseKey(text, i);
      i += 3;
      [value, i] = parseValue(text, i);
      pythonDict[key] = value;
      i += 2;
      [key, i] = parseKey(text, i);
      i += 3;
      [value, i] = parseValue(text, i);
      pythonDict[key] = value;
      variableArr[1] = pythonDict;
    } else if(text[i] && text[i] === "\"" || text[i] === "'") {
      let quote = text[i];
      i++;
      while(text[i] && text[i] !== "\"" && text[i] !== "'") {
        variableValue += text[i];
        variableType[varName] = 'str';
        i++;
      }
      if(quote === text[i]) {
        variableObject[varName] = variableValue;
      } else {
        document.getElementById("output").innerHTML = "Unmatching quotes"
      }
    } else if(text[i] && text[i] === '[') {
      i++;
      let list = [];
      while(text[i] && text[i] !== ']') {
        let listItem = "";
        while(text[i] && text[i] !== ',' && text[i] !== ']') {
          listItem += text[i];
          i++;
        }
        list.push(listItem);
        i++;
      }
      variableType[varName] = 'list';
      variableObject[varName] = list;
    } else if(text[i] && isNumberRegexp.test(text[i])) {
      let isFloat = false;
      while(text[i] && isNumberRegexp.test(text[i])) {
        variableValue += text[i];
        if(text[i] === '.') {
          isFloat = true;
        }
        i++;
      }
      variableObject[varName] = variableValue;
      if(isFloat) {
        variableType[varName] = 'float';
      } else {
        if(!variableType[varName]) {
          variableType[varName] = 'int';
        }
      }
    }
    }
  } else if(text[0] === '#') {
    // do nothing for a comment
  }
}

function parseKey(text, i) {
  let key = "";
  if(text[i] === "\"") {
    i++;
  }
  while(text[i] && text[i] !== "\"") {
    key += text[i];
    i++;
  }
  return [key, i]
}

function parseValue(text, i) {
  let value = "";
  let numberRegex = new RegExp("[0-9]");
  if(text[i] === "\"") {
    i++;
    while(text[i] && text[i] !== "\"") {
      value += text[i];
      i++;
    }
    i++;
  } else if(numberRegex.test(text[i])) {
    value += text[i];
    while(numberRegex.test(text[i])) {
      value += text[i];
      i++;
    }
    value = Number(value);
  }
  return [value, i];
}

function parseAFloat(int) {
    let isNumberRegexp = new RegExp("[-0-9.]");
    if(isNumberRegexp.test(int)) {
      int += ".0";
    }

    return int;
}

function parseJson(text, i) {
  let pythonDict = {};
  [pythonDict, i] = parseKeyValue(pythonDict, text, i);
  i += 2;
  [pythonDict, i] = parseKeyValue(pythonDict, text, i);
  i += 2;
  [pythonDict, i] = parseKeyValue(pythonDict, text, i);
  if(text[i] && text[i] === "}" && text[i+1] && text[i+1] === "'" &&
     text[i+2] && text[i+2] === ")") {
    return pythonDict;
  } else {
    return undefined;
  }
}

function isANumber(value) {
  let numberRegex = new RegExp("[-0-9.]");
  return numberRegex.test(value);
}

function parseKeyValue(pythonDict, text, i) {
  let key = "";
  let value = "";
  if(text[i] && text[i] === "\"") {
    i++;
    while (text[i] && text[i] !== "\"") {
      key += text[i];
      i++;
    }
    i++;
    if(text[i] && text[i] === ":") {
      i += 2; // ignore the space
      if(text[i] && text[i] === "\"") {
        i++;
        while(text[i] && text[i] !== "\"") {
          value += text[i];
          i++;
        }
        i++;
      } else if(isANumber(text[i])) {
        while(text[i] && text[i] !== "," && text[i] !== "}") {
          value += text[i]
          i++;
        }
        value = Number(value);
      }
    }
  }
  pythonDict[key] = value;
  return [pythonDict, i];
}

function printStatement(isNumberRegexp, text, i) {
  let stack = [];
  i++;
  if(text[i] && text[i] === '(') {
    stack.push(text[i]);
  }
  i++;
  let output = "";
  if(text[i] && text[i] === 't' && text[i+1] && text[i+1] === 'y'
     && text[i+2] && text[i+2] === 'p' && text[i+3] && text[i+3] === 'e') {
     if(text[i+4] && text[i+4] === '(') {
       i += 4;
       let firstCharacterOfVarRegexp = new RegExp("[a-z]", "i");
       let restOfVarRegexp = new RegExp("[a-z0-9_]", "i");
       let variableName = "";
       if(text[i+1] && firstCharacterOfVarRegexp.test(text[i+1])) {
         variableName += text[i+1];
         i += 2;
         while(text[i] && restOfVarRegexp.test(text[i])) {
           variableName += text[i];
           i++;
         }
       }
       if(text[i+1] && text[i+1] === ')') {
         document.getElementById("output").innerHTML = variableType[variableName];
       }
     }
  } else if(text[i] && isNumberRegexp.test(text[i])) {
      let num1 = text[i];
      i++;
      while(text[i] && isNumberRegexp.test(text[i]) && text[i] !== ' ' && text[i] !== ')') {
        num1 += text[i];
        i++;
      }
      if(text[i] === ')') {
        document.getElementById("output").innerHTML = num1;
      } else {
        let num2 = "";
        let operator = "";
        if(text[i] && text[i] === ' ') {
          i++;
          if(text[i] === '=') {
            i++;
            if(text[i] === '=') {
              operator = '==';
            }
            let nums = getSecondNumber(isNumberRegexp, text, i);
            num2 = nums[0];
            i = nums[1];
            if(text[i] && text[i] === ')') {
              stack.pop();
            }
          } else {
            if(text[i] === '>' || text[i] === '<' || text[i] === '+' || text[i] === '-') {
              operator = text[i];
              let nums = getSecondNumber(isNumberRegexp, text, i);
              num2 = nums[0];
              i = nums[1];
              if(text[i] && text[i] === ')') {
                stack.pop();
              }
            }
          }
        }
        if(stack.length == 0) {
          let num1AsNum = Number(num1);
          let num2AsNum = Number(num2);
          if(operator === '<') {
            if(num1AsNum < num2AsNum) {
              document.getElementById("output").innerHTML = "True";
            } else {
              document.getElementById("output").innerHTML = "False";
            }
          } else if(operator === '>') {
            if(num1AsNum > num2AsNum) {
              document.getElementById("output").innerHTML = "True";
            } else {
              document.getElementById("output").innerHTML = "False";
            }
          } else if(operator === '==') {
            if(num1AsNum === num2AsNum) {
              document.getElementById("output").innerHTML = "True";
            } else {
              document.getElementById("output").innerHTML = "False";
            }
          } else if(operator === '+') {
            document.getElementById("output").innerHTML = num1AsNum + num2AsNum;
          } else if(operator === '-') {
            document.getElementById("output").innerHTML = num1AsNum - num2AsNum;
          }
        } else {
          document.getElementById("output").innerHTML = "Invalid format";
        }
      }
  } else {
      if(text[i] && text[i] === '"' || text[i] === "'") {
        i++;
        while(text[i] && text[i] !== '"' && text[i] !== "'") {
          output += text[i];
          i++;
        }
        i++;
      } else {
        let variableName = "";
        while(text[i] && text[i] !== ')' && text[i] !== '.' && text[i] !== '[') {
          variableName += text[i];
          i++;
        }
        if(text[i] === '.') {
          if(text[i+1] && text[i+1] === 'u' && text[i+2] &&
             text[i+2] === 'p' && text[i+3] && text[i+3] === 'p' &&
             text[i+4] && text[i+4] === 'e' && text[i+5] &&
             text[i+5] === 'r' && text[i+6] && text[i+6] === '(' &&
             text[i+7] && text[i+7] === ')') {
               if(variableObject[variableName] !== undefined) {
                 output = variableObject[variableName].toUpperCase();
               }
               i += 8;
          } else if(text[i+1] && text[i+1] === 'l' && text[i+2] &&
                    text[i+2] === 'o' && text[i+3] && text[i+3] === 'w' &&
                    text[i+4] && text[i+4] === 'e' && text[i+5] &&
                    text[i+5] === 'r' && text[i+6] && text[i+6] === '(' &&
                    text[i+7] && text[i+7] === ')') {
              if(variableObject[variableName] !== undefined) {
                output = variableObject[variableName].toLowerCase();
              }
              i += 8;
          }
        } else if(text[i] && text[i] === "[")  {
          i++;
          if(text[i] && text[i] === "\"") {
            i++;
            let key = "";
            while(text[i] && text[i] !== "\"") {
              key += text[i];
              i++;
            }
            i++;
            if(text[i] && text[i] !== "]") {
              document.getElementById("output").innerHTML = "Square brackets need to be closed";
              return;
            } else {
              i++;
              output = variableArr[0][key];
            }
          }
        } else {
          if(variableObject[variableName] !== undefined) {
            if(variableType[variableName] === 'list') {
              let list = variableObject[variableName];
              let tempOutput = "[";
              for(let i = 0; i < list.length; i++) {
                for(let j = 0; j < list[i].length; j++) {
                  if(list[i][j] === '"') {
                    tempOutput += "'";
                  } else {
                    tempOutput += list[i][j]
                  }
                }
                if(i != list.length-1) {
                  tempOutput += ", ";
                }
              }
              tempOutput += "]";
              output = tempOutput;
            } else {
              output = variableObject[variableName];
            }
          }
        }
      }
      if(text[i] && text[i] === ')') {
        document.getElementById("output").innerHTML = output;
      } else {
        document.getElementById("output").innerHTML = "Invalid format";
      }
    }
}

function getSecondNumber(isNumberRegexp, text, i) {
  let num2 = "";
  i++;
  if(text[i] && text[i] === ' ') {
    i++;
    while(text[i] && isNumberRegexp.test(text[i])) {
      num2 += text[i];
      i++;
    }
  }
  return [num2, i];
}
