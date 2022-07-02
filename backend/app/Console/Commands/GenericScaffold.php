<?php

namespace App\Console\Commands;

use App\Console\Services\ScaffoldManager\ScaffoldManager;
use Illuminate\Console\Command;

class GenericScaffold extends Command
{
    protected $signature = 'scaffold {model}';

    protected $description = 'Sets up Controller, Model, Resource, DataTableMapper, RequestMapper and more';

    public function handle()
    {
		ScaffoldManager::getInstance()->scaffold($this->argument('model'));

        return 0;
    }
}
