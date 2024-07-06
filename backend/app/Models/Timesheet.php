<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timesheet extends Model
{
    protected $fillable = [
        'name', 'pay_rate', 'pay_type', 'user_id', 'check_date',
    ];
    use HasFactory;
}
