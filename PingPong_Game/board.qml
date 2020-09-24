import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls.Material 2.0
import "gameControler.js" as GameControler


Rectangle{
    id: board
    visible: true
    width: 600
    height: 300
    color: "#0c3a01"
    property Item ballObj: ball

    Rectangle
    {
        id: boardLine
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.verticalCenter: parent.verticalCenter
        height: parent.height/100
        width: parent.width
        color: "#ffffff"
    }
    Rectangle
    {
        id: net
        color: "#000000"
        anchors.horizontalCenter: parent.horizontalCenter
        height: parent.height
        width: parent.width/100
    }



    //Raqueta izquierda
    Rectangle {
        id: leftRacket
        y: (parent.height/2)
        width: (parent.width/27)
        height: (parent.height/5)
        anchors.left: parent.left
        color: "#be0505"
        radius: 10
        MouseArea {
            id: leftMouse
            anchors.fill: parent
            acceptedButtons: Qt.LeftButton
            drag.target: leftRacket
            drag.axis: Drag.YAxis
            drag.minimumY: 0
            drag.maximumY: (board.height - leftRacket.height)
        }
    }


    //Raqueta derecha
    Rectangle {
        id: rightRacket
        y: (parent.height/2)
        width: (parent.width/27)
        height: (parent.height/5)
        anchors.right: parent.right
        color: "#041d90"
        radius: 10

        MouseArea
        {
            id: rightMouse
            anchors.fill: parent
            acceptedButtons: Qt.LeftButton
            drag.target: rightRacket
            drag.axis: Drag.YAxis
            drag.minimumY: 0
            drag.maximumY: (board.height - rightRacket.height)
        }
    }


    Text {
        id: leftResult
        //text: pingPong.leftResult
        font.bold: true
        font.pixelSize: 30
        anchors.right: net.left
        anchors.top: parent.top
        anchors.margins: 15
    }

    Text {
        id: rightResult
        //text: pingPong.rightResult
        font.bold: true
        font.pixelSize: 30
        anchors.left: net.right
        anchors.top: parent.top
        anchors.margins: 15
    }
    //Pelota
    Rectangle {
        id: ball
        x: 300
        y: 0
        width: leftRacket.width/2
        height: leftRacket.width/2
        radius: width
        color: "#e1f708"
    }
    Timer{
        interval: 16
        running: true
        repeat: true
        onTriggered: GameControler.tick()
    }

        /*ParallelAnimation {
            running: true
            NumberAnimation {
                target: ball
                property: "x"


                duration: 2000

            }

            NumberAnimation {
                target: ball
                property: "y"


                duration: 2000
            }

        }*/

    Component.onCompleted: GameControler.setBallObject(ballObj);

}

