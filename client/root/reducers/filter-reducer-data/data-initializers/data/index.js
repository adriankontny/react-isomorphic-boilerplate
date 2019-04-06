export default {
    label: "Category",
    labelCategories: "Category",
    filters: [
      {
        type: "range",
        label: "Price",
        field: "price",
      },
    ],
    categories: [
      {
        label: "Automotive",
        labelCategories: "Subcategory",
        categories: [
          {
            label: "Cars",
            labelCategories: "Subcategory",
            categories: [
              {
                label: "Sedan",
              },
              {
                label: "SUV",
              }
            ],
            filters: [
              {
                label: "Extras",
                field: "extras",
                type: "multiselect",
                items: [{
                  label: "ABS",
                  field: "abs",
                },{
                  label: "ESP",
                  field: "esp",
                },{
                  label: "Steering Assistance",
                  field: "sa",
                },{
                  label: "Bluetooth",
                  field: "bt",
                }]
              }
            ]
          },
          {
            label: "Bikes",
          },
        ]
      },
      {
        label: "Real Estate",
        labelCategories: "Subcategory",
      },
    ],
  }