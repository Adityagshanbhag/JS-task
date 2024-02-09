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
  var itemId = getUrlParameter("id");
  console.log(itemCategory);
  console.log(itemId);
  var employee;
  var titles;
  var jsonData;
  if (itemCategory !== null) {
    employee = {
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
    var settings = {
      url: "https://dummyjson.com/products?limit=100",
      method: "GET",
      async: false,
      timeout: 0,
    };
    $.ajax(settings).done(function (response) {
      var jData = response;
      jsonData = jData["products"];
      titles = jsonData.reduce(function (acc, curr) {
        if (curr.category == itemCategory) {
          acc.push(curr.title);
        }
        return acc;
      }, []);
    });
  }
  if (itemId !== null) {
    var fetchItem = {
      url: "https://dummyjson.com/products/" + String(itemId),
      method: "GET",
      async: false,
      timeout: 0,
    };
    $.ajax(fetchItem).done(function (jsonData) {
      employee = jsonData;
      titles = [employee["title"]];
    });
  }
  $("#form").dxForm({
    formData: employee,
    labelMode: "floating",
    items: [
      {
        itemType: "group",
        caption: "Claims Legal Tracking Form",
        colCount: 1,
        items: [
          {
            dataField: "category",
            caption: "Category",
            isRequired: true,
            editorOptions: {
              disabled: false,
            },
          },
          {
            dataField: "title",
            caption: "Product",
            isRequired: true,
            editorType: "dxSelectBox",
            editorOptions: {
              items: titles,
              searchEnabled: true,
              onValueChanged: function (e) {
                if (e.value) {
                  var selectedTitle = e.value;
                  var selectedProduct = jsonData.find(function (product) {
                    return product.title === selectedTitle;
                  });
                  if (selectedProduct) {
                    employee.id = selectedProduct.id;
                    employee.brand = selectedProduct.brand;
                    employee.description = selectedProduct.description;
                    employee.rating = selectedProduct.rating;
                    employee.price = selectedProduct.price;
                    employee.discountPercentage =
                      selectedProduct.discountPercentage;
                    employee.stock = selectedProduct.stock;
                    $("#form").dxForm("instance").option("formData", employee);
                  }
                }
              },
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
            dataField: "brand",
            caption: "Brand",
            isRequired: true,
          },
          {
            dataField: "description",
            caption: "Description",
          },
          {
            itemType: "group",
            colCount: 2,
            items: [
              {
                itemType: "group",
                items: [
                  {
                    dataField: "rating",
                    caption: "Rating",
                    isRequired: true,
                    editorType: "dxNumberBox",
                    editorOptions: {
                      dataType: "number",
                      validationRules: [
                        {
                          type: "numeric",
                          message: "Enter a numeric value",
                        },
                      ],
                      min: 0.0,
                      max: 5.0,
                    },
                  },
                  {
                    dataField: "price",
                    caption: "Price",
                    isRequired: true,
                    editorType: "dxNumberBox",
                    editorOptions: {
                      dataType: "number",
                      showSpinButtons: true,
                      validationRules: [
                        {
                          type: "numeric",
                          message: "Enter a numeric value",
                        },
                      ],
                      min: 0,
                    },
                  },
                ],
              },
              {
                itemType: "group",
                items: [
                  {
                    dataField: "discountPercentage",
                    caption: "Discount Percentage",
                    isRequired: true,
                    editorType: "dxNumberBox",
                    editorOptions: {
                      dataType: "number",
                      validationRules: [
                        {
                          type: "numeric",
                          message: "Enter a numeric value",
                        },
                      ],
                      min: 0.0,
                    },
                  },
                  {
                    dataField: "stock",
                    caption: "Stock",
                    isRequired: true,
                    editorType: "dxNumberBox",
                    editorOptions: {
                      dataType: "number",
                      showSpinButtons: true,
                      format: {
                        type: "fixedPoint",
                        precision: 0,
                      },
                      validationRules: [
                        {
                          type: "numeric",
                          message: "Enter an integer",
                        },
                      ],
                      min: 0,
                    },
                  },
                ],
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
