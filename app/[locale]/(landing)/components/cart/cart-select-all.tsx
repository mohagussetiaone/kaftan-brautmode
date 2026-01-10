import { useCart } from "@/app/stores/cart.store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CartSelectAll = () => {
  const { selectedItems, toggleSelectAll, isAllSelected, removeSelectedItems } = useCart();

  const handleToggleSelectAll = () => {
    toggleSelectAll();
  };

  const handleRemoveSelected = () => {
    removeSelectedItems();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox checked={isAllSelected()} onCheckedChange={handleToggleSelectAll} id="select-all" />
        <Label htmlFor="select-all">Select all items</Label>
      </div>

      {selectedItems.length > 0 && (
        <Button variant="ghost" size="sm" className="text-red-600 p-0 hover:text-red-700 hover:bg-red-50" onClick={handleRemoveSelected}>
          Remove selected ({selectedItems.length})
        </Button>
      )}
    </div>
  );
};

export default CartSelectAll;
