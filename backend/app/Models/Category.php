<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class Category extends BaseModel
{

    public function subCategories()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public static function saveInstance($fields, $subCategories)
    {
        $model = new self;
        $model->fill($fields);

        return DB::transaction(function () use ($model, $fields, $subCategories) {
            $model->save();

            if ($subCategories) {
                $model->saveSubCategories($subCategories);
            }

            return $model->id;
        });
    }

    private function saveSubCategories($subCategories)
    {
        $insertData = [];
        foreach ($subCategories as $subCategory) {
            $subCategory = collect($subCategory);
            $data = [
                'parent_id' => $this->id,
                'name'      => $subCategory->get('name'),
                'number'    => $subCategory->get('number')
            ];

            $insertData[] = $data;
        }

        self::insert($insertData);
    }

    public function updateInstance($fields, $subCategories)
    {
        return DB::transaction(function () use ($fields, $subCategories) {
            $this->update($fields);

            self::where('parent_id', $this->id)->delete();
            $this->saveSubCategories($subCategories);
        });
    }
}
