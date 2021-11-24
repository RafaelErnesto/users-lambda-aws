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

    it('Ensure user entity throws when role is different than manager or user', () => {
        expect(() => {
            new User({
                name: 'John',
                role: 'test',
                age: 25
            })
        }).toThrow();
    })
})