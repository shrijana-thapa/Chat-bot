import axios from 'axios';
import { User } from '../types/user';

export const fetchUsers = async(): Promise<User[]> =>{
const res= await axios.get("http://localhost:3000/users");
return res.data;
}
