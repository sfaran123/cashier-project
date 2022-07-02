<?php


namespace App\Services\Excel\Items;


use App\Models\Category;
use App\Models\Supplier;

class InsertRelated
{
    private $suppliers;
    private $suppliersToSave;

//    private $subCategories;
    private $subCategoriesToSave;

//    private $categories;
    private $categoriesToSave;

    private $relatedFields = ['main_category_id', 'sub_category_id', 'supplier_id'];

    private $items;

    public function __construct($items)
    {
        $this->getAllRelatedRecords();
        $this->relatedFields = collect($this->relatedFields);
        $this->items = $items;

        $this->t();
    }

    public static function insert($items)
    {
        return new self($items);
    }

    private function t()
    {
        foreach ($this->items as $itemIndex => $item) {
            foreach ($this->relatedFields as $field) {
                if ($item[$field]) {
                    $index = $this->suppliers->get('names')->find($item[$field]);
//                    $alreadyExists = $this->suppliersToSave->find($item[$field]);
                    if ($index) {
                        $item[$field] = $this->suppliers->get('ids')[$index];
                    } else {
                        $this->pushToRelatedArray($item[$field], $field, $itemIndex);
                    }
                }
            }
        }
    }

    private function pushToRelatedArray($value, $field, $itemIndex)
    {
        switch ($field) {
            case 'supplier_id':
                $this->suppliersToSave[$itemIndex][$field] = ['name' => $value];
                break;
            case 'main_category_id':
                $this->categoriesToSave[$itemIndex][$field] = ['name' => $value];
                break;
            case 'sub_category_id':
                $this->subCategoriesToSave[$itemIndex][$field] = ['name' => $value];
        }
    }

    private function getAllRelatedRecords()
    {
        $categories = Category::all();
        $this->categories = collect([
            'names' => collect($categories->pluck('name')),
            'ids' => collect($categories->pluck('id'))
        ]);

        $subCategories = SubCategory::all();
        $this->subCategories = collect([
            'names' => $subCategories->pluck('name'),
            'ids' => $subCategories->pluck('id')
        ]);

        $suppliers = Supplier::all();
        $this->suppliers = collect([
            'names' => collect($suppliers->pluck('name')),
            'ids' => collect($suppliers->pluck('id'))
        ]);
    }
}
