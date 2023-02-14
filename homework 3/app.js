class Academy {
  constructor(name, start, end) {
    this.name = name;
    this.students = [];
    this.subjects = [];
    this.start = start;
    this.end = end;
    this.numberOfClasses = this.numberOfClassesFn();
  }

  addingStudent(student) {
    this.students.push(student);
  }

  addingSubject(subject) {
    this.subjects.push(subject);
  }

  numberOfClassesFn() {
    return this.subjects.length + 10;
  }

  printStudents() {
    this.students.forEach((student) => console.log(student));
  }

  printSubjects() {
    this.subjects.forEach((subject) => console.log(subject));
  }
}

class Subject {
  constructor(title, isElective, academy) {
    this.title = title;
    this.numberOfClasses = this.overrideClasses();
    this.isElective = isElective;
    this.academy = academy;
    this.students = [];
    academy.addingSubject(this.title);
  }

  overrideClasses(classes) {
    return classes || 10;
  }
}

class Student {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.completedSubjects = [];
    this.academy = null;
    this.currentSubject = null;
  }

  startAcademy(academy) {
    academy.addingStudent(`${this.firstName} ${this.lastName}`);
    this.academy = academy;
  }

  startSubject(subject) {
    subject.student = `${this.firstName} ${this.lastName}`;

    if (this.academy === null) {
      console.error("Something is wrong");
      return;
    }

    if (!this.academy.subjects.includes(subject.title)) {
      console.log("Unavalable subject");
      return;
    }

    if (this.currentSubject !== null)
      this.completedSubjects.push(this.currentSubject);

    this.currentSubject = subject.title;
  }
}

const SEDC = new Academy("SEDC", "17.10.2022", "17.11.2023");

const advJsSubject = new Subject("Adv-JS", false, SEDC);

const jordan = new Student("Jordan", "Nikolov", 19);
const ivan = new Student("Ivan", "Borisvoski", 18);
const viktor = new Student("Viktor", "Aboradziev", 19);

const hogwartsAcadamy = new Academy("Hogwarts", "990 A.D", "12.1.2024");

const transfigurationSubject = new Subject(
  "TransfigurationSubject",
  true,
  hogwartsAcadamy
);

const harry = new Student("Harry", "Potter", 29);
const ron = new Student("Ron", "Weasley", 14);
const hermione = new Student("Hermione", "Granger", 14);

jordan.startAcademy(SEDC);
ivan.startAcademy(SEDC);
viktor.startAcademy(SEDC);

harry.startSubject(advJsSubject);
ron.startSubject(advJsSubject);
viktor.startSubject(advJsSubject);
viktor.startSubject(transfigurationSubject);

harry.startAcademy(hogwartsAcadamy);
ron.startAcademy(hogwartsAcadamy);
hermione.startAcademy(hogwartsAcadamy);
harry.startSubject(transfigurationSubject);
ron.startSubject(transfigurationSubject);
hermione.startSubject(transfigurationSubject);
hermione.startSubject(advJsSubject);

hogwartsAcadamy.printStudents();
SEDC.printStudents();

hogwartsAcadamy.printSubjects();
SEDC.printSubjects();
