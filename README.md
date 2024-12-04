
# KeyM NodeJS Challenge.

Backend REST API for Booking Service.






## Authors

- [@cristian1534](https://github.com/cristian1534)


## 🚀 About Me
My name is Cristian, currently living in Odessa Ukraine. I am interested in any open position for either Backend NodeJS or FullStack MERN.

LinkedIn Profile: https://www.linkedin.com/in/cristian-machuca-dev/


Currently I am available to work %100 remotely at any time of the day. Looking forward to collaborating with a team and 
continuing growing up with new technologies either in Backend or Frontend development as could be needed. 
Besides MERN Stack I like to work with micro services on Docker, TS, with some DevOps concepts such as CI/CD and Testing, Scrum as Jira, Git, Bitbucket and so on.

I attach this link for my references regarding Resume: 
https://europa.eu/europass/eportfolio/api/eprofile/shared-profile/cristian-machuca/aca2ec36-40d7-49ea-ac76-26ca51fa1e4e?view=html



## Deployment Swagger Documentation.

https://keym-backend-service.onrender.com/api/v1/docs/


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Just for Challenge reason MONGO_URI is available but it will be remove after 30 days.

`SECRET_TOKEN`

`MONGO_URI`

`NODE_ENV`

`PORT`


## Run Locally

Clone the project

```bash
  git clone https://github.com/cristian1534/KeyM-Backend-Service..git
```

Go to the project directory

```bash
  cd KEYM
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Screenshots

![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1733294775/zjl5wcmowpyl7z1ia6su.png)
![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1733294840/xaueu4veplfkj9zaecn9.png)


## API Reference

#### Get all items

```http
  POST /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `object` |  Register a New User|

#### Get item

```http
  POST /users/auth
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`     | `object` | Log In a User |



```http
  POST /booking
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `booking`     | `object` | Create a Booking, Token Required|

```http
  GET /booking
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `booking`     | `object` | GET all Bookings, Token Required|

```http
  GET /booking/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `booking`     | `object` | Get a Booking, Token Required|

```http
  DELETE /booking/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `booking`     | `object` | Delete a Booking, Token Required|

```http
  PATCH /booking/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `booking`     | `object` | Update a Booking, Token Required|
## Screenshots

![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1733295407/kdmnhkznrpwykm59pnu1.png)
![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1733295449/pynf3fhgq8dvdrsujpvf.png)


## Docker

Dockerfile available to run in containers.

```bash
docker build -t keymimage .
```
```bash
docker run --name keymcontainer -p 4000:4000 -d keymimage 
```
## Tech Stack

**Server:** NodeJS, Typescript, Express, MongoDB, Joi, Swagger, JWT, Jest.

