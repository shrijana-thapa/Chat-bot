import { User } from '../types/user';

export const updateUserApi= async({id,data}: {id: number, data: User}) => {
    const res= await fetch(`http://Localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
return res.json();
}