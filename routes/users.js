import express from 'express';
import { createUser,getUsers,getUser , deleteUser , updateUser } from '../controllers/users.js';

const router = express.Router();

// all routes in here are starting with /user 

//get data from DATABASE : all users information 
router.get('/',getUsers);


//posting to in the form of form to submit data on server 
router.post('/', createUser );

//fetching information of particular information with uniqueId
router.get('/:id',getUser);

//DELETE from DATABASE
router.delete('/:id', deleteUser);

//Update user info to database 
router.patch('/:id', updateUser);

export default router;