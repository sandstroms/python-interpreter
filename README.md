This Python Interpreter allows you to assign values to variables and subsequently print the values. It can also print variable values as uppercase or lowercase. It can identify the type of a value (int or str are the only types supported currently). It also works with print statements. It can perform print statements with the following operators: '+', '-', '<', '>', '=='. It can perform type casting to string from an integer by entering an integer into the str function, or string to integer by entering a string into the int function. It also supports json.loads with one JSON string with three key-value pairs. However, it does not support loading from file objects. Similarly, json.dumps is supported with three key-value pairs, but each value must be a string. Also, it does not support dumping into file objects. Here is a sample of statements that can be entered (must be entered one at a time):<br>
if 5 < 10: <br>
&emsp;print("hello") <br>
if 12 < 5: <br>
&emsp;print("hello") <br>
x = 52 <br>
print(x) <br>
print(type(x)) <br>
x = str(52) <br>
print(type(x)) <br>
y = "sample" <br>
print(y.upper()) <br>
print(5 < 10) <br>
abc = ["abc", "def"] <br>
print(abc) <br>
x = json.loads('{"hello": "world", "sample": 2, "key": "value"}') <br>
print(x["sample"]) <br>
abc = {"a": "b", "c": "d", "e": "f"} <br>
x = json.dumps(abc) <br>
print(x)
