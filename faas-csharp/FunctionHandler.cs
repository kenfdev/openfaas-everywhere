using System;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;


namespace Function
{
  [DataContract(Name = "stats")]

  public class Stats
  {
    [DataMember(Name = "total_count")]
    public string TotalCount { get; set; }

  }

  public class FunctionHandler
  {
    private static readonly HttpClient client = new HttpClient();
    public string Handle(string input)
    {
      var stats = ProcessRepositories().Result;

      var logoUrl = "https://camo.githubusercontent.com/0617f4657fef12e8d16db45b8d73def73144b09f/68747470733a2f2f646576656c6f7065722e6665646f726170726f6a6563742e6f72672f7374617469632f6c6f676f2f6373686172702e706e67";
      return string.Format(@"{{ ""language"": ""C#"", ""count"": {0}, ""logoUrl"": ""{1}"" }}", stats.TotalCount, logoUrl);
    }

    private static async Task<Stats> ProcessRepositories()

    {

      client.DefaultRequestHeaders.Accept.Clear();
      client.DefaultRequestHeaders.Accept.Add(
          new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
      client.DefaultRequestHeaders.Add("User-Agent", "GitHub CSharp Repository Reporter");
      var token = Environment.GetEnvironmentVariable("TOKEN");
      client.DefaultRequestHeaders.Add("Authorization", "token " + token);

      var query = Environment.GetEnvironmentVariable("Http_Query");
      var q = "";
      if (!string.IsNullOrEmpty(query)) {
        var year = query.Split('=')[1];
        q = string.Format(@"+created:{0}-01-01..{0}-12-31", year);
      }

      var serializer = new DataContractJsonSerializer(typeof(Stats));
      var streamTask = client.GetStreamAsync("https://api.github.com/search/repositories?per_page=1&type=Repositories&q=language%3AC%23" + q);

      var stats = serializer.ReadObject(await streamTask) as Stats;
      return stats;
    }
  }
}
