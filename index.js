function fetchcountry() {
  fetch("https://restcountries.com/v3/all")
    .then((response) => response.json())
    .then((data) => {
      const countrySelect = document.getElementById("countrySelect");

      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });


      $(".selectpicker").selectpicker("refresh");
    })
  .catch((error) => console.error("Error fetching country data.", error));
}
fetchcountry();


let valid = true;
list = [
  "identification.txt",
  "identificationb.txt",
  "identificationc.txt",
  "identificationd.txt",
];


function dynamicactive(num) {
  fetchcountry();
  if (num <= 0){
   valid = true;
  }
  if (valid || num <= 0) {
    const i = Math.abs(num);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("dyna").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", list[i], true);
    xhttp.send();
  }
}

function validate(event, id) {
  const field = document.getElementById(id);
  const error = document.getElementById(id + "Error");
  if (!field.value) {
    valid = false;
    error.classList.add("visible");
    field.classList.add("invalid");
    error.setAttribute("aria-hidden", false);
    error.setAttribute("aria-invalid", true);
    console.log('error');
  }else{
    valid = true;
    error.classList.remove("visible");
    field.classList.remove("invalid");
    error.setAttribute("aria-hidden", true);
    error.setAttribute("aria-invalid", false);
  }
  if (!valid) {
    event.preventDefault();
  }
  return valid;
}

async function saveData(event, num, status) {
  event.preventDefault();
  let name = gender = dob = country = relationship = '';
  if (status == 'user'){
    name = document.getElementById("username").value;
    gender = document.getElementById("usergender").value;
    dob = document.getElementById("userdob").value;
    country = document.getElementById("countrySelect").value;
    relationship = document.getElementById("userrelationship").value;
  }else{
    name = document.getElementById("name").value;
    gender = document.getElementById("gender").value;
    dob = document.getElementById("dob").value;
    country = document.getElementById("countrySelect").value;
    relationship = document.getElementById("relationship").value;
  }

  const data = {
    name: name,
    gender: gender,
    country: country,
    dob: dob,
    relationship: relationship,
  };
  try {
    console.log(data);

    const response = await fetch(
      `http://localhost:8000/api/user/saveinfo/${status}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
  dynamicactive(num);
}
