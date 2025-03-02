// JavaScript code​​​​​​‌​‌​​‌​‌‌​​​‌​‌​‌‌‌​‌‌‌‌​ below
// Write your answer here, then test your code.

//Dont change that bit
const showExpectedResult = false;
const showHints = false;

const taxGST = 5;
const taxPST = 8;

//
const array_sum = function (accumulator, current_value){
    return accumulator + current_value;
}

const calculateTotal = (prices) => {
    const totals = {};
    // Add together all values from the prices array
    totals.beforeTax = prices.reduce(array_sum);
    console.log(totals.beforeTax);

    // Your code starts here
    totals.GST = totals.beforeTax * (taxGST / 100)
    totals.PST = totals.beforeTax * (taxPST / 100)
    totals.sum = totals.beforeTax + totals.GST + totals.PST
    // Your code ends here
    
    return totals;
}

const showTotals = (prices) => {
    const totals = calculateTotal(prices);
    return `
        Before tax: $${totals.beforeTax.toFixed(2)}
        GST: $${totals.GST.toFixed(2)}
        PST: $${totals.PST.toFixed(2)}
        -----------------\n
        Sum total: $${totals.sum.toFixed(2)}
    `
}


// This is how your code will be called in a simple manner
showTotals([5, 10, 5]) 

//You can also use the followin to randomy select from some values in an array. 
// Your answer should be the largest value in the numbers array.
// You can edit this code to try different testing cases.
// Nested array of random prices
const pricesArr = [  [2.5, 9.99, 3.99, 18.59, 49.96],  [2.99, 3.99, 4.99, 5.99, 6.99]];

// Pick random array of prices
//const randomPrices = Math.floor(Math.random() * pricesArr.length);

const result = showTotals(pricesArr[randomPrices]);
console.log(result);
document.body.innerHTML = result