<?php

namespace App\Console\Services\ScaffoldManager;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class ScaffoldManager
{
	private static $_instance;
	private $lcModel;
	private $lcModelPlural;
	private $ucModel;

	private $platformPath;
	private $sharedPath;

	private function __construct() {}

	public static function getInstance()
	{
		if (!self::$_instance) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	public function scaffold($model)
	{
		$this->lcModel = strtolower($model);
		$this->ucModel = ucfirst($model);
        $this->lcModelPlural = Str::plural($this->lcModel);

		$this->platformPath = config('app.client_path') . '/src/app/platform/';
		$this->sharedPath = config('app.client_path') . '/src/app/_shared/';

		$this->makeFolders();
		$this->makeFiles();

		$this->makeRoute();
	}

	private function makeFolders()
	{
		mkdir($this->platformPath . $this->lcModelPlural);
		mkdir($this->platformPath . $this->lcModelPlural . '/form');
	}

	private function makeFiles()
	{
		$sides = [
			'api' => [
				'Controller' 			=> app_path('Http/Controllers/' . $this->ucModel . 'Controller.php'),
				'Model'		 			=> app_path('Models/' . $this->ucModel . '.php'),
				'Resource'				=> app_path('Http/Resources/' . $this->ucModel . 'Resource.php'),
				'DataTableMapper'		=> app_path('Mappers/DataTable/' . $this->ucModel . 'Mapper.php'),
				'RequestMapper'			=> app_path('Mappers/Request/' . $this->ucModel . 'Mapper.php'),
				'CollectionResource'	=> app_path('Http/Resources/' . $this->lcModelPlural . 'Resource.php')
			],
			'client' => [
				'Model' 			=> $this->sharedPath . 'models/' . $this->lcModel . '.model.ts',
				'Service'		 	=> $this->sharedPath . 'services/http/' . $this->lcModel . '.service.ts',
				'Resolve'			=> $this->sharedPath . 'resolves/' . $this->lcModel . '.resolve.ts',
				'table/Module'		=> $this->platformPath . $this->lcModelPlural . '/' . $this->lcModelPlural . '.module.ts',
				'table/Component'	=> $this->platformPath . $this->lcModelPlural . '/' . $this->lcModelPlural . '.component.ts',
				'table/template'	=> $this->platformPath . $this->lcModelPlural . '/' . $this->lcModelPlural . '.component.html',
				'form/Module'		=> $this->platformPath . $this->lcModelPlural . '/form/form.module.ts',
				'form/Component'	=> $this->platformPath . $this->lcModelPlural . '/form/form.component.ts',
				'form/template'		=> $this->platformPath . $this->lcModelPlural . '/form/form.component.html',
			]
		];

		foreach ($sides as $side => $files) {
			foreach ($files as $file => $path) {
				$this->makeFile($side, $file, $path);
			}
		}
	}

	private function makeFile($type, $fileName, $path)
	{
		$content = file_get_contents(app_path('Console/Services/ScaffoldManager/assets/' . $type . '/' . $fileName . '.txt'));
		$content = str_replace('UcModel', $this->ucModel, $content);
		$content = str_replace('lcModel', $this->lcModel, $content);

		$handle = fopen($path, 'w');

		fwrite($handle, $content);
		fclose($handle);
	}

	private function makeRoute()
	{
		$routes = file_get_contents(base_path('routes/api.php'));
		$exploded = preg_split('/\r\n|\r|\n/', $routes);
		$insertAt = count($exploded) - 2;

		$exploded = array_merge(array_slice($exploded, 0, $insertAt), [
			'',
			"	Route::resource('" . $this->lcModel . "', '" . $this->ucModel . "Controller')->except('index');",
			"	Route::post('" . $this->lcModel . "/search', '" . $this->ucModel . "Controller@index');"
		], array_slice($exploded, $insertAt));

		$imploded = implode(PHP_EOL, $exploded);

		file_put_contents(base_path('routes/api.php'), $imploded);

		Artisan::call('optimize');
	}
}
