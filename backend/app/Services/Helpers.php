<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use DateTime;

class Helpers
{
    const TCPDF_PAGE_HEIGHT = 297;

    public static function getAppVersion()
    {
        return config('app.version.major') . '.' . config('app.version.minor') . '.' . config('app.version.patch');
    }

    public static function getFullAppVersion()
    {
        return self::getAppVersion() . '.' . config('app.version.fix');
    }

    public static function getAppVersionHotfix()
    {
        return config('app.version.fix');
    }

    public static function checkFileNameOverride($source, $fileName)
    {
        $files = [];

        if (is_array($source)) {
            $files = $source;
        } else {
            foreach (Storage::files($source) as $file) {
                $files[] = basename($file);
            }
        }

        if (count($files) === 0) {
            return $fileName;
        }

        if (in_array($fileName, $files)) {
            $pieces = explode('.', $fileName);

            $number = 1;

            foreach ($files as $file) {

                if (strpos($file, $pieces[0]) === 0 && strpos($file, '(')) {
                    $number = (int)substr($file, strpos($file, '(') + 1, 1) + 1;
                }
            }

            if (isset($pieces[1])) {
                return $pieces[0] . ' (' . $number . ')' . '.' . $pieces[1];
            }

            return $pieces[0] . ' (' . $number . ')';
        }

        return $fileName;
    }

    public static function toChunks(array $array)
    {
        if (!$array) {
            return false;
        }

        $collection = collect($array);
        return $collection->chunk(self::getChunkSize($array));
    }

    public static function getChunkSize(array $array)
    {
        if (!$array) {
            return false;
        }

        $columns = count(collect($array)->first());
        $chunkSize = config('constants.mysql.chunkSize');

        return floor($chunkSize / $columns);
    }

    public static function massInsert($model, array $array)
    {
        if (!$array) {
            return true;
        }

        $chunks = Helpers::toChunks($array);
        $model = 'App\Models\\' . $model;

        DB::beginTransaction();
        foreach ($chunks as $chunk) {
            if (!$model::insert($chunk->toArray())) {
                DB::rollBack();
                return false;
            }
        }

        DB::commit();
        return true;
    }


    public static function validateEmail($value)
    {
        if (!$value) {
            return false;
        }

        $value = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $value);

        $regex = '/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD';
        return (bool)preg_match($regex, $value);
    }

    public static function validateIsraeliID($id)
    {
        $r_not_valid = false;
        $r_valid = true;

        if (!$id) {
            return $r_not_valid;
        }

        $IDnum = preg_replace('/\s+/', '', strval($id));

        if (!ctype_digit($IDnum)) {
            return $r_not_valid;
        }
        if ((strlen($IDnum) > 9) || (strlen($IDnum) < 5)) {
            return $r_not_valid;
        }


        $mone = 0;
        for ($i = 0; $i < 9; $i++) {
            $char = mb_substr($IDnum, $i, 1);
            $incNum = intval($char);
            $incNum *= ($i % 2) + 1;
            if ($incNum > 9)
                $incNum -= 9;
            $mone += $incNum;
        }

        if ($mone % 10 == 0)
            return $r_valid;
        else
            return $r_not_valid;
    }

    public static function getDirContents($dir)
    {
        if (!is_dir($dir)) {
            return false;
        }

        return array_values(array_diff(scandir($dir), ['.', '..']));
    }

    public static function fillIDNumber($number, $length = 9)
    {
        return $number ? (string)str_pad($number, $length, 0, STR_PAD_LEFT) : null;
    }

    public static function formatApiSignature($signature)
    {
        return urlencode(base64_encode(file_get_contents($signature)));
    }

    public static function decodeBase64($string)
    {
        return base64_decode(substr($string, strpos($string, 'base64,') + 7));
    }

    public static function cutString($string, $charCount)
    {
        $splited = str_split($string, $charCount);
        return $splited[0] . '...';

    }

    public static function utf8_strrev($str, $addSpace = true)
    {
        if (1 === preg_match('~[0-9]~', $str)) {
            $str = preg_replace('/(\d+)/', ' ${1} ', $str);
        }

        $words = [];
        foreach (explode(' ', $str) as $index => $word) {
            $rtlCharsPattern = '/[\x{0590}-\x{05ff}\x{0600}-\x{06ff}]/u';
            if (preg_match($rtlCharsPattern, $word)) {
                preg_match_all('/./us', $word, $ar);

                /*
                    TODO: remove this from function, don't attach an unrelated function to another one
                */

                $word = self::flipWord($ar[0]);
            }

            array_push($words, $word);
        }

        $space = $addSpace ? ' ' : '';
        return implode($space, array_reverse($words));
    }

    public static function flipWord($wordAsArray)
    {
        for ($i = 0; $i < count($wordAsArray); $i++) {
            switch ($wordAsArray[$i]) {
                case '(':
                    $wordAsArray[$i] = ')';
                    break;
                case ')':
                    $wordAsArray[$i] = '(';
            }
        }

        return implode(array_reverse($wordAsArray));
    }


