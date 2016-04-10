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
	 is_archived BOOLEAN DEFAULT FALSE,
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
	 description TEXT NOT NULL,
	 log_type TINYINT(1) NOT NULL,
	 admin_username VARCHAR(30) NOT NULL,
	 emp_num INT(9) NOT NULL,
	 PRIMARY KEY (log_number),
	 FOREIGN KEY(admin_username) REFERENCES ADMIN(admin_username),
	 FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num)
	);


INSERT INTO ADMIN VALUES ("WhoIsNext", "ab-1l");

INSERT INTO FACULTY VALUES (128128128, "rncrecario", "Reginald Recario", "madamada", "rncrecario@gmail.com", FALSE, 0);
INSERT INTO FACULTY VALUES (131131131, "laniedanila", "Lanie Danila", "assembly", "laniedanila@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (220202020, "rjgobrero", "Jason Obrero", "cmsc2", "rjgobrero@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (222222222, "rvbulalacao", "Rommel Bulalacao", "terror22", "rvbulalacao@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (565656565, "jrramirez", "Ramir Ramirez", "mirramir", "jrramirez@gmail.com",  FALSE, 0);
INSERT INTO FACULTY VALUES (111111111, "donnadrio", "Donnalyn Drio", "driodonna", "donnadrio@gmail.com",FALSE, 0);
INSERT INTO FACULTY VALUES (123123123, "betelderobles", "Betel de Robles", "btldrbls", "betelderobles@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (125125125, "jencinas", "Joman Encinas", "jencinas", "jencinas@gmail.com", FALSE, 0);
INSERT INTO FACULTY VALUES (202020202, "mmanalang", "Martee Manalang", "murtee", "mmanalang@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (132132132, "ivyaguila", "Ivy Aguila", "poisonivy", "ivyaguila@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (100100100, "kepbuplb", "Kristine Bautista", "kepbuplb", "kepbautista@gmail.com", FALSE, 0);
INSERT INTO FACULTY VALUES (575757575, "maryaaguirre", "Marya Aguirre", "maamarya", "maryaaguirre@gmail.com", FALSE, 0);
INSERT INTO FACULTY VALUES (130130130, "kjaen", "Kendall Jaen", "kendoll", "kjaen@gmail.com", FALSE, 0);

INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 2", "Introduction to the Internet", "B", null, TRUE, 202020202);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 2", "Introduction to the Internet", "B", "3L", TRUE, 220202020);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", null, FALSE, 123123123);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", "3L", FALSE, 111111111);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", "3L", TRUE, 111111111);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", null, FALSE, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "Y", null, FALSE, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", "4L", TRUE, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", "3L", FALSE, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "Y", "2L", FALSE, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", null, TRUE, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "5L", FALSE, 130130130);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", null, FALSE, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "5L", TRUE, 130130130);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "4L", FALSE, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "S", "1L", FALSE, 100100100);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "C", null, TRUE, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "C", null, FALSE, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "S", null, FALSE, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 132", "Computer Architechture", "T", null, TRUE, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 132", "Computer Architechture", "T", null, FALSE, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 132", "Computer Architechture", "T", "4L", TRUE, 132132132);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 132", "Computer Architechture", "T", "4L", FALSE, 132132132);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 125", "Operating Systems", "ST", null, FALSE, 125125125);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, is_archived, emp_num) VALUES ("CMSC 57", "Discrete Mathematical Structure in Computer Science", "ST", "3L", FALSE, 575757575);

INSERT INTO STUDENT VALUES ('2013-08197', "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', "Gio Joshua", "IDK", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', "Alyanna Pauline", "IDK2", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', "Nicole", "IDK3", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', "Arriane", "IDK4", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', "Lara", "IDK5", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', "Perico Dan", "IDK5", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', "Dana", "IDK6", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', "Aron", "IDK7", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', "Mon", "IDK8", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', "Arthjoseph", "IDK9", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', "Reynaldo", "ReyTZ", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', "Miles", "IDK10", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO CLASS_STUDENT VALUES (6, '2013-08197', 1);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-08210', 3);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-07115', 4);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00015', 5);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00014', 3);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00016', 3);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00017', 2);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-08197', 1);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-08210', 2);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-07115', 2);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00008', 8);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00010', 5);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00011', 6);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00012', 12);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00013', 4);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00014', 3);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00015', 4);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00016', 2);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00012', 12);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00013', 4);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00014', 3);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00015', 4);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00016', 2);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00012', 12);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00013', 4);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00014', 3);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00015', 4);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00016', 2);
INSERT INTO CLASS_STUDENT VALUES (4, '2013-00016', 3);
INSERT INTO CLASS_STUDENT VALUES (4, '2013-00017', 2);
INSERT INTO CLASS_STUDENT VALUES (4, '2013-08197', 1);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-08210', 3);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-07115', 4);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-00015', 5);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-08197', 1);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-00014', 3);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-00016', 3);
INSERT INTO CLASS_STUDENT VALUES (7, '2013-00015', 4);
INSERT INTO CLASS_STUDENT VALUES (7, '2013-00016', 2);
INSERT INTO CLASS_STUDENT VALUES (8, '2013-00012', 12);
INSERT INTO CLASS_STUDENT VALUES (8, '2013-00013', 4);
INSERT INTO CLASS_STUDENT VALUES (9, '2013-00014', 3);
INSERT INTO CLASS_STUDENT VALUES (9, '2013-00015', 4);
INSERT INTO CLASS_STUDENT VALUES (10, '2013-00016', 2);
