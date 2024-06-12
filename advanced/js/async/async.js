// tasks for Promise

// 1. Создайте промис, который после 1 секунды переходит в состояние resolve со значением 'success'.
    let prom = new Promise((resolve) => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
    console.log(prom)
// 2. Обработай промис и выведи в консоль значение которое он возвращает

//    prom.then((result)=>{
//     console.log(result)
//     console.log(prom)
//    })

// 3. Создай другой проимис, который после 1 секунды переходит в состояние rejected с значением 'error'.
   let promErr = new Promise((resolve, reject) =>{
        setTimeout(()=>{
            reject('error lololo')
        }, 1000)
   })

// 4. Обработай промис и выведи в консоль значение которое он возвращает
    // promErr.catch((result)=>{
    //     console.log(result)
    //     console.log(promErr)
    // })

// 5. Обработай оба промиса используя Promise.all и выведи в консоль результат их выполнения

    let promAll = Promise.all([prom, promErr]).then((result)=> {
        console.log(result)
    }).catch((result) =>{
        console.log('all',result)
    })
// 6. Обработай оба промиса используя Promise.race и выведи в консоль результат первого выполненного промиса`
Promise.race([prom, promErr]).then((result)=> {
    console.log('race', result)
}).catch((result) =>{
    console.log(result)
})