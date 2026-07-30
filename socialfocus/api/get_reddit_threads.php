<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$reddit_user = $_GET['user'] ?? "Pale_Focus_9466";
$user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// 1. Obtener los comentarios del usuario
$url = "https://www.reddit.com/user/$reddit_user/comments.json?limit=5";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
$raw_comments = $data['data']['children'] ?? [];

if (empty($raw_comments)) { echo json_encode([]); exit; }

// 2. Preparar el Multi-Handle para peticiones en paralelo
$mh = curl_multi_init();
$handles = [];

foreach ($raw_comments as $index => $item) {
    $c = $item['data'];
    $link_id = str_replace('t3_', '', $c['link_id']);
    $comment_id = $c['id'];
    
    $detail_url = "https://www.reddit.com/comments/$link_id/_/$comment_id.json?limit=5&depth=2";
    
    $handles[$index] = curl_init($detail_url);
    curl_setopt($handles[$index], CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handles[$index], CURLOPT_USERAGENT, $user_agent);
    curl_multi_add_handle($mh, $handles[$index]);
}

// Ejecutar todas las peticiones al mismo tiempo
$running = null;
do { curl_multi_exec($mh, $running); } while ($running);

// 3. Procesar resultados
$threads = [];
foreach ($raw_comments as $index => $item) {
    $c = $item['data'];
    $content = curl_multi_getcontent($handles[$index]);
    $detail_data = json_decode($content, true);
    curl_multi_remove_handle($mh, $handles[$index]);

    $latest_reply = "Sin respuestas nuevas";
    $has_unread_reply = false;

    if (isset($detail_data[1]['data']['children'][0]['data']['replies']['data']['children'])) {
        $replies = $detail_data[1]['data']['children'][0]['data']['replies']['data']['children'];
        $valid_replies = array_filter($replies, function($r) { return isset($r['data']['body']); });

        if (!empty($valid_replies)) {
            $last_reply_item = end($valid_replies);
            $latest_reply = $last_reply_item['data']['body'];
            if ($last_reply_item['data']['author'] !== $reddit_user) {
                $has_unread_reply = true;
            }
        }
    }

    $threads[] = [
        "id" => $c['id'],
        "platform" => "Reddit",
        "postContext" => $c['subreddit_name_prefixed'] . " | " . $c['link_title'],
        "myOriginalComment" => $c['body'],
        "latestReply" => $latest_reply,
        "timestamp" => date('c', $c['created_utc']),
        "isRead" => !$has_unread_reply,
        "replyCount" => $c['num_comments'] ?? 0,
        "deepLink" => "https://reddit.com" . $c['permalink']
    ];
}

curl_multi_close($mh);
echo json_encode($threads);