using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TestTVQuebec.Service;
using TestTVQuebec.WebApp.Models;

namespace TestTVQuebec.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }

        [HttpGet]
        [Route("/characterlist/{name}")]
        public JsonResult GetMovieCharacterLis([FromServices] ICharacterService characterService, string name)
        {
            var result = characterService.GetCharacters(name);

            return new JsonResult(result);
        }
    }
}