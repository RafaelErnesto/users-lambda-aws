import request from 'supertest';
import app from '../../infraestructure/app';

describe('UseController test', () => {
    
    it('Ensure create user api returns 200 and user when success', async () => {
        await request(app)
                .post('/api/user')
                .send({
                    name: 'John',
                    age: 23,
                    role: 'manager'
                })
                .expect(201)
    })

    it('Ensure create user api returns 400 when name is missing on payload', async () => {
        await request(app)
                .post('/api/user')
                .send({
                    age: 23,
                    role: 'manager'
                })
                .expect(400)
    })

    it('Ensure create user api returns 400 when age is missing on payload', async () => {
        await request(app)
                .post('/api/user')
                .send({
                    name: 'John',
                    role: 'manager'
                })
                .expect(400)
    })

    it('Ensure create user api returns 400 when role is wrong', async () => {
        await request(app)
                .post('/api/user')
                .send({
                    name: 'John',
                    age: 43,
                    role: 'test'
                })
                .expect(400)
    })

    it('Ensure create user api returns 400 when age is negative', async () => {
        await request(app)
                .post('/api/user')
                .send({
                    name: 'John',
                    age: -43,
                    role: 'test'
                })
                .expect(400)
    })
})