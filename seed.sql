DROP TABLE IF EXISTS variables;

CREATE TABLE variables (
  id          INTEGER PRIMARY KEY,
  c_id        text,
  concept     text,
  short       text,
  label       text,
  indicator1  text,
  indicator2  text,
  indicator3  text,
  indicator4  text,
  indicator5  text,
  created_at  DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at  DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER mapping BEFORE UPDATE ON variables BEGIN
UPDATE variables SET updated_at=CURRENT_TIMESTAMP WHERE id=new.id;
END;


CREATE TABLE county_min_max (
  id                        INTEGER PRIMARY KEY,
  county_c_id               text,
  county_min                REAL,
  county_max                REAL,
  created_at                DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at                DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY(county_c_id)  REFERENCES variables(c_id)
);

CREATE TRIGGER mapping BEFORE UPDATE ON county_min_max BEGIN
UPDATE county_min_max SET updated_at=CURRENT_TIMESTAMP WHERE id=new.id;
END;
