# Blog list API

### How to run

Clone the [top-level repo](https://github.com/dgrishajev/fso-submissions), `cd` here and install the dependencies with `npm i`.

Create a `.env` file in the root with the following content:
```
PORT = 3003
SECRET = yoursecretkey
MONGODB_URL = 'mongodb+srv://username:password@cluster0.peec3.mongodb.net/db-name?retryWrites=true&w=majority'
MONGODB_URL_TEST = 'mongodb+srv://username:password@cluster0.peec3.mongodb.net/test-db-name?retryWrites=true&w=majority'
```
Where `MONGODB_URL` and `MONGODB_URL_TEST` are links to your MongoDB Atlas Clusters ([sign up](https://www.mongodb.com/cloud/atlas/register) and follow the instructions on [creation](https://docs.atlas.mongodb.com/tutorial/create-new-cluster)).

Kill processes on port 3003 if any and then start the server with `npm run dev` (server live reload enabled).

### How to use

The base URL is http://localhost:3003, the main endpoints are the following:

* /api/login (POST /)
* /api/users (GET /, POST /)
* /api/blogs (GET /, POST /, PUT /:id, DELETE /:id)

### How to test

All unit tests:

```
$ npm test
```

Only API unit tests:

```
$ npm run test:api
```
