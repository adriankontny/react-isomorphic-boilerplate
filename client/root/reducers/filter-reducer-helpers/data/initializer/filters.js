
const category = {
    label: "Category",
    labelDropdown: "Category",
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
        labelDropdown: "Subcategory",
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
        labelDropdown: "Subcategory",
      },
    ],
  }
  