const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    function basisPolynomial(i, x) {
        let result = 1;
        const [xi, yi] = points[i];
        points.forEach(([xj, _], j) => {
            if (i !== j) {
                result *= (x - xj) / (xi - xj);
            }
        });
        return result;
    }

    function polynomial(x) {
        return points.reduce((sum, [xi, yi], i) => sum + yi * basisPolynomial(i, x), 0);
    }

    return polynomial(0);
}

function main() {
    const data = JSON.parse(fs.readFileSync('input1.json', 'utf8'));

    const n = data.keys.n;
    const k = data.keys.k;

    const points = [];
    Object.keys(data).forEach(key => {
        if (!isNaN(key)) {
            const x = parseInt(key);
            const base = parseInt(data[key].base);
            const value = data[key].value;
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    });

    if (points.length < k) {
        throw new Error("Not enough points to solve the polynomial");
    }

    const c = lagrangeInterpolation(points);
    console.log(`The constant term 'c' is: ${c}`);
}

main();
