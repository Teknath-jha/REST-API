import express from 'express';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const router = express.Router();

let users = []  // temporary DATABASE

// all routes in here are starting with /user 

//get data from database : all users information 
router.get('/', (req,res)=>{
    console.log(users);
    res.send(users);
});

//posting to in the form of form to submit data on server 
router.post('/', (req,res)=>{
    console.log('Post Route Reached [terminal]');

    const user = req.body;
    const userId = uuidv4();
    const userWithId = { ...user, id:userId }; // adding id property to user to uniquely identify
    users.push(userWithId);   // put into temp array consider this as database 
    console.log(userWithId);

    res.send(`Use with user name ${userWithId.firstName} added to database`);
});

router.get('/:id',(req,res)=>{
    console.log(req.params);

    // req.params will contails the id when passed to url so we fetch that user if exists in DATABASE
    const { id }= req.params;

    const foundUser = users.find((user) => user.id ===id);

    res.send(foundUser);
});

//DELETE from DATABASE
router.delete('/:id', (req,res)=>{

    console.log(req.params);

    const { id }= req.params;

    //we use filter function to delete the user
    users = users.filter((user)=> user.id != id);


    res.send(`User with id ${id} Deleted`);

});

//Update user info to database 
router.patch('/:id',(req,res)=>{
    console.log(req.params);

    const { id }= req.params;

    const user = users.find((user)=>user.id ===id);

    const {firstName, lastName, age} = req.body;

    if(firstName){
        user.firstName = firstName;
    }
    if(lastName){
        user.lastName = lastName;
    }
    if(age){
        user.age = age;
    }

    res.send(`User with ${id} updated`);
});

export default router;