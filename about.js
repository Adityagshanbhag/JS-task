$(document).ready(function () {
  function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  var idValue = getUrlParameter("id");
  var fetchItem = {
    url: "https://dummyjson.com/products/" + String(idValue),
    method: "GET",
    timeout: 0,
  };
  $.ajax(fetchItem).done(function (jsonData) {
    console.log(jsonData);
    function populateTable() {
      var tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";
      var thumbnailContainer = document.getElementById("thumbnailContainer");
      var pageTitle = document.getElementById("pageTitle");
      if (typeof jsonData === "object" && jsonData !== null) {
        var thumbnailUrl = jsonData["thumbnail"];
        var keysToExclude = ["thumbnail", "images"];
        var thumbnailImage = document.createElement("img");
        thumbnailImage.src = thumbnailUrl;
        thumbnailImage.alt = "Thumbnail";
        thumbnailContainer.appendChild(thumbnailImage);
        pageTitle.textContent = jsonData["title"];
        Object.entries(jsonData).forEach(function ([key, value]) {
          if (!keysToExclude.includes(key)) {
            var row = document.createElement("tr");
            var keyCell = document.createElement("td");
            var valueCell = document.createElement("td");
            keyCell.textContent = key;
            valueCell.textContent = value;
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            tableBody.appendChild(row);
          }
        });
      } else {
        console.error("Invalid JSON data format. Expected an object.");
      }
    }
    populateTable();
  });
});
