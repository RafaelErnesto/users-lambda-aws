# users-lambda-aws
This API providers a CRUD to create users on a postgres database.



## To run on localhost
Run the docker-compose up -d to create a postgres database.
Run npm run start to build the project and start the server on port 8080.


## To run on production
Run npm run build
Configure Serverless framework on your computer and go to the project's root directory and run: serverless deploy
A API Gateway will be created and a lambda function with the project's code will be deployed.
