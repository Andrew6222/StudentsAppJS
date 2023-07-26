(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const studentsList = [];
    const tbody = document.getElementById("tbody");
    function getStudentItem(studentObj) {
      let studentElem = document.createElement("tr");
      const STUDENT = Object.values(studentObj);
      STUDENT.map((param) => {
        let tdElem = document.createElement("td");
        tdElem.textContent = param;
        studentElem.append(tdElem);
      });
      return studentElem;
    }
    function renderStudentsTable(studentsArray) {
      studentsArray.map((student) => {
        tbody.append(getStudentItem(student));
      });
    }
    renderStudentsTable(studentsList);
    const FORMELEM = document.getElementById("form");
    FORMELEM.addEventListener("submit", (e) => {
      e.preventDefault();
      let newStudent = {};
      errorCount = true;
      const FORMDATA = new FormData(FORMELEM);
      const name = FORMDATA.get("name");
      const lastName = FORMDATA.get("lastName");
      const middleName = FORMDATA.get("middleName");
      const date = FORMDATA.get("date");
      const year = FORMDATA.get("year");
      const faculty = FORMDATA.get("faculty");

      if (name.trim() == "") {
        document.getElementById("nameErr").style.display = "block";
        errorCount = false;
      } else document.getElementById("nameErr").style.display = "none";
      if (lastName.trim() == "") {
        document.getElementById("lastNameErr").style.display = "block";
        errorCount = false;
      } else document.getElementById("lastNameErr").style.display = "none";
      if (middleName.trim() == "") {
        document.getElementById("middleNameErr").style.display = "block";
        errorCount = false;
      } else document.getElementById("middleNameErr").style.display = "none";
      if (
        date.trim().length !== 10 ||
        date.trim().slice(0, 4) < "1900" ||
        date.trim().slice(0, 4) > String(new Date().getFullYear())
      ) {
        document.getElementById("dateErr").style.display = "block";
        errorCount = false;
      } else document.getElementById("dateErr").style.display = "none";
      if (
        year.trim().length !== 4 ||
        year.trim() < "2000" ||
        year.trim() > String(new Date().getFullYear())
      ) {
        document.getElementById("yearErr").style.display = "block";
        errorCount = false;
      } else document.getElementById("yearErr").style.display = "none";
      if (faculty.trim() == "") {
        document.getElementById("facultyErr").style.display = "block";
        errorCount = false;
      } else document.getElementById("facultyErr").style.display = "none";

      if (errorCount) {
        newStudent.id = Math.random().toString(36).substring(2, 15);
        newStudent.name = document.getElementById("name").value.trim();
        newStudent.lastName = document.getElementById("lastName").value.trim();
        newStudent.middleName = document
          .getElementById("middleName")
          .value.trim();
        newStudent.date = `${document.getElementById("date").value.trim()} (${
          Number(new Date().getFullYear()) -
          Number(document.getElementById("date").value.trim().slice(0, 4))
        } лет)`;
        let yearsStudy = Number(document.getElementById("year").value.trim());
        newStudent.year = `${yearsStudy} - ${yearsStudy + 4} (${
          new Date().getFullYear() - yearsStudy > 4
            ? "окончил"
            : `${new Date().getFullYear() - yearsStudy} курс`
        })`;
        newStudent.faculty = document.getElementById("faculty").value.trim();

        document.getElementById("name").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("middleName").value = "";
        document.getElementById("date").value = "";
        document.getElementById("year").value = "";
        document.getElementById("faculty").value = "";
        studentsList.push(newStudent);
        tbody.append(getStudentItem(newStudent));
      }
    });
    const clearList = () => {
      const TABLEELEMS = document.querySelectorAll("td");
      TABLEELEMS.forEach((elem) => elem.parentNode.removeChild(elem));
    };
    document.getElementById("filterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      clearList();
      let filterParam = document.getElementById("search").value.trim();

      let filterList = studentsList.filter((student) => {
        if (
          student.name.indexOf(filterParam) != -1 ||
          student.lastName.indexOf(filterParam) != -1 ||
          student.middleName.indexOf(filterParam) != -1 ||
          student.faculty.indexOf(filterParam) != -1 ||
          student.year.slice(0, 4).indexOf(filterParam) != -1 ||
          student.year.slice(7, 11).indexOf(filterParam) != -1
        ) {
          return true;
        }
      });
      renderStudentsTable(filterList);
    });

    const namesSorted = studentsList;
    document.getElementById("nameSort").addEventListener("click", () => {
      clearList();
      const namesSort = namesSorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      renderStudentsTable(namesSort);
    });
    document.getElementById("lastNameSort").addEventListener("click", () => {
      clearList();
      const namesSort = namesSorted.sort((a, b) =>
        a.lastName > b.lastName ? 1 : -1
      );
      renderStudentsTable(namesSort);
    });
    document.getElementById("middleNameSort").addEventListener("click", () => {
      clearList();
      const namesSort = namesSorted.sort((a, b) =>
        a.middleName > b.middleName ? 1 : -1
      );
      renderStudentsTable(namesSort);
    });
    document.getElementById("facultySort").addEventListener("click", () => {
      clearList();
      const namesSort = namesSorted.sort((a, b) =>
        a.faculty > b.faculty ? 1 : -1
      );
      renderStudentsTable(namesSort);
    });
    document.getElementById("yearSort").addEventListener("click", () => {
      clearList();
      const namesSort = namesSorted.sort((a, b) =>
        a.year.slice(0, 4) > b.year.slice(0, 4) ? 1 : -1
      );
      renderStudentsTable(namesSort);
    });
    document.getElementById("dateSort").addEventListener("click", () => {
      clearList();
      const namesSort = namesSorted.sort((a, b) => {
        let firstDate = new Date(a.date.slice(0, 10));
        let secondDate = new Date(b.date.slice(0, 10));
        return firstDate > secondDate ? 1 : -1;
      });
      renderStudentsTable(namesSort);
    });
  });
})();
