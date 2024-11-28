import { MenuItem } from "@/components/MenuItem";

const MenuList = () => {

  const menuItems = [
    {
      id: 1,
      name: 'discount',
      link: 'https://cf32141.redcart.pl/promocje',
      subItems: [
        {
          id: 3,
          name: 'last 7 days',
          link: 'https://cf32141.redcart.pl/7dni',
          subItems: []
        },
        {
          id: 4,
          name: 'Best books',
          link: 'https://cf32141.redcart.pl/najlepsze',
          subItems: [
            {
              id: 5,
              name: 'last 7 days',
              link: 'https://cf32141.redcart.pl/7dni',
              subItems: [        {
                id: 3,
                name: 'last 7 days',
                link: 'https://cf32141.redcart.pl/7dni',
                subItems: []
              },]
            },
          ]
        },
        {
          id: 6,
          name: 'Light weight!',
          link: 'https://cf32141.redcart.pl/7dni',
          subItems: []
        },
      ],
    },
    {
      id: 2,
      name: 'What to do',
      link: 'https://www.forbes.pl/diamenty',
      subItems: [],
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>
      <button
        className="bg-purple-600 text-white py-2 px-4 rounded mb-4"
      >
        {'Add menu item'}
      </button>
      <ul className='flex flex-col gap-4'>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item}/>
      ))}
    </ul>
</div>
)
  ;
};

export {MenuList};
