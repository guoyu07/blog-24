var initNum = 100;
function add(a, b) {
    var sum = initNum + a + b;
    console.log(initNum + " + " + a + " + " + b + " = " + sum);
    return sum;
}
exports.add = add;