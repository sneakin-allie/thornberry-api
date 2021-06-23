create table sightings (
  id INTEGER primary key generated by default as identity,
  date text,
  location text,
  animal text,
  notes text,
  photos image,
  email text NOT NULL,
  foreign key (email) references users (email)
);