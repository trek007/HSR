using System.Web.Mvc;
using System.Web.Security;

namespace HSR.Controllers
{
    public class ErrorController : Controller
    {
        /// <summary>
        /// Default Action method, to show error message to user.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            //if (Microsoft.Ajax.Utilities.Context.Response.StatusCode == 404)
            //{
            //    // handle this
            //}
            ViewBag.LoginError = "Something went wrong or You are not configured to access the application. Please Contact your administrator.";
            return View();
        }

        public ActionResult NotFound()
        {
            return View("NotFound");
        }

    }
}