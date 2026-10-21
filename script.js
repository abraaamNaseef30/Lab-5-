// ---------- 1. Read input from the form into a User object ----------
function readUser() {
  return {
    firstName: document.getElementById("firstName").value.trim(),
    lastName:  document.getElementById("lastName").value.trim(),
    email:     document.getElementById("email").value.trim(),
    password:  document.getElementById("password").value,
    dob:       document.getElementById("dob").value
  };
}

// ---------- 2. Replace the password with the same number of asterisks ----------
function maskPassword(user) {
  user.password = "*".repeat(user.password.length);
}

// ---------- 3. Validation ----------
// Returns a list of problems. An empty list means the registration is valid.
function validate(user) {
  const errors = [];

  // a. All fields must be present
  const labels = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    password: "Password",
    dob: "Date of birth"
  };
  for (const key in labels) {
    if (user[key] === "") {
      errors.push(labels[key] + " is required.");
    }
  }

  // b. Password must contain a special character (! or ?)
  //    (checked on the real password, before it is masked)
  if (user.password !== "" && !/[!?]/.test(user.password)) {
    errors.push("Password must contain a special character (! or ?).");
  }

  return errors;
}

// ---------- 4. Write the outcome to the DOM ----------
function showResult(user, errors) {
  const result = document.getElementById("result");
  result.innerHTML = "";

  const box = document.createElement("div");

  const heading = document.createElement("h2");
  heading.className = "h3 mb-3";

  if (errors.length > 0) {
    // Failed
    heading.textContent = "Registration failed";
    box.appendChild(heading);

    const intro = document.createElement("p");
    intro.textContent = "Fix the following and try again:";
    box.appendChild(intro);

    const list = document.createElement("ul");
    errors.forEach(function (msg) {
      const li = document.createElement("li");
      li.textContent = msg;
      list.appendChild(li);
    });
    box.appendChild(list);
  } else {
    // Success: show everything from the User object
    heading.textContent = "Registration successful";
    box.appendChild(heading);

    const intro = document.createElement("p");
    intro.textContent = "Welcome to Windowsill, " + user.firstName + ". Here is what we have on file:";
    box.appendChild(intro);

    const dl = document.createElement("dl");
    dl.className = "mb-0";

    const rows = [
      ["First name", user.firstName],
      ["Last name", user.lastName],
      ["Email address", user.email],
      ["Password", user.password],
      ["Date of birth", user.dob]
    ];
    rows.forEach(function (row) {
      const dt = document.createElement("dt");
      dt.textContent = row[0];
      const dd = document.createElement("dd");
      dd.textContent = row[1];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    box.appendChild(dl);
  }

  result.appendChild(box);
}

// ---------- Wire it all together ----------
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const user = readUser();       // read into User object
  const errors = validate(user); // validate (needs the real password)
  maskPassword(user);            // password -> asterisks
  showResult(user, errors);      // write to the DOM
});