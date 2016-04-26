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
     emp_num INT(9) NOT NULL,
	 first_name VARCHAR(50) NOT NULL,
	 middle_name VARCHAR(50),
	 last_name VARCHAR(50) NOT NULL,
	 college VARCHAR(50) NOT NULL,
	 course VARCHAR(50) NOT NULL,
	 gender VARCHAR(1) NOT NULL,
	 picture VARCHAR(100) DEFAULT NULL,
	 birthday DATE,
     FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num) ON DELETE CASCADE ON UPDATE CASCADE,
	 PRIMARY KEY (student_number, emp_num)
	);

DROP TABLE IF EXISTS CLASS_STUDENT;
CREATE TABLE CLASS_STUDENT
	(class_id INT,
	 student_number VARCHAR(10) NOT NULL,
     emp_num INT(9) NOT NULL,
 	 no_of_times_called INT DEFAULT 0,
     PRIMARY KEY (class_id, student_number),
 	 FOREIGN KEY (class_id) REFERENCES CLASS(class_id)  ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num) ON DELETE CASCADE ON UPDATE CASCADE,
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

INSERT INTO STUDENT VALUES ('2013-08197', 128128128, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 128128128, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 128128128, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 128128128, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 128128128, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 128128128, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 128128128, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 128128128, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 128128128, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 128128128, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 128128128, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 128128128, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 128128128, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 128128128, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 128128128, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 128128128, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 128128128, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 128128128, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 128128128, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 128128128, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 128128128, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 128128128, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 128128128, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 131131131, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 131131131, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 131131131, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 131131131, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 131131131, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 131131131, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 131131131, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 131131131, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 131131131, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 131131131, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 131131131, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 131131131, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 131131131, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 131131131, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 131131131, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 131131131, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 131131131, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 131131131, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 131131131, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 131131131, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 131131131, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 131131131, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 131131131, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 220202020, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 220202020, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 220202020, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 220202020, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 220202020, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 220202020, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 220202020, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 220202020, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 220202020, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 220202020, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 220202020, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 220202020, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 220202020, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 220202020, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 220202020, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 220202020, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 220202020, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 220202020, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 220202020, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 220202020, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 220202020, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 220202020, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 220202020, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 222222222, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 222222222, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 222222222, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 222222222, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 222222222, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 222222222, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 222222222, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 222222222, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 222222222, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 222222222, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 222222222, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 222222222, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 222222222, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 222222222, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 222222222, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 222222222, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 222222222, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 222222222, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 222222222, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 222222222, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 222222222, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 222222222, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 222222222, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 565656565, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 565656565, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 565656565, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 565656565, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 565656565, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 565656565, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 565656565, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 565656565, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 565656565, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 565656565, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 565656565, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 565656565, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 565656565, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 565656565, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 565656565, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 565656565, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 565656565, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 565656565, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 565656565, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 565656565, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 565656565, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 565656565, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 565656565, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 111111111, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 111111111, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 111111111, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 111111111, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 111111111, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 111111111, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 111111111, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 111111111, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 111111111, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 111111111, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 111111111, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 111111111, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 111111111, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 111111111, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 111111111, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 111111111, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 111111111, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 111111111, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 111111111, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 111111111, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 111111111, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 111111111, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 111111111, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 123123123, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 123123123, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 123123123, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 123123123, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 123123123, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 123123123, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 123123123, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 123123123, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 123123123, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 123123123, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 123123123, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 123123123, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 123123123, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 123123123, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 123123123, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 123123123, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 123123123, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 123123123, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 123123123, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 123123123, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 123123123, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 123123123, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 123123123, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 125125125, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 125125125, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 125125125, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 125125125, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 125125125, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 125125125, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 125125125, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 125125125, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 125125125, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 125125125, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 125125125, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 125125125, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 125125125, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 125125125, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 125125125, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 125125125, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 125125125, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 125125125, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 125125125, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 125125125, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 125125125, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 125125125, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 125125125, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 202020202, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 202020202, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 202020202, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 202020202, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 202020202, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 202020202, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 202020202, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 202020202, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 202020202, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 202020202, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 202020202, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 202020202, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 202020202, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 202020202, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 202020202, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 202020202, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 202020202, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 202020202, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 202020202, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 202020202, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 202020202, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 202020202, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 202020202, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 132132132, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 132132132, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 132132132, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 132132132, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 132132132, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 132132132, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 132132132, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 132132132, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 132132132, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 132132132, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 132132132, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 132132132, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 132132132, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 132132132, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 132132132, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 132132132, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 132132132, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 132132132, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 132132132, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 132132132, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 132132132, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 132132132, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 132132132, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 100100100, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 100100100, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 100100100, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 100100100, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 100100100, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 100100100, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 100100100, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 100100100, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 100100100, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 100100100, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 100100100, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 100100100, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 100100100, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 100100100, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 100100100, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 100100100, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 100100100, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 100100100, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 100100100, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 100100100, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 100100100, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 100100100, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 100100100, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 575757575, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 575757575, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 575757575, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 575757575, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 575757575, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 575757575, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 575757575, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 575757575, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 575757575, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 575757575, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 575757575, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 575757575, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 575757575, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 575757575, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 575757575, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 575757575, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 575757575, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 575757575, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 575757575, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 575757575, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 575757575, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 575757575, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 575757575, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 130130130, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", "pic ni b2s", STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 130130130, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", "pic ni jeyseh", STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 130130130, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", "pic ni gio", STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 130130130, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", "pic ni tuan", STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 130130130, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", "pic ni mina", STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 130130130, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", "pic ni alba", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 130130130, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", "pic ni palomar", STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 130130130, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", "pic ni paolo", STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 130130130, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", "pic ni marrick", STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 130130130, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", "pic ni camille", STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 130130130, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", "pic ni pau", STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 130130130, "Nicole", "A", "Martir", "CHE", "BSN", "F", "pic ni nicole", STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 130130130, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", "pic ni arraine", STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 130130130, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", "pic ni lara", STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 130130130, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", "pic ni perico", STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 130130130, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", "pic ni dana", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 130130130, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", "pic ni ajay", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 130130130, "Mon", "G", "Frias", "CAS", "BSCS", "M", "pic ni Mon", STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 130130130, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", "pic ni arth", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 130130130, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", "pic ni reytz", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 130130130, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", "pic ni aleli", STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 130130130, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", "pic ni maru", STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 130130130, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", "pic ni miles", STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO CLASS_STUDENT VALUES (6, '2013-08197', 222222222, 1);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-08210', 222222222, 3);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-07115', 222222222, 4);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00015', 222222222, 5);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00014', 222222222, 3);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00016', 222222222, 3);
INSERT INTO CLASS_STUDENT VALUES (6, '2013-00017', 222222222, 2);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-08197', 202020202, 1);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-08210', 202020202, 2);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-07115', 202020202, 2);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00008', 202020202, 8);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00010', 202020202, 5);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00011', 202020202, 6);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00012', 202020202, 12);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00013', 202020202, 4);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00014', 202020202, 3);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00015', 202020202, 4);
INSERT INTO CLASS_STUDENT VALUES (1, '2013-00016', 202020202, 2);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00012', 220202020, 12);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00013', 220202020, 4);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00014', 220202020, 3);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00015', 220202020, 4);
INSERT INTO CLASS_STUDENT VALUES (2, '2013-00016', 220202020, 2);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00012', 123123123, 12);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00013', 123123123, 4);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00014', 123123123, 3);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00015', 123123123, 4);
INSERT INTO CLASS_STUDENT VALUES (3, '2013-00016', 123123123, 2);
INSERT INTO CLASS_STUDENT VALUES (4, '2013-00016', 111111111, 3);
INSERT INTO CLASS_STUDENT VALUES (4, '2013-00017', 111111111, 2);
INSERT INTO CLASS_STUDENT VALUES (4, '2013-08197', 111111111, 1);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-08210', 222222222, 3);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-07115', 222222222, 4);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-00015', 222222222, 5);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-08197', 222222222, 1);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-00014', 222222222, 3);
INSERT INTO CLASS_STUDENT VALUES (5, '2013-00016', 222222222, 3);
INSERT INTO CLASS_STUDENT VALUES (7, '2013-00015', 222222222, 4);
INSERT INTO CLASS_STUDENT VALUES (7, '2013-00016', 222222222, 2);
INSERT INTO CLASS_STUDENT VALUES (8, '2013-00012', 222222222, 12);
INSERT INTO CLASS_STUDENT VALUES (8, '2013-00013', 222222222, 4);
INSERT INTO CLASS_STUDENT VALUES (9, '2013-00014', 222222222, 3);
INSERT INTO CLASS_STUDENT VALUES (9, '2013-00015', 222222222, 4);
INSERT INTO CLASS_STUDENT VALUES (10, '2013-00016', 575757575, 2);

