<?php

namespace App\Http\Controllers;

use App\Models\Translation;
use Illuminate\Http\Request;

class GenericController extends Controller
{
    public function translation(Request $request)
    {
        $lang = $request->get('lang');
        $collection = Translation::where('lang', $lang)->get();

        $keyed = $collection->mapWithKeys(function ($item) {
            return [$item['name'] => $item['value']];
        });

        return response($keyed, 200);
    }
}
