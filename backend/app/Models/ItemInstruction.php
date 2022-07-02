<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemInstruction extends Model
{
    public static function saveInstances($instructions, $itemId)
    {
        $itemInstructions = [];
        foreach ($instructions as $instruction) {

            $itemInstructions[] = [
                'item_id'           => $itemId,
                'instruction_id'    => $instruction['id'],
            ];
        }

        self::insert($itemInstructions);
    }
}
