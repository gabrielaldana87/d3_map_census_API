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


SELECT A.ZCTA5, SUM(A.ZPOPPCT) AS SUM_ZPOPPCT, SUM(A.POPPT) AS SUM_POPPCT, B.RATE, C.RATE, COUNT(*) AS ZIP_SHAPES FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE A.STATE=36  AND A.COUNTY=61 AND A.POPPT >0 GROUP BY A.ZCTA5,B.RATE, C.RATE order by SUM_POPPCT DESC;

SELECT A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE, C.RATE
FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id
LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE B.RATE BETWEEN 80000 AND 85000 AND C.RATE BETWEEN 43 AND 45 order by B.RATE DESC;

SELECT A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE, C.RATE
FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id
LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE B.RATE BETWEEN 80000 AND 85000 AND C.RATE BETWEEN 42 AND 46 AND A.POPPT BETWEEN 24000 AND 27000 order by B.RATE DESC;

SELECT A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE, C.RATE FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE A.ZCTA5=6851 order by B.RATE DESC;

SELECT A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE, C.RATE, D.RATE,E.RATE FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE D.RATE>50 ORDER BY A.POPPT DESC;

SELECT DISTINCT STATE,COUNTY,COUNT(ZCTA5),SUM(POPPT*(RACE*.01)) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE D.RATE>50 AND A.POPPT> 10000 ORDER BY E.RATE DESC) GROUP BY STATE ,COUNTY ORDER BY STATE ASC;

-- SUM OF TOTAL HISPANIC POPULATION IN SPECIFIC COUNTY
SELECT SUM(POPPT) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE D.RATE>50 AND A.POPPT> 10000 AND A.STATE=36 AND A.COUNTY=61 ORDER BY E.RATE DESC) GROUP BY STATE, COUNTY;

-- COUNT OF ZIPCODES IN SPECIFIC COUNTY FOR HISPANIC POPULATION
SELECT COUNT(ZCTA5) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE D.RATE>50 AND A.POPPT> 10000 AND A.STATE=36 AND A.COUNTY=61 ORDER BY E.RATE DESC) GROUP BY STATE, COUNTY;

-- FILTER ZIPCODES BY STATE AND COUNTY WHERE POPULATION HISPANIC GREATER THAN 50% AND POPPT>1000
SELECT ZCTA5,EDU,POPPT,RACE,INC FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE D.RATE>50 AND A.POPPT> 10000 AND A.STATE=36 AND A.COUNTY=61 ORDER BY E.RATE DESC);

SELECT ZCTA5,EDU,POPPT,RACE,INC FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE A.POPPT> 10000 AND EDU=30.7 ORDER BY E.RATE DESC);

-- MEDIAN AGE, RACE, EDUCATIONAL ATTAINMENT, MEDIAN INCOME AND POPULATION FOR HISPANIC POPULATION GREATER THAN 50% AND POPPT>1000 BY ZIPCODE
SELECT ZCTA5,EDU,POPPT,RACE,INC,MEDAGE FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM,F.RATE AS MEDAGE FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP05_0017E AS F ON A.ZCTA5=F.ID WHERE D.RATE>50 AND A.POPPT> 10000 AND A.STATE=36 AND A.COUNTY=61 ORDER BY E.RATE DESC);

-- MEDIAN AGE, RACE, EDUCATIONAL ATTAINMENT, MEDIAN INCOME AND POPULATION FOR BLACK POPULATION GREATER THAN 50% AND POPPT>1000 BY ZIPCODE
SELECT ZCTA5,EDU,POPPT,RACE,INC,MEDAGE,UNEM FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM,F.RATE AS MEDAGE FROM zcta_cnty_rel AS A INNER JOIN DP03_0062E AS B ON A.ZCTA5=B.id INNER JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID INNER JOIN DP05_0033PE AS D ON A.ZCTA5=D.id INNER JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID INNER JOIN DP05_0017E AS F ON A.ZCTA5=F.ID WHERE D.RATE>50 AND A.POPPT> 1000 AND A.STATE=26 ORDER BY E.RATE DESC);

SELECT SUM(RACE*POPPT*.01) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE D.RATE>50 AND A.POPPT> 10000 AND A.STATE IS NOT 72 ORDER BY E.RATE DESC)


