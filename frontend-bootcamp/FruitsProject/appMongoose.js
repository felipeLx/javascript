const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", 
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
    })
        .then(() => {
            console.log("DB Connected");
        })
        .catch(err => {
            console.log(`DB Connection Error: ${err.message}`);
        });


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You forgot the fruit name!"]},
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const mango = new Fruit({
    name: "Mango",
    rating: 9,
    review: "from Brazil!"
});

// mango.save();

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "ops, you forget to add the name!"]
    }, 
    age: Number,
    favouriteFruit:{ fruitSchema}
});

const Person = mongoose.model("Person", personSchema);

const personNew = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: {name:"Banana"}
});

// personNew.save();  

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 8,
    review: "Good"
});

// kiwi.save();

// const orange = new Fruit({
//     name: "Orange",
//     rating: 9,
//     review: "Sweet"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 8,
//     review: "from Canárias"
// });

// Fruit.insertMany([kiwi, orange, banana], err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Succesfully saved all the fruits to fruitsDB");
//     }
// });

Fruit.find((err, fruits) => {
    if(err) {
        console.log(err);
    } else {
        mongoose.connection.close(() => {
            console.log("connection closen from Fruit!");
        });        
        fruits.forEach(fruit => {
            console.log(fruit.name);
        })
    }
});

Person.find((err, persons) => {
    if(err) {
        console.log(err);
    } else {
        persons.forEach(person => {
            console.log(person.name);
        });
        mongoose.connection.close(() => {
            console.log("connection close from Find Person!");
        });        
        
    }
});

// Fruit.updateOne({_id: "5e599c16efa27625800cd522"}, {name: "Melao"}, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Fruit updated!");
//     }
// });

// Person.updateOne({name: "John"}, {favouriteFruit: mango}, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         mongoose.connection.close(() => {
//             console.log("connection close from Update Person!");
//         }); 
//         console.log("Person updated!");
//     }
// });
 
// Fruit.deleteOne({name: "Mango"}, err => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Delete succesfull");
//         }
//     }
// );

// Person.deleteMany({name: "Kiwi"}, err => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Delete succesfull");
//         }
//     }
// );

// Person.deleteMany({name: "Amy"}, err => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Delete succesfull");
//         }
//     }
// );