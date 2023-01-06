using EmployeeManagement.ConsumeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace EmployeeManagement.ConsumeAPI.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index()
        {

            List<Employee> employeeList = new List<Employee>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:44354/api/Employees"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    employeeList = JsonConvert.DeserializeObject<List<Employee>>(apiResponse);
                }
            }
            return View(employeeList);
        }


        public async Task<IActionResult> EmployeeDetails(int id)
        {

            Employee employee = new Employee();

            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:44354/api/Employees/" + id))
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        employee = JsonConvert.DeserializeObject<Employee>(apiResponse);
                    }
                    else
                        ViewBag.StatusCode = response.StatusCode;
                }
            }
            return View(employee);
        }

        public ViewResult AddEmployee() => View();


        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            Employee receivedEmployee = new Employee();

            using (var httpClient = new HttpClient())
            {
                StringContent content = new StringContent(JsonConvert.SerializeObject(employee), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PostAsync("https://localhost:44354/api/Employees", content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    receivedEmployee = JsonConvert.DeserializeObject<Employee>(apiResponse);
                }
            }
            return View(receivedEmployee);
        }


        public async Task<IActionResult> UpdateEmployee(int id)
        {
            Employee employee = new Employee();

            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:44354/api/Employees/" + id))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    employee = JsonConvert.DeserializeObject<Employee>(apiResponse);
                }
            }
            return View(employee);
        }

        //[HttpPost]
        //public async Task<IActionResult> UpdateEmployee(Employee employee)
        //{
        //    Employee receivedEmployee = new Employee();

        //    using (var httpClient = new HttpClient())
        //    {
        //        httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

        //        var content = new MultipartFormDataContent();
        //        content.Add(new StringContent(employee.EmployeeId.ToString()), "EmployeeId");
        //        content.Add(new StringContent(employee.FirstName), "FirstName");
        //        content.Add(new StringContent(employee.LastName), "LastName");
        //        content.Add(new StringContent(employee.Email), "Email");

        //        content.Add(new StringContent(employee.DateOfBrith.ToString()), "DateOfBrith");
        //        content.Add(new StringContent(employee.Gender.ToString()), "Gender");
        //        content.Add(new StringContent(employee.DepartmentId.ToString()), "DepartmentId");
        //        content.Add(new StringContent(employee.PhotoPath), "PhotoPath");


        //        using (var response = await httpClient.PutAsync("https://localhost:7166/api/Employees/" + employee.EmployeeId.ToString(), content))
        //        {
        //            if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
        //            {
        //                ViewBag.Result = "Success";

        //            }
        //            else
        //            {
        //                ViewBag.Result = "Failed";
        //                ViewBag.StatusCode = response.StatusCode;
        //            }
        //        }
        //    }

        //    return View();
        //}


        [HttpPost]
        public async Task<IActionResult> UpdateEmployee(Employee employee)
        {

            Employee receivedEmployee = new Employee();

            using (var httpClient = new HttpClient())
            {
                StringContent content = new StringContent(JsonConvert.SerializeObject(employee), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PutAsync("https://localhost:44354/api/Employees/" + employee.EmployeeId.ToString(), content))
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        ViewBag.Result = "Success";
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        receivedEmployee = JsonConvert.DeserializeObject<Employee>(apiResponse);
                    }
                    else
                    {
                        ViewBag.Result = "Failed";
                        ViewBag.StatusCode = response.StatusCode;
                    }
                }
            }
            return View(receivedEmployee);

        }


        public async Task<IActionResult> DeleteEmployee(int id)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.DeleteAsync("https://localhost:44354/api/Employees/" + id))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                }
            }

            return RedirectToAction("Index");
        }


    }
}
