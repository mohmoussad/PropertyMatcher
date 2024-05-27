# PropertyMatcher
A Real Estate Management API, provides endpoints for user registration, login, ad management, property requests, and statistics retrieval. This API allows agents and clients to interact with real estate listings and property requests, while administrators can retrieve user statistics.

## Installation
1. Clone the repository: 

    ```git clone https://github.com/mohmoussad/PropertyMatcher```

2. Start the application using Docker Compose:

    ```docker-compose up```

    * You can use db-sample files using

        ``` docker-compose --profile init up ```

3. You can explore Swagger Documentation on path ```localhost:3000/api-docs```  

## Matching Logic
The matching logic is used to find property requests that match the criteria of a given ad. Here's how the matching logic works:

- Retrieve the Ad: The ```/ads/{id}/matches``` endpoint is called with the ID of the ad for which matching requests are sought.

- Retrieve Property Requests: The ad ID is used to find the corresponding ad in the database.

- Aggregate Matching Requests: The matching logic then aggregates property requests based on several criteria:

    - The district of the property request matches the district of the ad.

    - The area of the property request matches the area of the ad.

    - The price of the property request falls within the calculated price range (A price tolerance is defined (in this case, it's set to 10%). This tolerance is used to calculate a price range within which matching property requests should fall. The minimum price is calculated as 90% of the ad price, and the maximum price is calculated as 110% of the ad price.).

    - Sort and Paginate: The aggregated matching requests are sorted by the ```refreshedAt``` field in descending order to prioritize the most recently refreshed requests. Pagination is applied to limit the number of results returned per page.

## Implemented Schemas
- User Schema: This schema represents a user of the system. It contains fields such as name, phone, password, role, and status. The role field defines the role of the user (e.g., "CLIENT", "AGENT", "ADMIN"), while the status field may indicate whether the user is active or deleted.

- Ad Schema: The ad schema represents a real estate advertisement. It includes properties such as propertyType, area, price, city, district, description, and createdBy. The createdBy field is a reference to the user who created the ad.

- Property Request Schema: This schema models a property request made by a user. It contains fields such as propertyType, area, price, city, district, description, and createdBy. Similar to the ad schema, the createdBy field references the user who made the request.
![Screenshot from 2024-05-27 23-11-23](https://github.com/mohmoussad/PropertyMatcher/assets/88286511/224682e3-d1c4-498f-8277-e19d4e0de0ce)

## Technologies Used
- Node.js
- Express.js
- MongoDB and Mongoose
- Docker and Docker Compose
- JWT and Bcrypt
- Winston and Morgan
- Swagger
