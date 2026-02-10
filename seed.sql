-- Seed data for Cats table
-- Run this in Supabase SQL Editor to populate the Adoption page

INSERT INTO cats (name, age, gender, breed, location, description, attributes, images, status)
VALUES
  (
    'Mimi', 
    24, 
    'Female', 
    'Desi Cat (Bangladeshi Stray)', 
    'Dhanmondi, Dhaka', 
    'Mimi is the queen of her neighborhood. She was found charming locals for fish at a tea stall. She has that classic Desi cat intelligence.', 
    '{"vaccinated": true, "neutered": true, "goodWithKids": true}', 
    ARRAY['/assets/cat1.jpg'], 
    'Available'
  ),
  (
    'Billu', 
    48, 
    'Male', 
    'Local Tabby Mix', 
    'Uttara, Dhaka', 
    'Billu is an old soul in a young body. Life on the streets was tough, and now he just wants a warm corner and zero drama.', 
    '{"vaccinated": true, "neutered": true, "goodWithKids": true}', 
    ARRAY['/assets/cat2.jpg'], 
    'Available'
  ),
  (
    'Motu', 
    12, 
    'Male', 
    'Bangladeshi Desi Cat', 
    'Gulshan 1, Dhaka', 
    'Motu thinks he is a tiger. He has that signature Desi cat energy and loves to play and explore.', 
    '{"vaccinated": true, "neutered": false, "goodWithKids": false}', 
    ARRAY['/assets/cat3.jpg'], 
    'Available'
  ),
  (
    'Mishti', 
    8, 
    'Female', 
    'Desi Cat', 
    'Mirpur, Dhaka', 
    'Mishti has a lot of opinions and she will tell you all of them. A classic Desi stray cat: independent, sassy, but melts into a puddle of purrs once she trusts you.', 
    '{"vaccinated": true, "neutered": true, "goodWithKids": true}', 
    ARRAY['/assets/cat1.jpg'], 
    'Adopted'
  ),
  (
    'Bagha', 
    36, 
    'Male', 
    'Desi Tabby Mix', 
    'Banani, Dhaka', 
    'Named for his tiger-like stripes, Bagha is a handsome and distinctive cat. He is very trainable and eager to please.', 
    '{"vaccinated": true, "neutered": true, "goodWithKids": true}', 
    ARRAY['/assets/cat2.jpg'], 
    'Available'
  ),
  (
    'Tuni', 
    3, 
    'Female', 
    'Rescue Kitten', 
    'Bashundhara R/A, Dhaka', 
    'Tuni was a tiny orphan but is now a bundle of joy. She loves climbing and chasing toy mice.', 
    '{"vaccinated": false, "neutered": false, "goodWithKids": true}', 
    ARRAY['/assets/cat3.jpg'], 
    'Available'
  );
