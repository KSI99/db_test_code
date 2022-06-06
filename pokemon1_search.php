<html>
<body>
	<style>
		body {
			background-image: url('https://mblogthumb-phinf.pstatic.net/20150721_51/deuxiemevie7_1437406886474YiiFP_JPEG/tumblr_nqu7axKk2r1uz9k4oo3_1280.jpg?type=w2');
			background-repeat : no-repeat
			background-size : cover;

		}
	</style>
<?php

    $con = mysqli_connect("localhost","cocomm","1234","sungkyul2");
    $c1_d = $_POST["c1"];
    $sql = "SELECT * FROM pk WHERE Name like '%$c1_d%'";
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