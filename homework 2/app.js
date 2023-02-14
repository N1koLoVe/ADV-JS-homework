const fetchStudents = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json"
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

fetchStudents();

const avgCalculator = (data, i) => {
  return data.reduce((acc, student) => acc + student[i], 0) / data.length;
};

const filterAgeOverUnder = (data) => {
  let overSixty = data.filter((studnet) => studnet.age > 60).length;
  if (overSixty === 0) {
    overSixty = "There are no students over 60 years of age";
  }
  let underThirty = data.filter((studnet) => studnet.age < 30).length;
  if (underThirty === 0) {
    underThirty = "There are no students under 30 years of age";
  }
  return `Studnets over 60: ${overSixty} | Students under 30: ${underThirty}`;
};

const studentList = (data) => {
  return data.filter(
    (student) => student.age < 30 && student.averageGrade >= 4
  );
};

const findArtuhCador = (data) => {
  try {
    const findStudent = data.find(
      (student) => student.firstName === "Artuh" && student.lastName === "Cador"
    );
    if (!findStudent) {
      throw new Error(`There is no student with that name`);
    }
    return findStudent;
  } catch (error) {
    return error.message;
  }
};

const oldestYoungestStudent = (data) => {
  const sortedData = data.sort((a, b) => a.age - b.age);
  return { min: sortedData[0], max: sortedData[data.length - 1] };
};

const longerThanEight = (data) => {
  const long = data.filter((students) => students.lastName.length > 8);
  return long;
};

const topTen = (data) => {
  const topTenStudents = data.sort((a, b) => b.averageGrade - a.averageGrade);
  return topTenStudents.slice(0, 10);
};

const displayData = async () => {
  const avgHtml = document.querySelector(".avg-grade-age");

  const students = await fetchStudents();
  const avgGrade = avgCalculator(students, `averageGrade`);
  const avgAge = avgCalculator(students, `age`);

  avgHtml.innerHTML += `<ul>
  <li>Average Grade: ${avgGrade.toFixed(2)}</li>
  <li>Average Age: ${avgAge.toFixed(2)}</li>
  </ul>
  `;

  const studentAge = filterAgeOverUnder(students);
  const ageHtml = document.querySelector(".student-age");

  ageHtml.innerHTML += `
  <h2>Students over 60 and students under 30</h2>
  <p>${studentAge}</p>
  `;

  const studnetListUnder30 = studentList(students);
  const studentListHtml = document.querySelector(".student-list");

  studnetListUnder30.forEach((student) => {
    studentListHtml.innerHTML += `
    <ul>
    <li>${student.firstName} ${student.lastName} from ${student.city}</li>
    </ul>`;
  });

  const findStudentHtml = document.querySelector(".find-student");
  const artuhCador = findArtuhCador(students);

  findStudentHtml.innerHTML += `${artuhCador}`;

  const youngestOldest = oldestYoungestStudent(students);
  const oldestYoungestStudentHtml = document.querySelector(".youngest-oldest");

  oldestYoungestStudentHtml.innerHTML += `
  <ul>
  <li>Youngest student: ${youngestOldest.min.firstName} ${youngestOldest.min.lastName} ${youngestOldest.min.age} years old, from ${youngestOldest.min.city}</li>
  <li>Oldest student:${youngestOldest.max.firstName} ${youngestOldest.max.lastName} ${youngestOldest.max.age} years old, from ${youngestOldest.max.city}</li>
  </ul>
  `;

  const longerThan = longerThanEight(students);
  const longerThanEightHtml = document.querySelector(".longer-than");

  longerThan.forEach((student) => {
    longerThanEightHtml.innerHTML += `
    <ul>
    <li>${student.firstName} ${student.lastName} from ${student.city}</li>
    </ul>`;
  });

  const top10Students = topTen(students);
  const topTenHtml = document.querySelector(".top-ten-students");

  top10Students.forEach((student) => {
    topTenHtml.innerHTML += `
    <ul>
    <li>${student.firstName} ${student.lastName} ${student.averageGrade}</li>
    </ul>
    `;
  });
};

displayData();
