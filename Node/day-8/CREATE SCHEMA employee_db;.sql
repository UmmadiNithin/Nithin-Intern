CREATE SCHEMA employee_db;

CREATE TABLE employee_db.department (
    dept_id INT PRIMARY KEY,           
    name VARCHAR(255) NOT NULL,      
    organization VARCHAR(255) NOT NULL  
);

CREATE TABLE  employee_db.emp_info (
    emp_id SERIAL PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,            
    address VARCHAR(255),                   
    phone_no VARCHAR(15),                   
    department_id INT NOT NULL,             
    designation VARCHAR(100),               
    salary DECIMAL(10, 2),                  
                   
        FOREIGN KEY (department_id) 
        REFERENCES employee_db.department(dept_id)
);


INSERT INTO employee_db.department (dept_id,name, organization) VALUES ('1','HR', 'ABC Corp');
INSERT INTO employee_db.department (dept_id,name, organization) VALUES ('2','Engineering', 'ABC Corp');
INSERT INTO employee_db.department (dept_id,name, organization) VALUES ('3','Sales', 'ABC Corp');
INSERT INTO employee_db.department (dept_id,name, organization) VALUES ('4','Finance', 'XYZ Ltd');


INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('John Doe', '123 Elm Street', '1234567890', 1, 'HR Manager', 5000);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Jane Smith', '456 Maple Avenue', '2345678901', 2, 'Software Engineer', 4000);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Arjun Kumar', '789 Oak Boulevard', '3456789012', 2, 'DevOps Engineer', 4200);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Alice Brown', '101 Pine Road', '4567890123', 3, 'Sales Executive', 3500);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('David Johnson', '202 Birch Lane', '5678901234', 4, 'Financial Analyst', 4800);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Arvind Singh', '303 Cedar Court', '6789012345', 1, 'HR Specialist', 3800);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Mike Thompson', '404 Spruce Street', '7890123456', 2, 'Backend Developer', 4100);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Sarah Lee', '505 Redwood Drive', '8901234567', 3, 'Sales Manager', 4500);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Tom Clark', '606 Willow Way', '9012345678', 4, 'Accountant', 3700);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Emily Davis', '707 Fir Street', '0123456789', 4, 'Financial Planner', 4600);


SELECT employee_db.emp_info.name AS "Employee Name", 
employee_db.emp_info.designation AS "Designation",
employee_db.emp_info.name AS "Department Name",
employee_db.emp_info.phone_no AS "Contact Number",
employee_db.department.organization AS "Organization"
FROM employee_db.emp_info 
JOIN employee_db.department 
 ON employee_db.emp_info.department_id = employee_db.department.dept_id;


DELETE FROM employee_db.emp_info WHERE emp_id = 1; 

DELETE FROM employee_db.department WHERE dept_id = 3; 

ALTER TABLE employee_db.emp_info DROP CONSTRAINT emp_info_department_id_fkey;

ALTER TABLE employee_db.emp_info
ADD CONSTRAINT emp_info_department_id_fkey
FOREIGN KEY (department_id) REFERENCES employee_db.department(dept_id)
ON DELETE CASCADE;


DELETE FROM employee_db.department WHERE dept_id = 3;


UPDATE employee_db.emp_info
SET salary = salary + 500
WHERE department_id = 2; 


SELECT * FROM employee_db.emp_info
ORDER BY emp_id DESC
LIMIT 3;

SELECT name, phone_no, salary
FROM employee_db.emp_info
WHERE salary BETWEEN 3500 AND 4500;




UPDATE employee_db.emp_info
SET name = 'arjun'
WHERE emp_id = 3;

SELECT name
FROM employee_db.emp_info
WHERE name LIKE 'ar%';
