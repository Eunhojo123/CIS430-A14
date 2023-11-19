const data = [
    {
        "name"    : "Mary",
        "number"  : 407,
        "state"   : "AZ",
        "sex"     : "girl",
        "year"    : 1960
    },
    {
        "name"    : "Lisa",
        "number"  : 250,
        "state"   : "AZ",
        "sex"     : "girl",
        "year"    : 1960
    },
    {
        "name"    : "Patricia",
        "number"  : 245,
        "state"   : "AZ",
        "sex"     : "girl",
        "year"    : 1960
    },
    {
        "name"    : "Linda",
        "number"  : 241,
        "state"   : "AZ",
        "sex"     : "girl",
        "year"    : 1960
    },
    {
        "name"    : "Susan",
        "number"  : 214,
        "state"   : "AZ",
        "sex"     : "girl",
        "year"    : 1960
    }
  ]
  
let names   = []
let numbers = []

names.push('dory')
names
names.push('nemo')
names

names.pop()
names
names.pop()
names

for (let i=0; i<data.length;i++) {
    console.log(data[i].name)
    console.log(data[i].number)
}


names   = []
numbers = []
  
for (let i=0; i<data.length;i++) {
    names.push(data[i].name)
    numbers.push(data[i].number)
}
  
console.log(names)
console.log(numbers)
  