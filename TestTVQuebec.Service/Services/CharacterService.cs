using System;
using System.IO;
using Newtonsoft.Json.Linq;

namespace TestTVQuebec.Service
{
    public class CharacterService : ICharacterService
    {
        public JToken GetCharacters(string movie)
        {
            var directoryPath = Environment.CurrentDirectory + "/../TestTVQuebec.Service/JsonData/";
            var data = File.ReadAllText(directoryPath + movie + ".json");

            return JToken.Parse(data);
        }
    }
}