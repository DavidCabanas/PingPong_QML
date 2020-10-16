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
    property Item leftRacketObj: leftRacket
    property Item rightRacketObj: rightRacket
    property Item leftResultObj: leftResult
    property Item rightResultObj: rightResult
    property Item youWinObj: youWin
    property Item youLoseObj: youLose

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
        text: "0"
        font.bold: true
        font.pixelSize: 30
        anchors.right: net.left
        anchors.top: parent.top
        anchors.margins: 15
    }

    Text {
        id: rightResult
        text: "0"
        font.bold: true
        font.pixelSize: 30
        anchors.left: net.right
        anchors.top: parent.top
        anchors.margins: 15
    }

    Text {
        id: youWin
        x: 182
        y: 90
        width: 248
        height: 61
        text: "YOU WIN"
        font.bold: true
        font.pixelSize: 50
        color: "#FFFFFF"
        visible: false
    }

    Text {
        id: youLose
        x: 146
        y: 90
        width: 308
        height: 70
        text: "GAME OVER"
        font.bold: true
        font.pixelSize: 50
        color: "#000000"
        visible: false
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
        interval: 30
        running: true
        repeat: true
        onTriggered: GameControler.tick()
    }

    Component.onCompleted: GameControler.gameSetup(ballObj, leftRacketObj, rightRacketObj, leftResultObj, rightResultObj,
                                                   youWinObj, youLoseObj);
}

