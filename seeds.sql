USE employees_db;

INSERT INTO department (name)
VALUES
(IT),
(Finance),
(HR),
(Sales),
(Marketing),
(R&D),
(Operations)

INSERT INTO role (title,salary, department_id)
VALUES
('Software Engineer', 100000, 1),
('Accountant', 65000, 2),
('HR Manager', 75000, 3),
('Sales Rep', 45000, 4),
('Brand Manager', 60000, 5),
('Product Manager', 90000, 6),
('Operations Manager', 80000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jim', 'Jones', 1, 224),
('Tonya', 'Parker', 2, 124),
('Jenny', 'Anderson', 3, 111),
('Tom', 'Smith', 4, 432),
('Mary', 'Larson', 5, 343),
('Chris', 'Johnson', 6 , 876),
('Maria', 'Thompson', 7, 774);