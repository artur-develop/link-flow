import {MenuItemContent} from "@/components/MenuItem/MenuItemContent";
import {MenuItem as MenuItemType} from "@/types";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem = ({ item }: MenuItemProps) => {

  return (
    <div className="rounded-lg border-t border-l border-r">
      <MenuItemContent
        item={item}
      />
    </div>
  );
};

export {MenuItem};
