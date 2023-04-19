INSERT INTO department (department_name)
VALUES  ('engineering'),
        ('sales'),
        ('legal'),
        ('HR'),
        ('admin');

INSERT INTO role (title, salary, department_id)
VALUES  ('lead engineer',       100000,     1),
        ('production engineer', 65000,      1),
        ('design engineer',     80000,      1),
        ('lawyer',              75000,      3),
        ('sales 1',             36000,      2),
        ('sales 2',             40000,      2),
        ('HR',                  60000,      4),
        ('supervisor',          55000,      5),
        ('CEO',                 150000,     5);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES  ('Will',        'Smith',    1, 1),
        ('Carlton',     'Banks',    2, 1),
        ('Ashley',      'Banks',    3, 2),
        ('Hilary',      'Banks',    4, 2),
        ('Nicky',       'Banks',    5, 2),
        ('Geoffrey',    'Butler',   6, null),
        ('Jazzy',       'Jeff',     7, 1),
        ('Vivian',      'Banks',    8, null),
        ('Philip',      'Banks',    9, null);