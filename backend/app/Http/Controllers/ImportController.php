<?php

namespace App\Http\Controllers;

use App\Services\Excel\Items\Import;
use Illuminate\Http\Request;
//use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function example(Request $request)
    {
        $type = $request->get('type');
        $lang = $request->get('lang');

        $fileName = 'files\\'. $type .'-example.xlsx';
        $file = resource_path($fileName);

        return response(file_get_contents($file), 200)->header('Content-Type', 'application/xls');
    }

    public function import(Request $request)
    {
        $import = new Import;
        $import->setInitialData();
//        Excel::import($import, $request->file('file'));

        $error = $import->insertRows();

        if ($error) {
            return response(['errors' => $error], 200);
        }

        return response(['message' => 'Imported successfully.'], 200);
    }
}
