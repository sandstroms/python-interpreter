This Python Interpreter allows you to assign values to variables and subsequently print the values. It can also print variable values as uppercase or lowercase. It can identify the type of a value (int or str are the only types supported currently). It also works with print statements. It can perform print statements with the following operators: '+', '-', '<', '>', '=='. It can perform type casting to string from an integer by entering an integer into the str function, or string to integer by entering a string into the int function. It also supports json.loads with one JSON string with three key-value pairs. Similarly, json.dumps is supported with three key-value pairs, but each value must be a string. Here is a sample of statements that can be entered (must be entered one at a time):
if 5 < 10:
  print("hello")
if 12 < 5:
  print("hello")
x = 52
print(x)
print(type(x))
x = str(52)
print(type(x))
y = "sample"
print(y.upper())
print(5 < 10)
abc = ["abc", "def"]
print(abc)
x = json.loads('{"hello": "world", "sample": 2, "key": "value"}')
print(x["sample"])
abc = {"a": "b", "c": "d", "e": "f"}
x = json.dumps(abc)
print(x)
