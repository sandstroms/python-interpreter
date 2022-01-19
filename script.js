function submit() {
  let text = document.getElementById("input").value;
  if(text[0] && text[0] === 'p' && text[1] && text[1] === 'r' &&
     text[2] && text[2] === 'i' && text[3] && text[3] === 'n' &&
     text[4] && text[4] === 't') {
       let stack = [];
       if(text[5] && text[5] === '(') {
         stack.push(text[5]);
       };
       var i = 7;
       var output = "";
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
}
