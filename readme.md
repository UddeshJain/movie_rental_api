Hey there 👋, Movie Rental Api is live [here](https://video-rental-api1.herokuapp.com/).

# How to run locally

1. Clone the repository
2. Add `.env` file like this.

```
JWT_PRIVATE_KEY="your private key"
MONGODB_URI="your mongoDB Url"
PORT=8000
```

3. Install dependencies by running `npm i` command
4. Start server by running `npm start` command

## Routes Documentation

Note:- To access all private routes send `x-auth-token` in header provided while login

### Users

1. create new user

```
Request Type:- POST
Access:- Public
Route:- /api/users
Params:- email, password, name
```

2. Login user

```
Request Type:- POST
Access:- Public
Route:- /api/auth
Params:- email, password
```

### Genres

1. Get all available Genres

```
Request Type:- GET
Access:- Public
Route:- /api/genres
```

2. Create new genre

```
Request Type:- POST
Access:- Private
Route:- /api/genres
Params: - name
```

3. Update new genre

```
Request Type:- PUT
Access:- Private
Route:- /api/genres/genre-id
Params: - name
```

4. Delete genre

```
Request Type:- DELETE
Access:- Private
Route:- /api/genres/genre-id
```

### Customers

1. Get all available customers

```
Request Type:- GET
Access:- Public
Route:- /api/customers
```

2. Create new customer

```
Request Type:- POST
Access:- Private
Route:- /api/customers
Params: - name, phone, isGold
```

3. Update customer

```
Request Type:- PUT
Access:- Private
Route:- /api/customers/customer-id
Params: - name, phone, isGold
```

4. Delete customer

```
Request Type:- DELETE
Access:- Private
Route:- /api/customers/customer-id
```

### Movie

1. Get all available movies

```
Request Type:- GET
Access:- Public
Route:- /api/movies
```

2. Add new movie

```
Request Type:- POST
Access:- Private
Route:- /api/movies
Params: - title, genreId, numberInStock, dailyRentalRate
```

3. Update movie

```
Request Type:- PUT
Access:- Private
Route:- /api/movies/movie-id
Params: - title, genreId, numberInStock, dailyRentalRate
```

4. Delete movie

```
Request Type:- DELETE
Access:- Private
Route:- /api/customers/movie-id
```

### Rentals

1. Get list of rented movies

```
Request Type:- GET
Access:- Public
Route:- /api/rentals
```

2. Rent a movie

```
Request Type:- POST
Access:- Private
Route:- /api/movies
Params: - customerId, movieId, numberInStock, dailyRentalRate
```
