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
                  value: 0,
                  label: "ABS",
                  field: "abs",
                },{
                  value: 1,
                  label: "ESP",
                  field: "esp",
                },{
                  value: 2,
                  label: "Steering Assistance",
                  field: "sa",
                },{
                  value: 3,
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