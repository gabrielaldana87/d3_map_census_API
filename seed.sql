-- DROP TABLE IF EXISTS variables;
--
-- CREATE TABLE variables (
--   id          INTEGER PRIMARY KEY,
--   c_id        text,
--   concept     text,
--   short       text,
--   label       text,
--   indicator1  text,
--   indicator2  text,
--   indicator3  text,
--   indicator4  text,
--   indicator5  text,
--   created_at  DEFAULT CURRENT_TIMESTAMP NOT NULL,
--   updated_at  DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );
--
-- -- CREATE TRIGGER mapping BEFORE UPDATE ON variables BEGIN
-- -- UPDATE variables SET updated_at=CURRENT_TIMESTAMP WHERE id=new.id;
-- -- END;
--
-- DROP TABLE IF EXISTS county_min_max;
--
-- CREATE TABLE county_min_max (
--   id                        INTEGER PRIMARY KEY,
--   county_c_id               text,
--   county_min                REAL,
--   county_max                REAL,
--   created_at                DEFAULT CURRENT_TIMESTAMP NOT NULL,
--   updated_at                DEFAULT CURRENT_TIMESTAMP NOT NULL,
--   FOREIGN KEY(county_c_id)  REFERENCES variables(c_id)
-- );
--
-- CREATE TRIGGER mapping BEFORE UPDATE ON variables BEGIN
-- UPDATE variables SET updated_at=CURRENT_TIMESTAMP WHERE id=new.id;
-- END;

-- DROP TABLE IF EXISTS DP03_0062E;
--
-- CREATE TABLE DP03_0062E (
--   id                        INTEGER PRIMARY KEY,
--   rate                      REAL
-- );

-- DROP TABLE IF EXISTS DP05_0033PE;
--
-- CREATE TABLE DP05_0033PE (
--   id                        INTEGER PRIMARY KEY,
--   rate                      REAL
-- );

-- DROP TABLE IF EXISTS DP03_0108PE;
--
-- CREATE TABLE DP03_0108PE (
--   id                        INTEGER PRIMARY KEY,
--   rate                      REAL
-- );
--
-- DROP TABLE IF EXISTS DP05_0066PE;
--
-- CREATE TABLE DP05_0066PE (
--   id                        INTEGER PRIMARY KEY,
--   rate                      REAL
-- );

DROP TABLE IF EXISTS DP05_0017E;

CREATE TABLE DP05_0017E (
  id                        INTEGER PRIMARY KEY,
  rate                      REAL
);
