DROP TABLE IF EXISTS ADMIN;
CREATE TABLE ADMIN
	(admin_username VARCHAR(30),
	 password VARCHAR(50) NOT NULL,
	 CONSTRAINT WHOISNEXT_ADMIN_PK PRIMARY KEY (admin_username)
	);

DROP TABLE IF EXISTS FACULTY;
CREATE TABLE FACULTY
	(emp_num INT(9),
	 username VARCHAR(30) NOT NULL UNIQUE,
	 name VARCHAR(50) NOT NULL,
	 password VARCHAR(50) NOT NULL,
	 email VARCHAR(50) NOT NULL,
	 picture VARCHAR(100),
	 is_validated BOOLEAN DEFAULT FALSE,
	 is_logged_in BOOLEAN DEFAULT FALSE,
	 admin_username VARCHAR(30),
	 CONSTRAINT WHOISNEXT_FACULTY_PK PRIMARY KEY (emp_num),
	 CONSTRAINT WHOISNEXT_FACULTY_FK FOREIGN KEY(admin_username) REFERENCES ADMIN(admin_username)
	);

DROP TABLE IF EXISTS CLASS;
CREATE TABLE CLASS 
	(class_id INT AUTO_INCREMENT, 
	 course_code VARCHAR(10),
	 course_title VARCHAR(50),
	 class_section VARCHAR(10),
	 class_number VARCHAR(5),
	 is_archived BOOLEAN DEFAULT FALSE, 
	 emp_num INT(9),
	 CONSTRAINT WHOISNEXT_CLASS_PK PRIMARY KEY (class_id),
	 CONSTRAINT WHOISNEXT_CLASS_FK FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num)
	);

DROP TABLE IF EXISTS STUDENT;
CREATE TABLE STUDENT
	(student_number INT(9),
	 first_name VARCHAR(50),
	 middle_name VARCHAR(50),
	 last_name VARCHAR(50),
	 college VARCHAR(50),
	 course VARCHAR(50),
	 gender VARCHAR(1),
	 picture VARCHAR(100),
	 birth_year INT(4),
	 birth_month INT(2),
	 birth_day INT(2),
	 CONSTRAINT WHOISNEXT_STUDENT_PK PRIMARY KEY (student_number)
	);

DROP TABLE IF EXISTS CLASS_STUDENT;
CREATE TABLE CLASS_STUDENT 
	(class_id INT,
	 student_number INT(9),
 	 no_of_times_called INT,
 	 CONSTRAINT WHOISNEXT_CLASS_STUDENT_PK PRIMARY KEY (class_id, student_number)
	);

DROP TABLE IF EXISTS LOG;
CREATE TABLE LOG
	(log_number INT AUTO_INCREMENT, 
	 log_date DATE, 
	 description TEXT,
	 log_type TINYINT(1),  
	 admin_username VARCHAR(30),
	 emp_num INT(9),
	 CONSTRAINT WHOISNEXT_LOG_PK PRIMARY KEY (log_number),
	 CONSTRAINT FOREIGN KEY(admin_username) REFERENCES ADMIN(admin_username),
	 CONSTRAINT FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num)	 
	);
