
CREATE TABLE "Car"(
	"Id" integer PRIMARY KEY,
	"Model" text NOT NULL,
	"Brand" text NOT NULL,
	"ManufacturYear" integer NOT NULL
);

CREATE TABLE "Driver"(
	"Id" integer PRIMARY KEY,
	"FirstName" text,
	"LastName" text,
	"Contact" text
);
CREATE TABLE "CarDriver"(
	"Id" UUID PRIMARY KEY,
	"CarId" integer NOT NULL,
	"DriverId" integer NOT NULL,
	CONSTRAINT FK_Car_CarDriver_CarId FOREIGN KEY ("CarId") REFERENCES "Car"("Id"),
	CONSTRAINT FK_Driver_CarDriver_DriverId FOREIGN KEY ("DriverId") REFERENCES "Driver"("Id")
);

INSERT INTO "Car" ("Id","Model","Brand","ManufacturYear")
VALUES ('1','a5','audi','2019');
INSERT INTO "Car" ("Id","Model","Brand","ManufacturYear")
VALUES ('2','a5','audi','2019');

INSERT INTO "Driver" ("Id","FirstName","LastName","Contact")
VALUES ('1','Pero','Perić','+385');
INSERT INTO "Driver" ("Id","FirstName","LastName","Contact")
VALUES ('2','Perica','Perić','+383');
INSERT INTO "Driver" ("Id","FirstName","LastName","Contact")
VALUES ('3','Ante','Perić','+384');

INSERT INTO "CarDriver" ("Id","CarId","DriverId")
VALUES ('1','1','1');
INSERT INTO "CarDriver" ("Id","CarId","DriverId")
VALUES ('2','2','2');
INSERT INTO "CarDriver" ("Id","CarId","DriverId")
VALUES ('3','2','3');