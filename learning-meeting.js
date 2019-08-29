const object = { str: "Hello", num: 24, nil: null, undef: undefined };

const getStr = obj => obj.str;
const getNum = obj => obj.num;
const getNil = obj => obj.nil;
const getUndef = obj => obj.undef;

getNum(getNull(obj))

a -> b
b -> c
x -> y