SELECT DISTINCT STATE,COUNTY,COUNT(ZCTA5),SUM(POPPT*(RACE*.01)) AS TOTALPOP FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0033PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE D.RATE>50 AND A.POPPT> 10000 AND A.STATE IS NOT 72 ORDER BY E.RATE DESC) GROUP BY STATE ,COUNTY ORDER BY TOTALPOP DESC;


SELECT SUM(TOTALPOP) FROM (SELECT DISTINCT STATE,COUNTY,COUNT(ZCTA5),SUM(POPPT) AS TOTALPOP FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0033PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID WHERE B.RATE>90000 AND A.STATE IS NOT 72 ORDER BY UNEMP DESC) GROUP BY STATE ,COUNTY ORDER BY TOTALPOP DESC);


SELECT DISTINCT STATE, COUNTY, COUNT(ZCTA5), SUM(POP25*(EDU*.01)) AS NUMEDU FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM, F.RATE AS POP25, G.RATE AS POV FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0033PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP02_0058E AS F ON A.ZCTA5=F.ID LEFT JOIN DP03_0128PE AS G ON A.ZCTA5=G.ID WHERE B.RATE>90000 AND A.STATE IS NOT 72 ORDER BY POP25 DESC) GROUP BY STATE ,COUNTY ORDER BY NUMEDU DESC


-- POPULATION HISPANIC WITH EDUCATIONAL ATTAINMENT BACHELORS DEGREE OR HIGHER
SELECT DISTINCT STATE, COUNTY, COUNT(ZCTA5), substr(SUM(POP25*(EDU*.01))/SUM(POP25),0,6) AS NUMEDU FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM, F.RATE AS POP25, G.RATE AS POV FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP02_0058E AS F ON A.ZCTA5=F.ID LEFT JOIN DP03_0128PE AS G ON A.ZCTA5=G.ID WHERE RACE>50 AND A.STATE IS NOT 72 ORDER BY POP25 DESC) GROUP BY STATE ,COUNTY ORDER BY NUMEDU DESC

-- COUNTIES AND STATES WHERE ZIPCODES HAS HISPANIC POPULATION GREATER THAN 50% AND CORRESPONDING % OF INDIVIDUALS 25YO WITH BACHELORS DEGREES OR HIGHER
SELECT DISTINCT STATE, COUNTY, COUNT(ZCTA5), SUM(POPPT), substr(SUM(POP25*(EDU*.01))/SUM(POP25),0,6) AS NUMEDU,SUM(POPPT)/COUNT(ZCTA5),MIN(MEDAGE),MAX(MEDAGE) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM, F.RATE AS POP25, G.RATE AS POV, H.RATE AS MEDAGE FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP02_0058E AS F ON A.ZCTA5=F.ID LEFT JOIN DP03_0128PE AS G ON A.ZCTA5=G.ID LEFT JOIN DP05_0017E AS H ON A.ZCTA5=H.ID WHERE RACE>50 AND A.POPPT>1000 AND A.STATE IS NOT 72 ORDER BY POP25 DESC) GROUP BY STATE ,COUNTY ORDER BY COUNT(ZCTA5) DESC

SELECT STATE,COUNTY, ZCTA5,EDU,POPPT,HISP,BLAC,INC,MEDAGE FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS HISP,E.RATE AS UNEM,F.RATE AS MEDAGE,G.RATE AS BLAC FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP05_0017E AS F ON A.ZCTA5=F.ID LEFT JOIN DP05_0033PE AS G ON A.ZCTA5=G.id WHERE HISP<5 AND BLAC<5 AND A.POPPT> 1000 AND A.STATE=36 AND EDU BETWEEN 30.7 AND 32.9 AND MEDAGE BETWEEN 33 AND 37 ORDER BY E.RATE DESC);

-- STATE AND COUNTY, ZIPS
SELECT DISTINCT STATE, COUNTY, COUNT(ZCTA5), substr(SUM(POP25*(EDU*.01))/SUM(POP25),0,6) AS NUMEDU,SUM(POPPT)/COUNT(ZCTA5),MIN(MEDAGE),MAX(MEDAGE) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM, F.RATE AS POP25, G.RATE AS POV, H.RATE AS MEDAGE FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0033PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP02_0058E AS F ON A.ZCTA5=F.ID LEFT JOIN DP03_0128PE AS G ON A.ZCTA5=G.ID LEFT JOIN DP05_0017E AS H ON A.ZCTA5=H.ID WHERE RACE>50 AND A.POPPT>1000 AND A.STATE IS NOT 72 ORDER BY POP25 DESC) GROUP BY STATE ,COUNTY ORDER BY COUNT(ZCTA5) DESC

