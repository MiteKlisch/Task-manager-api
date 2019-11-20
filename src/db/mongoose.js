const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});



// const me = new User({
//     name: '   Mike  ',
//     email: 'VOVAN@GMAIL.COM',
//     password: '  Password12'
// });

// me.save().then(() =>{
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// })



// const task = new Tasks({
//     description: '  Eat lunch'
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error, 'Error!')
// })