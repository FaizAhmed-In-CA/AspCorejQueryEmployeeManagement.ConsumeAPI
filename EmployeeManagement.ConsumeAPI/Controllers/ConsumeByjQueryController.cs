using EmployeeManagement.ConsumeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace EmployeeManagement.ConsumeAPI.Controllers
{
    public class ConsumeByjQueryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AllEmployees()
        {
            return View();
        }

        public ViewResult AddEmployeejQ() => View();

        public ViewResult UpdateEmployeejQ(int id) => View();

        public ViewResult DeleteEmployeejQ(int id) => View();

        public ViewResult GetEmployeeDetailsJQ(int id) => View();

        public ViewResult AddFilejQ() => View();


    }
}
