<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Connect Four</title>

        <!-- include the CSS inside escaping to PHP --> 
        <style>
            <?php include 'connectfour.css'; ?>
        </style>

    </head>
    <body>   
        <?php

            // define constants
            // a. Define constant ROWS with the value of 6
            // b. Define constant COLS with the value of 7
            $ROWS = 6;
            $COLS = 7;

            // define function createBoard
            function createBoard()
            {
                $ROWS = 6;
                $COLS = 7;

                // declare array $initialMatrix set to data values
                $initialMatrix = array(
                    array(0, 0, 0, 0, 0, 0, 0),
                    array(0, 0, 0, 0, 0, 0, 0),
                    array(0, 0, 0, 0, 0, 0, 0),
                    array(2, 1, 1, 2, 1, 0, 0),
                    array(1, 1, 2, 2, 1, 1, 2),
                    array(1, 2, 1, 2, 1, 2, 1)
                );
                        
                // debug statement
                echo "<script>console.log('Creating board');</script>";
                
                // build the HTML
                
                // print/echo as an <h1> the word Connect Four using class 'title'
                echo "<h1 class='title'>Connect Four</h1>";
                
                // print/echo a <table> using class 'container'
                echo "<table class='container'>";

                // iterate through the ROWS to create each <tr>
                for ($row = 0; $row < $ROWS; $row++){
                    // print/echo a <tr>
                    echo "<tr>";
                    // iterate through the COLS to create each <td>
                    for ($col = 0; $col < $COLS; $col++){
                        // if the value stored in array $initialMatrix at indexes $row and $col is 1
                        if ($initialMatrix[$row][$col] == 1){
                            // set variable $class equal to player1
                            $class = "player1";
                        }
                        // else if the value stored in array $initialMatrix at indexes $row and $col is 2
                        else if ($initialMatrix[$row][$col] == 2){
                            // set variable $class equal to player2
                            $class = "player2";
                        }
                        // else
                        else{
                            // set variable $class equal to empty
                            $class = "empty";
                        }

                        echo "<td class='$class'></td>";
                    // print/echo the closing </tr> for the row
                    }
                    echo "</tr>";

                }




                // print/echo the closing </table> for the table
                echo "</table>";

            }
            // call function createBoard
            createBoard();
        ?>       
    </body>
</html>   