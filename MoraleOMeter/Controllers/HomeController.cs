using System.Web.Mvc;

namespace MoraleOMeter.Controllers
{

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return Request.IsAjaxRequest()
                ? (ActionResult) PartialView()
                : View();
        }
    }
}
