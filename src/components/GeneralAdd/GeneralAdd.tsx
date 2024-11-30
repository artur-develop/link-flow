import {useState} from "react";
import {useDispatch} from 'react-redux';
import {addMenuItem} from "@/redux/slices/menuSlice";
import {Button, AddEditForm} from "@/components";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const GeneralAdd = () => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const menuItems = useSelector((state: RootState) => state.menu.items);

  const handleAddMenuItem = () => {
    setIsAdding(prev => !prev);
  }

  const handleSaveNewItem = (newItem: { name: string; link: string }) => {
    dispatch(addMenuItem({
      item: {
        id: Date.now(),
        name: newItem.name,
        link: newItem.link,
        subItems: []
      },
      arrayIndex: menuItems.length
    }));
    setIsAdding(false);
  }

  return (
    <div className="flex flex-col gap-y-4 w-full items-center rounded-lg py-8 text-center">
        {
            menuItems.length === 0 ? 
            <div className="flex flex-col p-8 gap-y-4 w-full items-center bg-lightGray rounded-lg text-center gap-y-1">
                <h2 className="text-lg font-medium">Menu is empty</h2>
                <p className="text-gray-500">There are no menu items yet.</p>
                <Button
                    onClick={handleAddMenuItem}
                    variant="purple"
                    border={false}
                >
                    Add menu item
                </Button>
            </div> :
            <Button
                onClick={handleAddMenuItem}
                variant="purple"
                border={false}
            >
                General add menu item
            </Button>
        }

      {isAdding && (
        <AddEditForm
          onSave={handleSaveNewItem}
          onCancel={handleAddMenuItem}
        />
      )}
    </div>
  );
};

export {GeneralAdd}; 