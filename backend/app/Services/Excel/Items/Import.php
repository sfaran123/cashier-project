<?php

namespace App\Services\Excel\Items;

use App\Models\Item;
use Maatwebsite\Excel\Concerns\ToArray;
use Maatwebsite\Excel\Concerns\WithMapping;

class Import implements WithMapping, ToArray
{
    private $relatedToStore = ['main_category_id', 'sub_category_id', 'supplier_id'];

    private $columns = [
            'code', 'description', 'customer_price',
            'cost_in_store', 'cost_price', 'cost_price_discount', 'includes_vat', 'main_category_id',
            'sub_category_id', 'supplier_id', 'supplier_item_code',
            'is_weighable', 'is_taxed', 'is_rename_enabled', 'is_additional_percentage',
            'is_inventory_manager', 'allow_price_zero', 'is_extra',
            'not_discountable', 'is_locked_for_sale', 'requires_manager'
    ];

    private  $columnsToValidate = ['code', 'description', 'customer_price'];

    private $errorsCodes = [
        1 => 'FIELD_ID_REQUIRED',
        2 => 'CODE_EXISTS'
    ];

    private $rows = [];

    private $errors = [];

    private $instancesToSave = [];

    private $rowNumber = 1;

    private $isFirstRow = true;

    private $categoryId = null;

    private $existingCodes = [];

    public function map($row): array
    {
        if ($this->isFirstRow) {
            $this->isFirstRow = false;
            return [];
        }

        $rowToInsert = [];

        foreach ($this->columns as $index => $col) {
            $value = $row[$index];

            if ($this->relatedToStore->contains($col) && $value) {
                $rowToInsert[$col] = $this->addFromDb($col, $value);
            } else {
                $rowToInsert[$col] = $value;
            }

            if ($this->columnsToValidate->contains($col)) {
                if (!$this->validate($col, $value)) {
                    $this->rowNumber++;
                    return [];
                }
            }
        }

        $this->rowNumber++;
        return $rowToInsert;
    }

    public function array(array $rows)
    {
        if (!$this->rows) {
            $this->rows = $rows;
            array_splice($this->rows, 0, 1);
        }
    }

    public function setInitialData()
    {
        $this->existingCodes = Item::all()->pluck('code');

        $this->instancesToSave = collect();
        $this->relatedToStore = collect($this->relatedToStore);
        $this->columnsToValidate = collect($this->columnsToValidate);
        $this->errors = collect();
    }

    private function addFromDb($col, $value)
    {
        switch ($col) {
            case 'main_category_id':
                $this->categoryId = $this->getOrCreate('Category', $value);
                return $this->categoryId;

            case 'sub_category_id':
                // replace with category
                $id = $this->getOrCreate('SubCategory', $value, $this->categoryId);
                $this->categoryId = null;
                return $id;

            case 'supplier_id':
                return $this->getOrCreate('Supplier', $value);

            default: return null;
        }
    }

    private function getOrCreate($modelName, $value, $masterId = null)
    {
        $this->instancesToSave->push([
            'model' => 'Category',
            'name'  => $value
        ]);

        $model = 'App\Models\\' . $modelName;

        if ($id = $model::where('name', $value)->value('id')) {
            return $id;
        } else {
            if ($masterId) {
                return $model::saveInstance(['name' => $value], $masterId);
            }

            return $model::saveInstance(['name' => $value]);
        }
    }

    public function insertRows()
    {
        $rowsToInsert = collect($this->rows)->filter(function ($row) {
            return !empty($row);
        });

//        InsertRelated::insert($rowsToInsert);
        Item::insert($rowsToInsert->toArray());

        if ($this->errors->count() > 0) {
            return $this->errors;
        }
    }

    public function validate($col, $value): bool
    {
        $errorCode = null;

        if (!$value) {
            $errorCode = 1;

        } elseif ($col === 'code' && $this->existingCodes->contains($value)) {
            $errorCode = 2;
        }

        if ($errorCode) {
            $error = ['row' => $this->rowNumber, 'error' => $this->errorsCodes[$errorCode]];
            $this->errors->push($error);
            return false;
        }

        return true;
    }
}
