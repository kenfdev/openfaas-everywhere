require 'net/http' 
require 'json'

class Handler
  def run(req)
    query = ENV['Http_Query']
    q = ""
    unless query.to_s.strip.empty?
      year = query.split('=')[1]
      q = '+created:' + year + '-01-01..' + year + '-12-31'
    end

    uri = URI("https://api.github.com/search/repositories?per_page=1&type=Repositories&q=language%3ARuby" + q)
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "token #{ENV['TOKEN']}"
    

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') {|http|
      http.request(req)
    }
    json = JSON.parse(res.body)

    logo_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/2000px-Ruby_logo.svg.png"
    response = {"language" => "Ruby", "count" => json["total_count"], "logoUrl" => logo_url}

    return JSON.generate(response)
  end
end
