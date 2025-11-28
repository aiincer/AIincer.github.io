<?php
session_start();

// Redirect to login if user is not logged in
if(!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit;
}

$dataFile = 'data.json';
if(!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode(['users'=>[]], JSON_PRETTY_PRINT));
}
$data = json_decode(file_get_contents($dataFile), true);
if(!$data || !isset($data['users'])) {
    $data = ['users'=>[]];
}

$user = $_SESSION['user'];
$servers = $data['users'][$user]['servers'] ?? [];

// Handle server creation
$message = '';
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_server'])) {
    $name = trim($_POST['name'] ?? '');
    $type = $_POST['type'] ?? '';
    $version = $_POST['version'] ?? '';
    $note = $_POST['note'] ?? '';

    if($name === '' || $type === '' || $version === '') {
        $message = 'Bitte alle Pflichtfelder ausfüllen';
    } else {
        $newServer = ['name'=>$name,'type'=>$type,'version'=>$version,'note'=>$note,'status'=>'stopped','plugins'=>[]];
        $data['users'][$user]['servers'][] = $newServer;
        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
        $servers = $data['users'][$user]['servers'];
        $message = 'Server erfolgreich erstellt!';

        // Optional: E-Mail an Admins
        $to = 'antoschasad@gmail.com,cattech3d@gmail.com';
        $subject = 'Neue Server-Anfrage von '.$user;
        $body = "Benutzer: $user\nServer: $name\nTyp: $type\nVersion: $version\nNotiz: $note";
        @mail($to, $subject, $body);
    }
}

?>

<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard – AI_INC</title>
<style>
body {font-family: Arial, sans-serif; background:#f3f3f3; margin:0; padding:0;}
header {background:#1a1a1a; color:white; padding:20px; text-align:center; font-size:24px;}
.container {margin:30px auto; background:white; padding:20px; border-radius:12px; box-shadow:0 0 10px rgba(0,0,0,0.1); max-width:800px;}
input, select, textarea {width:100%; padding:10px; margin:6px 0; border-radius:6px; border:1px solid #ccc;}
button {padding:12px 20px; background:#2e6ce6; color:white; border:none; border-radius:8px; cursor:pointer; margin-top:10px;}
button:hover {background:#1d4bb8;}
.server {border:1px solid #ccc; border-radius:10px; padding:12px; margin-bottom:10px;}
.server-status {font-weight:bold;}
#error-msg {color:red; font-size:14px;}
.success-msg {color:green; font-size:14px;}
</style>
</head>
<body>
<header>AI_INC – Dashboard</header>
<div class="container">
  <h2>Willkommen, <?= htmlspecialchars($user) ?></h2>
  <?php if($message): ?>
    <p class="success-msg"><?= htmlspecialchars($message) ?></p>
  <?php endif; ?>

  <h3>Server erstellen</h3>
  <form method="post">
    <label>Server-Name *</label>
    <input type="text" name="name" required />

    <label>Server-Typ *</label>
    <select name="type" required>
      <option value="paper">Paper (Java)</option>
      <option value="fabric">Fabric (Java)</option>
      <option value="spigot">Spigot (Java)</option>
      <option value="bungeecord">BungeeCord</option>
      <option value="velocity">Velocity</option>
      <option value="bedrock">Bedrock</option>
    </select>

    <label>Minecraft-Version *</label>
    <input type="text" name="version" required />

    <label>Weitere Wünsche / Plugins</label>
    <textarea name="note" rows="3" placeholder="z.B. WorldEdit, Dynmap"></textarea>

    <button type="submit" name="create_server">Server erstellen</button>
  </form>

  <h3>Deine Server</h3>
  <?php if(empty($servers)): ?>
    <p>Du hast noch keine Server erstellt.</p>
  <?php else: ?>
    <?php foreach($servers as $s): ?>
      <div class="server">
        <div><strong>Name:</strong> <?= htmlspecialchars($s['name']) ?></div>
        <div><strong>Typ:</strong> <?= htmlspecialchars($s['type']) ?></div>
        <div><strong>Version:</strong> <?= htmlspecialchars($s['version']) ?></div>
        <div><strong>Status:</strong> <span class="server-status"><?= htmlspecialchars($s['status']) ?></span></div>
        <div><strong>Notiz:</strong> <?= htmlspecialchars($s['note']) ?></div>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>

  <form method="post" action="logout.php">
    <button type="submit">Abmelden</button>
  </form>
</div>
</body>
</html>
