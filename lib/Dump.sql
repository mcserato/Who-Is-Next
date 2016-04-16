DROP TABLE IF EXISTS ADMIN;
CREATE TABLE ADMIN
	(admin_username VARCHAR(30) NOT NULL,
	 password VARCHAR(50) NOT NULL,
	 PRIMARY KEY (admin_username)
	);

DROP TABLE IF EXISTS FACULTY;
CREATE TABLE FACULTY
	(emp_num INT(9) NOT NULL,
	 username VARCHAR(30) NOT NULL UNIQUE,
	 name VARCHAR(50) NOT NULL,
	 password VARCHAR(50) NOT NULL,
	 email VARCHAR(50) NOT NULL,
	 is_validated BOOLEAN DEFAULT FALSE,
	 current_theme INT(2) NOT NULL DEFAULT 0,
	 PRIMARY KEY (emp_num)
	);

DROP TABLE IF EXISTS CLASS;
CREATE TABLE CLASS
	(class_id INT AUTO_INCREMENT,
	 course_code VARCHAR(10) NOT NULL,
	 course_title VARCHAR(256) NOT NULL,
	 class_section VARCHAR(10) NOT NULL,
	 section_number VARCHAR(5),
	 emp_num INT(9) NOT NULL,
	 PRIMARY KEY (class_id),
	 FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num) ON DELETE CASCADE ON UPDATE CASCADE
	);

DROP TABLE IF EXISTS STUDENT;
CREATE TABLE STUDENT
	(student_number VARCHAR(10) NOT NULL,
	 first_name VARCHAR(50) NOT NULL,
	 middle_name VARCHAR(50),
	 last_name VARCHAR(50) NOT NULL,
	 college VARCHAR(50) NOT NULL,
	 course VARCHAR(50) NOT NULL,
	 gender VARCHAR(1) NOT NULL,
	 picture VARCHAR(100) DEFAULT NULL,
	 birthday DATE,
	 PRIMARY KEY (student_number)
	);

DROP TABLE IF EXISTS CLASS_STUDENT;
CREATE TABLE CLASS_STUDENT
	(class_id INT,
	 student_number VARCHAR(10) NOT NULL,
 	 no_of_times_called INT DEFAULT 0,
     PRIMARY KEY (class_id, student_number),
 	 FOREIGN KEY (class_id) REFERENCES CLASS(class_id)  ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (student_number) REFERENCES STUDENT(student_number)  ON DELETE CASCADE ON UPDATE CASCADE
	);

DROP TABLE IF EXISTS LOG;
CREATE TABLE LOG
	(log_number INT AUTO_INCREMENT,
	 log_date TIMESTAMP DEFAULT NOW(),
     ip_address VARCHAR(24) NOT NULL,
	 username VARCHAR(30) NOT NULL,
	 method VARCHAR(12) NOT NULL,
	 url VARCHAR(64) NOT NULL,
	 message VARCHAR(256) NOT NULL,
	 status VARCHAR(12) NOT NULL,
	 PRIMARY KEY (log_number)
	);


INSERT INTO ADMIN VALUES ("WhoIsNext", "ab-1l");