INSERT INTO `LOG` VALUES (1,'2016-04-12 06:05:26','127.0.0.1','rncrecario','POST','/api/login','Successfully logged in.','SUCCESS'),(2,'2016-04-12 06:05:41','127.0.0.1','rncrecario','POST','/api/logout','Successfully logged out.','SUCCESS'),(3,'2016-04-12 06:06:29','127.0.0.1','<GUEST>','POST','/api/logout','No one is logged in.','FAILED'),(4,'2016-04-12 06:06:30','127.0.0.1','<GUEST>','POST','/api/logout','No one is logged in.','FAILED'),(5,'2016-04-12 06:12:03','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(6,'2016-04-12 06:24:12','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(7,'2016-04-12 06:28:59','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(8,'2016-04-12 06:30:17','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(9,'2016-04-12 06:35:12','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(10,'2016-04-12 06:36:52','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(11,'2016-04-12 06:36:54','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(12,'2016-04-12 06:36:57','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(13,'2016-04-12 06:37:00','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(14,'2016-04-12 06:37:03','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(15,'2016-04-12 06:37:42','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(16,'2016-04-12 06:38:24','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(17,'2016-04-12 06:40:01','127.0.0.1','WhoIsNext','POST','/api/login','Someone is already logged in.','FAILED'),(18,'2016-04-12 06:40:05','127.0.0.1','WhoIsNext','POST','/api/login','Someone is already logged in.','FAILED'),(19,'2016-04-12 06:40:32','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(20,'2016-04-12 06:40:40','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(21,'2016-04-12 06:42:33','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS');
