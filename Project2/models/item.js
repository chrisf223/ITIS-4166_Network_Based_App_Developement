const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        title: 'Vintage Levi\'s',
        seller: 'Jimmy Carter',
        condition: 'Used',
        price: '$150.00',
        size: '28',
        offers: '3',
        details: 'Classic vintage Levi\'s jeans with slight wear, perfect for collectors.',
        image: 'levi-jeans.jpg',
        active: true
    },
    {
        id: '2',
        title: 'Retro Jordan 1\'s',
        seller: 'Teddy Roosevelt',
        condition: 'Like New',
        price: '$280.00',
        size: '10',
        offers: '2',
        details: 'Near new pair of Retro Jordan 1 sneakers, highly sought after.',
        image: 'jordans.jpg',
        active: true
    },
    {
        id: '3',
        title: 'Vintage Metallica T-Shirt',
        seller: 'Mike Tyson',
        condition: 'Used',
        price: '$30.00',
        size: 'M',
        offers: '1',
        details: 'Authentic Metallica band t-shirt, worn but in good condition.',
        image: 'metallica-shirt.webp',
        active: true
    },
    {
        id: '4',
        title: 'Retro Sunglasses',
        seller: 'John Cena',
        condition: 'New',
        price: '$50.00',
        size: 'XL',
        offers: '5',
        details: 'Stylish retro sunglasses, brand new and still in packaging.',
        image: 'sunglasses.webp',
        active: true
    },
    {
        id: '5',
        title: 'Vintage Leather Jacket',
        seller: 'James Cameron',
        condition: 'Used',
        price: '$120.00',
        size: 'S',
        offers: '4',
        details: 'Authentic vintage leather jacket, with signs of wear for a true retro look.',
        image: 'leather-jacket.webp',
        active: true
    },
    {
        id: '6',
        title: 'Retro Watch',
        seller: 'Viggo Mortenson',
        condition: 'Good',
        price: '$200.00',
        size: 'XS',
        offers: '0',
        details: 'Vintage retro watch in good condition, minimal wear.',
        image: 'retro-watch.webp',
        active: true
    }
];


exports.find = () => items;

exports.findById = id => items.find(item=>item.id === id);

exports.save = function(item, file){
    item.id = uuidv4();
    item.offers = '0';
    item.active = true;
    item.image = file.filename;
    item.price = '$' + item.price;
    items.push(item);
};

exports.updateById = function(id, newItem, newFile) {
    let item = items.find(item=>item.id === id);
    if (item) {
        item.title = newItem.title;
        item.description = newItem.content;
        item.price = '$' + newItem.price;
        item.details = newItem.price;
        item.size = newItem.size;
        item.image = newFile.filename;
        
        return true;
    }
    else {
        return false;
    }
};

exports.deleteById = function(id) {
    let index = items.findIndex(item =>item.id === id);
    if (index != -1) {
        items.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
    
};