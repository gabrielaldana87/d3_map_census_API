select substr(data.Latitude,0,15) as Latitude, substr(data.Longitude,0,18) as Longitude from data left join zips_ID on data.ID=zips_ID.ID where zips_ID.zipcode is null;

select data.Latitude, data.Longitude from data left join zips_ID on data.ID=zips_ID.ID where zips_ID.zipcode is null;

select distinct zipcode as id ,count(ID) as counts from zips_id group by zipcode order by counts desc;


.headers on
.mode csv
.output stopfrisk_zipcodes.csv
select distinct zipcode as id ,count(ID) as counts from zips_id group by zipcode order by counts desc;
.output stdout


select sum(total)
from (select distinct zipcode, count(ID) as total from zips_ID group by zipcode order by total desc limit 13);


select distinct Longitude, Latitude, count(*) as totals from data group by Longitude,Latitude order by totals desc;

select sum(totals)
from
(select distinct Longitude, Latitude, race, count(*) as totals from data group by Longitude,Latitude,race order by totals desc);

select distinct zipcode,count(ID),count(ID)*1.0/(select count(ID)from zips_ID) from zips_ID group by zipcode order by count(ID) desc;

select distinct race,count(ID), substr(count(ID)*1.0/(select count(ID) from data),0,6) from data group by race order by count(ID) desc;

select distinct race, count(ID), substr(count(ID)*1.0/(select count(ID) from data),0,6),(select count(ID) from data where contrabn='Y') from data group by race order by count(ID) desc;


select distinct a.race, count(a.ID), count(ID)*1.0,(select count(ID) from data group by race) from data a where a.contrabn='Y' group by a.race order by count(a.ID) desc;

select distinct a.race, count(a.ID),b.totals,b.totals*1.0/count(a.ID) as caught_wcontrabn from data a
Join(
select distinct b.race, count(b.ID) as totals from data b where b.contrabn='Y' group by b.race
) b
on a.race=b.race group by a.race

select distinct a.race, count(a.ID),b.totals,b.totals*1.0/count(a.ID) as caught_wcontrabn from data a
Join(
select distinct b.race, count(b.ID) as totals from data b where b.arstmade='Y' group by b.race
) b
on a.race=b.race group by a.race order by caught_wcontrabn desc;


SELECT A.ZCTA5, B.RATE FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id WHERE A.STATE=36 AND A.COUNTY=05;

SELECT A.ZCTA5, B.RATE FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id WHERE A.STATE=36 AND B.RATE IS NULL;

SELECT COUNT(A.ZCTA5) FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id WHERE  B.RATE IS NOT NULL;


SELECT A.ZCTA5, A.ZPOPPCT, B.RATE FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id WHERE A.STATE=36 and b.rate>100000 order by A.ZPOPPCT ASC;


SELECT A.ZCTA5, SUM(A.ZPOPPCT) AS SUM_ZPOPPCT, SUM(A.POPPT) AS SUM_POPPCT, B.RATE, C.RATE, COUNT(*) AS ZIP_SHAPES
FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID
WHERE A.STATE=36  AND A.COUNTY=61 AND A.POPPT >0 GROUP BY A.ZCTA5,B.RATE, C.RATE order by SUM_POPPCT DESC;

SELECT A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE, C.RATE
FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id
LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE B.RATE BETWEEN 80000 AND 85000 AND C.RATE BETWEEN 43 AND 45 order by B.RATE DESC;

SELECT A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE, C.RATE
FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id
LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE B.RATE BETWEEN 80000 AND 85000 AND C.RATE BETWEEN 42 AND 46 AND A.POPPT BETWEEN 24000 AND 27000 order by B.RATE DESC;

SELECT A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE, C.RATE
FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id
LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE A.ZCTA5=6851 order by B.RATE DESC;
