CREATE SCHEMA education_system;


CREATE SEQUENCE Alphanumeric START 1;

CREATE TABLE education_system.institution (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
code VARCHAR(10) UNIQUE NOT NULL DEFAULT('INST' || lpad(nextval('Alphanumeric')::TEXT, 3, '0'))
);


CREATE TABLE education_system.department (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    institution_id INT REFERENCES education_system.institution,
    is_active BOOLEAN DEFAULT TRUE
);


INSERT INTO education_system.institution (name, location) VALUES
('rgm', 'kurnool'),
('svr', 'nandyal'),
('ksrm', 'kadapa'),
('svce', 'tpt'),
('sv', 'tpt');


INSERT INTO education_system.department (name, institution_id, is_active) VALUES
('cse', 1, TRUE),
('ece', 1, TRUE),
('mech', 1, TRUE),
('civil', 1, TRUE),
('ai', 1, TRUE);

INSERT INTO education_system.department (name, institution_id, is_active) VALUES
('cse', 2, TRUE),
('ece', 2, TRUE),
('mech', 2, TRUE),
('civil', 2, TRUE),
('ai', 2, TRUE);

INSERT INTO education_system.department (name, institution_id, is_active) VALUES
('cse', 3, TRUE),
('ece', 3, TRUE),
('mech', 3, TRUE),
('civil', 3, TRUE),
('ai', 3, TRUE);

INSERT INTO education_system.department (name, institution_id, is_active) VALUES
('cse', 4, TRUE),
('ece', 4, TRUE),
('mech', 4, TRUE),
('civil', 4, TRUE),
('ai', 4, TRUE);

INSERT INTO education_system.department (name, institution_id, is_active) VALUES
('cse', 5, TRUE),
('ece', 5, TRUE),
('mech', 5, TRUE),
('civil', 5, TRUE),
('ai', 5, TRUE);


CREATE TABLE education_system.student (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone_no VARCHAR(15),
    address TEXT,
    dept_id INT,
    enrollment_no VARCHAR(10) UNIQUE NOT NULL DEFAULT('INST' || lpad(nextval('Alphanumeric')::TEXT, 3, '0'))
);



INSERT INTO education_system.student (name, email, phone_no, address, dept_id) VALUES
('nithin', 'nithin@example.com', '1234567890', 'pdtr', 6),
('pavan', 'pavan@example.com', '1234567891', 'kadapa', 7),
('harsha', 'harsha@example.com', '1234567892', 'rgm', 8),
('irfan', 'irfan@example.com', '1234567890', 'jmd', 6),
('deepak', 'deepak@example.com', '1234567891', 'knl', 7),
('basha', 'basha@example.com', '1234567892', 'pdtr', 20),
('farook', 'farook@example.com', '1234567890', 'knl', 21),
('rashad', 'rashad@example.com', '1234567891', 'jmd', 22),
('nikitha', 'nikitha@example.com', '1234567892', 'ndl', 16),
('arshiya', 'arshiya@example.com', '1234567890', 'ndl', 17),
('sabiha', 'sabiha@example.com', '1234567891', 'pdtr', 22),
('itija', 'itija@example.com', '1234567892', 'knl', 22),
('kalyan', 'kalyan@example.com', '1234567890', 'jmd', 8),
('suresh', 'suresh@example.com', '1234567891', 'pdtr', 9),
('Sethu', 'sethu@example.com', '1234567892', 'ndl', 7);


SELECT
    s.enrollment_no,
    s.name,
    s.email,
    d.name AS department_name,
    i.name AS institution_name,
    i.location AS institution_location,
    i.code AS institution_code
FROM education_system.student s
JOIN education_system.department d ON s.dept_id = d.id
JOIN education_system.institution i ON d.institution_id = i.id;


SELECT
    d.name AS department_name,
    i.name AS institution_name,
    i.code AS institution_code
FROM education_system.department d
JOIN education_system.institution i ON d.institution_id = i.id
WHERE d.is_active = TRUE;



UPDATE education_system.department
SET is_active = FALSE
WHERE id IN (6,7);  


SELECT
    d.name AS department_name,
    i.name AS institution_name
FROM education_system.department d
JOIN education_system.institution i ON d.institution_id = i.id
WHERE d.is_active = FALSE;


SELECT
    d.name AS department_name,
    COUNT(s.id) AS number_of_students,
    d.is_active
FROM education_system.student s
JOIN education_system.department d ON s.dept_id = d.id
GROUP BY d.name, d.is_active;


