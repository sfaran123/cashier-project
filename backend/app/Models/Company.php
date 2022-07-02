<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends BaseModel
{
	public static function createInstance($values, $companyId)
	{
		$company = new self();
		$company->fill($values);
		$company->company_id = $companyId;
		if ($company->save()) {
			return $company;
		}

		return false;
	}

	public function updateInstance($values)
	{
		$this->fill($values);
		return $this->update();
	}
}
