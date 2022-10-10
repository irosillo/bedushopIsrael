CREATE TABLE Users(
        id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(30) NOT NULL UNIQUE,
        name VARCHAR(30) NOT NULL,
        surname VARCHAR(30) NOT NULL,
        direction TEXT NOT NULL,
        email TEXT NOT NULL,
        salt TEXT NOT NULL,
        hash TEXT NOT NULL,
        seller BOOLEAN NOT NULL,
        card TEXT,
        PRIMARY KEY(id),
        FOREIGN KEY(directionID) REFERENCES Direction(id)
);

CREATE TABLE Product(
        id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL,
        sellerID INT NOT NULL,
        price REAL NOT NULL,
        quantity SMALLINT NOT NULL,
        category VARCHAR(30),
        description VARCHAR(1000),
        PRIMARY KEY(id),
        FOREIGN KEY(sellerID) REFERENCES Users(id)
);

CREATE TABLE Sale( 
        id INT NOT NULL GENERATED ALWAYS AS IDENTITY UNIQUE,
        productID INT NOT NULL UNIQUE,
        sellerID INT NOT NULL,
        buyerID INT NOT NULL, 
        quantity SMALLINT NOT NULL,
        PRIMARY KEY(id,productID),
        FOREIGN KEY(productID) REFERENCES Product(id),
        FOREIGN KEY(sellerID) REFERENCES Users(id),
        FOREIGN KEY(buyerID) REFERENCES Users(id)
);

CREATE TABLE Review(
        productID INT NOT NULL,
        saleID INT NOT NULL,
        comment VARCHAR(1000) NOT NULL,
        PRIMARY KEY(productID,saleID),
        FOREIGN KEY(productID) REFERENCES Sale(productID),
        FOREIGN KEY(saleID) REFERENCES Sale(id)
); 