SELECT DISTINCT STATE,COUNTY, COUNT(ZCTA5), SUM(POPPT),MIN(INC),MAX(INC) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS HISP,E.RATE AS UNEM,F.RATE AS MEDAGE,G.RATE AS BLAC FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP05_0017E AS F ON A.ZCTA5=F.ID LEFT JOIN DP05_0033PE AS G ON A.ZCTA5=G.id WHERE EDU<33 AND HISP<6.5 AND BLAC<6.5 AND (STATE=36 OR STATE=34 OR STATE=06 OR STATE=42) AND MEDAGE BETWEEN 33 AND 38 ORDER BY STATE, COUNTY DESC) ORDER BY STATE,COUNTY ORDER BY STATE, COUNTY, DESC;

-- POPULATION NON-COLOR STATE, COUNTY, NUMBER OF ZIPS
SELECT DISTINCT STATE,COUNTY, COUNT(ZCTA5) AS NUMZIP, SUM(POPPT),MIN(INC),MAX(INC) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS HISP,E.RATE AS UNEM,F.RATE AS MEDAGE,G.RATE AS BLAC FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP05_0017E AS F ON A.ZCTA5=F.ID LEFT JOIN DP05_0033PE AS G ON A.ZCTA5=G.id WHERE EDU<32 AND HISP<6.5 AND BLAC<6.5 AND MEDAGE BETWEEN 31 AND 40 ORDER BY STATE, COUNTY DESC) GROUP BY STATE,COUNTY ORDER BY SUM(POPPT) DESC;

SELECT DISTINCT STATE, COUNTY, COUNT(ZCTA5), SUM(POPPT), MIN(INC), MAX(INC) ,substr(SUM(POP25*(EDU*.01))/SUM(POP25),0,6) AS NUMEDU,SUM(POPPT)/COUNT(ZCTA5),MIN(MEDAGE),MAX(MEDAGE) FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM, F.RATE AS POP25, G.RATE AS POV, H.RATE AS MEDAGE FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP02_0058E AS F ON A.ZCTA5=F.ID LEFT JOIN DP03_0128PE AS G ON A.ZCTA5=G.ID LEFT JOIN DP05_0017E AS H ON A.ZCTA5=H.ID WHERE RACE>50 AND A.POPPT>1000 AND A.STATE IS NOT 72 ORDER BY POP25 DESC) GROUP BY STATE ,COUNTY ORDER BY NUMEDU DESC;


-- JOINS OF STOP AND FRISK DATA AND DEMOGRAPHIC, POP SIZE, RACE, ETHNICITY AND POVERTY RATE
select distinct A.zipcode,count(A.ID) as totalstops,E.POPPT,B.rate,C.rate,D.rate from database2.zips_ID as A left join DP05_0033PE as B on A.zipcode=B.id left join DP05_0066PE as C on A.zipcode=C.id left join DP03_0128PE as D on A.zipcode=D.id inner join zcta_cnty_rel as E on A.ID=E.ZCTA5 group by A.zipcode order by totalstops desc;

select count(A.ID) as totalstops from database2.zips_ID as A inner join DP05_0033PE as B on A.zipcode=B.id inner join DP05_0066PE as C on A.zipcode=C.id inner join DP03_0128PE as D on A.zipcode=D.id inner join zcta_cnty_rel as E on A.ID=E.ZCTA5 group by A.zipcode order by totalstops desc;

select sum(POPZIP*(BLACK*.01)) from (select distinct A.zipcode,count(A.id) as totalstops,B.rate AS BLACK,C.rate AS HISP, D.rate AS POVER,E.POPPT AS POPZIP from database2.zips_ID as A inner join zcta_cnty_rel as E on A.zipcode=E.ZCTA5 inner join DP05_0033PE as B on A.zipcode=B.id inner join DP05_0066PE as C on A.zipcode=C.id inner join DP03_0128PE as D on A.zipcode=D.id group by A.zipcode order by totalstops desc limit 20);

