const calculateTip = (total, tripPercent = 0.19) => {
    const tip = total * tripPercent;
    return tip + total;
}


const fahrenheitToCelsius = (temp = 32) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp = 0) => {
    return (temp * 1.8) + 32
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative');
            }

            resolve(a + b);
        }, 1000);
    })
};


module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}