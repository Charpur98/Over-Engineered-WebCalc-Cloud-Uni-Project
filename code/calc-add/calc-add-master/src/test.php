<?php
echo "Test Script Starting\n";
require('functions.inc.php');


class test
{

    public function test_1(){
        $x=10;
        $y=5;
        $expect=15;
        $answer=add($x,$y);

        echo "Test Result: ".$x."+".$y."=".$answer." (expected: ".$expect.")\n";
        if ($answer==$expect)
        {
            echo "Test Passed\n";
            exit(0); // exit code 0 - success
        } else {
            echo "Test Failed\n";
            exit(1); // exit code not zero - error
        }
    }

    public function test_minus(){
        $x=10;
        $y=-5;
        $expect=5;
        $answer=add($x,$y);

        echo "Test Result: ".$x."+".$y."=".$answer." (expected: ".$expect.")\n";
        if ($answer==$expect)
        {
            echo "Test Passed\n";
            exit(0); // exit code 0 - success
        } else {
            echo "Test Failed\n";
            exit(1); // exit code not zero - error
        }
    }

    public function test_decimal(){
        $x=10.2;
        $y=5.3;
        $expect=15.5;
        $answer=add($x,$y);

        echo "Test Result: ".$x."+".$y."=".$answer." (expected: ".$expect.")\n";
        if ($answer==$expect)
        {
            echo "Test Passed\n";
            exit(0); // exit code 0 - success
        } else {
            echo "Test Failed\n";
            exit(1); // exit code not zero - error
        }
    }

    public function test_request()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

}

