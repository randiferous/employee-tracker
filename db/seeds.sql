INSERT INTO department (name)
VALUES
    ('Operations'),
    ('Finance'),
    ('IT');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Operations Manager', 100000, 1),
    ('Operations Supervisor', 85000, 1),
    ('Operations Analyst', 70000, 1),
    ('Financial Manager', 100000, 2),
    ('Financial Consultant', 90000, 2),
    ('Financial Analyst', 70000, 2),
    ('IT Project Manager', 110000, 3),
    ('Software Engineer', 90000, 3),
    ('Data Analyst', 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Stephen', 'Curry', 1, NULL),
    ('Klay', 'Thompson', 4, NULL),
    ('Draymond', 'Green', 7, NULL),
    ('Andrew', 'Wiggins', 2, 1),
    ('Gary', 'Payton II', 3, 1),
    ('Jonathan', 'Kuminga', 3, 1),
    ('Damion', 'Lee', 3, 1),
    ('Jordan', 'Poole', 5, 2),
    ('Nemanja', 'Bjelica', 6, 2),
    ('Moses', 'Moody', 6, 2),
    ('Chris', 'Chiozza', 6, 2),
    ('Kevon', 'Looney', 8, 3),
    ('Andre', 'Iguodala', 8, 3),
    ('Otto', 'Porter Jr', 9, 3),
    ('Juan', 'Toscano-Anderson', 9, 3),
    ('James', 'Wiseman', 9, 3);
