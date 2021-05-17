// d={y:"HELLO",x:[ 
//     {
//         "productId" : "6098d431f2670c8b61ced2bb",
//         "quantity" : 8
//     }, 
//     {
//         "productId" : "6098d431f2670c8b61ced2bX",
//         "quantity" : 2
//     }
// ]}



// let pp=d.x.map(e=>{
//     if(e.productId=="6098d431f2670c8b61ced2bX"){
//         e.quantity=1000
//     }
//     return e
// })

// x.forEach(element => {
//     if(element.productId=="6098d431f2670c8b61ced2bb"){
//         element.quantity=2001
//         return element  
//     } 
// });

// console.log(pp)

// let x=[{
//     "_id": "6098d431f2670c8b61ced2bb",
//     "productName": "Realme-XT",
//     "description": "Better Speed (Snapdragon-720)",
//     "price": 19000,
//     "image": "https://www.91-cdn.com/pricebaba-blogimages/wp-content/shopcdn/shop/wp-content/uploads/2020/09/realme-xt-xxl-708414.jpg",
//     "category": "6098cca9c762757d6d40cc68",
//     "__v": 0
// }]
// c=[]

// x.forEach(element=>{
//    c.push(element.productName)
// })

// console.log(c)


let noDistributer=(num=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res()
            console.log("Hello Praneet")
        },num)
    })
    
})



let handle=async()=>{
    let x=await noDistributer(2000)
    console.log("Hello Raja")
}

handle()