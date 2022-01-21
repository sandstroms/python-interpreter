function submit() {
  let text = document.getElementById("input").value;
  let isNumberRegexp = new RegExp("[0-9]")
  if(text[0] && text[0] === 'p' && text[1] && text[1] === 'r' &&
     text[2] && text[2] === 'i' && text[3] && text[3] === 'n' &&
     text[4] && text[4] === 't') {
       let stack = [];
       if(text[5] && text[5] === '(') {
         stack.push(text[5]);
       }
       let output = "";
       if(text[6] && isNumberRegexp.test(text[6])) {
         let num1 = text[6];
         let i = 7;
         while(text[i] && isNumberRegexp.test(text[i]) && text[i] !== ' ') {
           num1 += text[i];
           i++;
         }
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
       } else {
           let i = 7;
           if(text[6] && text[6] === '"') {
             while(text[i] && text[i] !== '"') {
               output += text[i];
               i++;
             }
           }
           i++;
           if(text[i] && text[i] === ')') {
             document.getElementById("output").innerHTML = output;
           }
         }
  } else {
    let firstCharacterOfVarRegexp = new RegExp("[a-z]", "i");
    let restOfVarRegexp = new RegExp("[a-z0-9_]", "i");

    if(text[0] && firstCharacterOfVarRegexp.test(text[0])) {
      let varName = text[0];
      let i = 1;
      while(text[i] && text[i] !== ' ') {
        if(!restOfVarRegexp.test(text[i])) {
          document.getElementById("output").innerHTML = "Invalid variable name";
          break;
        }
        varName += text[i];
        i++;
      }
      i++;
      if(text[i] && text[i] == '=') {
        i++;
        if(text[i] && text[i] == ' ') {
          i++;
          if(text[i] && text[i] == '"') {
            let variableValue = "";
            i++;
            while(text[i] && text[i] !== '"') {
              variableValue += text[i];
              i++;
            }
          } else {
            let variableValue = "";
            while(text[i] && isNumberRegexp.test(text[i])) {
              variableValue += text[i];
              i++;
            }
          }
        }
      }
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
