<?php

namespace App;

/**
 * Class Handler
 * @package App
 */
class Handler
{
    /**
     * @param $data
     * @return
     */
    public function handle($data) {
        $token = getenv('TOKEN');
        $client = new \GuzzleHttp\Client();

        $query = getenv('Http_Query');
        $q = '';
        if(!empty($query)) {
            $year = explode("=", $query)[1];
            $q = "+created:" . $year . "-01-01.." . $year . "-12-31";
        }
        $response = $client->get('https://api.github.com/search/repositories?per_page=1&type=Repositories&q=language%3APHP' . $q, [
            'headers' => ['Authorization' => 'token ' . $token]
        ]);
        $json = json_decode((string)$response->getBody(), true);
        $logo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2000px-PHP-logo.svg.png';
        return '{ "language": "PHP", "count": ' . $json['total_count'] . ', "logoUrl": "' . $logo_url . '"}';
    }
}
