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

    it('Ensure get user api returns user when it exists', (done) => {
           request(app)
                .get('/api/user/1')
                .expect(200)
                .then(response => {
                    expect(response.body.id).toBe(1);
                    done();
                })
                .catch(err => done(err))
    })

    it('Ensure get user api returns user when it exists', async () => {
        await request(app)
             .get('/api/user/0')
             .expect(404)         
    })

    it('Ensure delete user api returns 204 when successfuly deleted', async () => {
        await request(app)
             .delete('/api/user/2')
             .expect(204)        
    })

    it('Ensure delete user api returns 404 when user was not found', async () => {
        await request(app)
             .delete('/api/user/0')
             .expect(404)        
    })
})