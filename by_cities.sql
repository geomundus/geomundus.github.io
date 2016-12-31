--DROP TABLE master
--CREATE TABLE master(fid integer, code varchar,title varchar,website varchar,uni varchar, country varchar,city varchar, lat double precision, lon double precision);
--COPY master FROM 'C:\Program Files\PostgreSQL\9.6\bin\master_points - master_points.csv' DELIMITER ',' CSV HEADER
-- max number of citis
--WITH cnt AS (SELECT count(*) as cnt FROM master GROUP BY city) SELECT max(cnt) FROM cnt
--SELECT * FROM master WHERE city = 'London'
-- install crosstable function
--CREATE EXTENSION tablefunc;
--CREATE OR REPLACE VIEW city as (SELECT *
--FROM   crosstab(
--      'SELECT city, uni,code
--       FROM   master
--       ORDER BY 1,2')  -- needs to be "ORDER BY 1,2" here
--AS city ("city" varchar, "course1" varchar,"course2" varchar,"course3" varchar,"course4" varchar, "course5" varchar,
--        "course6" varchar,"course7" varchar,"course8" varchar,"course9" varchar, "course10" varchar,
--        "course11" varchar,"course12" varchar,"course13" varchar,"course14" varchar, "course15" varchar,
--        "course16" varchar,"course17" varchar,"course18" varchar,"course19" varchar, "course20" varchar));
--DROP TABLE by_cities
--CREATE TABLE by_cities AS WITH unq AS (SELECT DISTINCT city,lat,lon FROM master)
--SELECT c.*, u.lon, u.lat,ST_SetSRID(ST_MakePoint(u.lon, u.lat),4326) as geom  FROM city c, unq u WHERE c.city = u.city ORDER BY c.city
--COPY (SELECT * FROM by_cities) TO 'E:\EMA\\by_cities.csv' WITH DELIMITER ',';
--SELECT * FROM by_cities