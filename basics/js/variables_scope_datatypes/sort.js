
const arr = [2, 1, 4, 5, 0, 3]


function sort(callback) {
    for (let j = 0; j < arr.length; j++ ) {
        for (let i = 0; i < arr.length; i++) {
            const a = arr[i];
            const b = arr[i + 1];

            const index = callback(a, b);
            
            if (index === -1) {
                arr[i] = b;
                arr[i + 1] = a;
            }
        }
    }
}

sort((a, b) => {
    if (a > b) return -1;
    else return 1;
});

console.log(arr)