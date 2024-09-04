<?php

use App\Http\Controllers\Allocation\AllocatedDateController;
use App\Http\Controllers\Allocation\EmployeeAllocationController;
use App\Http\Controllers\Allocation\EmployeeTimelineController;
use App\Http\Controllers\contact\ContactController;
use App\Http\Controllers\EmployeeInduction\EmployeeInductionController;
use App\Http\Controllers\Field\FieldController;
use App\Http\Controllers\Form\FormController;
use App\Http\Controllers\Induction\InductionController;
use App\Http\Controllers\order\OrderController;
use App\Http\Controllers\project\ProjectController;
use App\Http\Controllers\Qualification\QualificationController;
use App\Http\Controllers\skill\SkillController;
use App\Http\Controllers\task\TaskController;
use Illuminate\Http\Request;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use App\Http\Controllers\Employee\EmployeeController;
use  App\Http\Controllers\User\UserController;
use \App\Http\Controllers\Client\ClientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('oauth/token', [AccessTokenController::class, 'issueToken']);
//Route::resource('users', 'User\UserController', ['only' => ['show']]);



/*
 * Employee
 */
Route::resource('employees', EmployeeController::class, ['except' => ['create', 'edit']]);
Route::name('employees')->get('employee/approve', [EmployeeController::class, 'approval']);



/*
 * Users
 */
Route::resource('users', UserController::class, ['except' => ['create', 'edit']]);
Route::name('verify')->get('users/verify/{token}', [UserController::class, 'verify']);
Route::name('resend')->get('users/{user}/resend', [UserController::class, 'resend']);
Route::name('users')->get('user/access-level', [UserController::class, 'accessLevel']);

/*
 * Client
 */
Route::resource('clients', ClientController::class, ['except' => ['create', 'edit']]);

/*
 * contacts
 */
Route::resource('contacts', ContactController::class, ['except' => ['create', 'edit']]);

/*
 * Projects
 */
Route::resource('projects', ProjectController::class, ['except' => ['create', 'edit']]);

/*
 * Orders
 */
Route::resource('orders', OrderController::class, ['except' => ['create', 'edit']]);

/*
 * Tasks
 */
Route::resource('tasks', TaskController::class, ['except' => ['create', 'edit']]);

/*
 * Positions
 */
//Route::resource('positions', 'Position\PositionController', ['except' => ['create', 'edit']]);

/*
 * Employee Allocations
 */
Route::resource('employee-allocations', EmployeeAllocationController::class, ['except' => ['create', 'edit']]);
Route::name('employee-allocations')->post('employee-allocations/filter-employees',
                [EmployeeAllocationController::class, 'filterEmployeesForAllocation']);

/*
 * Date Allocations
 */
Route::resource('date-allocations', AllocatedDateController::class, ['except' => ['create', 'edit']]);

/*
 * Forms
 */
Route::resource('forms', FormController::class, ['except' => ['create', 'edit']]);


/*
 * Fields
 */
Route::resource('fields', FieldController::class, ['except' => ['create', 'edit']]);
Route::name('fields')->post('fields/add-fields', [FieldController::class, 'addFields']);
Route::name('forms')->post('forms/update-fields', [FieldController::class, 'updateFields']);

/*
 * Qualifications
 */
Route::resource('qualifications', QualificationController::class, ['except' => ['create', 'edit']]);
Route::name('qualifications')->get('qualifications/list-by/employee',
                [QualificationController::class, 'getQualificationsByEmployee']);


/*
 * Skills
 */
Route::resource('skills', SkillController::class, ['except' => ['create', 'edit']]);

/*
 * Inductions
 */
Route::resource('inductions', InductionController::class, ['except' => ['create', 'edit']]);
Route::name('inductions')->get('employee-inductions/list-by/employee',
    [EmployeeInductionController::class, 'getInductionsByEmployee']);

/*
 * EmployeeInductions
 */
Route::resource('employee-inductions', EmployeeInductionController::class, ['except' => ['create', 'edit']]);

/*
 * EmployeeTimeLine
 */
Route::resource('employee-timelines', EmployeeTimelineController::class, ['except' => ['create', 'edit']]);


