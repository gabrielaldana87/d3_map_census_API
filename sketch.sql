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
