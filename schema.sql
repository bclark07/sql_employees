DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL(9,2) UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);
--alternately: CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE - means if dept is deleted, all associated roles in role table will be deleted

--UNSIGNED means positive, doesn't work in all versions of SQL

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  INDEX role_ind (role_id),
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
  manager_id INT,
  INDEX man_id (manager_id), 
  FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
  -- fk is naming the foreign key
 
  -- This needs to reference the employee ID to link employee to their manager, does not work in this format
);

INSERT INTO department (name) VALUES ("HR"), ("Sales"), ("Accounting");
INSERT INTO role (title, salary, department_id) VALUES ("boss", 1170345.84, 3), ("manager", 122345.94, 2), ("supervisor", 600345.94, 1), ("specialist", 30345.24, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mary", "Watts", 1, 1), ("Joan", "London", 1, 2), ("Jeff", "Kazzam", 4, 1);
SELECT*FROM employee;

