const profilePage = function () {
  return `
        <section class="profile-container">
            <h2>Your profile</h2>
            <form class="user-data" id="user-form" method="POST" action="/" encType="multipart/form-data">
                <div class="picture-container">
                    <img id="profile-picture" src="/public/profile_picture_placeholder.jpg" alt="Profile picture">
                    <div>
                        <label id="photo-icon" for="picture-file"></label>
                        <input id="picture-file" type="file" name="picture" value="Upload" required/>
                    </div>
                </div>
                <div id="info-container"></div>
                <label for="introduction">Introduction</label>
                <textarea name="introduction" id="introduction" cols="30" rows="5" placeholder="Write something here about yourself..."></textarea>
                <label for="first-name">First Name</label>
                <input type="text" name="firstName" id="first-name" placeholder="John">
                <label for="surname">Surname</label>
                <input type="text" name="surname" id="surname" placeholder="Doe">
                <div class="address">
                    <label for="city">City</label>
                    <input type="text" name="city" id="city" placeholder="Wondercity">
                    <label for="street">Street</label>
                    <input type="text" name="street" id="street" placeholder="Sunny Street">
                    <label for="house">House Number</label>
                    <input type="text" name="houseNumber" id="house" placeholder="1">
                    <label for="country">Country</label>
                    <input type="text" name="country" id="country" placeholder="Imaginary Land">
                    <label for="zip">Zip Code</label>
                    <input type="text" name="zipCode" id="zip" placeholder="1234">
                    </div>
                    <div class="buttons">
                        <button id="save-btn" type="submit">Save</button>
                        <button id="delete-btn" type="reset">Delete</button>
                    </div>
                </form>
        </section>
    `;
};

//show picture as avatar

const showPictureAsAvatar = function () {
  const profilePicCont = document.querySelector(".picture-container");
  const profilePic = document.querySelector("#profile-picture");
  const fileForUpload = document.querySelector("#picture-file");
  const uploadBtn = document.querySelector("#photo-icon");

  fileForUpload.addEventListener("change", function () {
    const selectedPhoto = fileForUpload.files[0];

    if (selectedPhoto) {
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        profilePic.setAttribute("src", reader.result);
      });

      reader.readAsDataURL(selectedPhoto);
    }
  });
};

//submit
const submitFetch = (object) => {
  fetch("/", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: object,
  }).then((res) => {
    let infoContainer = document.getElementById("info-container");

    if (res.ok) {
      infoContainer.setAttribute("class", "success");
      notifyUser("Profile saved");
    } else {
      infoContainer.setAttribute("class", "error");
      notifyUser("Error during save");
    }
  });
};

//delete
const deleteFetch = (event) => {
  let infoContainer = document.getElementById("info-container");

  fetch("/", {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      let uploadedPicture = document.getElementById("profile-picture");
      uploadedPicture.setAttribute(
        "src",
        "/public/profile_picture_placeholder.jpg"
      );
      infoContainer.setAttribute("class", "success");
      notifyUser("Profile deleted");
    } else {
      infoContainer.setAttribute("class", "error");
      notifyUser("Error during delete");
    }
  });
};

const notifyUser = function (message) {
  let infoContainer = document.getElementById("info-container");
  infoContainer.innerHTML = message;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const loadEvent = async function () {
  const rootElement = document.getElementById("root");
  rootElement.insertAdjacentHTML("beforeend", profilePage());

  showPictureAsAvatar();

  const submitForm = document.getElementById("user-form");
  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(submitForm);

    submitFetch(formData);
  });

  submitForm.addEventListener("reset", deleteFetch);
};

window.addEventListener("load", loadEvent);