select sum(POPZIP*(HISP*.01)) from (select distinct A.zipcode,count(A.id) as totalstops,B.rate AS BLACK,C.rate AS HISP, D.rate AS POVER,E.POPPT AS POPZIP from database2.zips_ID as A inner join zcta_cnty_rel as E on A.zipcode=E.ZCTA5 inner join DP05_0033PE as B on A.zipcode=B.id inner join DP05_0066PE as C on A.zipcode=C.id inner join DP03_0128PE as D on A.zipcode=D.id WHERE E.COUNTY IN(81,61,5,85,47) group by A.zipcode order by totalstops desc);

select sum(E.POPPT), SUM(totalstops), sum(A.POPZIP*(A.HISP*.01)),SUM(A.POPZIP*(A.BLACK*.01)),SUM(A.POPZIP*(A.POVER*.01)) from (select distinct A.zipcode,count(A.id) as totalstops,B.rate AS BLACK,C.rate AS HISP, D.rate AS POVER,E.POPPT AS POPZIP from database2.zips_ID as A inner join zcta_cnty_rel as E on A.zipcode=E.ZCTA5 inner join DP05_0033PE as B on A.zipcode=B.id inner join DP05_0066PE as C on A.zipcode=C.id inner join DP03_0128PE as D on A.zipcode=D.id WHERE E.COUNTY IN(81,61,5,85,47) group by A.zipcode order by totalstops desc LIMIT 20) AS A OUTER JOIN zcta_cnty_rel as E on A.zipcode=E.ZCTA5 WHERE E.STATE=36 AND E.COUNTY IN (81,61,5,85,47);


-- THE TOP 20 ZIPCODES FOR STOP AN FRISK, REPRESENTING 35% OF ALL STOPS (44,137)
select sum(E.POPPT), SUM(totalstops), sum(A.POPZIP*(A.HISP*.01)),SUM(A.POPZIP*(A.BLACK*.01)),SUM(A.POPZIP*(A.POVER*.01)) from (select distinct A.zipcode,count(A.id) as totalstops,B.rate AS BLACK,C.rate AS HISP, D.rate AS POVER,E.POPPT AS POPZIP from database2.zips_ID as A inner join zcta_cnty_rel as E on A.zipcode=E.ZCTA5 inner join DP05_0033PE as B on A.zipcode=B.id inner join DP05_0066PE as C on A.zipcode=C.id inner join DP03_0128PE as D on A.zipcode=D.id WHERE E.COUNTY IN(81,61,5,85,47) group by A.zipcode order by totalstops desc LIMIT 20) AS A JOIN zcta_cnty_rel as E on A.zipcode=E.ZCTA5 WHERE E.STATE=36 AND E.COUNTY IN (81,61,5,85,47);


select sum(E.POPPT), SUM(totalstops), (sum(A.POPZIP*(A.HISP*.01)))/SUM(A.POPZIP),SUM(A.POPZIP*(A.BLACK*.01))/SUM(A.POPZIP),SUM(A.POPZIP*(A.POVER*.01))/SUM(A.POPZIP) from (select distinct A.zipcode,count(A.id) as totalstops,B.rate AS BLACK,C.rate AS HISP, D.rate AS POVER,E.POPPT AS POPZIP from database2.zips_ID as A inner join zcta_cnty_rel as E on A.zipcode=E.ZCTA5 inner join DP05_0033PE as B on A.zipcode=B.id inner join DP05_0066PE as C on A.zipcode=C.id inner join DP03_0128PE as D on A.zipcode=D.id WHERE E.COUNTY IN(81,61,5,85,47) group by A.zipcode order by totalstops desc LIMIT 20) AS A JOIN zcta_cnty_rel as E on A.zipcode=E.ZCTA5 WHERE E.STATE=36 AND E.COUNTY IN (81,61,5,85,47);

