# users-lambda-aws
This API provides a CRUD to create users on a postgres database.

## To run on localhost
Run the docker-compose up -d to create a postgres database.
Run npm run start to build the project and start the server on port 8080.


## To run on production
There's a file called serverless.yml that is used by serverless framework to deploy a lambda function 
with a API Gateway on AWS, to run it it you only need a AWS account and configure your local serverless framework.
After serverless is configured just run: npm run deploy, this command will build the app and deploy to you aws account.
(The serverless.yml does not create a Postgres database on AWS, you have to set up one RDS manually and fill the RDS's authentication properties on environment section on serverless.yml)

## To run tests
Part of the tests needs a local postgres database to run, you can create one just running docker-compose up -d, this command will create a postgres container on your local machine that ca be used by the api on localhost, after starting the docker container, run the command: npm run start to start a development server on localhost or npm run test to run all the tests.

## API endpoints