//    public static function reverseBySlash($str)
//    {
//        $words = [];
//
//        foreach (explode( '/', $str) as $index => $word) {
//            array_push($words, $word);
//            if ($index != 0 && $index % 2 === 0) {
//                array_push($words, '/');
//            }
//        }
//
//        return implode(array_reverse($words));
//    }


    public static function makeCurlCall($values, $url, $httpHeaders = [])
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeaders);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $values);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }

    public static function collectDeep($array)
    {
        if (is_array($array)) {
            $array = collect($array);
            foreach ($array as $key => $value) {
                $array[$key] = self::collectDeep($value);
            }
        }

        return $array;
    }

    public static function isRtl($string)
    {
        $rtl_chars_pattern = '/[\x{0590}-\x{05ff}\x{0600}-\x{06ff}]/u';
        return preg_match($rtl_chars_pattern, $string);
    }

    public static function reformatDate($date, $originalFormat = 'd/m/Y', $format = 'Y-m-d', $tryReformatExcelDate = false)
    {
        $d = DateTime::createFromFormat($originalFormat, $date);

        if (!$d && $tryReformatExcelDate) {
            $date = Date::excelToDateTimeObject($date);
            return self::reformatDate($date->format('d/m/Y'));
        }
        if ($d) {
            $dateString = $d->format($format);
            return $dateString;
        }

        return false;
    }


    public static function deepCamelCaseToSnakeCase($data)
    {
        array_walk($data, function ($value, $key) use (&$formattedArray) {
            if (is_array($value)) {
                $value = Helpers::deepCamelCaseToSnakeCase($value);
            }
            $formattedKey = Helpers::camelCaseToSnakeCase($key);
            $formattedArray[$formattedKey] = $value;
        });

        return $formattedArray;
    }


    public static function camelCaseToSnakeCase($string)
    {
        if (preg_match('/[A-Z]/', $string) === 0) {
            return $string;
        }

        if ($string === 'IDNumber') {
            $string = preg_replace('/\B([N])/', '_$1', $string);
            $string = strtolower($string);
            $string = strtoupper(substr(strtolower($string), 0, 2)) . substr($string, 2);
        } else {
            $string = preg_replace('/\B([A-Z])/', '_$1', $string);
            $string = strtolower($string);
        }

        return $string;
    }

    public static function snakeCaseToCamelCase($string, $capitalizeFirstCharacter = false)
    {
        if (substr_count($string, '_') > 0) {
            $str = str_replace('_', '', ucwords($string, '_'));
            if (!$capitalizeFirstCharacter) {
                $str = lcfirst($str);
            }
            return $str;
        }
        return $string;
    }

    public static function dataTableResponse($paginator, $class)
    {
        if ($paginator instanceof LengthAwarePaginator) {
            return response([
                'items'     => $class::collection($paginator->items()),
                'total'     => $paginator->total(),
                'lastPage'  => $paginator->lastPage()
            ], 200);
        }

        return response(['items' => $class::collection($paginator)], 200);
    }

    public static function parseSecondsToTime($seconds)
    {
        if ($seconds < 0) {
            return '00:00';
        }
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds / 60) % 60);
//        $seconds = floor(($seconds % 3600) % 60);

        $hours = ($hours / 10) >= 1 ? (string)$hours : '0' . $hours;
        $minutes = ($minutes / 10) >= 1 ? (string)$minutes : '0' . $minutes;
//        $seconds = ($seconds / 10) >= 1 ? (string)$seconds : '0' . $seconds;

        return $hours . ':' . $minutes;

    }

    public static function parseSecondsToDecimalNumber($seconds)
    {
        return round($seconds / 3600, 2);
    }

    public static function encodeBase64($path)
    {
        return 'data:' . Storage::mimeType($path) . ';base64,' . base64_encode(Storage::get($path));
    }

    public static function timeInSeconds($time)
    {
        return Carbon::parse($time)->secondsSinceMidnight();
    }

    public static function storeUploadFile(UploadedFile $file, $path, $fileName = null)
    {
        $fileSize = $file->getSize();
        if ($fileSize > 1) {
            $originFileName = $file->getClientOriginalName();
            $fileName = !$fileName ? date_timestamp_get(Carbon::now()) . '_' . $originFileName : $fileName;
            $file = file_get_contents($file);
            return self::storeFile($file, $path, $fileName, $fileSize);
        }
        return false;
    }

    public static function storeStringFile(string $file, $path, $fileName = null)
    {
        $fileSize = mb_strlen($file, '8bit');
        if ($fileSize > 1) {
            $fileName = !$fileName ? date_timestamp_get(Carbon::now()) : $fileName;
            return self::storeFile($file, $path, $fileName, $fileSize);
        }
        return false;
    }

    private static function storeFile(string $file, string $path, string $fileName, int $fileSize)
    {
        if (Storage::put($path . '/' . $fileName, $file)) {
            $savedFileSize = Storage::size($path . '/' . $fileName);
            if ($savedFileSize === $fileSize) {
                return $fileName;
            } else {
                Storage::delete($path . '/' . $fileName);
            }
        }
        return false;
    }


//    public static function storeFile(UploadedFile $file, $path, $fileName = null)
//    {
//
//        $fileSize = $file->getSize();
//        if ($fileSize > 1) {
//            $originFileName = $file->getClientOriginalName();
//            $fileName = !$fileName ? date_timestamp_get(Carbon::now()) .'_'.$originFileName : $fileName;
//            if (Storage::put($path . '/' . $fileName, file_get_contents($file))) {
//                $savedFileSize = Storage::size($path . '/' . $fileName);
//                if ($savedFileSize === $fileSize) {
//                    return $fileName;
//                } else {
//                    Storage::delete($path . '/' . $fileName);
//                }
//            }
//        }
//
//        return false;
//    }

    public static function diffInSeconds($startTime, $endTime)
    {
        return Carbon::parse($startTime)->diffInSeconds($endTime);
    }


    public static function zeroPad($string, $length)
    {
        return str_pad($string, $length, '0', STR_PAD_LEFT);
    }
}
