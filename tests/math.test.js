const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('Should calculate total with tip', () => {
    const total = calculateTip(10)
  
    expect(total).toBe(11.9)
    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got + ' + total)
    // }

});

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius()
    expect(temp).toBe(0)
});

test('Should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit()
    expect(temp).toBe(32)
});

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(2).toBe(2);
//         done();
//     }, 1000);
// });

test('Should add two numbers', (done) => {
    add(2,3).then((sum) => {
        expect(sum).toBe(5);
        done();
    })
});

test('Should add two numbers async/await', async () => {
    const sum = await add(22, 10);
    expect(sum).toBe(32)
})