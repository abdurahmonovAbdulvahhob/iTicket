import { User } from "../../models/user.model"


export const userStub = ():Partial<User> => {
 return {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  role_value: 'user',
  is_active: true
 }  
}