export default {
  label: 'Category',
  field: 'category',
  filters: [
    {
      type: 'range',
      label: 'Price',
      field: 'price',
    },
  ],
  categories: [
    {
      label: 'Automotive',
      field: 'automotive',
      categories: [
        {
          label: 'Cars',
          field: 'cars',
          categories: [
            {
              label: 'Sedan',
              field: 'sedan',
            },
            {
              label: 'SUV',
              field: 'suv',
            },
          ],
          filters: [
            {
              label: 'Extras',
              field: 'extras',
              type: 'multiselect',
              items: [{
                label: 'ABS',
                field: 'abs',
              }, {
                label: 'ESP',
                field: 'esp',
              }, {
                label: 'Steering Assistance',
                field: 'sa',
              }, {
                label: 'Bluetooth',
                field: 'bt',
              }],
            },
          ],
        },
        {
          label: 'Bikes',
          field: 'bikes',
        },
      ],
    },
    {
      label: 'Real Estate',
      field: 'real-estate',
    },
  ],
};
