# users-lambda-aws
This API provides a CRUD to create users on a postgres database.

## To run on localhost
Run the `docker-compose up -d` to create a postgres database.
Run `npm run start` to  start the server on port 8080.


## To run on production
There's a file called serverless-example.yml that is used by serverless framework to deploy a lambda function 
with a API Gateway on AWS, to run it it you only need a AWS account and configure your local serverless framework.
After serverless is configured, change the name  of the file from serverless-example.yml to serverless.yml and run: `npm run deploy`, this command will build the app and deploy to your AWS account.
(The serverless.yml does not create a Postgres database on AWS, you have to set up one RDS manually and fill the RDS's authentication properties on environment section on serverless.yml)

## To run tests
Part of the tests needs a local postgres database to run, you can create one just running `docker-compose up -d`, this command will create a postgres container on your local machine that can be used by the api on localhost, after starting the docker container, run the command: `npm run start` to start a development server on localhost or `npm run test` to run all the tests.

## API endpoints

### Create a new user:

**[POST] /api/user**

payload: 
```javascript
{
  "name": "Test",
  "age": 30,
  "role": "manager"
}
```

### Update a user:

**[PUT] /api/user/:id**

```javascript
{
  "name": "Test",
  "age": 30,
  "role": "manager"
}
```

### Get a user:

**[GET] /api/user:id**


### Delete a user:

**[DELETE] /api/user:id**


### Constraints:

- Allowed roles are: manager, assistant, janitor or secretary.

- To create a user or update , all fields are required.

- Age must be between 0 and 130

- Numbers are not allowed on name