select sum(E.POPPT), SUM(totalstops), (sum(A.POPZIP*(A.HISP*.01)))/2319485,SUM(A.POPZIP*(A.BLACK*.01))/2002748,SUM(A.POPZIP*(A.POVER*.01))/1652857 from (select distinct A.zipcode,count(A.id) as totalstops,B.rate AS BLACK,C.rate AS HISP, D.rate AS POVER,E.POPPT AS POPZIP from database2.zips_ID as A inner join zcta_cnty_rel as E on A.zipcode=E.ZCTA5 inner join DP05_0033PE as B on A.zipcode=B.id inner join DP05_0066PE as C on A.zipcode=C.id inner join DP03_0128PE as D on A.zipcode=D.id WHERE E.COUNTY IN(81,61,5,85,47) group by A.zipcode order by totalstops desc LIMIT 20) AS A JOIN zcta_cnty_rel as E on A.zipcode=E.ZCTA5 WHERE E.STATE=36 AND E.COUNTY IN (81,61,5,85,47);

select  sum(B.contraband) from (select distinct zipcode,count(ID) as stops from database2.zips_ID group by zipcode order by stops desc) as A left join (select distinct tb1.zipcode, count(tb2.ID) as contraband from database2.zips_ID tb1 left join database2.data as tb2 on tb1.ID=tb2.ID where tb2.contrabn='Y' group by tb1.zipcode) as B on A.zipcode=B.zipcode order by A.stops desc;

select distinct A.zipcode,A.stops,B.contraband,count(B.contraband)/count(A.stops) from (select distinct zipcode,count(ID) as stops from database2.zips_ID group by zipcode order by stops desc) as A left join (select distinct tb1.zipcode, count(tb2.ID) as contraband from database2.zips_ID tb1 left join database2.data as tb2 on tb1.ID=tb2.ID where tb2.contrabn='Y' group by tb1.zipcode) as B on A.zipcode=B.zipcode order by A.stops desc;

select distinct A.zipcode,A.stops,B.contraband, SUBSTR(cast (sum(B.contraband) as Float)/ A.stops,0,6) AS CONT from (select distinct zipcode,count(ID) as stops from database2.zips_ID group by zipcode order by stops desc) as A left join (select distinct tb1.zipcode, count(tb2.ID) as contraband from database2.zips_ID tb1 left join database2.data as tb2 on tb1.ID=tb2.ID where tb2.contrabn='Y' group by tb1.zipcode) as B on A.zipcode=B.zipcode group by A.zipcode, A.stops, B.contraband order by CONT desc;

select distinct A.zipcode,A.stops,B.weapon, SUBSTR(cast (sum(B.weapon) as Float)/ A.stops,0,6) AS CONT from (select distinct zipcode,count(ID) as stops from database2.zips_ID group by zipcode order by stops desc) as A left join (select distinct tb1.zipcode, count(tb2.ID) as weapon from database2.zips_ID tb1 left join database2.data as tb2 on tb1.ID=tb2.ID where (tb2.asltweap='Y' or tb2.pistol='Y' or tb2.riflshot='Y' or tb2.knifcuti='Y' or tb2.machgun='Y' or tb2.othrweap='Y') group by tb1.zipcode) as B on A.zipcode=B.zipcode group by A.zipcode, A.stops, B.weapon order by CONT desc;

-- ZIP CODE, % WITH BACHELORS DEGREE OR HIGHER, POPULATION SIZE, INCOME FOR NYC COUNTIES
SELECT CASE  WHEN COUNTY=61 THEN 'MANHATTAN' WHEN COUNTY=05 THEN 'BRONX' WHEN COUNTY=81 THEN 'QUEENS' WHEN COUNTY=85 THEN 'RICHMOND' WHEN COUNTY=47 THEN 'KINGS' ELSE 'NULL' END AS COUNTY, ZCTA5,EDU,POPPT,INC FROM (SELECT A.STATE,A.COUNTY, A.ZCTA5, A.ZPOPPCT, A.POPPT, B.RATE AS INC, C.RATE AS EDU, D.RATE AS RACE ,E.RATE AS UNEM,F.RATE AS MEDAGE FROM zcta_cnty_rel AS A LEFT JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID LEFT JOIN DP05_0066PE AS D ON A.ZCTA5=D.id LEFT JOIN DP03_0005PE AS E ON A.ZCTA5=E.ID LEFT JOIN DP05_0017E AS F ON A.ZCTA5=F.ID WHERE A.POPPT> 100 AND A.STATE=36 AND A.COUNTY IN (61,5,81,47,85) ORDER BY E.RATE DESC) ORDER BY POPPT;
