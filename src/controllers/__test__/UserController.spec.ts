import request from 'supertest';
import { User } from '../../entities/User';
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

    it('Ensure get user api returns user when it exists', async () => {
            
        const user = await request(app)
            .post('/api/user')
            .send({
                name: 'John',
                age: 23,
                role: 'manager'
            })
           await request(app)
                .get(`/api/user/${user.body.id}`)
                .expect(200)
    })

    it('Ensure get user api returns 404  when does not exist', async () => {
        await request(app)
             .get('/api/user/0')
             .expect(400)         
    })

    it('Ensure delete user api returns 204 when successfuly deleted', async () => {
        const user = await request(app)
        .post('/api/user')
        .send({
            name: 'John',
            age: 23,
            role: 'manager'
        })
        await request(app)
             .delete(`/api/user/${user.body.id}`)
             .expect(204)        
    })

    it('Ensure delete user api returns 404 when user was not found', async () => {
        await request(app)
             .delete('/api/user/0')
             .expect(400)        
    })

    it('Ensure update user api returns 200 when user was updated', async () => {
            const user = await request(app)
                .post('/api/user')
                .send({
                    name: 'John',
                    age: 23,
                    role: 'manager'
                })

             await request(app)
             .put(`/api/user/${user.body.id}`)
             .send({
                 name: 'User updated',
                 age: 23,
                 role: 'janitor'
             })
             .expect(200)  
    })

    it('Ensure update user api returns 404 when user was not found', async () => {
        await request(app)
        .put('/api/user/0')
        .send({
            name: 'User updated',
            age: 23,
            role: 'janitor'
        })
        .expect(400)
    })

    it('Ensure update user api returns 400 when name is invalid', async () => {
        await request(app)
        .put('/api/user/1')
        .send({
            name: 3,
            age: 23,
            role: 'janitor'
        })
        .expect(400)
    })

    it('Ensure update user api returns 400 when age is invalid', async () => {
        await request(app)
        .put('/api/user/1')
        .send({
            name: 'John',
            age: -23,
            role: 'janitor'
        })
        .expect(400)
    })

    it('Ensure update user api returns 400 when role is invalid', async () => {
        await request(app)
        .put('/api/user/1')
        .send({
            name: 'John',
            age: 23,
            role: 'test'
        })
        .expect(400)
    })
})