$(document).ready(function () {
  var settings = {
    url: "https://dummyjson.com/products?limit=100",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    var jsonData = response;

    $("#tabPanel").dxTabPanel({
      items: [
        {
          title: "Active Forms",
          icon:"floppy",
          template: function () {
            return $("#dataGrid").dxDataGrid({
              dataSource: jsonData.products,
              keyExpr: "id",
              showRowLines: true,
              rowAlternationEnabled: true,
              showBorders: true,
              columns: [
                { dataField: "id", dataType: "number", width: 50 },
                "title",
                "brand",
                "category",
                { dataField: "description", width: 450 },
                { dataField: "rating", dataType: "number" },
                { dataField: "price", dataType: "number" },
                { dataField: "discountPercentage", dataType: "number" },
                { dataField: "stock", dataType: "number" },
                {
                  dataField: "icon",
                  caption: "",
                  width: 40,
                  allowFiltering: false,
                  allowSorting: false,
                  cellTemplate(container, options) {
                    var iconElement = $("<div>")
                      .html('<i class="fa fa-eye" aria-hidden="true"></i>')
                      .css("cursor", "pointer")
                      .appendTo(container);
                    iconElement.on("click", function () {
                      var data = options.data;
                      if (data) {
                        window.location.href = "addProd.html?id=" + data.id;
                      }
                    });
                  },
                },
              ],
              allowColumnReordering: true,
              allowColumnResizing: true,
              filterRow: { visible: true },
              searchPanel: { visible: true },
              selection: { mode: "single" },
              onRowPrepared: function (e) {
                var timer;
                $(e.rowElement)
                  .on("dxdblclick", function () {
                    clearTimeout(timer);
                    const data = e.data;
                    if (data) {
                      window.location.href = "addProd.html?id=" + data.id;
                    }
                  })
                  .on("click", function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {}, 300);
                  });
              },
            });
          },
        },
        {
          title: "History",
          icon:"comment",
          template: function () {
          },
        },
      ],
    });
  });

  const data = [
    "automotive",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "laptops",
    "lighting",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "motorcycle",
    "skincare",
    "smartphones",
    "sunglasses",
    "tops",
    "women-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  var category = null;

  $("#selectBox").dxSelectBox({
    dataSource: data,
    searchEnabled: true,
    placeholder: "Select Category....",
    showClearButton: true,
    onValueChanged: function (e) {
      category = e.value;
    },
  });

  $("#Add").on("click", function () {
    if (category) {
      window.location.href =
        "addProd.html?category=" + encodeURIComponent(category);
    } else {
      console.log("No data selected.");
    }
  });
});
