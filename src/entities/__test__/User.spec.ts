import { User } from '../User'

describe('Test user entity', () => {
    it('Ensure user entity throws when age is negative or bigger than 130', () => {
        expect(() => {
            new User({
                name: 'John',
                role: 'manager',
                age: -1
            })
        }).toThrow();
    })
})