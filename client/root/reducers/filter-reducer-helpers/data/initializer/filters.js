
const category = {
    label: "Category",
    labelCategories: "Category",
    filters: [
      {
        label: "Price",
        field: "price",
        type: "filter"
      },
    ],
    items: [
      {
        label: "All",
      },
      {
        label: "Automotive",
        labelCategories: "Subcategory",
        items: [
          {
            label: "All",
          },
          {
            label: "Cars",
            filters: [
              {
                label: "Milage",
                field: "milage",
                type: "filter"
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
  