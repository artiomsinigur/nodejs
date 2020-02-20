const product = {
    label: 'Product label',
    price: 3,
    stock: 425,
}

// : Give another name for property
// = Set a default value
const {label: productLabel, price, stock, rating = 5} = product;
console.log(productLabel);
console.log(price);
console.log(rating);

// Take only the properties that you need
const transaction = (type, {label, price}) => {
    console.log(label, price);
};

transaction('Order', product);