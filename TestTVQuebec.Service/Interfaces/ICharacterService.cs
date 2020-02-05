using Newtonsoft.Json.Linq;

namespace TestTVQuebec.Service
{
    public interface ICharacterService
    {
        JToken GetCharacters(string movie);
    }
}