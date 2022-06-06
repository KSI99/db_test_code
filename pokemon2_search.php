<html>
<body>
	<style>
		body {
			background-image: url('https://image.fmkorea.com/files/attach/new/20180928/486616/562458984/1292870465/f03af8a80dbb666e73e9744ed4fea64f.png');
			background-repeat : no-repeat
			background-size : cover;

		}
	</style>


<?php

    $con = mysqli_connect("localhost","cocomm","1234","sungkyul2");
    $c1_d = $_POST["c1"];
    $sql = "SELECT * FROM pk WHERE (Type_1 like '%$c1_d%') or Type_2 like '%$c1_d%'";
    $result = mysqli_query($con, $sql);

    while($row = mysqli_fetch_assoc($result)) {

    	echo "NO. ". $row['Number']."<br>";
        echo "이름 :  ".$row['Name']."<br>";
        echo "타입 :  ".$row['Type_1']."/".$row['Type_2']."<br>";
        echo "키 :  ".$row['Height']."m"."<br>";
        echo "분류 :  ".$row['Species']."포켓몬"."<br>";
        echo "성비 :  ".$row['Sex_ratio']."<br>";
        echo "몸무게 :  ".$row['Weight']."kg"."<br>";
        echo "특성 :  ".$row['Ability']."<br>";
        echo "포켓몬 소개 :  ".$row['Inforamation']."<br>";
        echo "----------------------------------------------- <br>";
     
    }

    print "<br><a href='pokemon1.html'>메인 화면으로</a>";
?>
</html>
