<?php

require_once('./php_library/score.php');

$ranking = enviar_ranquing();

?>

<!DOCTYPE html>
<html lang="es">

<head>
  <title>Anna i el misteri de les tres fonts</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/styles.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.min.css">
</head>

<body>

  <style>
    a {
      color: white;
      text-decoration: none;
    }
  </style>


  <div class="navbar">
    <div class="navbar-content">
      <div class="nav-links">
        <a href="index.html">Inici</a>
        <a href="jocs.html">Jocs</a>
        <a href="ranquing.php" class="active">Rànquing</a>
        <a href="credits.html">Equip</a>
      </div>
    </div>
  </div>


  <div class="container">
    <div class="ranking-container">

      <div class="ranking">
        <h1 class="ranking-title">RÀNQUING</h1>

        <table border="1">
          <thead>
            <tr>
              <th>Usuari</th>
              <th>Puntuació</th>
            </tr>
          </thead>
          <tbody>
            <?php if (!empty($ranking)): ?>
              <?php foreach ($ranking as $fila): ?>
                <tr>
                  <td><?php echo htmlspecialchars($fila['usuari']); ?></td>
                  <td><?php echo htmlspecialchars($fila['puntuacio_total']); ?></td>
                </tr>
              <?php endforeach; ?>
            <?php else: ?>
              <tr>
                <td colspan="2">No se encontraron resultados</td>
              </tr>
            <?php endif; ?>
          </tbody>
        </table>

      </div>

    </div>
  </div>

  <script src="script.js"></script>

</body>

</html>





















<!-- </div>
          <div id="number-one">
            <img class="icon" src="/img/gold_medal.png">
            <p>1.Juan</p>
            <span>800p</span>
          </div>
          <div>
            <img class="icon" src="/img/gold_medal.png">
            <p>3.Pepe</p>
            <span>800p</span>
          </div>
        

        <table>
          <tr>
            <td>4.Roger</td>
            <td><span>800p</span></td>
          </tr>
          <tr>
            <td>5.Virginia</td>
            <td><span>750p</span></td>
          </tr>
          <tr>
            <td>6.Natalia</td>
            <td><span>700p</span></td>
          </tr>
          <tr>
            <td>7.Jordi</td>
            <td><span>690p</span></td>
          </tr>
          <tr>
            <td>8.Erfan</td>
            <td><span>689p</span></td>
          </tr>
          <tr>
            <td>9.Antonio</td>
            <td><span>800p</span></td>
          </tr>
          <tr>
            <td>10.Alejandro</td>
            <td><span>790p</span></td>
          </tr>
        </table> -->
<!-- </div>

</div>

</div>

<script src="script.js"></script>

</body>

</html> -->