## Project created for "introuduction to web application" course at AGH.

This is a simple travel agency website created as a project for a course.

There are 4 types of users in the app.

## Non-loged user

The first one is a person who does not have an account on the website or is not-logged at this moment and he has the least access to the materials.

### Main Page

Main page is avaliavle for all types of users and contains basic information about website and company (like location of headquater)

![trips-1](https://user-images.githubusercontent.com/57154118/225093846-b1b22015-e96d-4ae9-8e80-d675e2d48618.PNG)

![trips-2](https://user-images.githubusercontent.com/57154118/225093909-fa02b91f-7103-4101-ba51-9005c989efb4.PNG)

### Trip List Page (Not logged in)

A second page available for all users is a list of trips that have not yet taken place and for which there are still places available.

The layout is made responsive so that it looks good on any type of device.

![trips-6](https://user-images.githubusercontent.com/57154118/225094822-be3a96f7-82c8-41ee-8cd3-d196647cf2c4.png)

![trips-9](https://user-images.githubusercontent.com/57154118/225094978-0855b500-514f-4134-a339-39f186e77823.png)

![trips-7](https://user-images.githubusercontent.com/57154118/225095003-cdc8965b-60ca-4720-8798-6793b9d0c7f9.png)

![trips-8](https://user-images.githubusercontent.com/57154118/225095039-0ff8ed07-587c-428c-ba68-c84139df6beb.png)

### Login/Register page 

To use the other functionalities on the website, you need to log in or register first.

![trips-4](https://user-images.githubusercontent.com/57154118/225095663-dc3d4fed-3df3-4c99-b6b6-d383f3bf0283.PNG)

![trips-5](https://user-images.githubusercontent.com/57154118/225095679-71b1e903-9a4c-43ac-8b78-7637d40cd99b.PNG)

Database is stored on firebase firestore. Authentication is also created by using firebase auth API.

## Logged-user

### Trip List Page (Logged In)

When user is logged in, then he can add trip tickets to cart and buy it.

![trips-13](https://user-images.githubusercontent.com/57154118/225096885-ffaac5b9-7f80-4037-9042-76bca0ddcc0b.png)

### Simple Cart Page

![trips-cart](https://user-images.githubusercontent.com/57154118/225096913-950ed58a-73da-484c-9a0e-99cbd8bc612d.png)

### Single Trip Details Page

On the trip details there is slider with images and information about trip like location with interation map. There is also option to reserve ticket from this page.

![trip-signle-page](https://user-images.githubusercontent.com/57154118/225097418-523b4e8f-60b2-46c2-afd1-2633b694c5ed.png)

### History Page

On this page, user can see all the trips on which he bought any ticket. There is also option to filter trips by trip start time.

![trips-12](https://user-images.githubusercontent.com/57154118/225098443-e470c20c-bf75-4bcd-8362-311539d2ceeb.png)

## Manager user

### Adding trip Page (Manager only)

If you are a manager you can add new trip to database. If input is invalid there is appropriate communicates.

![trips-10](https://user-images.githubusercontent.com/57154118/225098877-4e2c29dd-b273-426b-a9e1-006ae54e10dc.png)

![trips-11](https://user-images.githubusercontent.com/57154118/225098888-ca8a8a0b-125b-4001-b758-d9bd55090eb3.png)

## Admin user

One more type of user is included in the database: administrator. Unfortunately, due to the lack of time, it does not have any addtional visible functionalities on the front-end side.

Krzysztof Usnarski
