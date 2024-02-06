$(document).ready(function () {
  function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  var itemCategory = getUrlParameter("category");
  console.log(itemCategory);

  var employee = {
    id: "",
    title: "",
    brand: "",
    category: itemCategory,
    description: "",
    rating: "",
    price: "",
    discountPercentage: "",
    stock: "",
  };

  $("#form").dxForm({
    formData: employee,
    items: [
      {
        itemType: "group",
        caption: "Claims Legal Tracking Form",
        colCount: 1,
        items: [
          {
            dataField: "category",
            caption: "Category",
            editorOptions: {
              disabled: true,
            },
          },
          {
            dataField: "id",
            caption: "ID",
            isRequired: true,
            validationRules: [
              {
                type: "numeric",
                message: "Enter an integer",
              },
            ],
          },
          {
            dataField: "title",
            caption: "Title",
            isRequired: true,
          },
          {
            dataField: "brand",
            caption: "Brand",
            isRequired: true,
          },
          {
            dataField: "description",
            caption: "Description",
          },
          {
            dataField: "rating",
            caption: "Rating",
            isRequired: true,
            validationRules: [
              {
                type: "numeric",
                message: "Enter a numeric value",
              },
            ],
          },
          {
            dataField: "price",
            caption: "Price",
            isRequired: true,
            validationRules: [
              {
                type: "numeric",
                message: "Enter a numeric value",
              },
            ],
          },
          {
            dataField: "discountPercentage",
            caption: "Discount Percentage",
            isRequired: true,
            validationRules: [
              {
                type: "numeric",
                message: "Enter a numeric value",
              },
            ],
          },
          {
            dataField: "stock",
            caption: "Stock",
            isRequired: true,
            validationRules: [
              {
                type: "numeric",
                message: "Enter an integer",
              },
            ],
          },
          {
            itemType: "button",
            buttonOptions: {
              text: "Submit the Form",
              useSubmitBehavior: false,
              onClick: function (e) {
                e.event.preventDefault();
                var formInstance = $("#form").dxForm("instance");
                var formData = formInstance.option("formData");
                console.log("Form Data:", JSON.stringify(formData));
                setTimeout(function () {
                  alert("Submitted");
                }, 500);
              },
            },
          },
        ],
      },
    ],
  });
});