INSERT INTO FACULTY VALUES (128128128, "rncrecario", "Reginald Recario", "madamada", "rncrecario@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (131131131, "laniedanila", "Lanie Danila", "assembly", "laniedanila@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (220202020, "rjgobrero", "Jason Obrero", "cmsc2", "rjgobrero@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (222222222, "rvbulalacao", "Rommel Bulalacao", "terror22", "rvbulalacao@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (565656565, "jrramirez", "Ramir Ramirez", "mirramir", "jrramirez@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (111111111, "donnadrio", "Donnalyn Drio", "driodonna", "donnadrio@gmail.com",TRUE, 0);
INSERT INTO FACULTY VALUES (123123123, "betelderobles", "Betel de Robles", "btldrbls", "betelderobles@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (125125125, "jencinas", "Joman Encinas", "jencinas", "jencinas@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (202020202, "mmanalang", "Martee Manalang", "murtee", "mmanalang@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (132132132, "ivyaguila", "Ivy Aguila", "poisonivy", "ivyaguila@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (100100100, "kepbuplb", "Kristine Bautista", "kepbuplb", "kepbautista@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (575757575, "maryaaguirre", "Marya Aguirre", "maamarya", "maryaaguirre@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (130130130, "kjaen", "Kendall Jaen", "kendoll", "kjaen@gmail.com", TRUE, 0);

INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 2", "Introduction to the Internet", "B", null, 202020202);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 2", "Introduction to the Internet", "B", "3L", 220202020);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", null, 123123123);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", "3L", 111111111);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", "3L", 111111111);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", null, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "Y", null, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", "4L", 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", "3L", 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "Y", "2L", 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 57", "Discrete Mathematical Structure in Computer Science", "ST", "3L", 575757575);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", null, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "5L", 130130130);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", null, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "5L", 130130130);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "4L", 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "S", "1L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "C", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "S", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "AB", "1L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "AB", "2L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "AB", "3L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "CD", "4L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 132", "Computer Architecture", "ST", "3L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 132", "Computer Architecture", "T", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 132", "Computer Architecture", "T", "4L", 132132132);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 125", "Operating Systems", "ST", null, 125125125);

INSERT INTO STUDENT VALUES ('2013-08197', "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', "Gio Joshua", "I", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', "Alyanna Pauline", "H", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00009', "Lara", "G", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', "Perico Dan", "F", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', "Dana", "E", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', "Aron", "D", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', "Mon", "C", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', "Arthjoseph", "B", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', "Reynaldo", "ReyTZ", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', "Miles", "A", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00019', "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00020', "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));

INSERT INTO CLASS_STUDENT VALUES (17, '2013-00001', 1);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00002', 2);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00003', 3);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00004', 4);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00005', 5);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00006', 6);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00007', 7);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00008', 8);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00009', 9);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00010', 10);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00011', 1);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00012', 2);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00013', 3);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00014', 4);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00015', 5);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00016', 1);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00017', 2);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00018', 3);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00019', 4);
INSERT INTO CLASS_STUDENT VALUES (17, '2013-00020', 5);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00001', 1);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00002', 2);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00003', 3);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00004', 4);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00005', 5);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00006', 1);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00007', 2);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00008', 3);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00009', 4);
INSERT INTO CLASS_STUDENT VALUES (18, '2013-00010', 5);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00011', 1);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00012', 2);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00013', 3);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00014', 4);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00015', 5);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00016', 1);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00017', 2);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00018', 3);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00019', 4);
INSERT INTO CLASS_STUDENT VALUES (19, '2013-00020', 5);

INSERT INTO `LOG` VALUES (1,'2016-04-12 06:05:26','127.0.0.1','rncrecario','POST','/api/login','Successfully logged in.','SUCCESS'),(2,'2016-04-12 06:05:41','127.0.0.1','rncrecario','POST','/api/logout','Successfully logged out.','SUCCESS'),(3,'2016-04-12 06:06:29','127.0.0.1','<GUEST>','POST','/api/logout','No one is logged in.','FAILED'),(4,'2016-04-12 06:06:30','127.0.0.1','<GUEST>','POST','/api/logout','No one is logged in.','FAILED'),(5,'2016-04-12 06:12:03','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(6,'2016-04-12 06:24:12','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(7,'2016-04-12 06:28:59','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(8,'2016-04-12 06:30:17','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(9,'2016-04-12 06:35:12','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(10,'2016-04-12 06:36:52','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(11,'2016-04-12 06:36:54','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(12,'2016-04-12 06:36:57','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(13,'2016-04-12 06:37:00','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(14,'2016-04-12 06:37:03','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(15,'2016-04-12 06:37:42','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(16,'2016-04-12 06:38:24','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(17,'2016-04-12 06:40:01','127.0.0.1','WhoIsNext','POST','/api/login','Someone is already logged in.','FAILED'),(18,'2016-04-12 06:40:05','127.0.0.1','WhoIsNext','POST','/api/login','Someone is already logged in.','FAILED'),(19,'2016-04-12 06:40:32','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(20,'2016-04-12 06:40:40','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(21,'2016-04-12 06:42:33','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS');
